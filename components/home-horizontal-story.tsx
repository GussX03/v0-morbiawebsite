"use client"

import { useRef } from "react"
import { ArrowRight, BarChart3, BadgeCheck, GitBranch, Globe2, Gauge, Sparkles, Workflow } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const chapters = [
  {
    eyebrow: "ENTENDEMOS",
    firstLine: "Dale personalidad",
    accent: "a tus procesos.",
    description: "Cada negocio tiene su ritmo. Escuchamos cómo trabaja tu equipo y diseñamos tecnología que se mueve contigo.",
    labels: ["A TU MEDIDA", "PERSONAS PRIMERO"],
    icon: Globe2,
    visual: "orbit",
  },
  {
    eyebrow: "CONECTAMOS",
    firstLine: "Cada paso",
    accent: "en sintonía.",
    description: "Páginas, automatización e inteligencia conectan tareas y personas a lo largo de tu operación.",
    labels: ["MENOS FRICCIÓN", "MEJOR ATENCIÓN"],
    icon: Workflow,
    visual: "flow",
  },
  {
    eyebrow: "AVANZAS",
    firstLine: "Más espacio",
    accent: "para crecer.",
    description: "Con procesos claros, tu equipo puede atender, crear y tomar decisiones con información útil.",
    labels: ["TIEMPO PARA CRECER", "TECNOLOGÍA ÚTIL"],
    icon: BarChart3,
    visual: "bars",
  },
  {
    eyebrow: "SIGUES CRECIENDO",
    firstLine: "La mejora",
    accent: "sigue contigo.",
    description: "La tecnología evoluciona junto con tu negocio. Ajustamos cada solución para que siga siendo útil mientras tus metas cambian.",
    labels: ["CAPACIDAD PARA CRECER", "CAMBIOS QUE SUMAN"],
    icon: BadgeCheck,
    visual: "focus",
  },
] as const

function ChapterVisual({ type }: { type: (typeof chapters)[number]["visual"] }) {
  if (type === "orbit") {
    return <div aria-hidden="true" className="story-orbit relative grid h-56 w-56 place-items-center sm:h-72 sm:w-72"><div className="absolute inset-3 rounded-full border border-[#55eee2]/35" /><div className="absolute inset-10 rotate-[-30deg] rounded-[50%] border border-[#55eee2]/50" /><div className="absolute right-7 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[#73fff0] shadow-[0_0_24px_#73fff0]" /><Globe2 className="h-24 w-24 text-[#73fff0] sm:h-32 sm:w-32" strokeWidth={1} /></div>
  }
  if (type === "flow") {
    return <div aria-hidden="true" className="story-flow"><div className="story-flow-node"><GitBranch size={25} /><span>Personas</span></div><div className="story-flow-line"><span /></div><div className="story-flow-node"><Workflow size={25} /><span>Procesos</span></div><div className="story-flow-line"><span /></div><div className="story-flow-node"><ArrowRight size={25} /><span>Clientes</span></div></div>
  }
  if (type === "focus") return <div aria-hidden="true" className="story-focus"><div className="story-focus-ring"><Gauge className="h-24 w-24 text-[#77f4e6] sm:h-32 sm:w-32" strokeWidth={1.1} /></div><Sparkles className="story-focus-spark story-focus-spark-a" /><Sparkles className="story-focus-spark story-focus-spark-b" /></div>
  return <div aria-hidden="true" className="story-chart"><div className="story-chart-heading"><BarChart3 size={22} /><span>Más claridad para decidir</span></div><div className="story-chart-bars"><span className="story-bar h-[35%]" /><span className="story-bar h-[54%]" /><span className="story-bar h-[72%]" /><span className="story-bar h-full" /></div></div>
}

export default function HomeHorizontalStory() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    const track = section?.querySelector<HTMLElement>("[data-story-track]")
    if (!section || !track) return

    const media = gsap.matchMedia()
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const getTravel = () => Math.max(0, track.scrollWidth - section.clientWidth)
      gsap.set(track, { width: "max-content", overflow: "visible", scrollSnapType: "none" })
      const horizontalTween = gsap.to(track, {
        x: () => -getTravel(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getTravel() * 1.6}`,
          pin: true,
          scrub: 0.45,
          snap: { snapTo: 1 / (chapters.length - 1), duration: { min: 0.55, max: 1.15 }, delay: 0.22, ease: "power1.out" },
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })
      const panels = gsap.utils.toArray<HTMLElement>(section.querySelectorAll("[data-story-panel]"))
      const firstPanel = panels[0]
      if (firstPanel) {
        gsap.fromTo(firstPanel.querySelectorAll("[data-story-reveal]"),
          { y: 22, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: section, start: "top 96%", end: "top 68%", scrub: 0.35 } },
        )
      }
      panels.slice(1).forEach((panel) => {
        gsap.fromTo(panel.querySelectorAll("[data-story-reveal]"),
          { y: 22, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: panel, containerAnimation: horizontalTween, start: "left 94%", end: "left 48%", scrub: 0.35 } },
        )
      })
    })
    return () => media.revert()
  }, { scope: sectionRef, dependencies: [] })

  return (
    <section ref={sectionRef} aria-label="Cómo la tecnología acompaña el crecimiento de tu negocio" className="home-story relative isolate overflow-hidden text-white">
      <div aria-hidden="true" className="absolute inset-0 morbia-diagonal" />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(110deg,rgba(3,35,65,.96),rgba(3,65,91,.9),rgba(0,111,119,.78))]" />
      <div data-story-track role="region" aria-label="Recorrido: entendemos, conectamos, avanzamos y seguimos creciendo" tabIndex={0} className="home-story-track relative z-10">
        {chapters.map(({ eyebrow, firstLine, accent, description, labels, icon: Icon, visual }, index) => (
          <article key={eyebrow} data-story-panel className={`home-story-panel home-story-panel-${index + 1}`}>
            <div className="home-story-kicker" data-story-reveal><span>{eyebrow}</span><span className="home-story-kicker-line" /></div>
            <div className="home-story-type" data-story-reveal>
              {index === 0 && <h2 className="home-story-overline">Tecnología que se mueve contigo</h2>}
              {index > 0 && <p className="home-story-overline">INTELIGENCIA ORBITANDO TUS PROCESOS</p>}
              <p className="home-story-headline"><span>{firstLine}</span><span className="home-story-outline">{accent}</span></p>
            </div>
            <div className="home-story-art" data-story-reveal data-story-symbol><ChapterVisual type={visual} /></div>
            <div className="home-story-label home-story-label-a" data-story-reveal><Icon size={17} />{labels[0]}</div>
            <div className="home-story-label home-story-label-b" data-story-reveal>{labels[1]}</div>
            <p className="home-story-description" data-story-reveal>{description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
