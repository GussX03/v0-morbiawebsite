"use client"

import { useRef, type ReactNode } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP)

export default function ServiceMotion({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const select = gsap.utils.selector(scope)
    // Keep copy visible at all times; movement guides the reading order without hiding navigation or anchor destinations.
    gsap.from(select("[data-service-hero-copy] > *"), { y: 18, duration: .7, stagger: .08, ease: "power3.out" })
    gsap.from(select("[data-service-hero-image]"), { y: 24, scale: .98, duration: .85, ease: "power3.out" })
  }, { scope })

  return <div ref={scope}>{children}</div>
}
