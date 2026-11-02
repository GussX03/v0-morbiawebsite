import assert from "node:assert/strict"
import { test } from "node:test"
import { BUTTONS_END, BUTTONS_START, publicDestinations, quickReplies, splitButtonMetadata } from "../lib/chat-buttons.ts"
import { validatedChatButtons } from "../lib/chat-buttons-server.ts"
import { createAgentStreamEvents, splitVisibleAgentOutput } from "../lib/chat-response.ts"

test("keeps agent messages separate and extracts buttons from the final message", () => {
  const output = splitVisibleAgentOutput([
    { id: "msg_progress", outputIndex: 0, text: "Buscaré la sesión y revisaré la disponibilidad." },
    {
      id: "msg_result",
      outputIndex: 1,
      text: `Listo, la sesión quedó confirmada.\n\n${BUTTONS_START}{"buttons":[{"action":"schedule"}]}${BUTTONS_END}`,
    },
  ], splitButtonMetadata)
  const buttons = validatedChatButtons(output.metadata, "test-calendar-secret-with-at-least-32-characters", publicDestinations, Date.now(), quickReplies)
  const events = createAgentStreamEvents(output.messages, buttons)

  assert.deepEqual(output.messages, [
    { id: "msg_progress", outputIndex: 0, text: "Buscaré la sesión y revisaré la disponibilidad." },
    { id: "msg_result", outputIndex: 1, text: "Listo, la sesión quedó confirmada." },
  ])
  assert.deepEqual(output.metadata, { buttons: [{ action: "schedule" }] })
  assert.equal(output.text, "Buscaré la sesión y revisaré la disponibilidad.\n\nListo, la sesión quedó confirmada.")
  assert.deepEqual(events, [
    { type: "message", messageId: "msg_progress", text: "Buscaré la sesión y revisaré la disponibilidad." },
    { type: "message", messageId: "msg_result", text: "Listo, la sesión quedó confirmada." },
    { type: "buttons", messageId: "msg_result", buttons: [{ reply: "Quiero agendar una sesión con Morbia.", label: "Agendar una sesión", icon: "calendar" }] },
    { type: "done" },
  ])
})

test("hides an incomplete buttons marker without merging or losing the visible message", () => {
  const output = splitVisibleAgentOutput([
    { id: "msg_1", outputIndex: 0, text: "La respuesta está lista.\n\n<morbia_but" },
  ], splitButtonMetadata)

  assert.deepEqual(output.messages, [{ id: "msg_1", outputIndex: 0, text: "La respuesta está lista." }])
  assert.equal(output.metadata, undefined)
})
