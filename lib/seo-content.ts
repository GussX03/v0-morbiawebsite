export const siteUrl = "https://www.morbia.com.mx"

export const regionalServiceGroups = [
  {
    slug: "paginas-web",
    title: "Páginas web y aplicaciones",
    description: "Presencia digital y herramientas propias para que clientes y equipos encuentren lo que necesitan con claridad.",
    capabilities: [
      "Sitios web corporativos",
      "Landing pages para campañas",
      "Catálogos y portafolios digitales",
      "Portales para clientes",
      "Formularios conectados a tu operación",
    ],
  },
  {
    slug: "chatbots",
    title: "Chatbots para atención",
    description: "Conversaciones que orientan, filtran solicitudes y llevan cada mensaje al siguiente paso correcto.",
    capabilities: [
      "Chatbots para sitios web",
      "Asistentes para WhatsApp",
      "Respuestas a preguntas frecuentes",
      "Calificación de solicitudes",
      "Seguimiento y canalización de conversaciones",
    ],
  },
  {
    slug: "automatizacion-de-procesos",
    title: "Automatización de procesos",
    description: "Flujos de trabajo que conectan tareas, avisos y datos para liberar tiempo operativo.",
    capabilities: [
      "Flujos de aprobación",
      "Notificaciones y recordatorios",
      "Captura y validación de datos",
      "Procesos de correo y seguimiento",
      "Entrega automatizada de documentos",
    ],
  },
  {
    slug: "rpa",
    title: "RPA para operación",
    description: "Automatización de tareas repetitivas entre sistemas para que el equipo se concentre en decisiones y clientes.",
    capabilities: [
      "Captura de información entre sistemas",
      "Procesamiento de tareas repetitivas",
      "Transferencia de datos operativos",
      "Actualización de reportes",
      "Ejecución programada de tareas",
    ],
  },
  {
    slug: "inteligencia-artificial",
    title: "Inteligencia artificial aplicada",
    description: "IA enfocada en responder, ordenar información y dar contexto útil a las personas que toman decisiones.",
    capabilities: [
      "Asistentes internos con IA",
      "Clasificación de mensajes y documentos",
      "Resúmenes de información operativa",
      "Consulta de conocimiento interno",
      "Recomendaciones para atención y operación",
    ],
  },
  {
    slug: "analisis-de-datos",
    title: "Datos para decidir",
    description: "Información conectada y comprensible para ver la operación, detectar oportunidades y priorizar acciones.",
    capabilities: [
      "Dashboards de operación",
      "Indicadores clave de negocio",
      "Reportes de ventas y seguimiento",
      "Integración de fuentes de datos",
      "Lecturas para tomar decisiones",
    ],
  },
] as const

export const regionalCapabilities = regionalServiceGroups.flatMap((group) => group.capabilities)

export const servicePages = [
  {
    slug: "paginas-web",
    title: "Páginas web y aplicaciones web",
    description: "Páginas web, portales y herramientas digitales para que tus clientes encuentren información clara y tu equipo opere con orden.",
    intro: "Una presencia digital útil no se queda en verse bien: orienta a tus clientes, concentra información y abre camino a procesos más simples.",
    focus: "Diseñamos desde sitios corporativos hasta herramientas propias que respetan la forma en que tu negocio ya trabaja y pueden evolucionar contigo.",
    outcome: "Una experiencia clara para tus clientes y un punto de partida más ordenado para tu operación.",
  },
  {
    slug: "chatbots",
    title: "Chatbots con inteligencia artificial",
    description: "Chatbots para sitio web y WhatsApp que responden, orientan y canalizan conversaciones para que ninguna oportunidad se quede esperando.",
    intro: "Cada mensaje es una oportunidad para orientar mejor. Un chatbot bien diseñado acompaña la conversación, entiende el siguiente paso y sabe cuándo llevarla con una persona.",
    focus: "Construimos asistentes para resolver dudas frecuentes, calificar solicitudes y conectar cada conversación con el equipo o proceso indicado.",
    outcome: "Atención disponible cuando tus clientes la necesitan, sin perder el contexto de tu negocio.",
  },
  {
    slug: "automatizacion-de-procesos",
    title: "Automatización de procesos",
    description: "Flujos de trabajo que conectan tareas, avisos, aprobaciones y datos para liberar tiempo operativo y evitar seguimientos manuales.",
    intro: "Cuando una operación depende de copiar información, perseguir aprobaciones o recordar cada seguimiento, el equipo acaba trabajando para el proceso en vez de avanzar con él.",
    focus: "Conectamos las acciones que ya suceden en tu negocio para que cada paso active el siguiente con visibilidad y criterio.",
    outcome: "Menos trabajo repetitivo y más capacidad para atender lo que realmente mueve el negocio.",
  },
  {
    slug: "rpa",
    title: "RPA para tareas repetitivas",
    description: "Robotic Process Automation para ejecutar tareas entre sistemas con consistencia y dar a tu equipo más tiempo para clientes y decisiones.",
    intro: "Hay tareas necesarias que no deberían ocupar las horas más valiosas de tu equipo: capturar datos, actualizar registros o preparar información en varios sistemas.",
    focus: "Aplicamos RPA donde una secuencia repetible puede ejecutarse con control, horarios y trazabilidad para apoyar a las personas, no sustituir su criterio.",
    outcome: "Una operación más constante que deja a tu equipo enfocarse en excepciones, clientes y decisiones.",
  },
  {
    slug: "inteligencia-artificial",
    title: "Inteligencia artificial aplicada",
    description: "Soluciones de inteligencia artificial para ordenar información, asistir a equipos y convertir conocimiento interno en respuestas útiles.",
    intro: "La inteligencia artificial aporta valor cuando entiende el contexto de una tarea y ayuda a una persona a resolverla con más claridad, no cuando se añade como un adorno.",
    focus: "Creamos asistentes y flujos que clasifican información, consultan conocimiento interno y proponen el siguiente paso con supervisión humana.",
    outcome: "Información más accesible y decisiones mejor acompañadas en el momento en que hacen falta.",
  },
  {
    slug: "analisis-de-datos",
    title: "Análisis de datos para empresas",
    description: "Dashboards, indicadores e integración de datos para entender la operación y priorizar acciones con información clara.",
    intro: "Los datos sirven cuando permiten ver lo importante sin perseguir archivos, versiones distintas o reportes que llegan demasiado tarde.",
    focus: "Integramos las fuentes que ya usas y diseñamos lecturas que ayuden a seguir la operación, detectar oportunidades y conversar sobre decisiones con contexto.",
    outcome: "Una vista más clara de lo que ocurre hoy y de las acciones que conviene priorizar después.",
  },
] as const

export type ServicePage = (typeof servicePages)[number]

export const servicePageBySlug = new Map<string, ServicePage>(servicePages.map((service) => [service.slug, service]))
