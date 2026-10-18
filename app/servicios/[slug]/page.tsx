import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowDown, ArrowLeft, ArrowRight, Check, ChevronRight, Plus } from "lucide-react"
import AnalyticsLink from "@/components/analytics-link"
import SiteHeader from "@/components/site-header"
import ServiceMotion from "@/components/service-motion"
import ServiceArtwork from "@/components/service-artwork"
import { ServiceApproach, ServiceContact, ServiceFooter } from "@/components/service-shared"
import { serviceIcons } from "@/components/service-icons"
import { regionalServiceGroups, servicePageBySlug, servicePages, siteUrl } from "@/lib/seo-content"
import { serviceStories } from "@/lib/service-stories"
import { serviceImages } from "@/lib/service-images"

type ServiceRouteProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() { return servicePages.map(({ slug }) => ({ slug })) }

export async function generateMetadata({ params }: ServiceRouteProps): Promise<Metadata> {
  const { slug } = await params
  const service = servicePageBySlug.get(slug)
  const story = serviceStories[slug]
  if (!service || !story) return {}
  const url = `/servicios/${service.slug}`
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: url },
    openGraph: { title: `${service.title} | Morbia`, description: service.description, url: `${siteUrl}${url}`, images: [{ url: serviceImages[service.slug].src, width: serviceImages[service.slug].width, height: serviceImages[service.slug].height, alt: story.imageAlt }] },
    twitter: { card: "summary_large_image", title: `${service.title} | Morbia`, description: service.description, images: [serviceImages[service.slug].src] },
  }
}

export default async function ServicePage({ params }: ServiceRouteProps) {
  const { slug } = await params
  const service = servicePageBySlug.get(slug)
  const group = regionalServiceGroups.find((item) => item.slug === slug)
  const story = serviceStories[slug]
  if (!service || !group || !story) notFound()
  const Icon = serviceIcons[group.slug]
  const pageUrl = `${siteUrl}/servicios/${service.slug}`
  const schema = {
    "@context": "https://schema.org", "@graph": [
      {
        "@type": "Service", "@id": `${pageUrl}#service`, name: service.title, description: service.description, url: pageUrl,
        image: `${siteUrl}${serviceImages[service.slug].src}`, provider: { "@id": `${siteUrl}/#organization` },
        areaServed: [{ "@type": "City", name: "Puebla, Puebla, México" }, { "@type": "State", name: "Tlaxcala, México" }],
      },
      { "@type": "WebPage", "@id": `${pageUrl}#webpage`, url: pageUrl, name: service.title, description: service.description, inLanguage: "es-MX", isPartOf: { "@id": `${siteUrl}/#website` }, mainEntity: { "@id": `${pageUrl}#service` } },
      {
        "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Servicios", item: `${siteUrl}/servicios-tecnologicos-puebla-tlaxcala` },
          { "@type": "ListItem", position: 3, name: service.title, item: pageUrl },
        ],
      },
    ],
  }

  return (
    <main className="service-page min-h-[100dvh] overflow-x-clip bg-[#f4fbff] text-[#062b52]">
      <SiteHeader />
      <ServiceMotion>
        <section className="service-hero morbia-diagonal">
          <div className="service-container">
            <nav aria-label="Ruta de navegación" className="service-breadcrumb flex-wrap"><Link href={`/servicios-tecnologicos-puebla-tlaxcala#${slug}`} className="inline-flex items-center gap-2"><ArrowLeft size={15} /> Todos los servicios</Link><ChevronRight size={13} aria-hidden="true" /><span>{group.title}</span></nav>
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-14">
              <div data-service-hero-copy>
                <p className="flex items-center gap-2.5 text-sm font-bold text-[#6beee3]"><Icon size={21} strokeWidth={1.8} />{service.title}</p>
                <h1 className="mt-5 max-w-2xl text-[2.15rem] font-black leading-[1.12] tracking-[-.045em] sm:text-5xl xl:text-[3.5rem]">{story.headline}</h1>
                <p className="mt-6 max-w-xl text-lg leading-8 text-[#d5e8ed]">{story.summary}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><a href="#que-resolvemos" className="service-button">Descubre cómo <ArrowDown size={17} /></a><a href="#hablemos" className="service-button service-button-secondary">Hablemos hoy <ArrowRight size={17} /></a></div>
              </div>
              <div data-service-hero-image><ServiceArtwork image={serviceImages[service.slug]} alt={story.imageAlt} title={service.title} priority /></div>
            </div>
          </div>
        </section>

        <nav aria-label="Contenido de este servicio" className="border-b border-[#c9e4e9] bg-[#edf8fa]">
          <div className="service-container flex flex-wrap gap-x-6 gap-y-1 py-4 text-sm font-semibold text-[#1b5a79] sm:gap-x-8">
            <a href="#que-resolvemos" className="py-2 hover:text-[#08718a]">Qué resolvemos</a><a href="#en-tu-negocio" className="py-2 hover:text-[#08718a]">En tu día a día</a><a href="#como-empezamos" className="py-2 hover:text-[#08718a]">Cómo empezamos</a><a href="#preguntas" className="py-2 hover:text-[#08718a]">Tus preguntas</a>
          </div>
        </nav>

        <section id="que-resolvemos" className="service-section">
          <div className="service-container grid items-start gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <div data-service-reveal><h2 className="service-heading">¿Te pasa algo de esto?</h2>{story.overview.map((paragraph) => <p key={paragraph} className="mt-6 text-[1.05rem] leading-8 text-[#496579]">{paragraph}</p>)}</div>
              <div className="mt-10 space-y-7">{story.signals.map((signal) => <div key={signal.title} data-service-reveal className="border-l-2 border-[#8ecdd5] pl-5"><h3 className="text-lg font-bold leading-7 text-[#0b4d70]">{signal.title}</h3><p className="mt-2 leading-7 text-[#527082]">{signal.text}</p></div>)}</div>
            </div>
            <aside data-service-reveal className="morbia-diagonal relative isolate overflow-hidden rounded-3xl border border-[#5bc0ca]/40 p-6 text-white shadow-[0_20px_55px_rgba(4,72,104,.14)] sm:p-9">
              <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(3,47,82,.97),rgba(3,62,92,.94),rgba(2,106,121,.86))]" />
              <span data-service-symbol className="mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-[#6ee2df]/25 bg-[#6de9e2]/10 text-[#75f0e8]"><Icon size={29} strokeWidth={1.8} /></span>
              <h2 className="text-3xl font-black leading-tight tracking-[-.035em]">Lo que podemos resolver.</h2>
              <p className="mt-4 leading-7 text-[#c4dee7]">{story.audience}</p>
              <ul className="mt-8 space-y-6">{story.solutions.map((solution) => <li key={solution.title} className="flex gap-3"><Check size={20} className="mt-1 shrink-0 text-[#6de9e2]" /><div><h3 className="text-base font-bold leading-7 text-[#eefafb]">{solution.title}</h3><p className="mt-1 text-sm leading-7 text-[#c6dee7]">{solution.text}</p></div></li>)}</ul>
              <a href="#hablemos" className="service-button mt-8">Hablemos hoy <ArrowRight size={17} /></a>
            </aside>
          </div>
        </section>

        <section className="service-section service-section-photo" id="en-tu-negocio">
          <div className="service-container">
            <div data-service-reveal className="max-w-3xl"><p className="mb-4 text-sm font-bold text-[#06687a]">ASÍ PODRÍA VERSE EN TU NEGOCIO</p><h2 className="service-heading">{story.example.title}</h2><p className="service-lead">{story.example.context}</p></div>
            <div data-service-reveal className="mt-10 grid overflow-hidden rounded-3xl border border-[#c5e1e6] bg-[#f7fcfd] lg:grid-cols-2">
              <div className="p-6 sm:p-9"><h3 className="text-lg font-bold text-[#557381]">Hoy puede sentirse así</h3><p className="mt-4 text-lg leading-8 text-[#496579]">{story.example.before}</p></div>
              <div className="border-t border-[#c5e1e6] bg-[#dff3f4] p-6 sm:p-9 lg:border-l lg:border-t-0"><h3 className="flex items-center gap-2 text-lg font-bold text-[#08718a]">Con un recorrido mejor <ArrowRight size={19} /></h3><p className="mt-4 text-lg leading-8 text-[#195875]">{story.example.after}</p></div>
            </div>
            <p className="mt-4 text-sm leading-6 text-[#496775]">Ejemplo ilustrativo. El alcance y los resultados se definen según las necesidades de cada negocio.</p>
          </div>
        </section>

        <section className="service-section">
          <div className="service-container"><div data-service-reveal><h2 className="service-heading">Lo que cambia para tu equipo.</h2><p className="service-lead">La mejora se tiene que notar en la forma de trabajar, atender y tomar decisiones.</p></div><div className="mt-10 grid gap-8 md:grid-cols-3">{story.benefits.map((benefit) => <div key={benefit.title} data-service-reveal className="border-t-2 border-[#95cfd8] pt-6"><span data-service-symbol className="inline-flex origin-center"><Check className="text-[#078394]" size={25} /></span><h3 className="mt-5 text-xl font-bold leading-7 text-[#0b4d70]">{benefit.title}</h3><p className="mt-3 leading-7 text-[#496579]">{benefit.text}</p></div>)}</div></div>
        </section>

        <ServiceApproach />

        <section className="service-section" id="preguntas">
          <div className="service-container grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
            <div data-service-reveal><h2 className="service-heading">Antes de dar el siguiente paso.</h2><p className="service-lead">Respuestas claras para empezar a valorar si este servicio tiene sentido para tu negocio.</p></div>
            <div data-service-reveal>{story.questions.map((item) => <details key={item.question} className="service-faq border-b border-[#c8e2e8]"><summary>{item.question}<Plus size={21} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div>
          </div>
        </section>

        <section className="service-section service-section-photo border-t border-[#cbe5e9]">
          <div className="service-container"><h2 className="text-2xl font-black tracking-[-.035em] text-[#073b61]">A veces, el siguiente paso conecta más de un servicio.</h2><p className="mt-4 max-w-2xl leading-7 text-[#496579]">Explora otras formas de atender mejor y liberar tiempo en tu operación.</p><div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{servicePages.filter((item) => item.slug !== service.slug).map((item) => { const RelatedIcon = serviceIcons[item.slug]; return <AnalyticsLink key={item.slug} href={`/servicios/${item.slug}`} contentId={`service:${item.slug}`} className="group flex min-h-24 items-center gap-3 rounded-2xl border border-[#bddde5] bg-[#f9fdfe] p-5 text-sm font-bold text-[#145778] transition hover:border-[#2597a8] hover:bg-white"><RelatedIcon size={23} className="shrink-0 text-[#0b8597]" strokeWidth={1.8} /><span className="flex-1">{item.title}</span><ArrowRight size={17} className="shrink-0 transition-transform group-hover:translate-x-1" /></AnalyticsLink> })}</div><Link href={`/servicios-tecnologicos-puebla-tlaxcala#${slug}`} className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#08718a] hover:text-[#043b66]"><ArrowLeft size={16} /> Volver a todos los servicios</Link></div>
        </section>
        <ServiceContact service={service.title} />
        <ServiceFooter />
      </ServiceMotion>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  )
}
