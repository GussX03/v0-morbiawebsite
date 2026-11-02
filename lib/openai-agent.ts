type AgentEvent = {
  type?: string
  session_id?: string
  session?: { id?: string }
  turn?: { subagent_id?: string | null }
  item_id?: string
  output_index?: number
  content_index?: number
  delta?: string
  text?: string
}

export type AgentOutputMessage = { id: string; outputIndex: number; text: string }

type AgentOptions = {
  apiKey: string; agentId: string; input: string; sessionId?: string
  signal?: AbortSignal
  onSession?: (sessionId: string) => void
  onMessage?: (message: AgentOutputMessage, done: boolean) => void
}

const calendarServerUrl = "https://www.morbia.com.mx/api/calendar-mcp"

async function responseFailure(response: Response, operation: string): Promise<Error> {
  let code = "unknown"
  let parameter = "none"
  try {
    const body = await response.json() as { error?: { code?: unknown; param?: unknown; type?: unknown; message?: unknown } }
    const candidate = body.error?.code || body.error?.type
    if (typeof candidate === "string" && /^[a-zA-Z0-9_.-]{1,80}$/.test(candidate)) code = candidate
    if (typeof body.error?.param === "string" && /^[a-zA-Z0-9_.-]{1,80}$/.test(body.error.param)) parameter = body.error.param
    if (parameter === "none" && typeof body.error?.message === "string") {
      const message = body.error.message.toLowerCase()
      parameter = ["credit", "balance", "billing", "model", "agent", "organization", "project", "vault", "input", "environment", "stream", "mcp", "quota", "permission", "session"].filter((word) => message.includes(word)).join("-") || "none"
    }
  } catch { /* Do not log response bodies, which can contain private data. */ }
  return new Error(`AGENT_${operation}_${response.status}_${code}_${parameter}`)
}

async function readTurn(stream: ReadableStream<Uint8Array>, options: AgentOptions) {
  const reader = stream.getReader()
  const decoder = new TextDecoder()
  let buffer = ""
  let sessionId = options.sessionId
  let totalTextLength = 0
  const outputs = new Map<string, { id: string; outputIndex: number; parts: Map<number, string>; text: string }>()
  let complete = false
  if (sessionId) options.onSession?.(sessionId)

  const updateOutput = (event: AgentEvent, incomingText: string, final: boolean) => {
    const outputIndex = Number.isSafeInteger(event.output_index) && (event.output_index ?? -1) >= 0
      ? event.output_index!
      : undefined
    const id = typeof event.item_id === "string" && event.item_id
      ? event.item_id
      : outputIndex === undefined ? "output_0" : `output_${outputIndex}`
    let output = outputs.get(id)
    if (!output) {
      output = { id, outputIndex: outputIndex ?? outputs.size, parts: new Map(), text: "" }
      outputs.set(id, output)
    } else if (outputIndex !== undefined) {
      output.outputIndex = outputIndex
    }

    const contentIndex = Number.isSafeInteger(event.content_index) && (event.content_index ?? -1) >= 0
      ? event.content_index!
      : 0
    const previousPart = output.parts.get(contentIndex) || ""
    const nextPart = final ? incomingText : previousPart + incomingText
    totalTextLength += nextPart.length - previousPart.length
    if (totalTextLength > 100_000) throw new Error("La respuesta del agente es demasiado grande.")

    output.parts.set(contentIndex, nextPart)
    output.text = Array.from(output.parts.entries())
      .sort(([left], [right]) => left - right)
      .map(([, partText]) => partText)
      .join("")
    options.onMessage?.({ id: output.id, outputIndex: output.outputIndex, text: output.text }, final)
  }

  try {
    while (!complete) {
      const chunk = await reader.read()
      if (chunk.done) break
      buffer = (buffer + decoder.decode(chunk.value, { stream: true })).replace(/\r\n/g, "\n")
      if (buffer.length > 1_000_000) throw new Error("La respuesta del agente es demasiado grande.")
      let boundary: number
      while ((boundary = buffer.indexOf("\n\n")) >= 0) {
        const block = buffer.slice(0, boundary)
        buffer = buffer.slice(boundary + 2)
        const data = block.split("\n").filter((line) => line.startsWith("data:")).map((line) => line.slice(5).trimStart()).join("\n")
        if (!data || data === "[DONE]") continue
        const event = JSON.parse(data) as AgentEvent
        const eventSessionId = event.session?.id || event.session_id
        if (!sessionId && eventSessionId) {
          sessionId = eventSessionId
          options.onSession?.(sessionId)
        }
        if (event.type === "agent.session.turn.output_text.delta" || event.type === "agent.session.turn.output_text.done") {
          if (event.type.endsWith(".delta") && typeof event.delta === "string") updateOutput(event, event.delta, false)
          if (event.type.endsWith(".done") && typeof event.text === "string") updateOutput(event, event.text, true)
        }
        if (event.type === "agent.session.requires_action" || event.type === "agent.session.failed" || event.type === "agent.session.environment.failed" || event.type === "error") throw new Error("El agente no pudo completar la solicitud.")
        if ((event.type === "agent.session.turn.failed" || event.type === "agent.session.turn.cancelled") && !event.turn?.subagent_id) throw new Error("El agente no pudo completar la conversación.")
        if (event.type === "agent.session.turn.completed" && !event.turn?.subagent_id) complete = true
      }
    }
  } finally {
    await reader.cancel().catch(() => {})
  }
  const messages: AgentOutputMessage[] = Array.from(outputs.values())
    .sort((left, right) => left.outputIndex - right.outputIndex)
    .map(({ id, outputIndex, text }) => ({ id, outputIndex, text: text.trim() }))
    .filter((message) => message.text.length > 0)
  const text = messages.map((message) => message.text).join("\n\n")
  if (!complete || !sessionId || !text.trim()) throw new Error("El agente no devolvió una respuesta completa.")
  return { sessionId, text, messages }
}

export async function runAgentTurn(options: AgentOptions) {
  const base = "https://api.openai.com/v1/agents/sessions"
  const headers = { Authorization: `Bearer ${options.apiKey}`, "OpenAI-Beta": "agents=v1", "Content-Type": "application/json" }
  const timeoutSignal = AbortSignal.timeout(55_000)
  const signal = options.signal ? AbortSignal.any([timeoutSignal, options.signal]) : timeoutSignal
  let response: Response
  if (!options.sessionId) {
    const vaultsResponse = await fetch("https://api.openai.com/v1/vaults?limit=100", { headers, signal, cache: "no-store" })
    if (!vaultsResponse.ok) throw await responseFailure(vaultsResponse, "VAULTS")
    const vaults = await vaultsResponse.json() as { data?: Array<{ id: string }>; has_more?: boolean }
    if (!Array.isArray(vaults.data) || vaults.has_more || vaults.data.length > 20) throw new Error("AGENT_VAULTS_UNSUPPORTED")
    const matches: string[] = []
    for (const vault of vaults.data) {
      if (!/^vault_[a-zA-Z0-9_-]+$/.test(vault.id)) continue
      const credentialsResponse = await fetch(`https://api.openai.com/v1/vaults/${encodeURIComponent(vault.id)}/credentials?limit=100`, { headers, signal, cache: "no-store" })
      if (!credentialsResponse.ok) throw await responseFailure(credentialsResponse, "CREDENTIALS")
      const credentials = await credentialsResponse.json() as { data?: Array<{ auth?: { mcp_server_url?: string } }>; has_more?: boolean }
      if (!Array.isArray(credentials.data) || credentials.has_more) throw new Error("AGENT_CREDENTIALS_UNSUPPORTED")
      if (credentials.data.some((credential) => credential.auth?.mcp_server_url?.replace(/\/$/, "") === calendarServerUrl)) matches.push(vault.id)
    }
    if (matches.length !== 1) throw new Error("AGENT_CALENDAR_VAULT_NOT_FOUND")
    response = await fetch(base, {
      method: "POST", headers, signal, cache: "no-store",
      body: JSON.stringify({
        agent_id: options.agentId,
        vault_ids: matches, environment: { type: "none" }, input: options.input, stream: true,
      }),
    })
  } else {
    const path = `${base}/${encodeURIComponent(options.sessionId)}/events`
    response = await fetch(path, { headers: { ...headers, Accept: "text/event-stream" }, signal, cache: "no-store" })
    if (!response.ok) throw await responseFailure(response, "STREAM")
    if (!response.body) throw new Error("AGENT_STREAM_EMPTY")
    const sent = await fetch(path, {
      method: "POST", headers: { ...headers, "Idempotency-Key": crypto.randomUUID() }, signal, cache: "no-store",
      body: JSON.stringify({ events: [{ type: "agent.session.input.message", input: [{ role: "user", content: [{ type: "input_text", text: options.input }] }] }] }),
    })
    if (!sent.ok) {
      await response.body.cancel().catch(() => {})
      throw await responseFailure(sent, "SEND")
    }
  }
  if (!response.ok) throw await responseFailure(response, "CREATE")
  if (!response.body) throw new Error("AGENT_CREATE_EMPTY")
  return readTurn(response.body, options)
}
