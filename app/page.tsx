"use client"

import { useRef } from "react"
import Image from "next/image"
import {
  ArrowRight, ChevronLeft, ChevronRight, Download, FileText, Globe2, Mail, MapPin, Orbit, Phone,
  ScanSearch, Sparkles,
} from "lucide-react"
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok, FaWhatsapp } from "react-icons/fa6"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import FloatingChat from "@/components/floating-chat"
import MorbiaReviewsExplorer from "@/components/morbia-reviews-explorer"
import AnalyticsLink from "@/components/analytics-link"
import SiteHeader from "@/components/site-header"
import HomeHorizontalStory from "@/components/home-horizontal-story"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const navItems = [
  ["Inicio", "inicio"], ["Nosotros", "nosotros"], ["Servicios", "servicios"],
  ["NexaCV", "nexacv"], ["Clientes", "clientes"],
] as const

const services = [
  { title: "Aplicaciones web", href: "/servicios/paginas-web", detail: "Una plataforma que se siente hecha para tu negocio: clara para tu equipo, útil para tus clientes y preparada para crecer sin volver a empezar.", result: "Tu operación, en un solo lugar." },
  { title: "Presencia digital", href: "/servicios/presencia-digital", detail: "Alinea tu sitio, Google, Maps y redes con contenido, fotografía, video y campañas que puedas medir.", result: "Una presencia coherente. Decisiones con datos." },
  { title: "Chatbots", href: "/servicios/chatbots", detail: "Convierte cada mensaje en una oportunidad. Tu negocio responde, orienta y acompaña a tus clientes incluso cuando tu equipo está ocupado.", result: "Atención que nunca deja esperando." },
  { title: "Automatizaciones", href: "/servicios/automatizacion-de-procesos", detail: "Conecta tareas que hoy consumen horas y deja que los procesos avancen con menos seguimiento manual. Diseñamos flujos para liberar tiempo en las tareas repetitivas de tu equipo.", result: "Menos tareas. Más capacidad para crecer." },
  { title: "RPA", href: "/servicios/rpa", detail: "Haz que las tareas manuales y repetitivas sucedan con precisión, todos los días. Tu equipo puede enfocarse en clientes, estrategia y decisiones que sí mueven el negocio.", result: "Tu equipo vuelve a lo importante." },
  { title: "Inteligencia artificial", href: "/servicios/inteligencia-artificial", detail: "Lleva respuestas, recomendaciones e ideas accionables al momento exacto. La inteligencia artificial deja de ser promesa y se convierte en una ventaja para decidir mejor.", result: "Decisiones más claras, cada día." },
  { title: "Análisis de datos", href: "/servicios/analisis-de-datos", detail: "Transformamos información dispersa en una lectura clara de lo que está funcionando, dónde está la oportunidad y qué decisión vale la pena tomar después.", result: "Ve con claridad hacia dónde crecer." },
] as const

type HomeService = (typeof services)[number]

const serviceGroups = [
  {
    id: "connect",
    title: "Conecta con tus clientes",
    description: "Presencia digital, páginas web y conversaciones que ayudan a explicar lo que haces y a dar el siguiente paso.",
    services: services.slice(0, 3),
  },
  {
    id: "operate",
    title: "Haz que tu operación avance",
    description: "Automatización, inteligencia artificial y datos para ordenar tareas y decidir con mejor contexto.",
    services: services.slice(3),
  },
] as const

function HomeServiceCard({ service }: { service: HomeService }) {
  return (
    <article data-service-card className="service-hover-card group relative flex flex-col justify-end overflow-hidden rounded-3xl border border-[#79eee3]/20 bg-[linear-gradient(145deg,rgba(7,73,111,.9),rgba(4,53,92,.78))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,.1)] backdrop-blur-sm transition-colors duration-300 hover:border-[#72e8df]/60 hover:bg-[linear-gradient(145deg,rgba(8,89,125,.94),rgba(4,58,94,.86))] focus-within:border-[#72e8df]/60">
      <div className="relative z-10 mt-auto">
        <h4 className="text-xl font-bold text-white sm:text-2xl">
          <AnalyticsLink href={service.href} contentId={`service:${service.title.toLowerCase()}:title`} className="rounded hover:text-[#77f6eb]">{service.title}</AnalyticsLink>
        </h4>
        <div data-service-detail className="service-hover-detail">
          <div>
            <p className="leading-relaxed text-white/80">{service.detail}</p>
            <p className="mt-4 border-l-2 border-[#65eee1] pl-3 text-sm font-bold text-[#d9faf6]">{service.result}</p>
            <AnalyticsLink href={service.href} contentId={`service:${service.title.toLowerCase()}:home`} className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[#64f8ec]">Conoce este servicio <ArrowRight size={15} aria-hidden="true" /></AnalyticsLink>
          </div>
        </div>
      </div>
    </article>
  )
}

const principles = [
  { number: "01", title: "Enfoque en personas", text: "La tecnología tiene más sentido cuando mejora la vida de las personas." },
  { number: "02", title: "Soluciones a medida", text: "Cada negocio es único; por eso creamos soluciones que se adaptan a ti." },
  { number: "03", title: "Resultados reales", text: "Nos enfocamos en generar valor medible y sostenible." },
  { number: "04", title: "Alianzas a largo plazo", text: "Construimos relaciones duraderas basadas en confianza y crecimiento." },
] as const

const clientLogos = [
  { src: "/images/sosadelbosque.png", alt: "Sosa del Bosque", href: "https://grupo.sosadelbosque.mx/", logoClass: "scale-100 translate-y-1", surfaceClass: "bg-[#f7fcfd]" },
  { src: "/images/grupo_morales_consultores.png", alt: "Grupo Morales Consultores", href: "https://grupo-morales-consultores.vercel.app/", logoClass: "scale-100", surfaceClass: "bg-[#f7fcfd]" },
  { src: "/images/sorteosramos369.png", alt: "Sorteos Ramos Tlaxcala", href: "https://www.sorteosramostlaxcala.vercel.app/", logoClass: "scale-100", surfaceClass: "bg-[#f7fcfd]" },
  { src: "/images/amanda.png", alt: "Amanda", href: "https://v0-amanda-oficial.vercel.app/", logoClass: "scale-100", surfaceClass: "bg-[#f7fcfd]" },
  { src: "/images/finzen.png", alt: "FinZen", href: "https://finzen.morbia.com.mx/", logoClass: "scale-100", surfaceClass: "border-[#1d8591] bg-[linear-gradient(135deg,#06395d,#0b7780)]" },
  { src: "/images/innova.png", alt: "Innova Gestión y Soluciones", href: "https://comercial-innova-one.vercel.app/", logoClass: "scale-100", surfaceClass: "border-[#1d8591] bg-[linear-gradient(135deg,#06395d,#0b7780)]" },
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
  const pageRef = useRef<HTMLElement>(null)
  const clientCarouselRef = useRef<HTMLDivElement>(null)
  const clientAutoTweenRef = useRef<gsap.core.Tween | null>(null)
  const clientArrowTweenRef = useRef<gsap.core.Tween | null>(null)
  const getClientLoopDistance = (carousel: HTMLElement) => {
    const track = carousel.querySelector<HTMLElement>(".client-carousel-track")
    const first = track?.children.item(0)
    const firstClone = track?.children.item(clientLogos.length)
    if (!(first instanceof HTMLElement) || !(firstClone instanceof HTMLElement)) return 0
    return firstClone.offsetLeft - first.offsetLeft
  }

  const startClientAutoplay = (offset = 0) => {
    const carousel = clientCarouselRef.current
    if (!carousel) return
    const loopDistance = getClientLoopDistance(carousel)
    if (!loopDistance) return

    const normalizedOffset = ((offset % loopDistance) + loopDistance) % loopDistance
    carousel.scrollLeft = normalizedOffset
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    clientAutoTweenRef.current?.kill()
    const progress = { value: 0 }
    clientAutoTweenRef.current = gsap.to(progress, {
      value: 1,
      duration: 38,
      ease: "none",
      repeat: -1,
      onUpdate: () => {
        carousel.scrollLeft = (normalizedOffset + progress.value * loopDistance) % loopDistance
      },
      onRepeat: () => {
        progress.value = 0
        carousel.scrollLeft = normalizedOffset
      },
    })
    carousel.classList.add("client-carousel-autoplay")
  }

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const select = gsap.utils.selector(pageRef)
    const hero = pageRef.current?.querySelector<HTMLElement>("[data-hero]")
    const aboutSection = pageRef.current?.querySelector<HTMLElement>("#nosotros")

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
    gsap.to(select("[data-globe-world]"), { rotation: 7, scale: 1.04, duration: 2.4, yoyo: true, repeat: -1, ease: "sine.inOut" })
    gsap.to(select("[data-globe-shell]"), { y: -7, scale: 1.025, duration: 2.8, yoyo: true, repeat: -1, ease: "sine.inOut" })

    const reveal = select("[data-gsap-reveal]")
    ScrollTrigger.batch(reveal, {
      start: "top 84%",
      onEnter: (elements) => gsap.from(elements, { y: 18, duration: 0.55, stagger: 0.08, ease: "power2.out", overwrite: true }),
    })
    gsap.set(select("[data-client-logo]"), { autoAlpha: 1 })
    ScrollTrigger.batch(select("[data-client-logo]"), {
      start: "top 86%",
      onEnter: (elements) => gsap.from(elements, { autoAlpha: 0, duration: 0.55, stagger: 0.08, ease: "power3.out", overwrite: true }),
    })
    ScrollTrigger.batch(select("[data-service-card]"), {
      start: "top 86%",
      onEnter: (elements) => {
        gsap.from(elements, { y: 34, autoAlpha: 0, scale: 0.97, duration: 0.72, stagger: 0.1, ease: "power3.out", overwrite: true })
      },
    })

    startClientAutoplay(0)

    if (aboutSection) {
      gsap.from(select("[data-about-principle]"), {
        autoAlpha: 0,
        x: 36,
        duration: 0.72,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: aboutSection, start: "top 68%", once: true },
      })
      gsap.from(select("[data-about-path]"), {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.05,
        ease: "power2.out",
        scrollTrigger: { trigger: aboutSection, start: "top 68%", once: true },
      })
      gsap.to(select("[data-about-orbit]"), {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
        scrollTrigger: { trigger: aboutSection, start: "top 78%", once: true },
      })
    }

    const media = gsap.matchMedia()
    media.add("(min-width: 1024px)", () => {
      if (hero) gsap.to(select("[data-hero-orbit]"), { x: 82, y: -44, scale: 1.12, rotation: 46, ease: "none", scrollTrigger: { trigger: hero, start: "top 94%", end: "bottom 16%", scrub: 0.7 } })
    })

    return () => {
      media.revert()
      clientAutoTweenRef.current?.kill()
      clientArrowTweenRef.current?.kill()
      clientAutoTweenRef.current = null
      clientArrowTweenRef.current = null
    }
  }, { scope: pageRef })

  const goTo = (id: string) => {
    window.gtag?.("event", "select_content", {
      content_type: "section_navigation",
      content_id: `section:${id}`,
    })
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const scrollClients = (direction: -1 | 1) => {
    const carousel = clientCarouselRef.current
    if (!carousel) return
    const loopDistance = getClientLoopDistance(carousel)
    const firstLogo = carousel.querySelector<HTMLElement>("[data-client-logo]")
    if (!loopDistance || !firstLogo) return

    clientAutoTweenRef.current?.kill()
    clientArrowTweenRef.current?.kill()
    carousel.classList.remove("client-carousel-autoplay")
    const styles = window.getComputedStyle(carousel.querySelector<HTMLElement>(".client-carousel-track")!)
    const gap = Number.parseFloat(styles.columnGap) || 0
    const step = firstLogo.offsetWidth + gap
    let current = carousel.scrollLeft
    if (direction < 0 && current < step) {
      current += loopDistance
      carousel.scrollLeft = current
    }
    const target = current + direction * step

    const continueAutoplay = () => startClientAutoplay(target)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      carousel.scrollLeft = target
      continueAutoplay()
      return
    }

    clientArrowTweenRef.current = gsap.to(carousel, {
      scrollLeft: target,
      duration: 0.62,
      ease: "power2.inOut",
      onComplete: () => {
        clientArrowTweenRef.current = null
        continueAutoplay()
      },
    })
  }

  return (
    <main ref={pageRef} className="home-page overflow-x-clip bg-[#f4fbff] text-[#062b52]">
      <SiteHeader home />

      <section id="inicio" data-hero className="morbia-diagonal relative isolate min-h-[760px] scroll-mt-20 overflow-hidden pt-28 text-white">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,29,61,.92),rgba(3,49,78,.64),rgba(3,76,104,.42))]" />
        <div className="morbia-grid absolute inset-0 opacity-30" />
        <div className="relative mx-auto grid min-h-[632px] max-w-7xl items-center gap-12 px-5 pb-16 pt-10 lg:grid-cols-[1.02fr_.98fr] lg:px-8">
          <div data-hero-copy className="max-w-2xl">
            <h1 className="max-w-xl text-5xl font-black leading-[.96] tracking-[-.055em] sm:text-6xl lg:text-7xl">Inteligencia orbitando <span className="text-[#27e3d5]">tus procesos.</span></h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/80">Creamos páginas web, presencia digital, chatbots, automatizaciones e inteligencia artificial para que tu negocio opere con más claridad. Nos ubicamos en Puebla y Tlaxcala y te acompañamos estés donde estés.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => goTo("servicios")} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#138ba3] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#0d708d]/25 transition hover:-translate-y-0.5 hover:bg-[#075b82]">Explorar soluciones <ArrowRight size={17} /></button>
              <button onClick={() => goTo("nexacv")} className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d7eeee] bg-white/10 px-6 py-4 text-sm font-bold text-[#e8fffb] transition hover:-translate-y-0.5 hover:bg-[#0a668b] hover:text-white">Conoce NexaCV <ChevronRight size={17} /></button>
            </div>
          </div>
          <div data-hero-visual data-hero-orbit aria-hidden="true" className="relative mx-auto -mt-2 flex min-h-[350px] w-full max-w-[25rem] self-center justify-self-center items-center justify-center sm:mt-0 sm:min-h-[470px] sm:max-w-xl">
            <div data-orbit-ring-a className="absolute h-[17rem] w-[17rem] rounded-full border border-[#51f4e8]/35 sm:h-[25rem] sm:w-[25rem]"><span data-orbit-node className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[#69fff0] shadow-[0_0_28px_#69fff0]" /></div>
            <div data-orbit-ring-b className="absolute h-[12rem] w-[24rem] rotate-[-32deg] rounded-[50%] border border-[#7efbf2]/40 sm:h-[16rem] sm:w-[32rem]"><span data-orbit-node className="absolute left-8 top-4 h-3 w-3 rounded-full bg-[#40e4db] shadow-[0_0_22px_#40e4db]" /></div>
            <div data-globe-shell className="relative grid h-44 w-44 place-items-center sm:h-60 sm:w-60">
              <Globe2 data-globe-world className="h-full w-full text-[#65f7eb] drop-shadow-[0_0_24px_rgba(101,247,235,.42)]" strokeWidth={0.95} />
            </div>
            <span className="absolute bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/20 bg-[#063d66]/70 px-4 py-2 text-xs font-bold tracking-[.16em] text-[#79fff1] backdrop-blur sm:bottom-4">MORBIA EN ÓRBITA</span>
          </div>
        </div>
      </section>

      <HomeHorizontalStory />

      <section id="nosotros" className="relative isolate scroll-mt-20 overflow-hidden bg-white py-20 lg:py-28">
        <div aria-hidden="true" className="absolute right-[-9rem] top-14 hidden h-72 w-72 rounded-full border border-[#7ae8e0]/35 lg:block" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[.78fr_1.22fr] lg:items-start lg:px-8">
          <div data-gsap-reveal className="lg:sticky lg:top-28">
            <h2 className="max-w-md text-4xl font-black leading-[.98] tracking-[-.045em] sm:text-5xl">Todo en órbita, <span className="text-[#00aeb7]">nada al azar.</span></h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[#496579]">En Morbia creemos en un futuro donde la tecnología impulse el potencial de las personas. Diseñamos soluciones a la medida con estrategia, innovación y cercanía.</p>
            <blockquote className="mt-9 max-w-sm border-l-4 border-[#11c8c5] pl-5 text-xl font-semibold leading-snug text-[#0a4771]">La tecnología es más poderosa cuando impulsa personas.</blockquote>
          </div>
          <div className="relative">
            <div data-about-path aria-hidden="true" className="absolute bottom-10 left-[1.75rem] top-10 w-px bg-[linear-gradient(#20cbc5,rgba(32,203,197,.12))] sm:left-[2.25rem]" />
            <Orbit data-about-orbit aria-hidden="true" className="absolute -right-2 top-1 hidden text-[#0fbab7]/25 sm:block" size={88} strokeWidth={1} />
            <div className="relative">
              {principles.map(({ number, title, text }) => (
                <article data-about-principle key={title} className="group grid grid-cols-[3.5rem_1fr] gap-x-5 border-b border-[#cae6ea] py-8 first:pt-0 last:border-b-0 last:pb-0 sm:grid-cols-[4.5rem_1fr] sm:gap-x-7">
                  <div className="pt-1">
                    <span className="text-2xl font-black leading-none tracking-tight text-[#079aaa]">{number}</span>
                  </div>
                  <div className="pb-1 pt-1">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-2xl font-black tracking-[-.03em] text-[#083c67] transition duration-300 group-hover:text-[#008f9f] sm:text-3xl">{title}</h3>
                      <span aria-hidden="true" className="mt-3 h-px w-8 shrink-0 bg-[#19c6bf] transition duration-500 group-hover:w-14" />
                    </div>
                    <p className="mt-3 max-w-xl text-base leading-relaxed text-[#527082] sm:text-lg">{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="morbia-diagonal relative scroll-mt-20 overflow-hidden py-20 text-white lg:py-28">
        <div className="absolute inset-0 bg-[#06345c]/82" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div data-gsap-reveal className="max-w-3xl">
            <h2 className="text-4xl font-black leading-[.98] tracking-[-.045em] sm:text-5xl">Soluciones tecnológicas para un mundo en evolución.</h2>
            <p className="mt-5 text-lg leading-relaxed text-white/75">Donde esté tu negocio, conectamos presencia digital, páginas web, chatbots, automatización, inteligencia artificial y datos para atender mejor y trabajar con más claridad.</p>
            <AnalyticsLink href="/servicios-tecnologicos-puebla-tlaxcala" contentId="regional-services:home" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#73f7eb] transition hover:text-white">Explora todas nuestras soluciones <ArrowRight size={16} /></AnalyticsLink>
          </div>
          <div className="mt-12 space-y-14">
            {serviceGroups.map((group) => (
              <div key={group.id}>
                <div data-gsap-reveal className="mb-6 flex flex-col gap-2 border-l-2 border-[#3ee8db] pl-4 sm:mb-7 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                  <h3 className="text-2xl font-black tracking-[-.035em] text-white sm:text-3xl">{group.title}</h3>
                  <p className="max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">{group.description}</p>
                </div>
                <div data-services-track className={`grid gap-4 ${group.id === "connect" ? "md:grid-cols-3" : "md:grid-cols-2 xl:grid-cols-4"}`}>
                  {group.services.map((service) => <HomeServiceCard key={service.title} service={service} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
            <h3 className="text-3xl font-black leading-tight tracking-[-.035em]">Tu siguiente oportunidad empieza con un CV mejor.</h3>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#496579]">Crea, optimiza y potencia tu CV con inteligencia artificial. Una plataforma simple, profesional y lista para ayudarte a alcanzar nuevas oportunidades.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">{[[FileText, "Crea tu CV profesional"], [Sparkles, "Optimiza con IA"], [ScanSearch, "Puntuación ATS en tiempo real"], [Download, "Exporta y comparte"]].map(([Icon, label]) => { const FeatureIcon = Icon as typeof FileText; return <div key={label as string} className="flex items-center gap-3 rounded-2xl bg-[#effbfc] p-4 font-semibold text-[#0b5578]"><FeatureIcon className="text-[#00bcb9]" size={22} />{label as string}</div> })}</div>
            <a href="https://nexacv.morbia.com.mx" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#138ba3] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#0d708d]/25 transition hover:-translate-y-0.5 hover:bg-[#075b82]">Conoce NexaCV <ArrowRight size={17} /></a>
          </div>
        </div>
      </section>

      <section className="bg-[#f1fbfd] py-12 lg:py-14"><div className="mx-auto max-w-7xl px-5 lg:px-8"><MorbiaReviewsExplorer /></div></section>

      <section id="clientes" className="scroll-mt-20 overflow-hidden bg-[#eaf8fa] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div data-gsap-reveal className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div><h2 className="text-4xl font-black tracking-[-.045em] sm:text-5xl">Empresas que confían en nosotros.</h2></div>
            <div className="flex items-center justify-between gap-4 lg:justify-end">
              <p className="max-w-sm text-[#527082]">Construimos tecnología útil para organizaciones que quieren moverse con claridad.</p>
              <div className="flex shrink-0 gap-2" role="group" aria-label="Controles de clientes">
                <button type="button" onClick={() => scrollClients(-1)} aria-label="Ver clientes anteriores" className="grid h-11 w-11 place-items-center rounded-full border border-[#a9d6dd] bg-white/80 text-[#07517d] transition hover:border-[#138ba3] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087e92]"><ChevronLeft size={20} aria-hidden="true" /></button>
                <button type="button" onClick={() => scrollClients(1)} aria-label="Ver más clientes" className="grid h-11 w-11 place-items-center rounded-full border border-[#a9d6dd] bg-white/80 text-[#07517d] transition hover:border-[#138ba3] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087e92]"><ChevronRight size={20} aria-hidden="true" /></button>
              </div>
            </div>
          </div>
          <div ref={clientCarouselRef} className="client-carousel mt-8 rounded-[2rem] border border-[#b9e2e7] bg-[linear-gradient(135deg,#073b61,#087c87)] shadow-[0_20px_50px_rgba(0,92,115,0.18)]" role="region" aria-label="Clientes de Morbia. Usa las flechas para recorrer los logotipos.">
            <div className="client-carousel-track">{clientCarouselLogos.map((client, index) => { const isClone = index >= clientLogos.length; return <a data-client-logo key={`${client.alt}-${index}`} href={client.href} target="_blank" rel="noopener noreferrer" aria-hidden={isClone || undefined} tabIndex={isClone ? -1 : undefined} className={"group flex h-32 w-[15rem] shrink-0 items-center justify-center overflow-hidden rounded-3xl border p-4 shadow-[0_12px_28px_rgba(0,29,56,0.2)] transition hover:-translate-y-1 hover:border-[#61e1dc] hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#83f4e9] sm:w-[17rem] " + client.surfaceClass}><Image src={client.src} alt={isClone ? "" : client.alt} width={240} height={120} className={"h-24 w-full max-w-full object-contain transition duration-300 group-hover:scale-105 " + client.logoClass} /></a> })}</div>
          </div>
        </div>
      </section>

      <section id="contacto" className="morbia-diagonal relative scroll-mt-20 overflow-hidden py-20 text-white lg:py-24"><div className="absolute inset-0 bg-[#04345d]/84" /><div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-10 px-5 lg:flex-row lg:items-center lg:px-8"><div data-gsap-reveal className="max-w-2xl"><h2 className="text-4xl font-black leading-[.98] tracking-[-.045em] sm:text-5xl">Conversemos sobre tu próximo proyecto.</h2><p className="mt-5 text-lg text-white/75">Estamos listos para escuchar tus ideas y convertirlas en soluciones.</p><div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-white/85"><a href="mailto:contacto@morbia.com.mx" className="flex items-center gap-2 hover:text-[#62f7eb]"><Mail size={18} />contacto@morbia.com.mx</a><a href="tel:+522215268440" className="flex items-center gap-2 hover:text-[#62f7eb]"><Phone size={18} />(+52) 221 526 8440</a><span className="flex items-center gap-2"><MapPin size={18} />Ubicación: Puebla y Tlaxcala</span></div></div><a data-gsap-reveal href="https://wa.me/522215268440" target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#138ba3] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-[#0d708d]/25 transition hover:-translate-y-0.5 hover:bg-[#075b82]">Hablemos hoy <ArrowRight size={17} /></a></div></section>

      <footer className="bg-[#042b4d] py-12 text-white"><div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[1fr_auto] lg:px-8"><div><Image src="/images/main-logo.png" alt="Morbia" width={170} height={55} className="h-10 w-auto brightness-0 invert" /><p className="mt-5 text-sm font-semibold tracking-[.12em] text-[#5eece3]">INTELIGENCIA ORBITANDO TUS PROCESOS</p><p className="mt-4 text-sm text-white/55">© 2026 Morbia. Todos los derechos reservados.</p></div><div className="md:text-right"><p className="text-sm font-bold text-white/75">Síguenos</p><div className="mt-4 flex gap-3 md:justify-end">{socials.map(([label, href, Icon]) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-[#27e3d5] hover:bg-[#19e0d0] hover:text-[#05335c]"><Icon size={17} /></a>)}</div><div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/60 md:justify-end">{navItems.slice(1).map(([label, id]) => <a key={id} href={`#${id}`} onClick={(event) => { event.preventDefault(); goTo(id) }} className="hover:text-white">{label}</a>)}</div></div></div></footer>
      <FloatingChat />
    </main>
  )
}
