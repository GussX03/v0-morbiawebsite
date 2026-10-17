"use client"

import { useRef, type ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function ServiceMotion({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const select = gsap.utils.selector(scope)
    // Keep copy visible at all times; movement guides the reading order without hiding navigation or anchor destinations.
    gsap.from(select("[data-service-hero-copy] > *"), { y: 18, duration: .7, stagger: .08, ease: "power3.out" })
    gsap.from(select("[data-service-hero-image]"), { y: 24, scale: .98, duration: .85, ease: "power3.out" })
    gsap.utils.toArray<HTMLElement>(select("[data-service-reveal]")).forEach((element) => {
      gsap.from(element, { y: 25, duration: .65, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 92%", once: true } })
    })
  }, { scope })

  return <div ref={scope}>{children}</div>
}
