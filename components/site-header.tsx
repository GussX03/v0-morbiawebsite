"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Menu, X } from "lucide-react"

const navigation = [
  ["Inicio", "inicio"], ["Nosotros", "nosotros"], ["Servicios", "servicios"],
  ["Tecnologías", "tecnologias"], ["NexaCV", "nexacv"], ["Clientes", "clientes"],
] as const

type SectionId = (typeof navigation)[number][1]

export default function SiteHeader({ home = false }: { home?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<SectionId>(home ? "inicio" : "servicios")
  const sentinel = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    setIsScrolled(window.scrollY > 18)
    const headerObserver = new IntersectionObserver(([entry]) => {
      setIsScrolled(!entry.isIntersecting)
    })
    if (sentinel.current) headerObserver.observe(sentinel.current)

    const sectionObserver = new IntersectionObserver((entries) => {
      const visibleSection = entries.find((entry) => entry.isIntersecting)
      if (visibleSection) setActiveSection(visibleSection.target.id as SectionId)
    }, { rootMargin: "-18% 0px -60% 0px", threshold: 0 })

    if (home) navigation.forEach(([, id]) => {
      const section = document.getElementById(id)
      if (section) sectionObserver.observe(section)
    })

    return () => {
      headerObserver.disconnect()
      sectionObserver.disconnect()
    }
  }, [home])

  const navigate = (id: string) => {
    window.gtag?.("event", "select_content", { content_type: "section_navigation", content_id: `section:${id}` })
    setIsMenuOpen(false)
    if (home) {
      document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" })
      window.history.replaceState(window.history.state, "", `#${id}`)
      if (navigation.some(([, sectionId]) => sectionId === id)) setActiveSection(id as SectionId)
    }
  }

  return (
    <>
      <span ref={sentinel} aria-hidden="true" className="pointer-events-none absolute left-0 top-[18px] h-px w-px" />
      <header data-gsap-header className={`site-header fixed inset-x-0 top-0 z-50 border-b transition-[background,box-shadow] duration-500 ${isScrolled ? "morbia-header-scrolled border-white/10 shadow-[0_12px_32px_rgba(2,29,61,.24)]" : "border-transparent bg-transparent"}`}>
        <div className={`mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 transition-[height] duration-500 lg:px-8 ${isScrolled ? "h-16" : "h-20"}`}>
          <Link href={home ? "#inicio" : "/#inicio"} onClick={(event) => { if (home) event.preventDefault(); navigate("inicio") }} aria-label="Ir al inicio de Morbia" className="shrink-0 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#65eee1]">
            <Image src="/images/main-logo.png" alt="Morbia" width={160} height={50} className="h-9 w-auto brightness-0 invert" priority />
          </Link>
          <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Navegación principal">
            {navigation.map(([label, id]) => (
              <Link key={id} href={home ? `#${id}` : `/#${id}`} onClick={(event) => { if (home) event.preventDefault(); navigate(id) }} aria-current={activeSection === id ? (home ? "location" : "page") : undefined} className={`relative whitespace-nowrap rounded py-2 text-sm font-medium transition after:absolute after:bottom-0 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-[#65eee1] after:transition-all after:duration-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#65eee1] ${activeSection === id ? "text-white after:w-5" : "text-white/75 after:scale-0"}`}>{label}</Link>
            ))}
          </nav>
          <Link href={home ? "#contacto" : "/#contacto"} onClick={(event) => { if (home) event.preventDefault(); navigate("contacto") }} className="service-button site-header-contact">Hablemos hoy <ArrowRight size={16} /></Link>
          <button onClick={() => setIsMenuOpen((open) => !open)} className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/25 text-white lg:hidden" aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={isMenuOpen} aria-controls="mobile-navigation">{isMenuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
        {isMenuOpen && (
          <nav id="mobile-navigation" className="mx-4 mb-4 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-2xl border border-white/15 bg-[#06375f]/95 p-4 shadow-2xl backdrop-blur lg:hidden" aria-label="Navegación móvil">
            {navigation.map(([label, id]) => <Link key={id} href={home ? `#${id}` : `/#${id}`} onClick={(event) => { if (home) event.preventDefault(); navigate(id) }} aria-current={activeSection === id ? "location" : undefined} className={`block rounded-xl px-4 py-3 text-sm font-semibold transition ${activeSection === id ? "bg-[#138ba3] text-white" : "text-white/85 hover:bg-white/10"}`}>{label}</Link>)}
            <Link href={home ? "#contacto" : "/#contacto"} onClick={(event) => { if (home) event.preventDefault(); navigate("contacto") }} className="service-button mt-3 w-full">Hablemos hoy <ArrowRight size={16} /></Link>
          </nav>
        )}
      </header>
    </>
  )
}
