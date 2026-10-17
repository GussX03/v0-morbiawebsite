import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BarChart3, Bot, BrainCircuit, Code2, MapPin, Workflow, Zap } from "lucide-react"
import { regionalCapabilities, regionalServiceGroups, siteUrl } from "@/lib/seo-content"

const icons = [Code2, Bot, Workflow, Zap, BrainCircuit, BarChart3]

export const metadata: Metadata = {
  title: "Servicios de tecnología en Puebla y Tlaxcala",
  description: "Páginas web, chatbots con IA, RPA, automatización de procesos, flujos de trabajo y análisis de datos para empresas de Puebla y Tlaxcala.",
  alternates: {
    canonical: "/servicios-tecnologicos-puebla-tlaxcala",
  },
  openGraph: {
    title: "Servicios de tecnología en Puebla y Tlaxcala | Morbia",
    description: "Tecnología aplicada para empresas: páginas web, chatbots, automatización, RPA, IA y datos.",
    url: `${siteUrl}/servicios-tecnologicos-puebla-tlaxcala`,
  },
}

const pageUrl = `${siteUrl}/servicios-tecnologicos-puebla-tlaxcala`

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: "Servicios de tecnología en Puebla y Tlaxcala",
      description: "Capacidades de Morbia para empresas de Puebla y Tlaxcala: páginas web, chatbots, RPA, automatización, inteligencia artificial y análisis de datos.",
      inLanguage: "es-MX",
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#organization` },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: regionalCapabilities.length,
        itemListElement: regionalCapabilities.map((name, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
        })),
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Servicios de tecnología en Puebla y Tlaxcala", item: pageUrl },
      ],
    },
  ],
}

export default function ServiciosTecnologicosPueblaTlaxcalaPage() {
  return (
    <main className="min-h-[100dvh] overflow-x-clip bg-[#f4fbff] text-[#062b52]">
      <header className="morbia-header-scrolled relative z-10 border-b border-white/10 text-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="/" aria-label="Ir al inicio de Morbia">
            <Image src="/images/main-logo.png" alt="Morbia" width={160} height={50} className="h-9 w-auto brightness-0 invert" priority />
          </Link>
          <Link href="/#contacto" className="inline-flex items-center gap-2 rounded-full bg-[#138ba3] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#0d708d]/25 transition hover:-translate-y-0.5 hover:bg-[#075b82]">Hablemos hoy <ArrowRight size={16} /></Link>
        </div>
      </header>

      <section className="morbia-diagonal relative isolate overflow-hidden px-5 py-20 text-white sm:py-28 lg:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(3,29,61,.94),rgba(3,58,87,.74),rgba(3,89,106,.5))]" />
        <div className="morbia-grid absolute inset-0 opacity-25" />
        <div className="relative mx-auto max-w-5xl">
          <p className="text-sm font-bold tracking-[.14em] text-[#68f6e8]">MORBIA PARA PUEBLA Y TLAXCALA</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[.98] tracking-[-.05em] sm:text-6xl">Servicios de tecnología para empresas que necesitan avanzar con claridad.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/80 sm:text-xl">Morbia diseña páginas web, chatbots con inteligencia artificial, automatización de procesos, RPA, flujos de trabajo y análisis de datos para empresas de Puebla y Tlaxcala.</p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-white/85">
            <span className="inline-flex items-center gap-2"><MapPin size={18} className="text-[#69f6e9]" />Puebla, Puebla</span>
            <span className="inline-flex items-center gap-2"><MapPin size={18} className="text-[#69f6e9]" />Atención en Tlaxcala</span>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black leading-tight tracking-[-.04em] sm:text-5xl">De una necesidad concreta a una solución que sí se usa.</h2>
            <p className="mt-5 text-lg leading-relaxed text-[#496579]">Estas capacidades se organizan en seis áreas para que ubiques rápido el problema que quieres resolver. Partimos de tu operación y adaptamos la solución a la forma en que trabaja tu equipo.</p>
          </div>

          <div className="mt-14 grid gap-x-12 gap-y-14 lg:grid-cols-2">
            {regionalServiceGroups.map((group, index) => {
              const Icon = icons[index]!
              return (
                <article key={group.title} className="border-t border-[#b9dfe6] pt-6">
                  <div className="flex items-start gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#dff8f7] text-[#067f91] shadow-[0_10px_26px_rgba(4,112,133,.12)]"><Icon size={24} strokeWidth={1.8} /></span>
                    <div>
                      <h2 className="text-2xl font-black tracking-[-.03em] text-[#083c67]">{group.title}</h2>
                      <p className="mt-2 max-w-xl leading-relaxed text-[#527082]">{group.description}</p>
                    </div>
                  </div>
                  <div className="mt-7 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                    {group.capabilities.map((capability) => <p key={capability} className="border-l-2 border-[#18c8c1] pl-3 text-sm font-semibold leading-relaxed text-[#175879]">{capability}</p>)}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="morbia-diagonal relative overflow-hidden px-5 py-16 text-white sm:py-20 lg:px-8">
        <div className="absolute inset-0 bg-[#04345d]/84" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black leading-tight tracking-[-.04em] sm:text-5xl">Hablemos de lo que hoy frena tu operación.</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/78">Cuéntanos qué proceso consume tiempo, qué conversación se queda sin respuesta o qué información falta para decidir. Diseñamos el siguiente paso contigo.</p>
          </div>
          <Link href="/#contacto" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#138ba3] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-[#0d708d]/25 transition hover:-translate-y-0.5 hover:bg-[#075b82]">Hablemos hoy <ArrowRight size={17} /></Link>
        </div>
      </section>

      <footer className="bg-[#042b4d] px-5 py-9 text-white lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Morbia. Tecnología para Puebla y Tlaxcala.</span>
          <Link href="/" className="font-semibold text-[#6cf4e7] hover:text-white">Volver a Morbia</Link>
        </div>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  )
}
