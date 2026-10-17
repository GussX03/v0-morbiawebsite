import web from "@/public/images/services/paginas-web.webp"
import chatbots from "@/public/images/services/chatbots.webp"
import automation from "@/public/images/services/automatizacion-de-procesos.webp"
import rpa from "@/public/images/services/rpa.webp"
import ai from "@/public/images/services/inteligencia-artificial.webp"
import data from "@/public/images/services/analisis-de-datos.webp"

// Static imports produce content-hashed URLs. A changed image gets a new URL,
// while unchanged artwork is shared across the catalog and detail pages.
export const serviceImages = {
  "paginas-web": web,
  chatbots,
  "automatizacion-de-procesos": automation,
  rpa,
  "inteligencia-artificial": ai,
  "analisis-de-datos": data,
} as const
