import assert from "node:assert/strict"
import { test } from "node:test"
import { createProgressiveText } from "../lib/progressive-text.ts"

function setup() {
  let clock = 0
  let nextId = 0
  const timers = new Map()
  const updates = []
  const controller = new AbortController()
  const progress = createProgressiveText({
    signal: controller.signal,
    onUpdate: (text) => updates.push(text),
    now: () => clock,
    schedule: (callback, delay) => { const id = ++nextId; timers.set(id, { at: clock + delay, callback }); return id },
    cancelSchedule: (id) => timers.delete(id),
  })
  const advance = (ms) => {
    const end = clock + ms
    while (true) {
      const next = [...timers.entries()].sort((a, b) => a[1].at - b[1].at)[0]
      if (!next || next[1].at > end) break
      timers.delete(next[0])
      clock = next[1].at
      next[1].callback()
    }
    clock = end
  }
  return { progress, updates, controller, advance, timers }
}

test("reveals buffered events progressively before the stream ends", () => {
  const { progress, updates, advance } = setup()
  progress.update("Hola")
  progress.update("Hola, ¿cómo estás?")
  assert.deepEqual(updates, ["H"])
  advance(35)
  assert.ok(updates.at(-1).length > 1)
  assert.ok(updates.at(-1).length < "Hola, ¿cómo estás?".length)
  advance(500)
  assert.equal(updates.at(-1), "Hola, ¿cómo estás?")
  progress.dispose()
})

test("waits for the final text to be displayed before finishing", async () => {
  const { progress, updates, advance } = setup()
  const text = "Respuesta recibida para un visitante de Morbia."
  progress.update(text)
  let finished = false
  const done = progress.finish().then(() => { finished = true })
  await Promise.resolve()
  assert.equal(finished, false)
  advance(500)
  await done
  assert.equal(updates.at(-1), text)
  assert.equal(finished, true)
})

test("stops updates and rejects a pending finish on reset", async () => {
  const { progress, updates, controller, advance, timers } = setup()
  progress.update("Una respuesta que todavía no termina")
  const done = progress.finish()
  controller.abort()
  await assert.rejects(done, { name: "AbortError" })
  const count = updates.length
  advance(1000)
  assert.equal(updates.length, count)
  assert.equal(timers.size, 0)
})

test("reconciles corrected text and preserves full unicode characters", async () => {
  const { progress, updates, advance } = setup()
  progress.update("🙂 Hola")
  assert.equal(updates[0], "🙂")
  advance(35)
  progress.update("¡Hola! 👋")
  const done = progress.finish()
  advance(500)
  await done
  assert.equal(updates.at(-1), "¡Hola! 👋")
})
