"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { ArrowUpRight, ChevronLeft, ChevronRight, Star } from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import type { MorbiaReview, MorbiaReviewsData } from "@/lib/morbia-reviews"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const PAGE_SIZE = 3

const initialData: MorbiaReviewsData = {
  businessName: "Morbia",
  rating: 0,
  total: 0,
  mapsUrl: "https://www.google.com/maps/place/Morbia/@19.0400474,-98.1921822,12z/data=!3m1!4b1!4m6!3m5!1s0xaaa0000f18d746cf:0x95d6e124df4644ed!8m2!3d19.0400474!4d-98.1921822!16s%2Fg%2F11n3ppxs3r?entry=ttu",
  source: "unavailable",
  reviews: [],
}

function initials(name: string) {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase()
}

function Stars({ rating, size = 15 }: { rating: number; size?: number }) {
  return <span className="inline-flex gap-0.5 text-[#ffcc4d]" aria-label={rating + " de 5 estrellas"}>
    {Array.from({ length: 5 }, (_, index) => <Star key={index} size={size} fill={index < Math.round(rating) ? "currentColor" : "none"} strokeWidth={1.7} />)}
  </span>
}

function Avatar({ review, large = false }: { review: MorbiaReview; large?: boolean }) {
  const [failed, setFailed] = useState(false)
  return <span className={"grid shrink-0 place-items-center overflow-hidden rounded-full bg-[#19e0d0] text-xs font-black text-[#05335c] " + (large ? "h-14 w-14" : "h-11 w-11")}>
    {review.avatar && !failed ? <img src={review.avatar} alt="" className="h-full w-full object-cover" referrerPolicy="no-referrer" onError={() => setFailed(true)} /> : initials(review.author)}
  </span>
}

export default function MorbiaReviewsExplorer() {
  const [data, setData] = useState<MorbiaReviewsData>(initialData)
  const [page, setPage] = useState(0)
  const [selectedId, setSelectedId] = useState(initialData.reviews[0]?.id || "")
  const explorerRef = useRef<HTMLDivElement>(null)
  const featuredRef = useRef<HTMLElement>(null)
  const pageCount = Math.max(1, Math.ceil(data.reviews.length / PAGE_SIZE))
  const pageReviews = useMemo(() => data.reviews.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE), [data.reviews, page])
  const selectedReview = data.reviews.find((review) => review.id === selectedId) || pageReviews[0]

  useEffect(() => {
    const controller = new AbortController()
    fetch("/api/reviews", { signal: controller.signal, cache: "no-store" })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("No fue posible cargar opiniones.")))
      .then((nextData: MorbiaReviewsData) => {
        setData(nextData)
        setPage(0)
        setSelectedId(nextData.reviews[0]?.id || "")
      })
      .catch(() => undefined)
    return () => controller.abort()
  }, [])

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const select = gsap.utils.selector(explorerRef)
    gsap.from(select("[data-review-reveal]"), {
      autoAlpha: 0,
      y: 20,
      duration: 0.55,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: { trigger: explorerRef.current, start: "top 78%", once: true },
    })
  }, { scope: explorerRef })

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !featuredRef.current) return
    gsap.fromTo(featuredRef.current, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.42, ease: "power3.out", overwrite: true })
  }, [selectedId])

  const changePage = (nextPage: number) => {
    const safePage = Math.min(Math.max(nextPage, 0), pageCount - 1)
    const nextReviews = data.reviews.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE)
    setPage(safePage)
    setSelectedId(nextReviews[0]?.id || "")
  }

  if (!selectedReview) return <div ref={explorerRef}>
    <div data-review-reveal className="mb-6 flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div className="max-w-3xl"><p className="text-sm font-bold tracking-[.14em] text-[#008eaa]">OPINIONES VERIFICADAS</p><h2 className="mt-3 text-3xl font-black tracking-[-.045em] sm:text-4xl">Conoce las opiniones de Morbia en Google.</h2><p className="mt-3 text-base leading-relaxed text-[#527082]">El perfil público de Google Maps es la fuente oficial de nuestras opiniones.</p></div>{data.mapsUrl && <a className="group flex min-w-52 items-center gap-4 self-start rounded-3xl border border-[#d4ebf2] bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-[#10c8c0] lg:self-auto" href={data.mapsUrl} target="_blank" rel="noreferrer"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#eaf9fc]"><FcGoogle size={25} aria-hidden="true" /></span><span><strong className="block text-xl text-[#06345f]">Google Maps</strong><span className="mt-1 block text-xs text-[#527082]">Ver perfil verificado</span></span><ArrowUpRight className="ml-auto text-[#00aeb7]" size={18} /></a>}</div>
    <div data-review-reveal className="morbia-diagonal relative overflow-hidden rounded-[2rem] p-7 text-white shadow-2xl shadow-[#00587a]/20 sm:p-8"><div className="absolute inset-0 bg-[#04345d]/84" /><div className="relative max-w-2xl"><span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold tracking-[.12em]">GOOGLE REVIEWS</span><h3 className="mt-5 text-2xl font-black tracking-[-.04em] sm:text-3xl">Las opiniones se publican directamente desde nuestro perfil de Google.</h3><p className="mt-3 text-base leading-relaxed text-white/75">Estamos conectando la fuente para mostrarlas aquí. Mientras tanto, puedes consultarlas sin intermediarios.</p>{data.mapsUrl && <a href={data.mapsUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#19e0d0] px-5 py-3 text-sm font-bold text-[#05335c]">Ver opiniones en Google <ArrowUpRight size={16} /></a>}</div></div>
  </div>

  return <div ref={explorerRef}>
    <div data-review-reveal className="mb-6 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
      <div className="max-w-3xl">
        <p className="text-sm font-bold tracking-[.14em] text-[#008eaa]">OPINIONES VERIFICADAS</p>
        <h2 className="mt-3 text-3xl font-black tracking-[-.045em] sm:text-4xl">{data.source === "google" ? "Experiencias reales, publicadas en Google." : "Conoce las opiniones de Morbia en Google."}</h2>
        <p className="mt-3 text-base leading-relaxed text-[#527082]">{data.source === "google" ? "Selecciona una opinión para leerla a detalle o consulta su publicación original." : "El perfil público de Google Maps es la fuente oficial de nuestras opiniones."}</p>
      </div>
      {data.mapsUrl && <a className="group flex min-w-52 items-center gap-4 self-start rounded-3xl border border-[#d4ebf2] bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-[#10c8c0] lg:self-auto" href={data.mapsUrl} target="_blank" rel="noreferrer">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#eaf9fc]"><FcGoogle size={25} aria-hidden="true" /></span>
        <span><strong className="block text-xl text-[#06345f]">{data.source === "google" ? data.rating.toFixed(1) : "Google Maps"}</strong><span className="mt-1 flex items-center gap-2 text-xs text-[#527082]">{data.source === "google" ? <><Stars rating={data.rating} size={12} /> {data.total} opiniones</> : "Ver perfil verificado"}</span></span>
        <ArrowUpRight className="ml-auto text-[#00aeb7]" size={18} />
      </a>}
    </div>

    <div className="grid gap-4 lg:grid-cols-[1.08fr_.92fr]">
      <article ref={featuredRef} data-review-reveal className="morbia-diagonal relative flex min-h-[330px] flex-col justify-between overflow-hidden rounded-[2rem] p-6 text-white shadow-2xl shadow-[#00587a]/20 sm:p-7">
        <div className="absolute inset-0 bg-[#04345d]/84" />
        <div className="relative flex items-center justify-between"><span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold tracking-[.12em]">{data.source === "google" ? "GOOGLE REVIEWS" : "CLIENTE MORBIA"}</span><Stars rating={selectedReview.rating} size={16} /></div>
        <blockquote className="relative my-6 max-w-2xl text-xl font-bold leading-snug tracking-[-.025em] sm:text-2xl">“{selectedReview.text}”</blockquote>
        <div className="relative flex items-center justify-between gap-4 border-t border-white/15 pt-4">
          <div className="flex items-center gap-3"><Avatar review={selectedReview} large /><span><strong className="block text-sm">{selectedReview.author}</strong><span className="text-xs text-white/65">{selectedReview.localGuide ? "Local Guide · " : ""}{selectedReview.date}</span></span></div>
          {selectedReview.link && <a href={selectedReview.link} target="_blank" rel="noreferrer" aria-label="Ver opinión original" className="shrink-0 text-[#55f5e8] hover:text-white"><ArrowUpRight size={18} /></a>}
        </div>
      </article>

      <div data-review-reveal className="overflow-hidden rounded-[2rem] border border-[#cde7ee] bg-white">
        <div className="flex min-h-14 items-center justify-between gap-4 px-4"><div><strong className="text-sm">{data.reviews.length} opiniones destacadas</strong><span className="ml-2 text-xs text-[#68818f]">{data.source === "google" ? "de " + data.total + " publicadas" : "de nuestros clientes"}</span></div><span className="text-xs text-[#68818f]">{page + 1} / {pageCount}</span></div>
        <div className="border-t border-[#d8edf2]">{pageReviews.map((review) => <button key={review.id} onClick={() => setSelectedId(review.id)} aria-pressed={selectedReview.id === review.id} className={"grid min-h-[76px] w-full grid-cols-[40px_minmax(0,1fr)_auto] items-center gap-3 border-b border-[#d8edf2] px-4 text-left transition " + (selectedReview.id === review.id ? "bg-[#eaf9fc] shadow-[inset_3px_0_0_#10c8c0]" : "hover:bg-[#f4fbff]")}><Avatar review={review} /><span className="min-w-0"><span className="flex items-center justify-between gap-3"><strong className="truncate text-sm">{review.author}</strong><Stars rating={review.rating} size={11} /></span><span className="mt-1 block truncate text-xs text-[#527082]">{review.text}</span><span className="mt-1 block text-[11px] text-[#7f96a2]">{review.date}</span></span><ChevronRight className="text-[#00aeb7]" size={17} /></button>)}</div>
        {pageCount > 1 && <div className="grid min-h-14 grid-cols-[1fr_auto_1fr] items-center gap-3 px-4"><button onClick={() => changePage(page - 1)} disabled={page === 0} className="justify-self-start rounded-full border border-[#cde7ee] px-3 py-1.5 text-xs font-bold disabled:opacity-35"><ChevronLeft className="mr-1 inline" size={14} />Anterior</button><div className="flex gap-1.5">{Array.from({ length: pageCount }, (_, index) => <i key={index} className={"h-1.5 w-1.5 rounded-full " + (index === page ? "bg-[#00bcb9]" : "bg-[#cde7ee]")} />)}</div><button onClick={() => changePage(page + 1)} disabled={page === pageCount - 1} className="justify-self-end rounded-full border border-[#cde7ee] px-3 py-1.5 text-xs font-bold disabled:opacity-35">Siguiente<ChevronRight className="ml-1 inline" size={14} /></button></div>}
      </div>
    </div>
  </div>
}
