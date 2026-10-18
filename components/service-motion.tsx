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
    ScrollTrigger.batch(select("[data-service-reveal]"), {
      start: "top 88%",
      once: true,
      onEnter: (elements) => {
        gsap.from(elements, { y: 26, autoAlpha: 0, duration: .68, stagger: .08, ease: "power3.out", overwrite: true })
        elements.forEach((element) => {
          const symbol = element.querySelector<HTMLElement>("[data-service-symbol]")
          if (symbol) gsap.from(symbol, { scale: .76, rotation: -10, duration: .58, delay: .1, ease: "back.out(1.6)", overwrite: true })
        })
      },
    })
  }, { scope })

  return <div ref={scope}>{children}</div>
}
