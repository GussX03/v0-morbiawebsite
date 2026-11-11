import type { MetadataRoute } from "next"
import { servicePages } from "@/lib/seo-content"

const siteUrl = "https://www.morbia.com.mx"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/aviso-de-privacidad`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}/servicios-tecnologicos-puebla-tlaxcala`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...servicePages.map(({ slug }) => ({
      url: `${siteUrl}/servicios/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ]
}
