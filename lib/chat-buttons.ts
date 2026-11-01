export const BUTTONS_START = "<morbia_buttons>"
export const BUTTONS_END = "</morbia_buttons>"

export type ChatButton = { label: string; href: string; icon: string }

export const publicDestinations = {
  whatsapp: { href: "https://wa.me/522215268440", label: "Escríbenos por WhatsApp", icon: "whatsapp" },
  phone: { href: "tel:+522215268440", label: "Llamar a Morbia", icon: "phone" },
  email: { href: "mailto:contacto@morbia.com.mx", label: "Enviar correo", icon: "email" },
  instagram: { href: "https://www.instagram.com/morbia_mx/", label: "Instagram", icon: "instagram" },
  facebook: { href: "https://www.facebook.com/share/1JCLHGkqxF/", label: "Facebook", icon: "facebook" },
  tiktok: { href: "https://www.tiktok.com/@morbiamx", label: "TikTok", icon: "tiktok" },
  linkedin: { href: "https://www.linkedin.com/company/morbia/", label: "LinkedIn", icon: "linkedin" },
  website: { href: "https://www.morbia.com.mx/", label: "Conoce Morbia", icon: "link" },
} as const

export function isAllowedButtonHref(href: string): boolean {
  if (Object.values(publicDestinations).some((item) => item.href === href)) return true
  try {
    const url = new URL(href)
    if (url.protocol !== "https:" || url.username || url.password || url.port) return false
    if (["morbia.com.mx", "www.morbia.com.mx", "nexacv.morbia.com.mx"].includes(url.hostname)) return true
    return url.hostname === "meet.google.com" && /^\/[a-z]{3}-[a-z]{4}-[a-z]{3}$/.test(url.pathname) && !url.search && !url.hash
  } catch { return false }
}

export function splitButtonMetadata(raw: string): { text: string; metadata?: unknown } {
  const start = raw.indexOf(BUTTONS_START)
  if (start >= 0) {
    const text = raw.slice(0, start).trimEnd()
    const after = raw.slice(start + BUTTONS_START.length)
    const end = after.indexOf(BUTTONS_END)
    if (end < 0 || after.length > 16_384) return { text }
    try { return { text, metadata: JSON.parse(after.slice(0, end)) } } catch { return { text } }
  }
  // Hide a marker even when it arrives split across several network chunks.
  let suffix = Math.min(raw.length, BUTTONS_START.length - 1)
  while (suffix > 0 && !BUTTONS_START.startsWith(raw.slice(-suffix))) suffix--
  return { text: suffix ? raw.slice(0, -suffix) : raw }
}

export function safeInlineHref(href: string, buttons: ChatButton[]): string | undefined {
  if (isAllowedButtonHref(href) && buttons.some((button) => button.href === href)) return href
  try {
    const url = new URL(href)
    if (url.protocol !== "https:" || url.username || url.password || url.port) return undefined
    const host = url.hostname.toLowerCase()
    if (host === "morbia.com.mx" || host === "www.morbia.com.mx" || host === "nexacv.morbia.com.mx") return url.href
    const approved = Object.values(publicDestinations).some((item) => {
      if (!item.href.startsWith("https:")) return false
      const allowed = new URL(item.href)
      return host === allowed.hostname && url.pathname.replace(/\/$/, "") === allowed.pathname.replace(/\/$/, "")
    })
    return approved ? url.href : undefined
  } catch { return undefined }
}
