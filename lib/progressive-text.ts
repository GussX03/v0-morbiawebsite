type ProgressiveTextOptions = {
  onUpdate: (text: string) => void
  signal: AbortSignal
  now?: () => number
  schedule?: (callback: () => void, delay: number) => ReturnType<typeof setTimeout>
  cancelSchedule?: (timer: ReturnType<typeof setTimeout>) => void
}

// Network chunks can contain many text events; reveal only received text over time.
export function createProgressiveText({ onUpdate, signal, now = Date.now, schedule = setTimeout, cancelSchedule = clearTimeout }: ProgressiveTextOptions) {
  let target: string[] = []
  let visible = 0
  let timer: ReturnType<typeof setTimeout> | undefined
  let lastTick = now()
  let credit = 0
  let finishing = false
  let settled = false
  let resolveFinish: (() => void) | undefined
  let rejectFinish: ((reason: Error) => void) | undefined

  const dispose = () => {
    if (timer !== undefined) cancelSchedule(timer)
    timer = undefined
    signal.removeEventListener("abort", abort)
  }
  const abort = () => {
    if (settled) return
    settled = true
    dispose()
    rejectFinish?.(new DOMException("La respuesta fue interrumpida.", "AbortError"))
  }
  const tick = () => {
    timer = undefined
    if (settled) return
    const current = now()
    const elapsed = Math.max(0, Math.min(current - lastTick, 250))
    lastTick = current
    const remaining = target.length - visible
    const charactersPerSecond = finishing ? Math.max(200, remaining / 1.5) : 200
    credit += elapsed * charactersPerSecond / 1000
    const count = Math.min(remaining, Math.floor(credit))
    if (count > 0) {
      credit -= count
      visible += count
      onUpdate(target.slice(0, visible).join(""))
    }
    if (visible < target.length) timer = schedule(tick, 35)
    else if (finishing) {
      settled = true
      dispose()
      resolveFinish?.()
    }
  }

  signal.addEventListener("abort", abort, { once: true })
  if (signal.aborted) abort()

  return {
    update(text: string) {
      if (settled || signal.aborted) return
      const next = Array.from(text)
      const shown = target.slice(0, visible).join("")
      target = next
      if (!text.startsWith(shown)) {
        visible = Math.min(visible, target.length)
        onUpdate(target.slice(0, visible).join(""))
      }
      if (visible === 0 && target.length > 0) {
        visible = 1
        onUpdate(target[0])
      }
      if (visible < target.length && timer === undefined) {
        lastTick = now()
        timer = schedule(tick, 35)
      }
    },
    finish() {
      if (signal.aborted) return Promise.reject(new DOMException("La respuesta fue interrumpida.", "AbortError"))
      if (settled) return Promise.resolve()
      finishing = true
      if (visible >= target.length) {
        settled = true
        dispose()
        return Promise.resolve()
      }
      return new Promise<void>((resolve, reject) => { resolveFinish = resolve; rejectFinish = reject })
    },
    dispose,
  }
}
