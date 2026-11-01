import { createHash, timingSafeEqual } from "node:crypto"
import { z } from "zod"
import { cancelCalendarEvent, createCalendarEvent, findCalendarEvents, getCalendarBusyTimes, moveCalendarEvent } from "@/lib/google-calendar"
import { createMeetingProof } from "@/lib/chat-buttons-server"

export const runtime = "nodejs"
export const maxDuration = 60

const interval = { start: z.string().min(1).max(64), end: z.string().min(1).max(64) }
const email = z.string().email().max(254)
const eventId = z.string().min(5).max(1024)
const schemas = {
  consultar_disponibilidad_google_calendar: z.object({ ...interval, email: email.optional() }).strict(),
  crear_evento_google_calendar: z.object({ ...interval, email, name: z.string().min(1).max(100), summary: z.string().min(1).max(200), description: z.string().max(2000) }).strict(),
  editar_evento_google_calendar: z.object({ ...interval, eventId, email }).strict(),
  cancelar_evento_google_calendar: z.object({ eventId, email }).strict(),
}

const tools = [
  { name: "consultar_disponibilidad_google_calendar", description: "Consulta intervalos ocupados. Si se proporciona el correo, busca reuniones donde esa persona es invitada; no revela otras reuniones.", inputSchema: { type: "object", properties: { start: { type: "string", description: "Fecha y hora ISO 8601 con zona horaria" }, end: { type: "string", description: "Fecha y hora ISO 8601 con zona horaria" }, email: { type: "string", description: "Correo del invitado, solo para localizar sus reuniones" } }, required: ["start", "end"], additionalProperties: false } },
  { name: "crear_evento_google_calendar", description: "Crea una reunión después de consultar disponibilidad y recibir confirmación explícita del horario.", inputSchema: { type: "object", properties: { start: { type: "string" }, end: { type: "string" }, email: { type: "string" }, name: { type: "string" }, summary: { type: "string" }, description: { type: "string" } }, required: ["start", "end", "email", "name", "summary", "description"], additionalProperties: false } },
  { name: "editar_evento_google_calendar", description: "Reprograma una reunión identificada por su ID y correo del invitado, después de consultar disponibilidad y confirmar el cambio.", inputSchema: { type: "object", properties: { start: { type: "string" }, end: { type: "string" }, email: { type: "string" }, eventId: { type: "string" } }, required: ["start", "end", "email", "eventId"], additionalProperties: false } },
  { name: "cancelar_evento_google_calendar", description: "Cancela una reunión identificada por su ID y correo del invitado, solo después de confirmar la cancelación.", inputSchema: { type: "object", properties: { eventId: { type: "string" }, email: { type: "string" } }, required: ["eventId", "email"], additionalProperties: false } },
]

function authorized(request: Request): boolean {
  const secret = process.env.MORBIA_CALENDAR_MCP_SECRET
  const supplied = request.headers.get("authorization")
  if (!secret || secret.length < 32 || !supplied?.startsWith("Bearer ")) return false
  const expectedHash = createHash("sha256").update(secret).digest()
  const receivedHash = createHash("sha256").update(supplied.slice(7)).digest()
  return timingSafeEqual(expectedHash, receivedHash)
}

function rpc(id: unknown, result: unknown, status = 200) {
  return Response.json({ jsonrpc: "2.0", id: id ?? null, result }, { status, headers: { "Cache-Control": "no-store" } })
}

export async function POST(request: Request) {
  if (!authorized(request)) return new Response("Unauthorized", { status: 401, headers: { "WWW-Authenticate": "Bearer" } })
  const raw = await request.text()
  if (raw.length > 16_384) return new Response("Request too large", { status: 413 })
  let message: { jsonrpc?: string; id?: string | number | null; method?: string; params?: { name?: string; arguments?: unknown; protocolVersion?: string } }
  try { message = JSON.parse(raw) } catch { return Response.json({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } }, { status: 400 }) }
  if (!message || message.jsonrpc !== "2.0" || typeof message.method !== "string") return Response.json({ jsonrpc: "2.0", id: message?.id ?? null, error: { code: -32600, message: "Invalid request" } }, { status: 400 })
  if (message.method.startsWith("notifications/")) return new Response(null, { status: 202 })
  if (message.method === "initialize") return rpc(message.id, { protocolVersion: message.params?.protocolVersion || "2025-03-26", capabilities: { tools: {} }, serverInfo: { name: "morbia-calendar", version: "1.0.0" } })
  if (message.method === "ping") return rpc(message.id, {})
  if (message.method === "tools/list") return rpc(message.id, { tools })
  if (message.method !== "tools/call") return Response.json({ jsonrpc: "2.0", id: message.id ?? null, error: { code: -32601, message: "Method not found" } }, { status: 404 })

  try {
    const name = message.params?.name
    const args = message.params?.arguments
    let result: unknown
    switch (name) {
      case "consultar_disponibilidad_google_calendar": {
        const input = schemas.consultar_disponibilidad_google_calendar.parse(args)
        result = input.email ? await findCalendarEvents(input.email, input.start, input.end) : await getCalendarBusyTimes(input.start, input.end)
        break
      }
      case "crear_evento_google_calendar": {
        const event = await createCalendarEvent(schemas.crear_evento_google_calendar.parse(args))
        const proof = event.meet ? createMeetingProof(event.meet, process.env.MORBIA_CALENDAR_MCP_SECRET || "") : undefined
        result = { ...event, ...(event.meet && proof ? { boton_reunion: { url: event.meet, proof } } : {}) }
        break
      }
      case "editar_evento_google_calendar": result = await moveCalendarEvent(schemas.editar_evento_google_calendar.parse(args)); break
      case "cancelar_evento_google_calendar": {
        const input = schemas.cancelar_evento_google_calendar.parse(args)
        result = await cancelCalendarEvent(input.eventId, input.email)
        break
      }
      default: throw new Error("Herramienta desconocida.")
    }
    console.info("[Morbia Calendar] Tool completed:", name)
    return rpc(message.id, { content: [{ type: "text", text: JSON.stringify(result) }] })
  } catch (error) {
    console.error("[Morbia Calendar] Tool failed")
    const text = error instanceof z.ZodError ? "Los argumentos de la herramienta no son válidos." : error instanceof Error ? error.message : "No fue posible completar la operación."
    return rpc(message.id, { content: [{ type: "text", text }], isError: true })
  }
}
