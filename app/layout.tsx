import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { siteUrl } from "@/lib/seo-content"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Morbia | IA, chatbots y páginas web en Puebla y Tlaxcala",
    template: "%s | Morbia",
  },
  description: "Morbia crea páginas web, chatbots con IA, RPA, automatización de procesos, flujos de trabajo y análisis de datos para empresas en Puebla y Tlaxcala.",
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
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: siteUrl,
    siteName: "Morbia",
    title: "Morbia | Tecnología para empresas en Puebla y Tlaxcala",
    description: "Páginas web, chatbots con IA, RPA, automatización de procesos y análisis de datos para empresas en Puebla y Tlaxcala.",
    images: [
      {
        url: "/images/morbia-diagonal-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Morbia, inteligencia orbitando tus procesos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Morbia | Tecnología para empresas en Puebla y Tlaxcala",
    description: "Páginas web, chatbots con IA, RPA, automatización de procesos y análisis de datos.",
    images: ["/images/morbia-diagonal-bg.jpg"],
  },
  generator: "Morbia",
  icons: {
    icon: [
      {
        url: "/favicon.png",
        sizes: "16x16",
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
      description: "Morbia crea páginas web, chatbots con IA, RPA, automatización de procesos, flujos de trabajo y análisis de datos para empresas en Puebla y Tlaxcala.",
      email: "contacto@morbia.com.mx",
      telephone: "+52-221-526-8440",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Puebla",
        addressRegion: "Puebla",
        addressCountry: "MX",
      },
      areaServed: [
        { "@type": "City", name: "Puebla, Puebla, México" },
        { "@type": "State", name: "Tlaxcala, México" },
      ],
      sameAs: [
        "https://www.facebook.com/share/1JCLHGkqxF/?mibextid=wwXIfr",
        "https://www.instagram.com/morbia_mx?igsh=YTlva3FpMzIxeDNk",
        "https://www.tiktok.com/@morbiamx",
        "https://www.linkedin.com/company/morbia/",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios tecnológicos de Morbia",
        itemListElement: [
          "Aplicaciones web",
          "Chatbots",
          "Automatizaciones",
          "RPA",
          "Inteligencia artificial",
          "Análisis de datos",
        ].map((name) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name,
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
    <html lang="es-MX">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XF3NM0ZLF8"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XF3NM0ZLF8');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
