import "server-only"

import { unstable_cache } from "next/cache"

const CACHE_SECONDS = 60 * 60 * 6
const MORBIA_GOOGLE_MAPS_DATA_ID = "0xaaa0000f18d746cf:0x95d6e124df4644ed"
const MORBIA_GOOGLE_MAPS_URL = "https://www.google.com/maps/place/Morbia/@19.0400474,-98.1921822,12z/data=!3m1!4b1!4m6!3m5!1s0xaaa0000f18d746cf:0x95d6e124df4644ed!8m2!3d19.0400474!4d-98.1921822!16s%2Fg%2F11n3ppxs3r?entry=ttu"

type SerpApiReview = {
  review_id?: string
  link?: string
  rating?: number
  date?: string
  iso_date?: string
  snippet?: string
  user?: { name?: string; thumbnail?: string; local_guide?: boolean }
}

type SerpApiResponse = {
  error?: string
  place_info?: { title?: string; rating?: number; reviews?: number }
  reviews?: SerpApiReview[]
  serpapi_pagination?: { next_page_token?: string }
}

export type MorbiaReview = {
  id: string
  author: string
  avatar?: string
  rating: number
  date: string
  isoDate?: string
  text: string
  link?: string
  localGuide: boolean
}

export type MorbiaReviewsData = {
  businessName: string
  rating: number
  total: number
  mapsUrl?: string
  reviews: MorbiaReview[]
  source: "google" | "unavailable"
}

function unavailableData(): MorbiaReviewsData {
  return { businessName: "Morbia", rating: 0, total: 0, mapsUrl: MORBIA_GOOGLE_MAPS_URL, reviews: [], source: "unavailable" }
}

async function fetchGoogleReviews(): Promise<MorbiaReviewsData> {
  const apiKey = process.env.SERPAPI_API_KEY
  const dataId = process.env.MORBIA_GOOGLE_MAPS_DATA_ID || MORBIA_GOOGLE_MAPS_DATA_ID
  const mapsUrl = process.env.MORBIA_GOOGLE_MAPS_SHARE_URL || MORBIA_GOOGLE_MAPS_URL

  if (!apiKey) throw new Error("SERPAPI_API_KEY no está configurada.")

  const baseParams = { engine: "google_maps_reviews", data_id: dataId, hl: "es-419", sort_by: "qualityScore", api_key: apiKey }
  const requestPage = async (params: URLSearchParams) => {
    const response = await fetch("https://serpapi.com/search.json?" + params, { cache: "no-store", headers: { Accept: "application/json" } })
    const payload = (await response.json()) as SerpApiResponse
    if (!response.ok || payload.error) throw new Error(payload.error || "SerpAPI respondió con HTTP " + response.status)
    return payload
  }

  try {
    const firstPage = await requestPage(new URLSearchParams(baseParams))
    const pages = [firstPage.reviews || []]
    const nextPageToken = firstPage.serpapi_pagination?.next_page_token
    if (nextPageToken) {
      try {
        const secondPage = await requestPage(new URLSearchParams({ ...baseParams, next_page_token: nextPageToken, num: "20" }))
        pages.push(secondPage.reviews || [])
      } catch (error) {
        console.error("[Morbia reviews] No fue posible obtener la segunda página.", error)
      }
    }

    const reviews = pages.flat()
      .filter((review): review is SerpApiReview & { review_id: string; snippet: string } => Boolean(review.review_id && review.snippet && review.user?.name))
      .filter((review, index, all) => all.findIndex((item) => item.review_id === review.review_id) === index)
      .map((review) => ({
        id: review.review_id,
        author: review.user?.name || "Cliente de Morbia",
        avatar: review.user?.thumbnail,
        rating: review.rating || 0,
        date: review.date || "Opinión publicada en Google",
        isoDate: review.iso_date,
        text: review.snippet,
        link: review.link,
        localGuide: Boolean(review.user?.local_guide),
      }))

    return {
      businessName: firstPage.place_info?.title || "Morbia",
      rating: firstPage.place_info?.rating || 0,
      total: firstPage.place_info?.reviews || reviews.length,
      mapsUrl,
      reviews,
      source: reviews.length ? "google" : "unavailable",
    }
  } catch (error) {
    console.error("[Morbia reviews] No fue posible actualizar las opiniones.", error)
    throw error
  }
}

const getCachedMorbiaReviews = unstable_cache(fetchGoogleReviews, ["morbia-google-reviews-v3"], {
  revalidate: CACHE_SECONDS,
  tags: ["morbia-google-reviews"],
})

export async function getMorbiaReviews(): Promise<MorbiaReviewsData> {
  try {
    return await getCachedMorbiaReviews()
  } catch {
    // Failed requests are intentionally not cached, so a recovered provider is retried immediately.
    return unavailableData()
  }
}
