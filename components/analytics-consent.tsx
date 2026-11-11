"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"

const measurementId = "G-XF3NM0ZLF8"
const preferenceKey = "morbia-analytics-consent-v1"
const openPreferencesEvent = "morbia:open-privacy-preferences"

type ConsentChoice = "accepted" | "rejected"

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    __morbiaAnalyticsConsent?: ConsentChoice | "unset"
    __morbiaAnalyticsInitialized?: boolean
  }
}

function savedChoice(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(preferenceKey)
    return value === "accepted" || value === "rejected" ? value : null
  } catch {
    return null
  }
}

function persistChoice(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(preferenceKey, choice)
  } catch {
    // Analytics stays disabled if the browser cannot store a consent choice.
  }
}

function applyChoice(choice: ConsentChoice) {
  window.__morbiaAnalyticsConsent = choice

  if (choice === "rejected") {
    window.gtag?.("consent", "update", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    })
    return
  }

  if (window.__morbiaAnalyticsInitialized) {
    window.gtag?.("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    })
    return
  }

  window.dataLayer = window.dataLayer || []
  window.gtag = (...args: unknown[]) => window.dataLayer?.push(args)
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  })
  window.gtag("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  })
  window.gtag("js", new Date())
  window.gtag("config", measurementId, { send_page_view: false })
  window.__morbiaAnalyticsInitialized = true

  const script = document.createElement("script")
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  script.dataset.morbiaAnalytics = "true"
  document.head.appendChild(script)
}

function serviceFromPath(path: string) {
  const serviceMatch = path.match(/^\/servicios\/([^/]+)/)
  if (serviceMatch) return serviceMatch[1]
  if (path === "/servicios-tecnologicos-puebla-tlaxcala") return "catalogo"
  return "inicio"
}

export function AnalyticsConsentManager() {
  const pathname = usePathname()
  const [choice, setChoice] = useState<ConsentChoice | null>(null)
  const [hydrated, setHydrated] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const lastPageView = useRef("")

  useEffect(() => {
    const saved = savedChoice()
    setChoice(saved)
    setShowPreferences(saved === null)
    setHydrated(true)

    const openPreferences = () => setShowPreferences(true)
    window.addEventListener(openPreferencesEvent, openPreferences)
    return () => window.removeEventListener(openPreferencesEvent, openPreferences)
  }, [])

  useEffect(() => {
    if (!hydrated || !choice) return
    applyChoice(choice)
  }, [choice, hydrated])

  useEffect(() => {
    if (!hydrated) return
    if (choice !== "accepted" || !window.gtag) {
      lastPageView.current = ""
      return
    }
    const pageKey = pathname
    if (lastPageView.current === pageKey) return

    const pageLocation = new URL(window.location.href)
    pageLocation.hash = ""
    const campaignParams = new URLSearchParams()
    for (const name of ["utm_source", "utm_medium", "utm_campaign", "utm_content"]) {
      const value = pageLocation.searchParams.get(name)?.slice(0, 120)
      if (value) campaignParams.set(name, value)
    }
    pageLocation.search = campaignParams.toString()
    window.gtag("event", "page_view", {
      page_location: pageLocation.href,
      page_title: document.title,
    })
    lastPageView.current = pageKey
  }, [choice, hydrated, pathname])

  useEffect(() => {
    if (choice !== "accepted" || !window.gtag) return
    const onContactClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const link = target.closest<HTMLAnchorElement>("a[href]")
      if (!link) return

      const href = link.getAttribute("href") || ""
      const method = href.startsWith("https://wa.me/") || href.startsWith("whatsapp:")
        ? "whatsapp"
        : href.startsWith("tel:")
          ? "phone"
          : href.startsWith("mailto:")
            ? "email"
            : null

      if (!method) return
      window.gtag?.("event", "contact_click", {
        contact_method: method,
        service_slug: serviceFromPath(window.location.pathname),
      })
    }

    document.addEventListener("click", onContactClick, true)
    return () => document.removeEventListener("click", onContactClick, true)
  }, [choice])

  const choose = (nextChoice: ConsentChoice) => {
    const revokingAcceptedChoice = nextChoice === "rejected" && window.__morbiaAnalyticsConsent === "accepted"
    persistChoice(nextChoice)
    setChoice(nextChoice)
    setShowPreferences(false)
    if (revokingAcceptedChoice) window.setTimeout(() => window.location.reload(), 80)
  }

  if (!hydrated || !showPreferences) return null

  return (
    <section
      aria-label="Preferencias de privacidad"
      className="fixed bottom-24 left-4 z-[120] w-[min(42rem,calc(100vw-2rem))] rounded-2xl border border-[#62e7df]/35 bg-[#052f53]/[.98] p-3 text-[#eef8fa] shadow-[0_20px_65px_rgba(0,20,45,.42)] md:bottom-4 md:p-4"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0 md:max-w-[28rem]">
          <p className="text-sm font-bold text-white">Privacidad de Morbia</p>
          <p className="mt-1 text-xs leading-5 text-[#d7e8ed]">
            Si aceptas, Analytics medirá visitas y clics de contacto; la medición publicitaria sigue desactivada.{" "}
            <a href="/aviso-de-privacidad" className="font-semibold text-[#72eee3] underline-offset-4 hover:underline">Aviso de privacidad</a>
          </p>
        </div>
        <div className="flex flex-wrap justify-end gap-2">
        {choice && (
          <button
            type="button"
            onClick={() => setShowPreferences(false)}
            className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-[#eef8fa] transition hover:bg-white/10"
          >
            Mantener mi elección
          </button>
        )}
        <button
          type="button"
          onClick={() => choose("rejected")}
          className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-[#eef8fa] transition hover:bg-white/10"
        >
          Solo necesarias
        </button>
        <button
          type="button"
          onClick={() => choose("accepted")}
          className="rounded-full bg-[#d8f2ef] px-4 py-2 text-sm font-bold text-[#063b5d] transition hover:bg-white"
        >
          Aceptar medición
        </button>
      </div>
      </div>
    </section>
  )
}

export function PrivacyPreferencesButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(openPreferencesEvent))}
      className={className}
    >
      Preferencias de cookies
    </button>
  )
}
