import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"

export const metadata: Metadata = {
  title: "Morbia | Inteligencia orbitando tus procesos",
  description: "Soluciones tecnológicas, automatización e inteligencia artificial para impulsar tu negocio.",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es-MX">
      <head>
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
