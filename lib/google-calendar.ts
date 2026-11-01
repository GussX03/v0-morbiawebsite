import { createHash, randomUUID } from "node:crypto"

type BusyInterval = { start: string; end: string }

type CalendarEvent = {
  id?: string
  status?: string
  summary?: string
  start?: { dateTime?: string }
  end?: { dateTime?: string }
  attendees?: Array<{ email?: string }>
  hangoutLink?: string
  conferenceData?: { createRequest?: { status?: { statusCode?: string } }; entryPoints?: Array<{ entryPointType?: string; uri?: string }> }
}

type CalendarCredentials = {
  clientId: string
  clientSecret: string
  refreshToken: string
  calendarId: string
}

function credentials(): CalendarCredentials {
  const clientId = process.env.GOOGLE_CALENDAR_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CALENDAR_CLIENT_SECRET
  const refreshToken = process.env.GOOGLE_CALENDAR_REFRESH_TOKEN
  const calendarId = process.env.GOOGLE_CALENDAR_ID

  if (!clientId || !clientSecret || !refreshToken || !calendarId) {
    throw new Error("Google Calendar no está configurado.")
  }

  return { clientId, clientSecret, refreshToken, calendarId }
}

async function accessToken(config: CalendarCredentials): Promise<string> {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      refresh_token: config.refreshToken,
      grant_type: "refresh_token",
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  })

  if (!response.ok) throw new Error("No fue posible autorizar Google Calendar.")
  const result: unknown = await response.json()
  if (!result || typeof result !== "object" || !("access_token" in result) || typeof result.access_token !== "string") {
    throw new Error("Google Calendar no devolvió un token válido.")
  }
  return result.access_token
}

async function eventRequest(path: string, init: RequestInit = {}): Promise<Response> {
  const config = credentials()
  const token = await accessToken(config)
  const headers = new Headers(init.headers)
  headers.set("Authorization", `Bearer ${token}`)
  if (init.body) headers.set("Content-Type", "application/json")
  return fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(config.calendarId)}/events${path}`, {
    ...init,
    headers,
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  })
}

function validEmail(email: string): boolean {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function attendeeMatches(event: CalendarEvent, email: string): boolean {
  return !!event.attendees?.some((attendee) => attendee.email?.toLowerCase() === email.toLowerCase())
}

function validRange(start: string, end: string): boolean {
  const from = Date.parse(start)
  const to = Date.parse(end)
  const hasZone = (value: string) => /(?:Z|[+-]\d{2}:\d{2})$/i.test(value)
  return hasZone(start) && hasZone(end) && Number.isFinite(from) && Number.isFinite(to) && to > from && to - from <= 31 * 86_400_000
}

function validMeetingHours(start: string, end: string): boolean {
  if (!validRange(start, end) || Date.parse(start) <= Date.now()) return false
  const format = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Mexico_City", weekday: "short", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23",
  })
  const parts = (value: string) => Object.fromEntries(format.formatToParts(new Date(value)).map((part) => [part.type, part.value]))
  const a = parts(start)
  const b = parts(end)
  if (a.year !== b.year || a.month !== b.month || a.day !== b.day) return false
  if (a.weekday === "Sat" || a.weekday === "Sun") return true
  const begin = Number(a.hour) * 3_600 + Number(a.minute) * 60 + Number(a.second)
  const finish = Number(b.hour) * 3_600 + Number(b.minute) * 60 + Number(b.second)
  return begin >= 18 * 3_600 && (finish < 22 * 3_600 || (finish === 22 * 3_600 && new Date(end).getUTCMilliseconds() === 0))
}

export async function getCalendarBusyTimes(start: string, end: string): Promise<BusyInterval[]> {
  const from = Date.parse(start)
  const to = Date.parse(end)
  if (!validRange(start, end)) {
    throw new Error("El intervalo debe incluir zona horaria y no superar 31 días.")
  }

  const config = credentials()
  const token = await accessToken(config)
  const response = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ timeMin: new Date(from).toISOString(), timeMax: new Date(to).toISOString(), items: [{ id: config.calendarId }] }),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  })

  if (!response.ok) throw new Error("No fue posible consultar la disponibilidad.")
  const data = await response.json() as { calendars?: Record<string, { errors?: unknown[]; busy?: BusyInterval[] }> }
  const calendar = data.calendars?.[config.calendarId]
  if (!calendar || calendar.errors?.length || !Array.isArray(calendar.busy)) {
    throw new Error("Google Calendar no devolvió disponibilidad válida.")
  }
  return calendar.busy.map(({ start: busyStart, end: busyEnd }) => ({ start: busyStart, end: busyEnd }))
}

export async function findCalendarEvents(email: string, start: string, end: string) {
  if (!validEmail(email) || !validRange(start, end)) throw new Error("Se requiere un correo y un intervalo válido.")
  const params = new URLSearchParams({ timeMin: new Date(start).toISOString(), timeMax: new Date(end).toISOString(), singleEvents: "true", maxResults: "250" })
  const events: CalendarEvent[] = []
  let nextPageToken: string | undefined
  let pages = 0
  do {
    if (++pages > 5) throw new Error("El intervalo contiene demasiadas reuniones; solicita un periodo menor.")
    if (nextPageToken) params.set("pageToken", nextPageToken)
    const response = await eventRequest(`?${params}`)
    if (!response.ok) throw new Error("No fue posible consultar las reuniones.")
    const data = await response.json() as { items?: CalendarEvent[]; nextPageToken?: string }
    if (!Array.isArray(data.items)) throw new Error("Google Calendar devolvió una respuesta inválida.")
    events.push(...data.items)
    nextPageToken = data.nextPageToken
    if (events.length > 1_000) throw new Error("El intervalo contiene demasiadas reuniones; solicita un periodo menor.")
  } while (nextPageToken)
  return events.filter((event) => event.id && event.status !== "cancelled" && attendeeMatches(event, email)).map((event) => ({ id: event.id, start: event.start?.dateTime, end: event.end?.dateTime, summary: event.summary }))
}

async function matchingEvent(eventId: string, email: string): Promise<CalendarEvent> {
  if (!validEmail(email) || !/^[a-z0-9_-]{5,1024}$/i.test(eventId)) throw new Error("Se requiere una reunión y un correo válido.")
  const response = await eventRequest(`/${encodeURIComponent(eventId)}`)
  if (!response.ok) throw new Error("No se encontró la reunión.")
  const event = await response.json() as CalendarEvent
  if (event.status === "cancelled" || !attendeeMatches(event, email)) throw new Error("No se encontró una reunión con ese correo.")
  return event
}

export async function createCalendarEvent(input: { start: string; end: string; email: string; name: string; summary: string; description: string }) {
  if (!validEmail(input.email) || !input.name.trim() || !input.summary.trim() || !validMeetingHours(input.start, input.end)) throw new Error("Datos de reunión inválidos o fuera del horario de atención.")
  if ((await getCalendarBusyTimes(input.start, input.end)).length) throw new Error("El horario ya no está disponible.")
  const id = `morbia${createHash("sha256").update(JSON.stringify([input.email.toLowerCase(), new Date(input.start).toISOString(), new Date(input.end).toISOString()])).digest("hex").slice(0, 40)}`
  const response = await eventRequest("?conferenceDataVersion=1&sendUpdates=all", {
    method: "POST",
    body: JSON.stringify({
      id, summary: input.summary.slice(0, 200), description: input.description.slice(0, 2_000),
      start: { dateTime: input.start, timeZone: "America/Mexico_City" }, end: { dateTime: input.end, timeZone: "America/Mexico_City" },
      attendees: [{ email: input.email, displayName: input.name.slice(0, 100) }],
      conferenceData: { createRequest: { requestId: randomUUID(), conferenceSolutionKey: { type: "hangoutsMeet" } } },
    }),
  })
  if (!response.ok) throw new Error("No fue posible crear la reunión.")
  let event = await response.json() as CalendarEvent
  if (!event.id) throw new Error("Google Calendar no confirmó la creación.")
  const confirmedId = event.id
  const meetLink = (item: CalendarEvent) => item.hangoutLink || item.conferenceData?.entryPoints?.find((entry) => entry.entryPointType === "video")?.uri
  for (let attempt = 0; attempt < 2 && !meetLink(event) && event.conferenceData?.createRequest?.status?.statusCode === "pending"; attempt++) {
    await new Promise((resolve) => setTimeout(resolve, 600))
    try {
      const refreshed = await eventRequest(`/${encodeURIComponent(confirmedId)}`)
      if (!refreshed.ok) break
      event = await refreshed.json() as CalendarEvent
    } catch { break }
  }
  return { id: confirmedId, start: event.start?.dateTime || input.start, end: event.end?.dateTime || input.end, meet: meetLink(event) }
}

export async function moveCalendarEvent(input: { eventId: string; email: string; start: string; end: string }) {
  if (!validMeetingHours(input.start, input.end)) throw new Error("Horario inválido o fuera del horario de atención.")
  await matchingEvent(input.eventId, input.email)
  const busy = await getCalendarBusyTimes(input.start, input.end)
  if (busy.length) throw new Error("El nuevo horario no está disponible.")
  const response = await eventRequest(`/${encodeURIComponent(input.eventId)}?sendUpdates=all`, {
    method: "PATCH", body: JSON.stringify({ start: { dateTime: input.start, timeZone: "America/Mexico_City" }, end: { dateTime: input.end, timeZone: "America/Mexico_City" } }),
  })
  if (!response.ok) throw new Error("No fue posible modificar la reunión.")
  return { id: input.eventId, start: input.start, end: input.end }
}

export async function cancelCalendarEvent(eventId: string, email: string) {
  await matchingEvent(eventId, email)
  const response = await eventRequest(`/${encodeURIComponent(eventId)}?sendUpdates=all`, { method: "DELETE" })
  if (!response.ok) throw new Error("No fue posible cancelar la reunión.")
  return { cancelled: true }
}
