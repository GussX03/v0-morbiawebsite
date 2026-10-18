"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react"
import { servicePages } from "@/lib/seo-content"
import { serviceIcons } from "@/components/service-icons"

const navigation = [
  ["Inicio", "inicio"], ["Nosotros", "nosotros"], ["Servicios", "servicios"],
  ["NexaCV", "nexacv"], ["Clientes", "clientes"],
] as const

type SectionId = (typeof navigation)[number][1]

const serviceLabels = {
  "paginas-web": "Páginas web",
  chatbots: "Chatbots con IA",
  "automatizacion-de-procesos": "Automatización de procesos",
  rpa: "RPA",
  "inteligencia-artificial": "Inteligencia artificial",
  "analisis-de-datos": "Análisis de datos",
} as const

export default function SiteHeader({ home = false }: { home?: boolean }) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [desktopMenu, setDesktopMenu] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<SectionId>(home ? "inicio" : "servicios")
  const sentinel = useRef<HTMLSpanElement>(null)
  const mobileMenuButton = useRef<HTMLButtonElement>(null)
  const menuExpanded = desktopMenu === "servicios" || isMenuOpen

  useEffect(() => {
    const breakpoint = window.matchMedia("(min-width: 1024px)")
    const closeMenus = () => {
      setIsMenuOpen(false)
      setDesktopMenu("")
    }
    breakpoint.addEventListener("change", closeMenus)
    return () => breakpoint.removeEventListener("change", closeMenus)
  }, [])

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
    setDesktopMenu("")
    if (home) {
      document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" })
      window.history.replaceState(window.history.state, "", `#${id}`)
      if (navigation.some(([, sectionId]) => sectionId === id)) setActiveSection(id as SectionId)
    }
  }

  const navigateService = (slug: string) => {
    window.gtag?.("event", "select_content", { content_type: "service_navigation", content_id: `service:${slug}` })
    setIsMenuOpen(false)
    setDesktopMenu("")
  }

  const navLinkClass = (id: SectionId) => `relative whitespace-nowrap rounded py-2 text-sm font-medium transition after:absolute after:bottom-0 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-[#65eee1] after:transition-all after:duration-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#65eee1] ${activeSection === id ? "text-white after:w-5" : "text-white/75 after:scale-0"}`

  return (
    <>
      <span ref={sentinel} aria-hidden="true" className="pointer-events-none absolute left-0 top-[18px] h-px w-px" />
      <header data-gsap-header className={`site-header fixed inset-x-0 top-0 z-50 border-b transition-[background,box-shadow] duration-300 ${isScrolled || menuExpanded ? "morbia-header-scrolled border-white/10 shadow-[0_12px_32px_rgba(2,29,61,.16)]" : "border-transparent bg-transparent"} ${menuExpanded ? "morbia-header-expanded" : ""}`}>
        <NavigationMenu.Root asChild aria-label={undefined} value={desktopMenu} onValueChange={setDesktopMenu} delayDuration={120}>
          <div>
        <div className={`mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 transition-[height] duration-500 lg:px-8 ${isScrolled ? "h-16" : "h-20"}`}>
          <Link href={home ? "#inicio" : "/#inicio"} onClick={(event) => { if (home) event.preventDefault(); navigate("inicio") }} aria-label="Ir al inicio de Morbia" className="shrink-0 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#65eee1]">
            <Image src="/images/main-logo.png" alt="Morbia" width={160} height={50} className="h-9 w-auto brightness-0 invert" priority />
          </Link>
          <nav className="hidden lg:block" aria-label="Navegación principal">
            <NavigationMenu.List className="flex items-center gap-4 xl:gap-8">
              {navigation.map(([label, id]) => (
                <NavigationMenu.Item key={id} value={id} className="relative">
                  {id === "servicios" ? (
                    <>
                      <NavigationMenu.Trigger className={`${navLinkClass(id)} group inline-flex items-center gap-1.5`}>
                        {label}<ChevronDown size={14} aria-hidden="true" className="transition-transform duration-200 group-data-[state=open]:rotate-180 motion-reduce:transition-none" />
                      </NavigationMenu.Trigger>
                      <NavigationMenu.Content className="site-services-dropdown">
                        <div className="mx-auto max-w-7xl px-8 pb-5 pt-3">
                          <ul className="grid grid-cols-3 gap-x-12 gap-y-1" aria-label="Servicios de Morbia">
                            {servicePages.map((service) => {
                              const Icon = serviceIcons[service.slug]
                              const href = `/servicios/${service.slug}`
                              return (
                                <li key={service.slug}>
                                  <NavigationMenu.Link asChild active={pathname === href}>
                                    <Link href={href} onClick={() => navigateService(service.slug)} aria-current={pathname === href ? "page" : undefined} className="site-service-link group flex min-h-12 items-center gap-3 rounded py-3 text-sm leading-5 text-[#d8e9ee] transition-colors hover:text-[#74e5df] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#65eee1] data-[active]:text-[#74e5df]">
                                      <Icon size={18} strokeWidth={1.6} aria-hidden="true" className="shrink-0 text-[#74e5df]/80" /><span>{serviceLabels[service.slug]}</span>
                                    </Link>
                                  </NavigationMenu.Link>
                                </li>
                              )
                            })}
                          </ul>
                          <div className="mt-2 flex justify-end">
                            <NavigationMenu.Link asChild>
                              <Link href="/servicios-tecnologicos-puebla-tlaxcala" onClick={() => navigateService("todos")} className="inline-flex min-h-11 items-center gap-2 rounded text-xs font-medium text-[#c6e0e7] transition-colors hover:text-[#74e5df] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#65eee1]">Ver todos los servicios <ArrowRight size={14} aria-hidden="true" /></Link>
                            </NavigationMenu.Link>
                          </div>
                        </div>
                      </NavigationMenu.Content>
                    </>
                  ) : (
                    <NavigationMenu.Link asChild>
                      <Link href={home ? `#${id}` : `/#${id}`} onClick={(event) => { if (home) event.preventDefault(); navigate(id) }} aria-current={activeSection === id ? (home ? "location" : "page") : undefined} className={navLinkClass(id)}>{label}</Link>
                    </NavigationMenu.Link>
                  )}
                </NavigationMenu.Item>
              ))}
            </NavigationMenu.List>
          </nav>
          <Link href={home ? "#contacto" : "/#contacto"} onClick={(event) => { if (home) event.preventDefault(); navigate("contacto") }} className="service-button site-header-contact">Hablemos hoy <ArrowRight size={16} /></Link>
          <button ref={mobileMenuButton} type="button" onClick={() => setIsMenuOpen((open) => !open)} className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/25 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#65eee1] lg:hidden" aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={isMenuOpen} aria-controls="mobile-navigation">{isMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}</button>
        </div>
            <NavigationMenu.Viewport className="site-services-viewport hidden border-t border-white/10 lg:block" />
          </div>
        </NavigationMenu.Root>
        {isMenuOpen && (
          <nav id="mobile-navigation" onKeyDown={(event) => { if (event.key === "Escape") { setIsMenuOpen(false); mobileMenuButton.current?.focus() } }} className="max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain border-t border-white/10 px-5 pb-6 pt-3 lg:hidden" aria-label="Navegación móvil">
            <ul>
              {navigation.map(([label, id]) => (
                <li key={id}>
                  <Link href={home ? `#${id}` : `/#${id}`} onClick={(event) => { if (home) event.preventDefault(); navigate(id) }} aria-current={activeSection === id ? "location" : undefined} className={`block rounded py-3 text-sm font-medium transition-colors hover:text-[#74e5df] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#65eee1] ${activeSection === id ? "text-[#74e5df]" : "text-white/85"}`}>{label}</Link>
                  {id === "servicios" && (
                    <ul aria-label="Servicios de Morbia" className="mb-3 ml-0.5 border-l border-[#74e5df]/20 pl-4">
                      {servicePages.map((service) => {
                        const Icon = serviceIcons[service.slug]
                        const href = `/servicios/${service.slug}`
                        return <li key={service.slug}><Link href={href} onClick={() => navigateService(service.slug)} aria-current={pathname === href ? "page" : undefined} className={`flex min-h-11 items-center gap-3 rounded py-2.5 text-[13px] leading-5 transition-colors hover:text-[#74e5df] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#65eee1] ${pathname === href ? "text-[#74e5df]" : "text-[#d7edf2]"}`}><Icon size={16} strokeWidth={1.6} aria-hidden="true" className="shrink-0 text-[#74e5df]/80" /><span>{serviceLabels[service.slug]}</span></Link></li>
                      })}
                      <li><Link href="/servicios-tecnologicos-puebla-tlaxcala" onClick={() => navigateService("todos")} className="flex min-h-11 items-center gap-2 rounded py-2.5 text-xs font-medium text-[#b8dbe3] hover:text-[#74e5df] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#65eee1]">Ver todos los servicios <ArrowRight size={14} aria-hidden="true" /></Link></li>
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <Link href={home ? "#contacto" : "/#contacto"} onClick={(event) => { if (home) event.preventDefault(); navigate("contacto") }} className="service-button mt-3 w-full">Hablemos hoy <ArrowRight size={16} /></Link>
          </nav>
        )}
      </header>
    </>
  )
}
