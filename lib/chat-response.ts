import type { AgentOutputMessage } from "./openai-agent"
import type { ChatButton } from "./chat-buttons"

type MetadataParser = (raw: string) => { text: string; metadata?: unknown }

export function splitVisibleAgentOutput(messages: AgentOutputMessage[], parseMetadata: MetadataParser) {
  const rawText = messages.map((message) => message.text).join("\n\n")
  const { text, metadata } = parseMetadata(rawText)
  let offset = 0
  const visibleMessages = messages.map((message) => {
    const start = offset
    const end = start + message.text.length
    offset = end + 2
    return { ...message, text: text.slice(start, Math.min(end, text.length)).trim() }
  }).filter((message) => message.text.length > 0)

  return { text, metadata, messages: visibleMessages }
}

export function createAgentStreamEvents(messages: AgentOutputMessage[], buttons: ChatButton[]) {
  const events: Array<Record<string, unknown>> = messages.map(({ id, text }) => ({ type: "message", messageId: id, text }))
  const buttonsMessageId = messages.at(-1)?.id
  if (buttons.length && buttonsMessageId) events.push({ type: "buttons", messageId: buttonsMessageId, buttons })
  events.push({ type: "done" })
  return events
}
