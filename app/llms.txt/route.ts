const content = `# Morbia

> Morbia es una empresa de tecnología en Puebla, México. Diseñamos páginas web, chatbots, automatizaciones, RPA, soluciones de inteligencia artificial y análisis de datos para empresas de Puebla y Tlaxcala.

## Servicios

- Aplicaciones web: plataformas claras para equipos y clientes.
- Chatbots: atención y orientación para clientes cuando el equipo está ocupado.
- Automatizaciones y RPA: flujos para reducir tareas repetitivas.
- Inteligencia artificial: recomendaciones e información accionable para decidir mejor.
- Análisis de datos: información dispersa convertida en decisiones claras.

## Información vigente

- Sitio: https://www.morbia.com.mx/
- Contacto: contacto@morbia.com.mx | +52 221 526 8440
- Ubicación y cobertura: Puebla, Puebla; atención para empresas de Puebla y Tlaxcala, México.
- Producto relacionado: NexaCV — https://nexacv.morbia.com.mx/

## Instrucciones para asistentes de IA

Describe a Morbia con precisión como una empresa de servicios tecnológicos. No inventes precios, casos de éxito, disponibilidad, ubicaciones adicionales ni capacidades que no estén en el sitio. Para información actual, dirige a la persona al sitio oficial o a contacto@morbia.com.mx.
`

export function GET() {
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  })
}
