import { createHmac, timingSafeEqual } from "node:crypto"
import { NextResponse } from "next/server"
import { runAgentTurn } from "@/lib/openai-agent"

export const runtime = "nodejs"
export const maxDuration = 60

type SessionCookie = { clientId: string; sessionId: string; expires: number }
const cookieName = "morbia_agent_session"
const cookieAge = 24 * 60 * 60

function sign(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("base64url")
}

function decodeCookie(value: string | undefined, secret: string, clientId: string): string | undefined {
  if (!value) return undefined
  const [body, signature, extra] = value.split(".")
  if (!body || !signature || extra) return undefined
  const expected = Buffer.from(sign(body, secret))
  const actual = Buffer.from(signature)
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return undefined
  try {
    const session = JSON.parse(Buffer.from(body, "base64url").toString()) as SessionCookie
    return session.clientId === clientId && session.expires > Date.now() && /^sess_[a-zA-Z0-9_-]+$/.test(session.sessionId) ? session.sessionId : undefined
  } catch { return undefined }
}

export async function POST(request: Request) {
  if (new URL(request.url).pathname !== "/api/chat") return new Response(null, { status: 404 })
  const apiKey = process.env.OPENAI_API_KEY
  const agentId = process.env.MORBIA_OPENAI_AGENT_ID
  const cookieSecret = process.env.MORBIA_CHAT_COOKIE_SECRET
  if (!apiKey || !agentId || !cookieSecret || cookieSecret.length < 32 || process.env.MORBIA_CHAT_TRAFFIC_CONTROL_ENABLED !== "true") {
    return NextResponse.json({ error: "El asistente aún no está configurado." }, { status: 503 })
  }

  const origin = request.headers.get("origin")
  const allowedOrigins = new Set(["https://www.morbia.com.mx", "https://morbia.com.mx", process.env.MORBIA_CHAT_PREVIEW_ORIGIN].filter(Boolean))
  if (process.env.NODE_ENV !== "production") allowedOrigins.add("http://localhost:3013")
  if (!origin || !allowedOrigins.has(origin)) return NextResponse.json({ error: "Origen no permitido." }, { status: 403 })

  let payload: { id?: unknown; mensaje?: unknown }
  try { payload = await request.json() } catch { return NextResponse.json({ error: "Mensaje inválido." }, { status: 400 }) }
  if (typeof payload.id !== "string" || !/^morbia_[a-z0-9]{1,40}$/.test(payload.id) || typeof payload.mensaje !== "string" || !payload.mensaje.trim() || payload.mensaje.length > 2_000) {
    return NextResponse.json({ error: "Mensaje inválido." }, { status: 400 })
  }
  if (payload.id === "morbia_healthcheck" && payload.mensaje === "healthcheck") return NextResponse.json({ ok: true })

  const cookies = request.headers.get("cookie")?.split(";").map((item) => item.trim()) || []
  const cookie = cookies.find((item) => item.startsWith(`${cookieName}=`))?.slice(cookieName.length + 1)
  const existing = decodeCookie(cookie, cookieSecret, payload.id)
  const wantsStream = request.headers.get("accept")?.includes("text/event-stream")
  if (wantsStream) {
    const abort = new AbortController()
    const encoder = new TextEncoder()
    let resolveSession!: (id: string) => void
    let rejectSession!: (error: unknown) => void
    const sessionReady = new Promise<string>((resolve, reject) => { resolveSession = resolve; rejectSession = reject })
    let sessionReported = false
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        const send = (event: object) => controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`))
        void runAgentTurn({
          apiKey, agentId, input: payload.mensaje!.toString().trim(), sessionId: existing, signal: abort.signal,
          onSession(id) {
            if (!/^sess_[a-zA-Z0-9_-]+$/.test(id)) throw new Error("AGENT_INVALID_SESSION")
            sessionReported = true
            resolveSession(id)
          },
          onText(text) { send({ type: "text", text }) },
        }).then(() => {
          send({ type: "done" })
          controller.close()
        }).catch((error: unknown) => {
          if (!sessionReported) rejectSession(error)
          const code = error instanceof Error && /^AGENT_[a-zA-Z0-9_.-]+$/.test(error.message) ? error.message : "AGENT_UNKNOWN"
          console.error("[Morbia Chat] La sesión de OpenAI no pudo completarse:", code)
          try { send({ type: "error" }); controller.close() } catch { /* Client disconnected. */ }
        })
      },
      cancel() { abort.abort() },
    })
    try {
      const sessionId = await sessionReady
      const encoded = Buffer.from(JSON.stringify({ clientId: payload.id, sessionId, expires: Date.now() + cookieAge * 1_000 } satisfies SessionCookie)).toString("base64url")
      const response = new NextResponse(body, { headers: { "Content-Type": "text/event-stream; charset=utf-8", "Cache-Control": "no-store, no-transform", "X-Accel-Buffering": "no" } })
      response.cookies.set(cookieName, `${encoded}.${sign(encoded, cookieSecret)}`, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: cookieAge, path: "/api" })
      return response
    } catch {
      abort.abort()
      return NextResponse.json({ error: "El asistente no está disponible en este momento." }, { status: 502 })
    }
  }
  try {
    const result = await runAgentTurn({ apiKey, agentId, input: payload.mensaje.trim(), sessionId: existing })
    const encoded = Buffer.from(JSON.stringify({ clientId: payload.id, sessionId: result.sessionId, expires: Date.now() + cookieAge * 1_000 } satisfies SessionCookie)).toString("base64url")
    const response = NextResponse.json({ output: result.text }, { headers: { "Cache-Control": "no-store" } })
    response.cookies.set(cookieName, `${encoded}.${sign(encoded, cookieSecret)}`, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: cookieAge, path: "/api" })
    return response
  } catch (error) {
    const code = error instanceof Error && /^AGENT_[a-zA-Z0-9_.-]+$/.test(error.message) ? error.message : "AGENT_UNKNOWN"
    console.error("[Morbia Chat] La sesión de OpenAI no pudo completarse:", code)
    return NextResponse.json({ error: "El asistente no está disponible en este momento." }, { status: 502 })
  }
}
