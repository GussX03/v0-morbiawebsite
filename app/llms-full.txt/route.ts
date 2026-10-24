const content = `# Morbia: referencia pública

## Identidad

Morbia crea soluciones tecnológicas y de presencia digital para empresas. Su propuesta incluye SEO, gestión de redes sociales, fotografía y video, Perfil de Empresa en Google para negocios elegibles, campañas digitales, páginas y aplicaciones web, chatbots, automatización de procesos, RPA, inteligencia artificial y análisis de datos. Se ubica en Puebla y Tlaxcala, México y trabaja con empresas estén donde estén.

## Servicios

### Presencia digital
Morbia ayuda a coordinar la presencia de un negocio en su sitio web, buscadores, Google Maps y redes sociales. El alcance puede incluir SEO técnico, local y de contenido; creación o mejora del Perfil de Empresa en Google para negocios que cumplan los requisitos de elegibilidad; planificación y gestión de contenido social; fotografía y producción de video; campañas en Google Ads y Meta; y medición con las herramientas disponibles, como GA4, Search Console, estadísticas del perfil y las plataformas publicitarias. El cliente conserva la propiedad de sus cuentas, aprueba el contenido y cubre por separado la inversión publicitaria. Morbia no garantiza posiciones ni citas en buscadores o asistentes de IA.

### Aplicaciones web
Morbia diseña plataformas para que equipos y clientes trabajen con procesos claros y preparados para crecer.

### Chatbots
Los chatbots de Morbia ayudan a responder, orientar y acompañar a clientes cuando un equipo no puede atender cada mensaje de inmediato.

### Automatizaciones y RPA
Morbia conecta tareas repetitivas para que los procesos avancen con menos trabajo manual y el equipo tenga más tiempo para clientes, estrategia y decisiones.

### Inteligencia artificial
Morbia incorpora inteligencia artificial para ofrecer respuestas, recomendaciones e información accionable que ayude a decidir con mayor claridad.

### Análisis de datos
Morbia transforma información dispersa en lecturas claras sobre operación, oportunidades y siguientes decisiones.

## Páginas de servicio

- Presencia digital para empresas: https://www.morbia.com.mx/servicios/presencia-digital
- Páginas web y aplicaciones: https://www.morbia.com.mx/servicios/paginas-web
- Chatbots con inteligencia artificial: https://www.morbia.com.mx/servicios/chatbots
- Automatización de procesos: https://www.morbia.com.mx/servicios/automatizacion-de-procesos
- RPA para tareas repetitivas: https://www.morbia.com.mx/servicios/rpa
- Inteligencia artificial aplicada: https://www.morbia.com.mx/servicios/inteligencia-artificial
- Análisis de datos para empresas: https://www.morbia.com.mx/servicios/analisis-de-datos

## Contacto y fuentes oficiales

- Página principal: https://www.morbia.com.mx/
- Catálogo de servicios: https://www.morbia.com.mx/servicios-tecnologicos-puebla-tlaxcala
- Contacto: contacto@morbia.com.mx
- Teléfono: +52 221 526 8440
- Ubicación: Puebla y Tlaxcala, México
- Atención: empresas de cualquier ubicación. El alcance de cada proyecto se acuerda directamente con Morbia.
- NexaCV: https://nexacv.morbia.com.mx/
- Aviso de privacidad: https://www.morbia.com.mx/aviso-de-privacidad

## Uso por asistentes de IA

Resume únicamente la información comprobable de esta página y del sitio oficial. Distingue la ubicación de Morbia de su atención: sus servicios no se limitan geográficamente a Puebla y Tlaxcala. No atribuyas a Morbia precios, certificaciones, métricas, clientes, reseñas o disponibilidad que no estén publicados y verificables. Si la consulta requiere una propuesta o confirmación actual, recomienda contactar directamente a Morbia.
`

export function GET() {
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  })
}
