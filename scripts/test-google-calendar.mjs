import assert from "node:assert/strict"
import { test } from "node:test"
import { cancelCalendarEvent, createCalendarEvent, findCalendarEvents, getCalendarBusyTimes } from "../lib/google-calendar.ts"

const start = "2035-11-05T18:00:00-06:00"
const end = "2035-11-05T19:00:00-06:00"

test("returns only busy intervals and uses the configured calendar", async () => {
  Object.assign(process.env, {
    GOOGLE_CALENDAR_CLIENT_ID: "test-client",
    GOOGLE_CALENDAR_CLIENT_SECRET: "test-secret",
    GOOGLE_CALENDAR_REFRESH_TOKEN: "test-refresh",
    GOOGLE_CALENDAR_ID: "calendar@example.com",
  })
  const originalFetch = globalThis.fetch
  const requests = []
  globalThis.fetch = async (url, options) => {
    requests.push({ url, options })
    if (requests.length === 1) return Response.json({ access_token: "test-access" })
    return Response.json({ calendars: { "calendar@example.com": { busy: [{ start, end, summary: "private" }] } } })
  }
  try {
    assert.deepEqual(await getCalendarBusyTimes(start, end), [{ start, end }])
    assert.equal(JSON.parse(requests[1].options.body).items[0].id, "calendar@example.com")
    assert.equal(requests[1].options.headers.Authorization, "Bearer test-access")
  } finally {
    globalThis.fetch = originalFetch
  }
})

test("rejects invalid or unbounded intervals before sending requests", async () => {
  await assert.rejects(getCalendarBusyTimes("2035-11-05T18:00:00", end), /zona horaria/)
  await assert.rejects(getCalendarBusyTimes(start, "2036-01-02T19:00:00-06:00"), /31 días/)
})

test("does not treat calendar API errors as free time", async () => {
  const originalFetch = globalThis.fetch
  let calls = 0
  globalThis.fetch = async () => ++calls === 1
    ? Response.json({ access_token: "test-access" })
    : Response.json({ calendars: { "calendar@example.com": { errors: [{ reason: "notFound" }] } } })
  try {
    await assert.rejects(getCalendarBusyTimes(start, end), /disponibilidad válida/)
  } finally {
    globalThis.fetch = originalFetch
  }
})

test("rejects weekday appointments outside opening hours", async () => {
  await assert.rejects(createCalendarEvent({ start: "2035-11-05T17:00:00-06:00", end: "2035-11-05T18:00:00-06:00", email: "person@example.com", name: "Example", summary: "Reunion", description: "" }), /horario/)
})

test("only returns events matching the requested attendee", async () => {
  const originalFetch = globalThis.fetch
  let calls = 0
  globalThis.fetch = async () => ++calls === 1
    ? Response.json({ access_token: "test-access" })
    : Response.json({ items: [
      { id: "event1", attendees: [{ email: "person@example.com" }], summary: "Own" },
      { id: "event2", attendees: [{ email: "other@example.com" }], summary: "Private" },
    ] })
  try {
    assert.deepEqual((await findCalendarEvents("person@example.com", start, end)).map((event) => event.id), ["event1"])
  } finally {
    globalThis.fetch = originalFetch
  }
})

test("does not cancel an event belonging to another attendee", async () => {
  const originalFetch = globalThis.fetch
  let calls = 0
  globalThis.fetch = async () => ++calls === 1
    ? Response.json({ access_token: "test-access" })
    : Response.json({ attendees: [{ email: "other@example.com" }] })
  try {
    await assert.rejects(cancelCalendarEvent("event123", "person@example.com"), /No se encontró/)
    assert.equal(calls, 2)
  } finally {
    globalThis.fetch = originalFetch
  }
})

test("does not create an event when the proposed time is busy", async () => {
  const originalFetch = globalThis.fetch
  let calls = 0
  globalThis.fetch = async () => ++calls === 1
    ? Response.json({ access_token: "test-access" })
    : Response.json({ calendars: { "calendar@example.com": { busy: [{ start, end }] } } })
  try {
    await assert.rejects(createCalendarEvent({ start, end, email: "person@example.com", name: "Example", summary: "Reunion", description: "" }), /no está disponible/)
    assert.equal(calls, 2)
  } finally {
    globalThis.fetch = originalFetch
  }
})

test("creates an event only after checking availability", async () => {
  const originalFetch = globalThis.fetch
  const requests = []
  globalThis.fetch = async (url, options) => {
    requests.push({ url, options })
    if (url === "https://oauth2.googleapis.com/token") return Response.json({ access_token: "test-access" })
    if (url.endsWith("/freeBusy")) return Response.json({ calendars: { "calendar@example.com": { busy: [] } } })
    return Response.json({ id: "event123", start: { dateTime: start }, end: { dateTime: end } })
  }
  try {
    const result = await createCalendarEvent({ start, end, email: "person@example.com", name: "Example", summary: "Reunion", description: "" })
    assert.equal(result.id, "event123")
    assert.equal(requests.length, 4)
    assert.equal(requests[3].options.method, "POST")
  } finally {
    globalThis.fetch = originalFetch
  }
})

test("retrieves a pending conference after creating the event", async () => {
  const originalFetch = globalThis.fetch
  let eventLookups = 0
  globalThis.fetch = async (url, options = {}) => {
    if (url === "https://oauth2.googleapis.com/token") return Response.json({ access_token: "test-access" })
    if (url.endsWith("/freeBusy")) return Response.json({ calendars: { "calendar@example.com": { busy: [] } } })
    if (options.method === "POST") return Response.json({ id: "event123", start: { dateTime: start }, end: { dateTime: end }, conferenceData: { createRequest: { status: { statusCode: "pending" } } } })
    eventLookups++
    return Response.json({ id: "event123", start: { dateTime: start }, end: { dateTime: end }, hangoutLink: "https://meet.google.com/abc-defg-hij" })
  }
  try {
    const result = await createCalendarEvent({ start, end, email: "person@example.com", name: "Example", summary: "Reunion", description: "" })
    assert.equal(result.id, "event123")
    assert.equal(result.meet, "https://meet.google.com/abc-defg-hij")
    assert.equal(eventLookups, 1)
  } finally { globalThis.fetch = originalFetch }
})

test("keeps a confirmed event when the pending conference cannot be fetched", async () => {
  const originalFetch = globalThis.fetch
  globalThis.fetch = async (url, options = {}) => {
    if (url === "https://oauth2.googleapis.com/token") return Response.json({ access_token: "test-access" })
    if (url.endsWith("/freeBusy")) return Response.json({ calendars: { "calendar@example.com": { busy: [] } } })
    if (options.method === "POST") return Response.json({ id: "event123", conferenceData: { createRequest: { status: { statusCode: "pending" } } } })
    return new Response(null, { status: 503 })
  }
  try {
    const result = await createCalendarEvent({ start, end, email: "person@example.com", name: "Example", summary: "Reunion", description: "" })
    assert.equal(result.id, "event123")
    assert.equal(result.meet, undefined)
  } finally { globalThis.fetch = originalFetch }
})
