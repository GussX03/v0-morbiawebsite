"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import {
  ArrowRight, BarChart3, Bot, BrainCircuit, ChevronRight, Code2, Download,
  FileText, Globe2, Handshake, Mail, MapPin, Menu, MessageCircleMore, Orbit, Phone,
  ScanSearch, Settings2, Sparkles, UsersRound, Workflow, X, Zap,
} from "lucide-react"
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok, FaWhatsapp } from "react-icons/fa6"
import { SiNextdotjs, SiPython, SiReact, SiStripe } from "react-icons/si"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import FloatingChat from "@/components/floating-chat"
import MorbiaReviewsExplorer from "@/components/morbia-reviews-explorer"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const navItems = [
  ["Inicio", "inicio"], ["Nosotros", "nosotros"], ["Servicios", "servicios"],
  ["Tecnologías", "tecnologias"], ["NexaCV", "nexacv"], ["Clientes", "clientes"],
] as const

const services = [
  { icon: Code2, title: "Aplicaciones web", detail: "Una plataforma que se siente hecha para tu negocio: clara para tu equipo, útil para tus clientes y preparada para crecer sin volver a empezar.", result: "Tu operación, en un solo lugar.", className: "lg:col-span-5" },
  { icon: MessageCircleMore, title: "Chatbots", detail: "Convierte cada mensaje en una oportunidad. Tu negocio responde, orienta y acompaña a tus clientes incluso cuando tu equipo está ocupado.", result: "Atención que nunca deja esperando.", className: "lg:col-span-3" },
  { icon: Zap, title: "Automatizaciones", detail: "Conecta tareas que hoy consumen horas y deja que los procesos avancen solos. Diseñamos flujos para recuperar hasta un 80% del tiempo invertido en tareas repetitivas.", result: "Menos tareas. Más capacidad para crecer.", className: "lg:col-span-4" },
  { icon: Bot, title: "RPA", detail: "Haz que las tareas manuales y repetitivas sucedan con precisión, todos los días. Tu equipo puede enfocarse en clientes, estrategia y decisiones que sí mueven el negocio.", result: "Tu equipo vuelve a lo importante.", className: "lg:col-span-4" },
  { icon: BrainCircuit, title: "Inteligencia artificial", detail: "Lleva respuestas, recomendaciones e ideas accionables al momento exacto. La inteligencia artificial deja de ser promesa y se convierte en una ventaja para decidir mejor.", result: "Decisiones más claras, cada día.", className: "lg:col-span-5" },
  { icon: BarChart3, title: "Análisis de datos", detail: "Transformamos información dispersa en una lectura clara de lo que está funcionando, dónde está la oportunidad y qué decisión vale la pena tomar después.", result: "Ve con claridad hacia dónde crecer.", className: "lg:col-span-3" },
] as const

function OpenAILogo({ className }: { className?: string }) {
  return <Image src="/images/openai.svg" alt="" width={48} height={48} className={className} />
}

const technologyIcons = [
  ["React", SiReact], ["Next.js", SiNextdotjs], ["OpenAI", OpenAILogo],
  ["Stripe", SiStripe], ["Power Automate", Workflow], ["Python", SiPython],
] as const

const clientLogos = [
  { src: "/images/sosadelbosque.png", alt: "Sosa del Bosque", href: "https://grupo.sosadelbosque.mx/", logoClass: "scale-100" },
  { src: "/images/grupo_morales_consultores.png", alt: "Grupo Morales Consultores", href: "https://grupo-morales-consultores.vercel.app/", logoClass: "scale-100" },
  { src: "/images/sorteosramos369.png", alt: "Sorteos Ramos Tlaxcala", href: "https://www.sorteosramostlaxcala.vercel.app/", logoClass: "scale-100" },
  { src: "/images/amanda.png", alt: "Amanda", href: "https://v0-amanda-oficial.vercel.app/", logoClass: "scale-100" },
  { src: "/images/finzen.png", alt: "FinZen", href: "https://finzen.morbia.com.mx/", logoClass: "scale-100" },
]

const clientCarouselLogos = [...clientLogos, ...clientLogos]

const socials = [
  ["Facebook", "https://www.facebook.com/share/1JCLHGkqxF/?mibextid=wwXIfr", FaFacebookF],
  ["Instagram", "https://www.instagram.com/morbia_mx?igsh=YTlva3FpMzIxeDNk", FaInstagram],
  ["TikTok", "https://www.tiktok.com/@morbiamx", FaTiktok],
  ["WhatsApp", "https://wa.me/522215268440", FaWhatsapp],
  ["LinkedIn", "http://linkedin.com/company/morbia/", FaLinkedinIn],
] as const

export default function MorbiaWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<(typeof navItems)[number][1]>("inicio")
  const pageRef = useRef<HTMLElement>(null)
  const activeSectionRef = useRef<(typeof navItems)[number][1]>("inicio")
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const select = gsap.utils.selector(pageRef)
    const hero = pageRef.current?.querySelector<HTMLElement>("[data-hero]")
    const technologiesSection = pageRef.current?.querySelector<HTMLElement>("#tecnologias")

    gsap.from(select("[data-gsap-header]"), { autoAlpha: 0, y: -22, duration: 0.72, ease: "power3.out" })
    gsap.from(select("[data-hero-copy] > *"), { autoAlpha: 0, y: 28, duration: 0.76, stagger: 0.1, delay: 0.1, ease: "power3.out" })
    gsap.from(select("[data-hero-visual]"), {
      autoAlpha: 0,
      x: window.matchMedia("(min-width: 1024px)").matches ? 34 : 0,
      y: window.matchMedia("(min-width: 1024px)").matches ? 0 : 20,
      scale: 0.94,
      duration: 0.9,
      delay: 0.18,
      ease: "power3.out",
    })
    gsap.to(select("[data-orbit-ring-a]"), { rotation: 360, duration: 22, repeat: -1, ease: "none" })
    gsap.to(select("[data-orbit-ring-b]"), { rotation: -360, duration: 30, repeat: -1, ease: "none" })
    gsap.to(select("[data-orbit-node]"), { scale: 1.16, duration: 1.45, yoyo: true, repeat: -1, stagger: 0.24, ease: "sine.inOut" })
    gsap.to(select("[data-orbit-icon]"), { rotation: 360, duration: 16, repeat: -1, ease: "none" })

    const reveal = select("[data-gsap-reveal]")
    ScrollTrigger.batch(reveal, {
      start: "top 84%",
      onEnter: (elements) => gsap.from(elements, { y: 18, duration: 0.55, stagger: 0.08, ease: "power2.out", overwrite: true }),
    })
    gsap.set(select("[data-client-logo]"), { autoAlpha: 1 })
    ScrollTrigger.batch(select("[data-client-logo]"), {
      start: "top 86%",
      onEnter: (elements) => gsap.from(elements, { y: 18, scale: 0.94, duration: 0.55, stagger: 0.08, ease: "power3.out", overwrite: true }),
    })

    const media = gsap.matchMedia()
    media.add("(min-width: 1024px)", () => {
      if (hero) gsap.to(select("[data-hero-orbit]"), { x: 82, y: -44, scale: 1.12, rotation: 46, ease: "none", scrollTrigger: { trigger: hero, start: "top 94%", end: "bottom 16%", scrub: 0.7 } })
      if (technologiesSection) gsap.to(select("[data-tech-logo]"), { y: -8, duration: 1.8, stagger: 0.12, yoyo: true, repeat: -1, ease: "sine.inOut", scrollTrigger: { trigger: technologiesSection, start: "top 78%", once: true } })
    })

    return () => media.revert()
  }, { scope: pageRef })

  useEffect(() => {
    const sections = navItems.map(([, id]) => document.getElementById(id)).filter((section): section is HTMLElement => Boolean(section))
    const updateHeader = () => {
      setIsScrolled(window.scrollY > 18)
      if (!sections.length) return
      const referencePoint = window.innerHeight * 0.38
      const closestSection = sections.reduce((closest, section) => Math.abs(section.getBoundingClientRect().top - referencePoint) < Math.abs(closest.getBoundingClientRect().top - referencePoint) ? section : closest, sections[0]!)
      const nextSection = closestSection?.id as (typeof navItems)[number][1] | undefined
      if (nextSection && activeSectionRef.current !== nextSection) {
        activeSectionRef.current = nextSection
        setActiveSection(nextSection)
      }
    }

    updateHeader()
    window.addEventListener("scroll", updateHeader, { passive: true })
    return () => window.removeEventListener("scroll", updateHeader)
  }, [])

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
    activeSectionRef.current = id as (typeof navItems)[number][1]
    setActiveSection(id as (typeof navItems)[number][1])
    setIsMenuOpen(false)
  }

  return (
    <main ref={pageRef} className="overflow-x-clip bg-[#f4fbff] text-[#062b52]">
      <header data-gsap-header className={"fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 " + (isScrolled ? "morbia-header-scrolled border-white/10 shadow-[0_12px_32px_rgba(2,29,61,.24)] backdrop-blur-xl" : "border-transparent bg-transparent")}>
        <div className={"mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 lg:px-8 " + (isScrolled ? "h-16" : "h-20")}>
          <button onClick={() => goTo("inicio")} aria-label="Ir al inicio de Morbia" className="shrink-0">
            <Image src="/images/main-logo.png" alt="Morbia" width={160} height={50} className="h-9 w-auto brightness-0 invert" priority />
          </button>
          <nav className="hidden items-center gap-6 xl:gap-8 lg:flex" aria-label="Navegación principal">
            {navItems.map(([label, id]) => <button key={id} onClick={() => goTo(id)} aria-current={activeSection === id ? "page" : undefined} className={"relative py-2 text-sm font-medium transition after:absolute after:bottom-0 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-[#65eee1] after:transition-all after:duration-300 hover:text-white " + (activeSection === id ? "text-white after:w-5" : "text-white/75 after:scale-0")}>{label}</button>)}
          </nav>
          <button onClick={() => goTo("contacto")} className="hidden items-center gap-2 rounded-full bg-[#138ba3] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#0d708d]/25 transition hover:-translate-y-0.5 hover:bg-[#075b82] lg:flex">Hablemos hoy <ArrowRight size={16} /></button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="rounded-xl border border-white/25 p-2 text-white lg:hidden" aria-label="Abrir menú">{isMenuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
        {isMenuOpen && <nav className="mx-4 rounded-2xl border border-white/15 bg-[#06375f]/95 p-4 shadow-2xl backdrop-blur lg:hidden" aria-label="Navegación móvil">
          {navItems.map(([label, id]) => <button key={id} onClick={() => goTo(id)} className={"block w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition " + (activeSection === id ? "bg-[#138ba3] text-white" : "text-white hover:bg-white/10")}>{label}</button>)}
          <button onClick={() => goTo("contacto")} className="mt-2 w-full rounded-xl bg-[#138ba3] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#075b82]">Hablemos hoy</button>
        </nav>}
      </header>

      <section id="inicio" data-hero className="morbia-diagonal relative isolate min-h-[760px] scroll-mt-20 overflow-hidden pt-28 text-white">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,29,61,.92),rgba(3,49,78,.64),rgba(3,76,104,.42))]" />
        <div className="morbia-grid absolute inset-0 opacity-30" />
        <div className="relative mx-auto grid min-h-[632px] max-w-7xl items-center gap-12 px-5 pb-16 pt-10 lg:grid-cols-[1.02fr_.98fr] lg:px-8">
          <div data-hero-copy className="max-w-2xl">
            <p className="mb-5 text-sm font-bold tracking-[.17em] text-[#52f3e7]">TECNOLOGÍA QUE IMPULSA PERSONAS</p>
            <h1 className="max-w-xl text-5xl font-black leading-[.96] tracking-[-.055em] sm:text-6xl lg:text-7xl">Inteligencia orbitando <span className="text-[#27e3d5]">tus procesos.</span></h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/80">Convertimos ideas en soluciones tecnológicas que hacen más simple, inteligente y eficiente el presente de tu negocio.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => goTo("servicios")} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#138ba3] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#0d708d]/25 transition hover:-translate-y-0.5 hover:bg-[#075b82]">Explorar soluciones <ArrowRight size={17} /></button>
              <button onClick={() => goTo("nexacv")} className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d7eeee] bg-white/10 px-6 py-4 text-sm font-bold text-[#e8fffb] transition hover:-translate-y-0.5 hover:bg-[#0a668b] hover:text-white">Conoce NexaCV <ChevronRight size={17} /></button>
            </div>
          </div>
          <div data-hero-visual data-hero-orbit aria-hidden="true" className="relative mx-auto -mt-2 flex min-h-[350px] w-full max-w-[25rem] self-center justify-self-center items-center justify-center sm:mt-0 sm:min-h-[470px] sm:max-w-xl">
            <div className="absolute h-[14rem] w-[14rem] rounded-full bg-[#18d8d0]/15 blur-3xl sm:h-[20rem] sm:w-[20rem]" />
            <div data-orbit-ring-a className="absolute h-[17rem] w-[17rem] rounded-full border border-[#51f4e8]/35 sm:h-[25rem] sm:w-[25rem]"><span data-orbit-node className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[#69fff0] shadow-[0_0_28px_#69fff0]" /></div>
            <div data-orbit-ring-b className="absolute h-[12rem] w-[24rem] rotate-[-32deg] rounded-[50%] border border-[#7efbf2]/40 sm:h-[16rem] sm:w-[32rem]"><span data-orbit-node className="absolute left-8 top-4 h-3 w-3 rounded-full bg-[#40e4db] shadow-[0_0_22px_#40e4db]" /></div>
            <div className="relative grid h-48 w-48 place-items-center rounded-full border border-white/20 bg-[#053d69]/55 shadow-[0_0_80px_rgba(29,224,208,.28)] backdrop-blur-sm sm:h-64 sm:w-64">
              <Globe2 className="absolute text-[#20d8d1]/25" size={180} strokeWidth={0.7} />
              <Orbit data-orbit-icon className="relative text-[#65f7eb]" size={142} strokeWidth={1.15} />
            </div>
            <span className="absolute bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/20 bg-[#063d66]/70 px-4 py-2 text-xs font-bold tracking-[.16em] text-[#79fff1] backdrop-blur sm:bottom-4">MORBIA EN ÓRBITA</span>
          </div>
        </div>
      </section>

      <section id="nosotros" className="scroll-mt-20 bg-white py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
          <div data-gsap-reveal><p className="text-sm font-bold tracking-[.14em] text-[#008eaa]">ACERCA DE NOSOTROS</p><h2 className="mt-4 max-w-md text-4xl font-black leading-[.98] tracking-[-.045em] sm:text-5xl">Todo en órbita, <span className="text-[#00aeb7]">nada al azar.</span></h2><p className="mt-6 max-w-md text-lg leading-relaxed text-[#496579]">En Morbia creemos en un futuro donde la tecnología impulse el potencial de las personas. Diseñamos soluciones a la medida con estrategia, innovación y cercanía.</p><blockquote className="mt-9 max-w-sm border-l-4 border-[#11c8c5] pl-5 text-xl font-semibold leading-snug text-[#0a4771]">La tecnología es más poderosa cuando impulsa personas.</blockquote></div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[[UsersRound, "Enfoque en personas", "La tecnología tiene más sentido cuando mejora la vida de las personas."], [Settings2, "Soluciones a medida", "Cada negocio es único; por eso creamos soluciones que se adaptan a ti."], [BarChart3, "Resultados reales", "Nos enfocamos en generar valor medible y sostenible."], [Handshake, "Alianzas a largo plazo", "Construimos relaciones duraderas basadas en confianza y crecimiento."]].map(([Icon, title, text]) => { const FeatureIcon = Icon as typeof UsersRound; return <article data-gsap-reveal key={title as string} className="rounded-3xl border border-[#dceff4] bg-[#f4fbff] p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#007b9a]/10"><FeatureIcon className="text-[#009ab1]" size={30} /><h3 className="mt-5 text-lg font-bold">{title as string}</h3><p className="mt-2 leading-relaxed text-[#527082]">{text as string}</p></article> })}
          </div>
        </div>
      </section>

      <section id="servicios" className="morbia-diagonal relative scroll-mt-20 overflow-hidden py-20 text-white lg:py-28">
        <div className="absolute inset-0 bg-[#06345c]/82" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div data-gsap-reveal className="max-w-3xl">
            <p className="text-sm font-bold tracking-[.14em] text-[#52f3e7]">NUESTROS SERVICIOS</p>
            <h2 className="mt-4 text-4xl font-black leading-[.98] tracking-[-.045em] sm:text-5xl">Soluciones tecnológicas para un mundo en evolución.</h2>
            <p className="mt-5 text-lg leading-relaxed text-white/75">Explora cada solución y descubre el cambio concreto que puede generar en tu operación.</p>
          </div>
          <div data-services-track className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon
              return <article data-service-card key={service.title} className="group relative h-[370px] overflow-hidden rounded-3xl border border-[#79eee3]/20 bg-[linear-gradient(145deg,rgba(7,73,111,.9),rgba(4,53,92,.78))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,.1)] backdrop-blur-sm transition-colors duration-300 hover:border-[#72e8df]/60 hover:bg-[linear-gradient(145deg,rgba(8,89,125,.94),rgba(4,58,94,.86))] focus-within:border-[#72e8df]/60 sm:h-[340px]">
                <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-[#1ae0d1]/10 blur-3xl" />
                <div className="absolute inset-x-6 bottom-6">
                  <div className="flex items-center gap-3">
                    <Icon className="shrink-0 text-[#57f2e5]" size={31} />
                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                  </div>
                  <div data-service-detail className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-500 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100">
                    <div className="overflow-hidden">
                      <p className="mt-4 leading-relaxed text-white/80">{service.detail}</p>
                      <p className="mt-4 border-l-2 border-[#65eee1] pl-3 text-sm font-bold text-[#d9faf6]">{service.result}</p>
                      <button onClick={() => goTo("contacto")} className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[#64f8ec]">Hablemos de tu solución <ArrowRight size={15} /></button>
                    </div>
                  </div>
                </div>
              </article>
            })}
          </div>
        </div>
      </section>

      <section id="tecnologias" className="scroll-mt-20 bg-[#eaf9fc] py-20 lg:py-28"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div data-gsap-reveal className="max-w-2xl"><p className="text-sm font-bold tracking-[.14em] text-[#008eaa]">TECNOLOGÍAS</p><h2 className="mt-4 text-4xl font-black leading-[.98] tracking-[-.045em] sm:text-5xl">Tecnología que hace posible el mañana.</h2></div><div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{technologyIcons.map(([name, Icon]) => <div data-gsap-reveal data-tech-logo key={name} className="flex min-h-36 flex-col items-center justify-center rounded-3xl bg-white p-5 text-[#07517d] shadow-sm ring-1 ring-[#d8eef3] transition hover:-translate-y-1 hover:shadow-lg"><Icon className="h-10 w-10" /><span className="mt-4 text-sm font-bold text-[#164967]">{name}</span></div>)}</div></div></section>

      <section id="nexacv" className="scroll-mt-20 overflow-hidden bg-white py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-[.92fr_1.08fr] lg:px-8">
          <div data-gsap-reveal className="relative order-2 overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#063a69,#007f9e_55%,#09c8bd)] p-4 shadow-2xl shadow-[#057893]/20 lg:order-1">
            <div className="absolute inset-0 rounded-[2rem] opacity-60 [background-image:linear-gradient(135deg,transparent_0%,transparent_47%,rgba(255,255,255,.16)_48%,transparent_50%)]" />
            <div className="relative grid min-h-[25rem] place-items-center rounded-[1.5rem] border border-white/15 bg-[radial-gradient(circle_at_50%_34%,#0c91ac_0%,#06416b_49%,#032e55_100%)] p-6 sm:min-h-[31rem] sm:p-10">
              <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(135deg,transparent_0%,transparent_47%,rgba(91,244,230,.22)_48%,transparent_50%)]" />
              <Image src="/images/nexacv-logo.png" alt="NexaCV by Morbia" width={1254} height={1254} className="relative h-auto w-full max-w-md drop-shadow-[0_18px_28px_rgba(0,0,0,.35)]" />
            </div>
          </div>
          <div data-gsap-reveal className="order-1 lg:order-2">
            <p className="text-sm font-bold tracking-[.14em] text-[#008eaa]">NUESTRA APP</p>
            <h3 className="mt-4 text-3xl font-black leading-tight tracking-[-.035em]">Tu siguiente oportunidad empieza con un CV mejor.</h3>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#496579]">Crea, optimiza y potencia tu CV con inteligencia artificial. Una plataforma simple, profesional y lista para ayudarte a alcanzar nuevas oportunidades.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">{[[FileText, "Crea tu CV profesional"], [Sparkles, "Optimiza con IA"], [ScanSearch, "Puntuación ATS en tiempo real"], [Download, "Exporta y comparte"]].map(([Icon, label]) => { const FeatureIcon = Icon as typeof FileText; return <div key={label as string} className="flex items-center gap-3 rounded-2xl bg-[#effbfc] p-4 font-semibold text-[#0b5578]"><FeatureIcon className="text-[#00bcb9]" size={22} />{label as string}</div> })}</div>
            <a href="https://nexacv.morbia.com.mx" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#138ba3] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#0d708d]/25 transition hover:-translate-y-0.5 hover:bg-[#075b82]">Conoce NexaCV <ArrowRight size={17} /></a>
          </div>
        </div>
      </section>

      <section className="bg-[#f1fbfd] py-12 lg:py-14"><div className="mx-auto max-w-7xl px-5 lg:px-8"><MorbiaReviewsExplorer /></div></section>

      <section id="clientes" className="scroll-mt-20 overflow-hidden bg-white py-20 lg:py-28"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><p className="text-sm font-bold tracking-[.14em] text-[#008eaa]">NUESTROS CLIENTES</p><h2 className="mt-4 text-4xl font-black tracking-[-.045em] sm:text-5xl">Empresas que confían en nosotros.</h2></div><p className="max-w-sm text-[#527082]">Construimos tecnología útil para organizaciones que quieren moverse con claridad.</p></div></div><div className="client-marquee mt-12" aria-label="Clientes de Morbia"><div className="client-marquee-track">{clientCarouselLogos.map((client, index) => { const isClone = index >= clientLogos.length; return <a data-client-logo key={`${client.alt}-${index}`} href={client.href} target="_blank" rel="noopener noreferrer" aria-hidden={isClone || undefined} tabIndex={isClone ? -1 : undefined} className="group flex h-32 w-[15rem] shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-[#c8e6ed] bg-[#f8fdff] p-4 shadow-sm transition hover:-translate-y-1 hover:border-[#13c7c1] hover:shadow-xl hover:shadow-[#0086a4]/10 sm:w-[17rem]"><Image src={client.src} alt={isClone ? "" : client.alt} width={240} height={120} className={"h-24 w-full max-w-full object-contain transition duration-300 group-hover:scale-105 " + client.logoClass} /></a> })}</div></div></section>

      <section id="contacto" className="morbia-diagonal relative scroll-mt-20 overflow-hidden py-20 text-white lg:py-24"><div className="absolute inset-0 bg-[#04345d]/84" /><div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-10 px-5 lg:flex-row lg:items-center lg:px-8"><div className="max-w-2xl"><p className="text-sm font-bold tracking-[.14em] text-[#55f5e8]">HABLEMOS</p><h2 className="mt-4 text-4xl font-black leading-[.98] tracking-[-.045em] sm:text-5xl">Conversemos sobre tu próximo proyecto.</h2><p className="mt-5 text-lg text-white/75">Estamos listos para escuchar tus ideas y convertirlas en soluciones.</p><div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-white/85"><a href="mailto:contacto@morbia.com.mx" className="flex items-center gap-2 hover:text-[#62f7eb]"><Mail size={18} />contacto@morbia.com.mx</a><a href="tel:+522215268440" className="flex items-center gap-2 hover:text-[#62f7eb]"><Phone size={18} />(+52) 221 526 8440</a><span className="flex items-center gap-2"><MapPin size={18} />Puebla, Puebla</span></div></div><a href="https://wa.me/522215268440" target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#138ba3] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-[#0d708d]/25 transition hover:-translate-y-0.5 hover:bg-[#075b82]">Hablemos hoy <ArrowRight size={17} /></a></div></section>

      <footer className="bg-[#042b4d] py-12 text-white"><div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[1fr_auto] lg:px-8"><div><Image src="/images/main-logo.png" alt="Morbia" width={170} height={55} className="h-10 w-auto brightness-0 invert" /><p className="mt-5 text-sm font-semibold tracking-[.12em] text-[#5eece3]">INTELIGENCIA ORBITANDO TUS PROCESOS</p><p className="mt-4 text-sm text-white/55">© 2026 Morbia. Todos los derechos reservados.</p></div><div className="md:text-right"><p className="text-sm font-bold text-white/75">Síguenos</p><div className="mt-4 flex gap-3 md:justify-end">{socials.map(([label, href, Icon]) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-[#27e3d5] hover:bg-[#19e0d0] hover:text-[#05335c]"><Icon size={17} /></a>)}</div><div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/60 md:justify-end">{navItems.slice(1).map(([label, id]) => <button key={id} onClick={() => goTo(id)} className="hover:text-white">{label}</button>)}</div></div></div></footer>
      <FloatingChat />
    </main>
  )
}
