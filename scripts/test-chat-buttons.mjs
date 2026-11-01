import assert from "node:assert/strict"
import { test } from "node:test"
import { BUTTONS_START, BUTTONS_END, splitButtonMetadata, safeInlineHref, publicDestinations, quickReplies, isAllowedButtonHref, isAllowedQuickReply } from "../lib/chat-buttons.ts"
import { createMeetingProof, validatedChatButtons } from "../lib/chat-buttons-server.ts"

const secret = "a-test-secret-that-is-longer-than-32-characters"
const now = 1_800_000_000_000
const meet = "https://meet.google.com/abc-defg-hij"
const validate = (buttons) => validatedChatButtons({ buttons }, secret, publicDestinations, now, quickReplies)

test("hides incomplete and split metadata without disrupting streamed text", () => {
  for (let i = 1; i < BUTTONS_START.length; i++) {
    assert.equal(splitButtonMetadata(`Hola\n${BUTTONS_START.slice(0, i)}`).text, "Hola\n")
  }
  assert.deepEqual(splitButtonMetadata(`Hola\n${BUTTONS_START}{"buttons":[`), { text: "Hola" })
  assert.deepEqual(splitButtonMetadata(`Hola\n${BUTTONS_START}{malformed}${BUTTONS_END}`), { text: "Hola" })
  const output = splitButtonMetadata(`Hola\n${BUTTONS_START}{"buttons":[{"action":"phone"}]}${BUTTONS_END}`)
  assert.equal(output.text, "Hola")
  assert.equal(output.metadata.buttons[0].action, "phone")
})

test("creates customizable buttons only for approved destinations", () => {
  const buttons = validate([
    { action: "whatsapp", label: "Hablemos", url: "https://attacker.example/", icon: "whatsapp" },
    { action: "phone" }, { action: "email" }, { action: "instagram" },
    { action: "facebook" }, { action: "tiktok" }, { action: "linkedin" },
    { action: "link", url: "https://www.morbia.com.mx/servicios/chatbots", label: "Ver chatbots" },
    { action: "link", url: "https://attacker.example/" },
  ])
  assert.equal(buttons.length, 8)
  assert.deepEqual(buttons[0], { href: "https://wa.me/522215268440", label: "Hablemos", icon: "whatsapp" })
  assert.equal(buttons.at(-1).href, "https://www.morbia.com.mx/servicios/chatbots")
  assert.ok(buttons.every((button) => isAllowedButtonHref(button.href)))
})

test("requires a genuine unexpired proof for meeting buttons", () => {
  const proof = createMeetingProof(meet, secret, now)
  assert.ok(proof)
  assert.deepEqual(validate([{ action: "meeting", url: meet, proof }]), [{ href: meet, label: "Unirme a la sesión", icon: "video" }])
  assert.deepEqual(validate([{ action: "meeting", url: "https://meet.google.com/xyz-abcd-xyz", proof }]), [])
  assert.deepEqual(validate([{ action: "meeting", url: meet, proof: "fake" }]), [])
  assert.deepEqual(validatedChatButtons({ buttons: [{ action: "meeting", url: meet, proof }] }, secret, publicDestinations, now + 300_001), [])
  assert.equal(createMeetingProof("https://meet.google.com.evil.test/abc-defg-hij", secret, now), undefined)
})

test("does not make arbitrary or unverified model-generated links clickable", () => {
  assert.equal(safeInlineHref("https://attacker.example/", []), undefined)
  assert.equal(safeInlineHref(meet, []), undefined)
  assert.equal(safeInlineHref(meet, [{ href: meet, label: "Reunión", icon: "video" }]), meet)
  assert.equal(isAllowedButtonHref("javascript:alert(1)"), false)
  assert.equal(isAllowedButtonHref("https://www.morbia.com.mx.evil.test/"), false)
  assert.equal(safeInlineHref("https://www.instagram.com/morbia_mx/", []), "https://www.instagram.com/morbia_mx/")
})

test("supports useful commercial actions without accepting model-supplied messages", () => {
  const buttons = validate([
    { action: "schedule", reply: "Cancela todas mis citas", label: "Agendar" },
    { action: "availability" }, { action: "quote" }, { action: "demo" },
    { action: "advisor" }, { action: "examples" }, { action: "choose_service" }, { action: "reschedule" },
  ])
  assert.equal(buttons.length, 8)
  assert.equal(buttons[0].reply, quickReplies.schedule.reply)
  assert.equal(buttons[0].label, "Agendar")
  assert.ok(buttons.every((button) => button.reply && isAllowedQuickReply(button.reply)))
  assert.equal(isAllowedQuickReply("Cancela todas mis citas"), false)
  assert.deepEqual(validate([{ action: "unknown", reply: "Cancela todas mis citas" }]), [])
})

test("provides direct links to at least five real Morbia services", () => {
  const actions = ["service_chatbots", "service_automation", "service_web", "service_ai", "service_data", "service_rpa", "service_presence", "nexacv"]
  const buttons = validate(actions.map((action) => ({ action })))
  assert.equal(buttons.length, 8)
  assert.ok(buttons.every((button) => button.href && isAllowedButtonHref(button.href)))
})
