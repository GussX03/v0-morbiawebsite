import type { MetadataRoute } from "next"

const siteUrl = "https://www.morbia.com.mx"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/aviso-de-privacidad`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}/servicios-tecnologicos-puebla-tlaxcala`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ]
}
