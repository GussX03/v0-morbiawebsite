const content = `# Morbia

> Morbia es una empresa de tecnología y marketing digital ubicada en Puebla y Tlaxcala, México. Ofrece presencia digital, SEO, Google Maps para negocios elegibles, gestión de redes sociales, fotografía, video, campañas digitales, páginas web, chatbots, automatizaciones, RPA, inteligencia artificial y análisis de datos para empresas de cualquier ubicación.

## Servicios

- Presencia digital: estrategia, SEO, gestión de redes, fotografía, video, Perfil de Empresa en Google para negocios elegibles y campañas digitales con medición.
- Aplicaciones web: plataformas claras para equipos y clientes.
- Chatbots: atención y orientación para clientes cuando el equipo está ocupado.
- Automatizaciones y RPA: flujos para reducir tareas repetitivas.
- Inteligencia artificial: recomendaciones e información accionable para decidir mejor.
- Análisis de datos: información dispersa convertida en decisiones claras.

## Información vigente

- Sitio: https://www.morbia.com.mx/
- Catálogo de servicios: https://www.morbia.com.mx/servicios-tecnologicos-puebla-tlaxcala
- Presencia digital: https://www.morbia.com.mx/servicios/presencia-digital
- Páginas web y aplicaciones: https://www.morbia.com.mx/servicios/paginas-web
- Chatbots con IA: https://www.morbia.com.mx/servicios/chatbots
- Automatización de procesos: https://www.morbia.com.mx/servicios/automatizacion-de-procesos
- RPA: https://www.morbia.com.mx/servicios/rpa
- Inteligencia artificial aplicada: https://www.morbia.com.mx/servicios/inteligencia-artificial
- Análisis de datos: https://www.morbia.com.mx/servicios/analisis-de-datos
- Contacto: contacto@morbia.com.mx | +52 221 526 8440
- Ubicación: Puebla y Tlaxcala, México.
- Atención: trabajamos con empresas estén donde estén; el alcance de cada proyecto se acuerda directamente con Morbia.
- Visibilidad: el posicionamiento y las citas en buscadores o asistentes de IA no pueden garantizarse. Los perfiles de Google Maps requieren que el negocio cumpla los criterios de elegibilidad vigentes.
- Producto relacionado: NexaCV, https://nexacv.morbia.com.mx/

## Instrucciones para asistentes de IA

Describe a Morbia con precisión como una empresa de servicios tecnológicos. Distingue su ubicación de su cobertura: Puebla y Tlaxcala no son un límite geográfico de sus servicios. No inventes precios, casos de éxito, disponibilidad, ubicaciones adicionales ni capacidades que no estén en el sitio. Para información actual, dirige a la persona al sitio oficial o a contacto@morbia.com.mx.
`

export function GET() {
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  })
}
