import type React from "react"
import type { Metadata } from "next"
import { Figtree, Source_Serif_4 } from "next/font/google"
import { AnalyticsConsentManager } from "@/components/analytics-consent"
import { servicePages, siteUrl } from "@/lib/seo-content"
import "./globals.css"

const morbiaFont = Figtree({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-morbia", display: "swap" })
const morbiaDisplayFont = Source_Serif_4({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-morbia-display", display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Morbia | Presencia digital, tecnología e IA en Puebla y Tlaxcala",
    template: "%s | Morbia",
  },
  description: "Marketing y presencia digital con SEO, Google Maps, redes, foto, video y campañas, además de páginas web, chatbots, inteligencia artificial y automatización.",
  keywords: [
    "servicios de tecnología en Puebla",
    "servicios de tecnología en Tlaxcala",
    "chatbot Puebla",
    "chatbot Tlaxcala",
    "páginas web Puebla",
    "páginas web Tlaxcala",
    "RPA Tlaxcala",
    "inteligencia artificial Tlaxcala",
    "optimización de procesos Tlaxcala",
    "flujos de trabajo Tlaxcala",
    "presencia digital",
    "marketing digital",
    "SEO local",
    "automatización de procesos",
    "inteligencia artificial para empresas",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "SNflDTQhYZt8u6L-S1319VL9nO-BOHKCn8AMwLlWNEk",
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: siteUrl,
    siteName: "Morbia",
    title: "Morbia | Presencia digital y tecnología para empresas",
    description: "SEO, Google Maps, contenido para redes, foto, video, campañas, páginas web, chatbots, automatización, IA y análisis de datos.",
    images: [
      {
        url: "/images/morbia-diagonal-bg.jpg",
        width: 1024,
        height: 1024,
        alt: "Morbia, inteligencia orbitando tus procesos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Morbia | Presencia digital y tecnología para empresas",
    description: "SEO, Google Maps, redes sociales, fotografía, video, anuncios, páginas web, chatbots e inteligencia artificial.",
    images: ["/images/morbia-diagonal-bg.jpg"],
  },
  generator: "Morbia",
  icons: {
    icon: [
      {
        url: "/favicon.png",
        sizes: "256x256",
        type: "image/png",
      },
    ],
  },
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Morbia",
      url: siteUrl,
      logo: `${siteUrl}/images/main-logo.png`,
      description: "Morbia ofrece presencia digital, SEO, Google Maps, gestión de redes sociales, fotografía y video, campañas digitales y soluciones tecnológicas para empresas.",
      email: "contacto@morbia.com.mx",
      telephone: "+52-221-526-8440",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Puebla",
        addressRegion: "Puebla",
        addressCountry: "MX",
      },
      areaServed: [
        { "@type": "Country", name: "México" },
        { "@type": "City", name: "Puebla, Puebla, México" },
        { "@type": "State", name: "Tlaxcala, México" },
      ],
      sameAs: [
        "https://www.facebook.com/p/Morbia-61577588638869/",
        "https://www.instagram.com/morbia_mx/",
        "https://www.tiktok.com/@morbiamx",
        "https://www.linkedin.com/company/morbia/",
        "https://www.google.com/maps/place/Morbia/@19.0400474,-98.1921822,12z/data=!3m1!4b1!4m6!3m5!1s0xaaa0000f18d746cf:0x95d6e124df4644ed!8m2!3d19.0400474!4d-98.1921822!16s%2Fg%2F11n3ppxs3r",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios tecnológicos de Morbia",
        itemListElement: servicePages.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            url: `${siteUrl}/servicios/${service.slug}`,
            provider: { "@id": `${siteUrl}/#organization` },
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Morbia",
      inLanguage: "es-MX",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es-MX" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${morbiaFont.variable} ${morbiaDisplayFont.variable}`}>
        <AnalyticsConsentManager />
        {children}
      </body>
    </html>
  )
}
