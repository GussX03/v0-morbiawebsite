import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Mail, Phone } from "lucide-react"
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok, FaWhatsapp } from "react-icons/fa6"
import AnalyticsLink from "@/components/analytics-link"
import { serviceApproach } from "@/lib/service-stories"

export function ServiceApproach() {
  return (
    <section className="service-section bg-[#eaf8fa]" id="como-empezamos">
      <div className="service-container">
        <div data-service-reveal className="max-w-3xl"><h2 className="service-heading">El primer paso es entender tu negocio.</h2><p className="service-lead">No necesitas llegar con una solución elegida. Basta con contarnos qué se está volviendo difícil y qué te gustaría que funcionara mejor.</p></div>
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {serviceApproach.map((step, index) => <li key={step.title} data-service-reveal className="relative border-t-2 border-[#a5d8df] pt-6"><span className="mb-5 block text-3xl font-black tracking-[-.04em] text-[#0b7e95]" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3 className="text-xl font-bold text-[#073b61]">{step.title}</h3><p className="mt-3 leading-7 text-[#496579]">{step.text}</p></li>)}
        </ol>
      </div>
    </section>
  )
}

export function ServiceContact({ service = "servicios" }: { service?: string }) {
  return (
    <section className="morbia-diagonal service-section relative isolate overflow-hidden text-white" id="hablemos">
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(3,36,68,.95),rgba(3,66,92,.8),rgba(3,103,118,.6))]" />
      <div className="service-container relative" data-service-reveal>
        <h2 className="max-w-3xl text-3xl font-black leading-[1.08] tracking-[-.04em] sm:text-5xl">Tu próximo avance empieza con una conversación.</h2>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#d4e9ed]">Cuéntanos qué te quita tiempo, qué necesitan tus clientes o qué quieres mejorar. Desde Puebla, acompañamos a empresas de Puebla y Tlaxcala a encontrar un punto de partida.</p>
        <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center"><AnalyticsLink href={`https://wa.me/522215268440?text=${encodeURIComponent(`Hola, me gustaría conocer las soluciones de Morbia. Me interesa: ${service}.`)}`} target="_blank" rel="noopener noreferrer" contentId={`contact:${service}:whatsapp`} contentType="contact" className="service-button">Hablemos hoy <ArrowRight size={18} /></AnalyticsLink><a href="mailto:contacto@morbia.com.mx" className="inline-flex items-center gap-2 rounded text-sm font-semibold text-[#d7eeee] transition hover:text-white"><Mail size={18} />contacto@morbia.com.mx</a></div>
      </div>
    </section>
  )
}

const socials = [
  ["Facebook", "https://www.facebook.com/share/1JCLHGkqxF/?mibextid=wwXIfr", FaFacebookF],
  ["Instagram", "https://www.instagram.com/morbia_mx?igsh=YTlva3FpMzIxeDNk", FaInstagram],
  ["TikTok", "https://www.tiktok.com/@morbiamx", FaTiktok],
  ["WhatsApp", "https://wa.me/522215268440", FaWhatsapp],
  ["LinkedIn", "https://www.linkedin.com/company/morbia/", FaLinkedinIn],
] as const

export function ServiceFooter() {
  return <footer className="bg-[#042b4d] py-12 text-white"><div className="service-container grid gap-9 md:grid-cols-[1fr_auto]"><div><Link href="/" aria-label="Ir al inicio de Morbia"><Image src="/images/main-logo.png" alt="Morbia" width={170} height={55} className="h-10 w-auto brightness-0 invert" /></Link><p className="mt-5 text-sm font-semibold tracking-[.1em] text-[#5eece3]">INTELIGENCIA ORBITANDO TUS PROCESOS</p><a href="tel:+522215268440" className="mt-5 inline-flex items-center gap-2 text-sm text-white/75 hover:text-white"><Phone size={16} /> (+52) 221 526 8440</a><p className="mt-3 text-sm text-white/60">© 2026 Morbia. Todos los derechos reservados.</p></div><div className="md:text-right"><p className="text-sm font-bold text-white/75">Síguenos</p><div className="mt-4 flex gap-3 md:justify-end">{socials.map(([label, href, Icon]) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white transition hover:border-[#27e3d5] hover:bg-[#08718a]"><Icon size={17} /></a>)}</div><div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-sm text-white/70 md:justify-end"><Link href="/#servicios" className="hover:text-white">Volver a la portada</Link><Link href="/servicios-tecnologicos-puebla-tlaxcala" className="hover:text-white">Todos los servicios</Link><Link href="/aviso-de-privacidad" className="hover:text-white">Privacidad</Link></div></div></div></footer>
}
