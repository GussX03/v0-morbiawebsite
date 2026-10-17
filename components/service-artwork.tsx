"use client"

import Image, { type StaticImageData } from "next/image"
import * as Dialog from "@radix-ui/react-dialog"
import { ExternalLink, Maximize2, X } from "lucide-react"

type ServiceArtworkProps = {
  image: StaticImageData
  alt: string
  title: string
  variant?: "hero" | "catalog"
  priority?: boolean
}

export default function ServiceArtwork({ image, alt, title, variant = "hero", priority = false }: ServiceArtworkProps) {
  const isHero = variant === "hero"

  return (
    <Dialog.Root onOpenChange={(open) => {
      if (open) window.gtag?.("event", "select_content", { content_type: "service_artwork", content_id: `artwork:${title}` })
    }}>
      <Dialog.Trigger asChild>
        <button type="button" aria-label={`Ver imagen completa: ${title}`} className="group block w-full rounded-xl text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#16b5bd]">
          <span className={`service-photo block transition-shadow duration-300 group-hover:shadow-[0_16px_45px_rgba(1,24,51,.25)] ${isHero ? "service-artwork border border-white/20 shadow-[0_24px_65px_rgba(1,24,51,.25)]" : "service-catalog-image service-catalog-poster border border-[#87afb6]/20 shadow-[0_12px_30px_rgba(4,55,73,.14)]"}`} style={{ aspectRatio: `${image.width}/${image.height}` }}>
            <Image src={image} alt={alt} fill priority={priority} placeholder={isHero ? "blur" : "empty"} sizes={isHero ? "(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) 480px, 480px" : "(max-width: 639px) calc(100vw - 80px), 352px"} className="object-contain" />
          </span>
          <span className={`mt-3 flex items-center justify-center gap-2 text-xs font-medium ${isHero ? "text-[#c2e0e6]" : "text-[#426e80]"}`}><Maximize2 size={14} aria-hidden="true" /> Ver imagen completa</span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="service-lightbox-overlay fixed inset-0 z-[60] bg-[#021a2d]/95 backdrop-blur-sm" />
        <Dialog.Content className="service-lightbox fixed left-1/2 top-1/2 z-[70] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/15 bg-[#042538] shadow-[0_24px_90px_rgba(0,10,25,.45)] outline-none" style={{ width: `min(92vw, calc((100dvh - 8rem) * ${image.width / image.height}))`, aspectRatio: `${image.width}/${image.height}` }}>
          <Dialog.Title className="sr-only">{title}: imagen completa</Dialog.Title>
          <Image src={image} alt={alt} fill loading="eager" sizes="(max-width: 639px) 92vw, 75vw" className="rounded-xl object-contain" />
          <Dialog.Close asChild><button type="button" aria-label="Cerrar imagen" className="absolute -top-14 right-0 grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-[#073b59] text-white transition hover:bg-[#0b7184] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#74e5df]"><X size={22} /></button></Dialog.Close>
          <Dialog.Description className="sr-only">{title}. La imagen se muestra completa. Puedes cerrar con Escape, con el botón de cerrar o pulsando fuera de la imagen.</Dialog.Description>
          <a href={image.src} target="_blank" rel="noopener noreferrer" className="absolute left-0 top-full mt-3 inline-flex w-full items-center justify-center gap-2 rounded text-center text-xs font-medium leading-6 text-[#d0e4e9] transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#74e5df]">Abrir a tamaño original <ExternalLink size={14} aria-hidden="true" /></a>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
