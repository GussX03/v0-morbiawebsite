import assert from "node:assert/strict"
import { test } from "node:test"
import { runAgentTurn } from "../lib/openai-agent.ts"

const options = { apiKey: "test-key", agentId: "agent-test", input: "Hola" }
const event = (value) => `data: ${JSON.stringify(value)}\n\n`
const stream = (...values) => new Response(values.map(event).join(""), { headers: { "Content-Type": "text/event-stream" } })

test("creates a session and returns the final response", async () => {
  const originalFetch = globalThis.fetch
  globalThis.fetch = async (_url, init) => {
    const body = JSON.parse(init.body)
    assert.equal(body.agent_id, "agent-test")
    assert.equal(body.spend_control, undefined)
    return stream(
      { type: "agent.session.created", session: { id: "sess_test" } },
      { type: "agent.session.turn.output_text.done", text: "Hola" },
      { type: "agent.session.turn.completed", turn: { subagent_id: null } },
    )
  }
  try {
    assert.deepEqual(await runAgentTurn(options), { sessionId: "sess_test", text: "Hola" })
  } finally { globalThis.fetch = originalFetch }
})

test("rejects a session that requires unhandled action", async () => {
  const originalFetch = globalThis.fetch
  globalThis.fetch = async () => stream({ type: "agent.session.requires_action" })
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
    assert.deepEqual(await runAgentTurn({ ...options, sessionId: "sess_test" }), { sessionId: "sess_test", text: "Seguimos" })
    assert.equal(requests[0].init.method, undefined)
    assert.equal(requests[1].init.method, "POST")
    assert.ok(requests[1].init.headers["Idempotency-Key"])
  } finally { globalThis.fetch = originalFetch }
})
