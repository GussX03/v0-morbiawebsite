import { NextResponse } from "next/server"

const DEFAULT_N8N_CHAT_WEBHOOK_URL = "https://n8n.morbia.com.mx/webhook/4fc39209-5fb5-46ba-9877-f54a40c5404e"
const CHAT_TIMEOUT_MS = 30_000

export const maxDuration = 35

type ChatPayload = {
  id?: unknown
  mensaje?: unknown
}

export async function POST(request: Request) {
  let payload: ChatPayload

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: "El mensaje no tiene un formato válido." }, { status: 400 })
  }

  if (typeof payload.id !== "string" || typeof payload.mensaje !== "string" || !payload.mensaje.trim()) {
    return NextResponse.json({ error: "Escribe un mensaje para iniciar la conversación." }, { status: 400 })
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), CHAT_TIMEOUT_MS)

  try {
    const response = await fetch(process.env.N8N_CHAT_WEBHOOK_URL || DEFAULT_N8N_CHAT_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: payload.id, mensaje: payload.mensaje }),
      signal: controller.signal,
      cache: "no-store",
    })
    const body = await response.text()

    if (!response.ok) {
      console.error("[Morbia Chat] n8n respondió con HTTP", response.status)
      return NextResponse.json({ error: "El asistente no está disponible en este momento." }, { status: 502 })
    }

    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": response.headers.get("content-type") || "application/json; charset=utf-8",
        "Cache-Control": "no-store, max-age=0",
      },
    })
  } catch (error) {
    const timedOut = error instanceof DOMException && error.name === "AbortError"
    console.error("[Morbia Chat] No fue posible contactar n8n.", timedOut ? "timeout" : error)
    return NextResponse.json(
      { error: timedOut ? "El asistente tardó demasiado en responder." : "No fue posible conectar con el asistente." },
      { status: timedOut ? 504 : 502 },
    )
  } finally {
    clearTimeout(timeout)
  }
}
