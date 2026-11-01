import { createHmac, timingSafeEqual } from "node:crypto"
import type { ChatButton } from "./chat-buttons"

const meetPattern = /^https:\/\/meet\.google\.com\/[a-z]{3}-[a-z]{4}-[a-z]{3}$/
const iconNames = new Set(["whatsapp", "phone", "email", "instagram", "facebook", "tiktok", "linkedin", "link", "video", "calendar", "chat", "automation", "web", "ai", "data", "file", "quote", "spark"])

function signature(url: string, expires: number, secret: string) {
  return createHmac("sha256", secret).update(`morbia-meeting-v1\n${expires}\n${url}`).digest("base64url")
}

export function createMeetingProof(url: string, secret: string, now = Date.now()): string | undefined {
  if (secret.length < 32 || !meetPattern.test(url)) return undefined
  const expires = now + 5 * 60_000
  return `${expires}.${signature(url, expires, secret)}`
}

function verifyMeetingProof(url: string, proof: string, secret: string, now: number): boolean {
  if (secret.length < 32 || !meetPattern.test(url)) return false
  const [expiresText, supplied, extra] = proof.split(".")
  const expires = Number(expiresText)
  if (extra !== undefined || !/^\d{13}$/.test(expiresText || "") || !supplied || expires < now || expires > now + 5 * 60_000) return false
  const expected = Buffer.from(signature(url, expires, secret))
  const actual = Buffer.from(supplied)
  return actual.length === expected.length && timingSafeEqual(actual, expected)
}

export function validatedChatButtons(metadata: unknown, secret: string, destinations: Record<string, { href: string; label: string; icon: string }>, now = Date.now(), replies: Record<string, { reply: string; label: string; icon: string }> = {}): ChatButton[] {
  if (!metadata || typeof metadata !== "object" || !("buttons" in metadata) || !Array.isArray(metadata.buttons)) return []
  const result: ChatButton[] = []
  const seen = new Set<string>()
  for (const value of metadata.buttons.slice(0, 12)) {
    if (!value || typeof value !== "object") continue
    const item = value as { action?: unknown; label?: unknown; icon?: unknown; url?: unknown; proof?: unknown }
    if (typeof item.action !== "string") continue
    let destination: ({ href: string } | { reply: string }) & { label: string; icon: string } | undefined
    if (Object.hasOwn(destinations, item.action)) {
      destination = destinations[item.action]
    } else if (Object.hasOwn(replies, item.action)) {
      destination = replies[item.action]
    } else if (item.action === "meeting" && typeof item.url === "string" && typeof item.proof === "string" && verifyMeetingProof(item.url, item.proof, secret, now)) {
      destination = { href: item.url, label: "Unirme a la sesión", icon: "video" }
    } else if (item.action === "link" && typeof item.url === "string") {
      try {
        const url = new URL(item.url)
        if (url.protocol === "https:" && !url.username && !url.password && !url.port && ["morbia.com.mx", "www.morbia.com.mx", "nexacv.morbia.com.mx"].includes(url.hostname)) {
          destination = { href: url.href, label: "Conocer más", icon: "link" }
        }
      } catch { /* Invalid destination. */ }
    }
    if (!destination) continue
    const destinationKey = "href" in destination ? destination.href : destination.reply
    if (seen.has(destinationKey)) continue
    const label = typeof item.label === "string" && item.label.trim().length > 0 && item.label.trim().length <= 40 && !/[\x00-\x1f\x7f<>]/.test(item.label)
      ? item.label.trim() : destination.label
    const icon = typeof item.icon === "string" && iconNames.has(item.icon) ? item.icon : destination.icon
    result.push("href" in destination ? { href: destination.href, label, icon } : { reply: destination.reply, label, icon })
    seen.add(destinationKey)
    if (result.length === 8) break
  }
  return result
}
