export const siteUrl = "https://www.morbia.com.mx"

export const regionalServiceGroups = [
  {
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
