"use client"

import Link from "next/link"
import type { ComponentProps } from "react"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

type AnalyticsLinkProps = ComponentProps<typeof Link> & {
  contentId: string
  contentType?: string
}

export default function AnalyticsLink({
  contentId,
  contentType = "internal_navigation",
  onClick,
  ...props
}: AnalyticsLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) {
          window.gtag?.("event", "select_content", {
            content_type: contentType,
            content_id: contentId,
          })
        }
      }}
    />
  )
}
