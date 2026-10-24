import type { Metadata } from "next"
import Link from "next/link"
import { ArrowDown, ArrowLeft, ArrowRight, Check, ChevronRight } from "lucide-react"
import AnalyticsLink from "@/components/analytics-link"
import SiteHeader from "@/components/site-header"
import ServiceMotion from "@/components/service-motion"
import ServiceArtwork from "@/components/service-artwork"
import { ServiceApproach, ServiceContact, ServiceFooter } from "@/components/service-shared"
import { serviceIcons } from "@/components/service-icons"
import { regionalCapabilities, regionalServiceGroups, servicePages, siteUrl } from "@/lib/seo-content"
import { serviceStories } from "@/lib/service-stories"
import { serviceImages } from "@/lib/service-images"

export const metadata: Metadata = {
  title: "Servicios de tecnología en Puebla y Tlaxcala",
  description: "Descubre presencia digital, SEO, Google Maps, páginas web, chatbots, automatización, RPA, inteligencia artificial y datos para tu negocio.",
  alternates: { canonical: "/servicios-tecnologicos-puebla-tlaxcala" },
  openGraph: {
    title: "Servicios de tecnología en Puebla y Tlaxcala | Morbia",
    description: "Soluciones para atender mejor, recuperar tiempo y decidir con claridad. Encuentra el siguiente paso para tu negocio con Morbia.",
    url: `${siteUrl}/servicios-tecnologicos-puebla-tlaxcala`,
    images: [{ url: serviceImages["inteligencia-artificial"].src, width: serviceImages["inteligencia-artificial"].width, height: serviceImages["inteligencia-artificial"].height, alt: "Tecnología con propósito. Morbia" }],
  },
}

const pageUrl = `${siteUrl}/servicios-tecnologicos-puebla-tlaxcala`
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage", "@id": `${pageUrl}#webpage`, url: pageUrl,
      name: "Servicios de tecnología en Puebla y Tlaxcala",
      description: "Capacidades de Morbia para empresas de Puebla y Tlaxcala: presencia digital, SEO, Google Maps, páginas web, chatbots, RPA, automatización, inteligencia artificial y análisis de datos.",
      inLanguage: "es-MX", isPartOf: { "@id": `${siteUrl}/#website` }, about: { "@id": `${siteUrl}/#organization` },
      mainEntity: { "@type": "ItemList", numberOfItems: regionalServiceGroups.length, itemListElement: regionalServiceGroups.map((service, index) => ({ "@type": "ListItem", position: index + 1, name: service.title, url: `${siteUrl}/servicios/${service.slug}` })) },
      mentions: { "@type": "ItemList", name: "Capacidades de los servicios de Morbia", numberOfItems: regionalCapabilities.length, itemListElement: regionalCapabilities.map((name, index) => ({ "@type": "ListItem", position: index + 1, name })) },
    },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: siteUrl }, { "@type": "ListItem", position: 2, name: "Servicios de tecnología en Puebla y Tlaxcala", item: pageUrl }] },
  ],
}

const needs = [
  { title: "Quiero que mi negocio sea más fácil de encontrar", text: "Conecta el SEO, Google Maps, las redes y el contenido visual en una estrategia con prioridades claras.", slug: "presencia-digital", label: "Presencia digital" },
  { title: "Quiero renovar mi sitio o crear una herramienta", text: "Diseña un sitio, portal o aplicación que explique tus servicios y organice solicitudes.", slug: "paginas-web", label: "Páginas web" },
  { title: "Quiero responder mejor a mis clientes", text: "Un primer punto de atención para orientar consultas y darles un siguiente paso.", slug: "chatbots", label: "Chatbots" },
  { title: "Quiero recuperar tiempo para mi equipo", text: "Revisa qué tareas, aprobaciones y seguimientos podrían avanzar con menos esfuerzo manual.", slug: "automatizacion-de-procesos", label: "Automatización" },
  { title: "Quiero ver con claridad qué está pasando", text: "Reúne la información que necesitas para hablar de prioridades y tomar decisiones.", slug: "analisis-de-datos", label: "Análisis de datos" },
] as const

export default function ServiciosTecnologicosPueblaTlaxcalaPage() {
  return (
    <main className="service-page min-h-[100dvh] overflow-x-clip bg-[#f4fbff] text-[#062b52]">
      <SiteHeader />
      <ServiceMotion>
        <section className="service-hero morbia-diagonal">
          <div className="service-container">
            <nav className="service-breadcrumb" aria-label="Ruta de navegación"><Link href="/#servicios" className="inline-flex items-center gap-2"><ArrowLeft size={15} /> Volver a la portada</Link><ChevronRight size={13} aria-hidden="true" /><span>Servicios</span></nav>
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-14">
              <div data-service-hero-copy>
                <p className="text-xs font-bold tracking-[.14em] text-[#6beee3] sm:text-sm">TECNOLOGÍA PARA TU NEGOCIO</p>
                <h1 className="mt-5 max-w-2xl text-[2.15rem] font-black leading-[1.12] tracking-[-.045em] sm:text-5xl xl:text-[3.5rem]">Tu negocio puede <span className="text-[#65eee1]">trabajar mejor.</span></h1>
                <p className="mt-6 max-w-xl text-lg leading-8 text-[#d5e8ed]">Atiende mejor, recupera tiempo y decide con claridad. Encuentra la tecnología que tiene sentido para tu siguiente paso.</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><a href="#soluciones" className="service-button">Encuentra tu solución <ArrowDown size={17} /></a><a href="#hablemos" className="service-button service-button-secondary">Hablemos hoy <ArrowRight size={17} /></a></div>
              </div>
              <div data-service-hero-image>
                <ServiceArtwork image={serviceImages["inteligencia-artificial"]} alt={serviceStories["inteligencia-artificial"].imageAlt} title="Tecnología con propósito" priority />
              </div>
            </div>
          </div>
        </section>

        <section className="service-section" id="soluciones">
          <div className="service-container">
            <div data-service-reveal className="max-w-3xl"><h2 className="service-heading">Siete formas de hacer más fácil tu día a día.</h2><p className="service-lead">Una presencia digital coherente, una web que explica mejor, una conversación que sí avanza y procesos que dependen menos de recordatorios. Explora dónde puede ayudar cada servicio.</p></div>
            <nav aria-label="Explorar servicios" className="mt-8 flex flex-wrap gap-2">
              {regionalServiceGroups.map((group) => <a key={group.slug} href={`#${group.slug}`} className="rounded-full border border-[#badce3] bg-[#edf8fa] px-4 py-2.5 text-sm font-semibold text-[#175879] transition hover:border-[#08718a] hover:bg-[#dff3f5]">{group.title}</a>)}
            </nav>
            <div className="mt-10 grid items-stretch gap-7 md:grid-cols-2">
              {regionalServiceGroups.map((group) => {
                const story = serviceStories[group.slug]
                const Icon = serviceIcons[group.slug]
                const service = servicePages.find((item) => item.slug === group.slug)!
                return (
                  <article key={group.slug} id={group.slug} data-service-reveal className="service-catalog-card flex flex-col">
                    <div className="service-catalog-artwork"><ServiceArtwork image={serviceImages[group.slug]} alt={story.imageAlt} title={service.title} variant="catalog" /></div>
                    <div className="flex flex-1 flex-col p-6 sm:p-8">
                      <div className="flex items-center gap-3"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#e2f5f7] text-[#087b91]"><Icon size={25} strokeWidth={1.8} /></span><h3 className="text-2xl font-black leading-tight tracking-[-.035em] text-[#073b61]"><Link href={`/servicios/${group.slug}`}>{group.title}</Link></h3></div>
                      <p className="mt-5 text-lg font-semibold leading-7 text-[#145676]">{story.headline}</p>
                      <p className="mt-3 leading-7 text-[#496579]">{story.audience}</p>
                      <ul className="mb-7 mt-6 grid gap-3 sm:grid-cols-2">{group.capabilities.map((capability) => <li key={capability} className="flex items-start gap-2.5 text-sm leading-6 text-[#376076]"><Check size={17} className="mt-1 shrink-0 text-[#0b8c9c]" />{capability}</li>)}</ul>
                      <div className="mt-auto border-t border-[#d9ecef] pt-6"><AnalyticsLink href={`/servicios/${group.slug}`} contentId={`service:${group.slug}:regional`} aria-label={`Conoce este servicio: ${service.title}`} className="service-button">Conoce este servicio <ArrowRight size={17} /></AnalyticsLink></div>
                    </div>
                  </article>
                )
              })}
            </div>
            <p className="mt-5 text-xs leading-6 text-[#617e8d]">Piezas visuales de Morbia. Composiciones ilustrativas.</p>
          </div>
        </section>

        <section className="service-section morbia-diagonal relative isolate overflow-hidden text-white">
          <div className="absolute inset-0 -z-10 bg-[#04345d]/90" />
          <div className="service-container">
            <div data-service-reveal className="max-w-3xl"><h2 className="text-3xl font-black leading-[1.08] tracking-[-.04em] sm:text-5xl">No tienes que saber qué tecnología necesitas.</h2><p className="mt-6 max-w-2xl text-lg leading-8 text-[#d4e9ed]">Empieza por lo que quieres cambiar. Estas situaciones pueden ayudarte a encontrar una primera opción; también podemos combinar servicios cuando tu operación lo necesita.</p></div>
            <div className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">{needs.map((need) => <div key={need.slug} data-service-reveal className="border-t border-[#80d8dc]/25 pt-6"><h3 className="max-w-lg text-xl font-bold leading-7 text-[#f1fbfc]">{need.title}</h3><p className="mt-3 max-w-lg leading-7 text-[#c0dce5]">{need.text}</p><AnalyticsLink href={`/servicios/${need.slug}`} contentId={`service:${need.slug}:need`} className="mt-5 inline-flex items-center gap-2 rounded text-sm font-bold text-[#70f0e5] hover:text-white">Explorar {need.label.toLowerCase()} <ArrowRight size={16} /></AnalyticsLink></div>)}</div>
          </div>
        </section>
        <ServiceApproach />
        <ServiceContact />
        <ServiceFooter />
      </ServiceMotion>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  )
}
