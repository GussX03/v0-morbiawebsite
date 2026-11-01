type AgentEvent = {
  type?: string
  session_id?: string
  session?: { id?: string }
  turn?: { subagent_id?: string | null }
  text?: string
}

type AgentOptions = { apiKey: string; agentId: string; input: string; sessionId?: string; spendLimitCents: number }

async function responseFailure(response: Response, operation: string): Promise<Error> {
  let code = "unknown"
  let parameter = "none"
  try {
    const body = await response.json() as { error?: { code?: unknown; param?: unknown; type?: unknown } }
    const candidate = body.error?.code || body.error?.type
    if (typeof candidate === "string" && /^[a-zA-Z0-9_.-]{1,80}$/.test(candidate)) code = candidate
    if (typeof body.error?.param === "string" && /^[a-zA-Z0-9_.-]{1,80}$/.test(body.error.param)) parameter = body.error.param
  } catch { /* Do not log response bodies, which can contain private data. */ }
  return new Error(`AGENT_${operation}_${response.status}_${code}_${parameter}`)
}

async function readTurn(stream: ReadableStream<Uint8Array>, existingSessionId?: string) {
  const reader = stream.getReader()
  const decoder = new TextDecoder()
  let buffer = ""
  let sessionId = existingSessionId
  let text = ""
  let complete = false
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
        sessionId = event.session?.id || event.session_id || sessionId
        if (event.type === "agent.session.turn.output_text.done" && typeof event.text === "string") text = event.text
        if (event.type === "agent.session.requires_action" || event.type === "agent.session.failed" || event.type === "error") throw new Error("El agente no pudo completar la solicitud.")
        if ((event.type === "agent.session.turn.failed" || event.type === "agent.session.turn.cancelled") && !event.turn?.subagent_id) throw new Error("El agente no pudo completar la conversación.")
        if (event.type === "agent.session.turn.completed" && !event.turn?.subagent_id) complete = true
      }
    }
  } finally {
    await reader.cancel().catch(() => {})
  }
  if (!complete || !sessionId || !text.trim()) throw new Error("El agente no devolvió una respuesta completa.")
  return { sessionId, text: text.trim() }
}

export async function runAgentTurn(options: AgentOptions) {
  const base = "https://api.openai.com/v1/agents/sessions"
  const headers = { Authorization: `Bearer ${options.apiKey}`, "OpenAI-Beta": "agents=v1", "Content-Type": "application/json" }
  const signal = AbortSignal.timeout(55_000)
  let response: Response
  if (!options.sessionId) {
    response = await fetch(base, {
      method: "POST", headers, signal, cache: "no-store",
      body: JSON.stringify({ agent_id: options.agentId, environment: { type: "none" }, input: options.input, stream: true, spend_control: { limit: options.spendLimitCents } }),
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
  return readTurn(response.body, options.sessionId)
}
