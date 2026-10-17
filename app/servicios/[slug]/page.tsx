import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, MapPin } from "lucide-react"
import AnalyticsLink from "@/components/analytics-link"
import { regionalServiceGroups, servicePageBySlug, servicePages, siteUrl } from "@/lib/seo-content"

type ServiceRouteProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return servicePages.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: ServiceRouteProps): Promise<Metadata> {
  const { slug } = await params
  const service = servicePageBySlug.get(slug)

  if (!service) return {}

  const url = `/servicios/${service.slug}`
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${service.title} | Morbia`,
      description: service.description,
      url: `${siteUrl}${url}`,
    },
  }
}

export default async function ServicePage({ params }: ServiceRouteProps) {
  const { slug } = await params
  const service = servicePageBySlug.get(slug)
  const group = regionalServiceGroups.find((item) => item.slug === slug)

  if (!service || !group) notFound()

  const pageUrl = `${siteUrl}/servicios/${service.slug}`
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: service.title,
        description: service.description,
        url: pageUrl,
        inLanguage: "es-MX",
        provider: { "@id": `${siteUrl}/#organization` },
        areaServed: [
          { "@type": "City", name: "Puebla, Puebla, México" },
          { "@type": "State", name: "Tlaxcala, México" },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Servicios", item: `${siteUrl}/servicios-tecnologicos-puebla-tlaxcala` },
          { "@type": "ListItem", position: 3, name: service.title, item: pageUrl },
        ],
      },
    ],
  }

  return (
    <main className="min-h-[100dvh] overflow-x-clip bg-[#f4fbff] text-[#062b52]">
      <header className="morbia-header-scrolled relative z-10 border-b border-white/10 text-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="/" aria-label="Ir al inicio de Morbia">
            <Image src="/images/main-logo.png" alt="Morbia" width={160} height={50} className="h-9 w-auto brightness-0 invert" priority />
          </Link>
          <AnalyticsLink href="/#contacto" contentId={`contact:${service.slug}`} className="inline-flex items-center gap-2 rounded-full bg-[#138ba3] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#0d708d]/25 transition hover:-translate-y-0.5 hover:bg-[#075b82]">Hablemos hoy <ArrowRight size={16} /></AnalyticsLink>
        </div>
      </header>

      <section className="morbia-diagonal relative isolate overflow-hidden px-5 py-20 text-white sm:py-28 lg:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(3,29,61,.94),rgba(3,58,87,.74),rgba(3,89,106,.5))]" />
        <div className="morbia-grid absolute inset-0 opacity-25" />
        <div className="relative mx-auto max-w-5xl">
          <p className="text-sm font-bold tracking-[.14em] text-[#68f6e8]">SERVICIOS MORBIA</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[.98] tracking-[-.05em] sm:text-6xl">{service.title} para una operación más clara.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/80 sm:text-xl">{service.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-white/85">
            <span className="inline-flex items-center gap-2"><MapPin size={18} className="text-[#69f6e9]" />Puebla, Puebla</span>
            <span className="inline-flex items-center gap-2"><MapPin size={18} className="text-[#69f6e9]" />Atención en Tlaxcala</span>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-start">
          <div>
            <p className="text-sm font-bold tracking-[.14em] text-[#008eaa]">CÓMO APORTA A TU NEGOCIO</p>
            <h2 className="mt-4 text-3xl font-black leading-tight tracking-[-.04em] sm:text-5xl">Tecnología útil, pensada desde el trabajo real de tu equipo.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#496579]">{service.focus}</p>
            <p className="mt-5 border-l-2 border-[#18c8c1] pl-4 text-lg font-bold leading-relaxed text-[#175879]">{service.outcome}</p>
          </div>
          <aside className="rounded-[2rem] border border-[#b9e2e7] bg-white p-7 shadow-[0_18px_45px_rgba(5,76,103,.08)] sm:p-9">
            <h2 className="text-2xl font-black tracking-[-.03em] text-[#083c67]">Lo que podemos resolver</h2>
            <ul className="mt-6 space-y-4">
              {group.capabilities.map((capability) => (
                <li key={capability} className="flex gap-3 text-[#376076]"><Check className="mt-0.5 shrink-0 text-[#0b9da8]" size={19} strokeWidth={2.4} />{capability}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="border-y border-[#c9e8ec] bg-white px-5 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold tracking-[.14em] text-[#008eaa]">EXPLORA LOS DEMÁS SERVICIOS</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {servicePages.filter((item) => item.slug !== service.slug).map((item) => (
              <AnalyticsLink key={item.slug} href={`/servicios/${item.slug}`} contentId={`service:${item.slug}`} className="rounded-full border border-[#b9dfe6] bg-[#f5fcfd] px-4 py-2 text-sm font-bold text-[#145778] transition hover:border-[#138ba3] hover:bg-[#e2f8f8]">{item.title}</AnalyticsLink>
            ))}
          </div>
        </div>
      </section>

      <section className="morbia-diagonal relative overflow-hidden px-5 py-16 text-white sm:py-20 lg:px-8">
        <div className="absolute inset-0 bg-[#04345d]/84" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl"><h2 className="text-3xl font-black leading-tight tracking-[-.04em] sm:text-5xl">Hablemos del siguiente paso para tu operación.</h2><p className="mt-4 text-lg leading-relaxed text-white/78">Cuéntanos qué quieres mejorar y diseñamos una ruta clara para empezar.</p></div>
          <AnalyticsLink href="/#contacto" contentId={`contact:${service.slug}:footer`} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#138ba3] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-[#0d708d]/25 transition hover:-translate-y-0.5 hover:bg-[#075b82]">Hablemos hoy <ArrowRight size={17} /></AnalyticsLink>
        </div>
      </section>

      <footer className="bg-[#042b4d] px-5 py-9 text-white lg:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between"><span>© 2026 Morbia. Tecnología para Puebla y Tlaxcala.</span><Link href="/" className="font-semibold text-[#6cf4e7] hover:text-white">Volver a Morbia</Link></div></footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  )
}
