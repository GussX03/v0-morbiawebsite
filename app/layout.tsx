import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Morbia",
  description: "Creado por Morbia",
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
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
