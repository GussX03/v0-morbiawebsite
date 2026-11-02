import assert from "node:assert/strict"
import { test } from "node:test"
import { runAgentTurn } from "../lib/openai-agent.ts"

const options = { apiKey: "test-key", agentId: "agent-test", input: "Hola" }
const vaultResponse = (url) => url.includes("/credentials")
  ? Response.json({ data: [{ auth: { mcp_server_url: "https://www.morbia.com.mx/api/calendar-mcp" } }], has_more: false })
  : Response.json({ data: [{ id: "vault_test" }], has_more: false })
const event = (value) => `data: ${JSON.stringify(value)}\n\n`
const stream = (...values) => new Response(values.map(event).join(""), { headers: { "Content-Type": "text/event-stream" } })

test("creates a session and returns the final response", async () => {
  const originalFetch = globalThis.fetch
  globalThis.fetch = async (url, init) => {
    if (url.includes("/vaults")) return vaultResponse(url)
    const body = JSON.parse(init.body)
    assert.equal(body.agent_id, "agent-test")
    assert.equal(body.spend_control, undefined)
    assert.deepEqual(body.vault_ids, ["vault_test"])
    return stream(
      { type: "agent.session.created", session: { id: "sess_test" } },
      { type: "agent.session.turn.output_text.done", text: "Hola" },
      { type: "agent.session.turn.completed", turn: { subagent_id: null } },
    )
  }
  try {
    assert.deepEqual(await runAgentTurn(options), {
      sessionId: "sess_test",
      text: "Hola",
      messages: [{ id: "output_0", outputIndex: 0, text: "Hola" }],
    })
  } finally { globalThis.fetch = originalFetch }
})

test("rejects a session that requires unhandled action", async () => {
  const originalFetch = globalThis.fetch
  globalThis.fetch = async (url) => url.includes("/vaults") ? vaultResponse(url) : stream({ type: "agent.session.requires_action" })
  try {
    await assert.rejects(runAgentTurn(options), /no pudo completar/)
  } finally { globalThis.fetch = originalFetch }
})

test("subscribes before sending a follow-up message", async () => {
  const originalFetch = globalThis.fetch
  const requests = []
  globalThis.fetch = async (url, init) => {
    requests.push({ url, init })
    if (!init.method) return stream(
      { type: "agent.session.turn.output_text.done", text: "Seguimos" },
      { type: "agent.session.turn.completed", turn: { subagent_id: null } },
    )
    return new Response(null, { status: 202 })
  }
  try {
    assert.deepEqual(await runAgentTurn({ ...options, sessionId: "sess_test" }), {
      sessionId: "sess_test",
      text: "Seguimos",
      messages: [{ id: "output_0", outputIndex: 0, text: "Seguimos" }],
    })
    assert.equal(requests[0].init.method, undefined)
    assert.equal(requests[1].init.method, "POST")
    assert.ok(requests[1].init.headers["Idempotency-Key"])
  } finally { globalThis.fetch = originalFetch }
})

test("reports incremental text and reconciles the final text", async () => {
  const originalFetch = globalThis.fetch
  const updates = []
  const sessions = []
  globalThis.fetch = async (url) => url.includes("/vaults") ? vaultResponse(url) : stream(
    { type: "agent.session.created", session: { id: "sess_test" } },
    { type: "agent.session.turn.output_text.delta", item_id: "msg_1", delta: "¡Hola" },
    { type: "agent.session.turn.output_text.delta", item_id: "msg_1", delta: "!" },
    { type: "agent.session.turn.output_text.done", item_id: "msg_1", text: "¡Hola! ¿Cómo estás?" },
    { type: "agent.session.turn.completed", turn: { subagent_id: null } },
  )
  try {
    const result = await runAgentTurn({ ...options, onSession: (id) => sessions.push(id), onMessage: (message) => updates.push(message) })
    assert.deepEqual(sessions, ["sess_test"])
    assert.deepEqual(updates, [
      { id: "msg_1", outputIndex: 0, text: "¡Hola" },
      { id: "msg_1", outputIndex: 0, text: "¡Hola!" },
      { id: "msg_1", outputIndex: 0, text: "¡Hola! ¿Cómo estás?" },
    ])
    assert.equal(result.text, "¡Hola! ¿Cómo estás?")
    assert.equal(result.messages.length, 1)
  } finally { globalThis.fetch = originalFetch }
})

test("preserves distinct assistant messages from separate output items", async () => {
  const originalFetch = globalThis.fetch
  const updates = []
  globalThis.fetch = async (url) => url.includes("/vaults") ? vaultResponse(url) : stream(
    { type: "agent.session.created", session: { id: "sess_test" } },
    { type: "agent.session.turn.output_text.delta", item_id: "msg_progress", output_index: 0, delta: "Buscaré tu sesión." },
    { type: "agent.session.turn.output_text.done", item_id: "msg_progress", output_index: 0, text: "Buscaré tu sesión." },
    { type: "agent.session.turn.output_text.delta", item_id: "msg_result", output_index: 1, delta: "Listo, la sesión quedó confirmada." },
    { type: "agent.session.turn.output_text.done", item_id: "msg_result", output_index: 1, text: "Listo, la sesión quedó confirmada." },
    { type: "agent.session.turn.completed", turn: { subagent_id: null } },
  )
  try {
    const result = await runAgentTurn({ ...options, onMessage: (message) => updates.push(message) })
    assert.deepEqual(result.messages, [
      { id: "msg_progress", outputIndex: 0, text: "Buscaré tu sesión." },
      { id: "msg_result", outputIndex: 1, text: "Listo, la sesión quedó confirmada." },
    ])
    assert.equal(result.text, "Buscaré tu sesión.\n\nListo, la sesión quedó confirmada.")
    assert.deepEqual([...new Set(updates.map((message) => message.id))], ["msg_progress", "msg_result"])
  } finally { globalThis.fetch = originalFetch }
})

test("keeps multiple text parts inside one assistant message together", async () => {
  const originalFetch = globalThis.fetch
  globalThis.fetch = async (url) => url.includes("/vaults") ? vaultResponse(url) : stream(
    { type: "agent.session.created", session: { id: "sess_test" } },
    { type: "agent.session.turn.output_text.delta", item_id: "msg_1", output_index: 0, content_index: 0, delta: "Hola" },
    { type: "agent.session.turn.output_text.delta", item_id: "msg_1", output_index: 0, content_index: 1, delta: " mundo" },
    { type: "agent.session.turn.output_text.done", item_id: "msg_1", output_index: 0, content_index: 0, text: "Hola" },
    { type: "agent.session.turn.output_text.done", item_id: "msg_1", output_index: 0, content_index: 1, text: " mundo" },
    { type: "agent.session.turn.completed", turn: { subagent_id: null } },
  )
  try {
    const result = await runAgentTurn(options)
    assert.deepEqual(result.messages, [{ id: "msg_1", outputIndex: 0, text: "Hola mundo" }])
  } finally { globalThis.fetch = originalFetch }
})

test("rejects an interrupted response rather than marking it complete", async () => {
  const originalFetch = globalThis.fetch
  const updates = []
  globalThis.fetch = async (url) => url.includes("/vaults") ? vaultResponse(url) : stream(
    { type: "agent.session.created", session: { id: "sess_test" } },
    { type: "agent.session.turn.output_text.delta", item_id: "msg_partial", delta: "Parcial" },
    { type: "agent.session.turn.failed", turn: { subagent_id: null } },
  )
  try {
    await assert.rejects(runAgentTurn({ ...options, onMessage: (message) => updates.push(message) }), /no pudo completar/)
    assert.deepEqual(updates, [{ id: "msg_partial", outputIndex: 0, text: "Parcial" }])
  } finally { globalThis.fetch = originalFetch }
})
