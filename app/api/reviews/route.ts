import { NextResponse } from "next/server"
import { getMorbiaReviews } from "@/lib/morbia-reviews"

export async function GET() {
  const reviews = await getMorbiaReviews()
  return NextResponse.json(reviews, {
    headers: { "Cache-Control": "no-store, max-age=0" },
  })
}
