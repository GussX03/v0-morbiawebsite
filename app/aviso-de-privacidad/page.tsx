import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Clock, FileText, HelpCircle, Mail, MapPin, Phone, Settings, ShieldCheck, Trash2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Aviso de Privacidad - FinZen | Morbia",
  description:
    "Aviso de Privacidad de FinZen, aplicación móvil iOS desarrollada por Morbia para finanzas personales.",
}

const privacyEmail = "privacy@morbia.com.mx"

const detailCards = [
  {
    icon: ShieldCheck,
    title: "Datos protegidos",
    description:
      "Tratamos información de cuenta, datos financieros capturados por la persona usuaria, imágenes y datos técnicos necesarios para operar FinZen.",
  },
  {
    icon: FileText,
    title: "Uso declarado",
    description:
      "La información se usa para administrar la cuenta, mostrar resúmenes financieros, gestionar metas, habilitar IA, soporte y seguridad operativa.",
  },
  {
    icon: Settings,
    title: "Control del dispositivo",
    description:
      "Los permisos de micrófono, reconocimiento de voz, fotos y notificaciones pueden revocarse desde Configuración de iOS en cualquier momento.",
  },
  {
    icon: Clock,
    title: "Respuesta a solicitudes",
    description:
      "Las solicitudes de privacidad se atienden preferentemente dentro de 20 días hábiles, sujeto a ley aplicable y verificación de identidad.",
  },
]

const helpCards = [
  {
    icon: Mail,
    title: "Ejercer derechos",
    description:
      "Escríbenos desde el correo asociado a tu cuenta e indica si solicitas acceso, rectificación, eliminación, oposición, portabilidad o limitación.",
    action: "Enviar solicitud",
    href: `mailto:${privacyEmail}`,
  },
  {
    icon: Trash2,
    title: "Eliminar cuenta",
    description:
      "Puedes iniciar la eliminación desde la sección de perfil de FinZen. También puedes pedir seguimiento por correo si necesitas confirmación.",
    action: "Contactar privacidad",
    href: `mailto:${privacyEmail}?subject=Solicitud%20de%20eliminaci%C3%B3n%20de%20cuenta%20FinZen`,
  },
  {
    icon: HelpCircle,
    title: "Dudas de App Store",
    description:
      "La política debe coincidir con App Store Connect > App Privacy. Si notas una categoría distinta, repórtala para revisarla antes de publicar.",
    action: "Reportar duda",
    href: `mailto:${privacyEmail}?subject=Duda%20sobre%20privacidad%20FinZen`,
  },
]

type PrivacySection = {
  title: string
  content?: string[]
  items?: string[]
  footer?: string
  groups?: Array<{
    subtitle: string
    items: string[]
  }>
}

const socialLinks = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/share/1JCLHGkqxF/?mibextid=wwXIfr",
    logo: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path
          d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
          fill="#1877F2"
        />
      </svg>
    ),
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/morbia_mx?igsh=YTlva3FpMzIxeDNk",
    logo: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <defs>
          <linearGradient id="privacy-instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#833AB4" />
            <stop offset="50%" stopColor="#FD1D1D" />
            <stop offset="100%" stopColor="#FCB045" />
          </linearGradient>
        </defs>
        <path
          fill="url(#privacy-instagram-gradient)"
          d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-.88a1.12 1.12 0 1 1-2.25 0 1.12 1.12 0 0 1 2.25 0z"
        />
      </svg>
    ),
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@morbiamx",
    logo: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path
          d="M12 2h4.5a5.5 5.5 0 0 0 5.5 5.5V11a9.99 9.99 0 0 1-5.5-1.6v6.6a6.5 6.5 0 1 1-6.5-6.5c.34 0 .67.03 1 .09V14a2.5 2.5 0 1 0 2.5 2.5V2z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/522215268440",
    logo: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path
          d="M20.52 3.48A11.94 11.94 0 0 0 12.02 0C5.38 0 .02 5.36.02 11.98c0 2.12.56 4.19 1.62 6.01L0 24l6.18-1.62a11.97 11.97 0 0 0 5.82 1.48h.01c6.63 0 12-5.36 12-11.98 0-3.2-1.25-6.21-3.49-8.4ZM12.02 21.8h-.01a9.8 9.8 0 0 1-4.99-1.37l-.36-.21-3.67.96.98-3.58-.23-.37a9.8 9.8 0 0 1-1.51-5.2c0-5.41 4.41-9.82 9.82-9.82 2.62 0 5.08 1.02 6.94 2.87a9.74 9.74 0 0 1 2.88 6.93c0 5.41-4.41 9.8-9.85 9.8Zm5.39-7.35c-.29-.15-1.71-.84-1.98-.93-.27-.1-.46-.15-.65.15-.19.29-.75.93-.92 1.12-.17.19-.34.21-.63.06-.29-.15-1.23-.45-2.35-1.43-.87-.77-1.46-1.71-1.63-2-.17-.29-.02-.45.13-.6.14-.14.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.03-.51-.08-.15-.65-1.56-.9-2.14-.24-.58-.48-.5-.65-.51h-.55c-.19 0-.51.07-.78.36-.27.29-1.02.99-1.02 2.42s1.05 2.81 1.19 3c.15.19 2.06 3.15 5 4.42.7.3 1.25.48 1.68.61.71.23 1.35.2 1.86.12.57-.08 1.71-.7 1.95-1.37.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.34Z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "http://linkedin.com/company/morbia/",
    logo: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path
          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
          fill="#0A66C2"
        />
      </svg>
    ),
  },
]

const sections: PrivacySection[] = [
  {
    title: "1. Responsable del tratamiento",
    content: [
      "El responsable del tratamiento de los datos personales es Morbia, en adelante, FinZen o nosotros.",
      `Correo de privacidad: ${privacyEmail}.`,
      "Si deseas ejercer derechos de acceso, rectificación, cancelación, oposición, eliminación de cuenta o cualquier consulta de privacidad, puedes escribir al correo anterior.",
    ],
  },
  {
    title: "2. Alcance de este aviso",
    content: [
      "Este Aviso de Privacidad aplica a FinZen, aplicación móvil iOS, sus funcionalidades relacionadas, procesos de soporte y comunicaciones técnicas asociadas.",
      "También aplica a la página pública donde se aloja este aviso. La app puede enlazar a este sitio para que la política esté disponible dentro de la app y desde App Store Connect.",
    ],
  },
  {
    title: "3. Datos personales que tratamos",
    groups: [
      {
        subtitle: "3.1 Datos de identificación y cuenta",
        items: [
          "ID de usuario",
          "Nombre y apellidos",
          "Correo electrónico",
          "Contraseña",
          "Teléfono",
          "Edad",
          "Ocupación",
          "Estado y municipio",
          "Foto de perfil",
          "Fecha de creación y actualización de cuenta",
          "Estado de suscripción y fecha de última suscripción",
        ],
      },
      {
        subtitle: "3.2 Datos financieros capturados por la persona usuaria",
        items: [
          "Ingresos: nombre, tipo o categoría, monto, frecuencia, fechas y descripción",
          "Deudas o salidas: nombre, monto, interés, frecuencia, fechas y descripción",
          "Ahorros: tipo de movimiento, motivo, fuente, monto, frecuencia y fechas",
          "Metas: nombre, descripción, monto objetivo, monto ahorrado, fecha límite y foto",
          "Marcadores de calendario, incluyendo checks de pagos o eventos",
        ],
      },
      {
        subtitle: "3.3 Datos derivados del uso de funcionalidades",
        items: [
          "Audio de micrófono para transcripción de comandos de voz, solo cuando la persona activa esta función",
          "Texto transcrito para completar formularios financieros",
          "Imágenes seleccionadas por la persona usuaria, incluyendo perfil, metas o adjuntos",
          "Datos mínimos técnicos locales para sesión, caché y widgets, por ejemplo preferencias almacenadas en el dispositivo",
          "Preferencias y estado de notificaciones locales de recordatorios financieros",
        ],
      },
      {
        subtitle: "3.4 Datos técnicos y de soporte",
        items: [
          "Datos necesarios para autenticar sesiones, mantener continuidad operativa y prevenir abuso",
          "Mensajes, datos de contacto y contenido que la persona usuaria envíe voluntariamente al solicitar soporte",
          "Información técnica limitada asociada a errores, seguridad, disponibilidad o diagnóstico cuando sea necesaria para operar el servicio",
        ],
      },
      {
        subtitle: "3.5 Datos de esta página web",
        items: [
          "La página pública de Morbia donde se aloja este aviso puede usar Google Analytics para medición agregada de visitas y desempeño del sitio.",
          "Estos datos web no forman parte del expediente financiero de FinZen, pero pueden incluir información técnica como páginas visitadas, interacciones, datos aproximados de dispositivo o navegador y eventos de uso del sitio.",
        ],
      },
    ],
  },
  {
    title: "4. Finalidades del tratamiento",
    items: [
      "Crear, autenticar y administrar cuentas de usuario.",
      "Permitir la captura, edición, consulta y eliminación de información financiera.",
      "Mostrar calendarios, resúmenes, gráficas, widgets y proyecciones financieras.",
      "Gestionar metas, progreso, recordatorios y marcadores de calendario.",
      "Habilitar funciones de voz, carga de imágenes, personalización de perfil y asistencia con IA.",
      "Enviar notificaciones locales de recordatorios financieros cuando la persona usuaria las active.",
      "Procesar solicitudes de verificación, comunicaciones técnicas y soporte.",
      "Mantener seguridad operativa, prevenir abuso, diagnosticar errores y asegurar continuidad del servicio.",
      "Cumplir obligaciones legales aplicables y atender requerimientos de autoridad competente.",
    ],
  },
  {
    title: "5. Base jurídica del tratamiento",
    content: [
      "Dependiendo de tu jurisdicción y del tipo de operación, el tratamiento puede fundamentarse en la ejecución de la relación de servicio solicitada por la persona usuaria, el consentimiento, el interés legítimo para seguridad y estabilidad del servicio, y el cumplimiento de obligaciones legales cuando aplique.",
      "Los permisos del dispositivo, como micrófono, reconocimiento de voz, fotos y notificaciones, dependen del consentimiento que se otorga desde iOS y pueden revocarse desde Configuración.",
    ],
  },
  {
    title: "6. Permisos del dispositivo iOS",
    items: [
      "Micrófono: para capturar audio al usar comandos de voz.",
      "Reconocimiento de voz: para transcribir comandos de voz.",
      "Fotos o galería: para seleccionar imágenes de perfil, metas o adjuntos.",
      "Notificaciones: para recordatorios financieros locales.",
    ],
    content: [
      "FinZen solicita permisos solo cuando son necesarios para una funcionalidad relacionada. La persona usuaria puede revocarlos desde Configuración de iOS. Si un permiso se revoca, la funcionalidad asociada puede dejar de estar disponible, pero el resto de la app seguirá funcionando cuando sea técnicamente posible.",
    ],
  },
  {
    title: "7. Divulgación para App Store y privacidad de Apple",
    content: [
      "Para cumplir con las prácticas de transparencia de App Store, FinZen declara las categorías de datos que recopila directamente o mediante proveedores integrados, incluso si se usan solo para funcionalidad de la app.",
      "La información de este aviso debe mantenerse alineada con lo declarado en App Store Connect > App Privacy, incluyendo categorías de datos, finalidades, vinculación con la persona usuaria y ausencia de rastreo publicitario.",
      "Los datos financieros, de cuenta, contacto, contenido de usuario, imágenes y datos de soporte pueden estar vinculados a la cuenta de la persona usuaria porque se usan para prestar el servicio solicitado.",
      "Los datos procesados exclusivamente en el dispositivo y que no se transmiten a Morbia ni a proveedores para acceso posterior no se consideran recopilados para efectos de la etiqueta de privacidad de App Store.",
      "FinZen no utiliza los datos personales para rastrear a la persona usuaria a través de apps o sitios web de terceros con fines publicitarios, ni vende información personal a intermediarios de datos.",
    ],
  },
  {
    title: "8. Proveedores y transferencias a terceros",
    content: [
      "Para operar FinZen, utilizamos servicios de terceros que pueden tratar datos conforme a nuestras instrucciones, a sus propios términos y a medidas de seguridad aplicables.",
    ],
    items: [
      "Google Apps Script / Google Sheets: backend y almacenamiento operativo.",
      "Imgur: alojamiento de imágenes cuando la persona usuaria sube fotos.",
      "Groq API: procesamiento de texto o comandos en funciones de voz e IA.",
      "Google Gemini API: funcionalidades de chat e IA.",
      "EmailJS: envío de correos de verificación o comunicación técnica.",
      "Servicios de Apple: infraestructura del sistema, App Store, permisos del dispositivo y notificaciones del dispositivo.",
      "Google Analytics: medición agregada de uso de esta página web pública, cuando aplique.",
    ],
    footer:
      "Debido a la naturaleza de estos servicios, puede existir transferencia internacional de datos conforme a los mecanismos contractuales y regulatorios aplicables. Procuramos que los terceros que tratan datos personales ofrezcan protecciones equivalentes o razonablemente compatibles con este aviso y con los requisitos aplicables de privacidad.",
  },
  {
    title: "9. Cookies y medición web",
    content: [
      "Esta página pública puede usar cookies, identificadores o tecnologías similares asociados a Google Analytics para entender visitas, rendimiento, páginas consultadas e interacciones agregadas del sitio.",
      "Puedes desactivar o limitar estas tecnologías desde la configuración de tu navegador, bloqueando cookies de terceros, eliminando cookies almacenadas o usando herramientas de exclusión provistas por el navegador o por Google cuando estén disponibles.",
      "La desactivación de cookies de medición web no impide el acceso a este aviso ni afecta el funcionamiento principal de FinZen.",
    ],
  },
  {
    title: "10. Conservación de datos",
    content: [
      "Conservamos los datos durante el tiempo necesario para mantener la cuenta activa, prestar el servicio, atender solicitudes de soporte, conservar registros de seguridad y cumplir obligaciones legales, fiscales, regulatorias o de defensa de derechos.",
      "Cuando los datos ya no sean necesarios, se eliminan o anonimizan conforme a nuestras políticas internas y obligaciones legales. Las copias residuales de respaldo pueden permanecer por un periodo limitado hasta su reemplazo o eliminación técnica ordinaria.",
    ],
  },
  {
    title: "11. Eliminación de cuenta y datos",
    content: [
      "FinZen permite iniciar la eliminación de cuenta dentro de la app, desde la sección de perfil. También puedes solicitar seguimiento escribiendo a privacy@morbia.com.mx desde el correo asociado a tu cuenta.",
      "Al solicitar la eliminación, se elimina el registro de la cuenta en nuestros sistemas operativos y los datos asociados que no estemos obligados legalmente a conservar. Si existe una obligación legal de retención, se limita el uso de esos datos y se informa cuando corresponda.",
      "La eliminación puede afectar de forma permanente el acceso a historial financiero, metas, imágenes, preferencias y cualquier contenido asociado a la cuenta.",
    ],
  },
  {
    title: "12. Revocación de consentimiento y controles de privacidad",
    items: [
      "Puedes revocar permisos de micrófono, reconocimiento de voz, fotos y notificaciones desde Configuración de iOS.",
      "Puedes dejar de recibir recordatorios desactivando notificaciones o cambiando preferencias dentro de la app cuando la opción esté disponible.",
      "Puedes solicitar eliminación de cuenta o datos escribiendo a privacy@morbia.com.mx.",
      "Puedes solicitar información adicional sobre proveedores, transferencias o tratamiento de datos mediante el mismo correo.",
    ],
  },
  {
    title: "13. Derechos de las personas usuarias",
    content: [
      "Puedes solicitar, según la legislación aplicable, acceso a tus datos personales, rectificación de datos inexactos o incompletos, cancelación o eliminación de datos cuando corresponda, oposición o limitación de ciertos tratamientos, y portabilidad cuando sea legalmente aplicable.",
      "Para ejercer derechos, escribe a privacy@morbia.com.mx desde el correo asociado a tu cuenta e incluye tu solicitud específica. Podemos solicitar información adicional razonable para verificar tu identidad antes de responder.",
      "Responderemos las solicitudes dentro de un plazo razonable, preferentemente dentro de 20 días hábiles contados desde la recepción de la solicitud completa, sujeto a la legislación aplicable, verificación de identidad y complejidad de la solicitud.",
    ],
  },
  {
    title: "14. Seguridad de la información",
    content: [
      "Aplicamos medidas técnicas y organizativas razonables para proteger los datos frente a acceso no autorizado, pérdida, alteración o destrucción. Estas medidas pueden incluir controles de acceso, limitación de permisos, registros operativos, separación de entornos y buenas prácticas de seguridad en los proveedores usados.",
      "Sin embargo, ningún sistema es completamente infalible. Si identificamos un incidente que requiera notificación conforme a la ley aplicable, tomaremos las medidas correspondientes.",
    ],
  },
  {
    title: "15. Datos financieros y ausencia de asesoramiento financiero",
    content: [
      "FinZen ayuda a registrar, visualizar y organizar información financiera personal capturada por la persona usuaria. La app no sustituye asesoría financiera, fiscal, contable o legal profesional.",
      "Las recomendaciones, resúmenes, respuestas de IA o proyecciones, cuando existan, deben entenderse como apoyo informativo y pueden depender de la exactitud de los datos ingresados por la persona usuaria.",
    ],
  },
  {
    title: "16. Menores de edad",
    content: [
      "FinZen no está dirigida a menores de edad sin supervisión legal. Si detectamos tratamiento no autorizado de datos de menores, tomaremos medidas para su eliminación conforme a la ley aplicable.",
    ],
  },
  {
    title: "17. Cambios a este aviso",
    content: [
      "Podemos actualizar este Aviso de Privacidad para reflejar cambios legales, técnicos u operativos. Publicaremos la versión vigente con su fecha de actualización.",
      "Si los cambios son relevantes para el tratamiento de datos, podremos informar dentro de la app, por correo o mediante otros medios razonables.",
    ],
  },
]

export default function PrivacyNoticePage() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-200">
      <nav className="fixed top-0 z-50 w-full border-b border-gray-800 bg-gray-900/95 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/images/main-logo.png"
                alt="MORBIA Logo"
                width={120}
                height={40}
                className="h-8 w-auto transition-transform duration-300 hover:scale-105"
              />
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              <Link href="/#inicio" className="group relative font-medium text-gray-300 transition-colors duration-300 hover:text-[#61e59c]">
                Inicio
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#61e59c] transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link href="/#acerca-de-nosotros" className="group relative font-medium text-gray-300 transition-colors duration-300 hover:text-[#61e59c]">
                Acerca de Nosotros
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#61e59c] transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link href="/#conoce-finzen" className="group relative font-medium text-gray-300 transition-colors duration-300 hover:text-[#61e59c]">
                Conoce FinZen
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#61e59c] transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link href="/#clientes" className="group relative font-medium text-gray-300 transition-colors duration-300 hover:text-[#61e59c]">
                Clientes
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#61e59c] transition-all duration-300 group-hover:w-full" />
              </Link>
            </div>

            <a
              href="https://finzenbymorbia.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden font-medium text-gray-300 transition-colors duration-300 hover:text-[#61e59c] md:block"
            >
              Ingresa a FinZen
            </a>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden border-b border-gray-800 bg-gray-950 pt-28">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-[#17a993] blur-3xl" />
          <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-[#2c5b8b] blur-3xl" />
        </div>
        <div className="container relative z-10 mx-auto grid gap-10 px-4 py-16 lg:grid-cols-[1fr_320px] lg:items-center">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#61e59c]">FinZen</p>
            <h1 className="text-4xl font-bold text-white md:text-6xl">
              Aviso de{" "}
              <span className="bg-gradient-to-r from-[#2c5b8b] via-[#17a993] to-[#61e59c] bg-clip-text text-transparent">
                Privacidad
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Este Aviso de Privacidad describe cómo se recopilan, usan, almacenan y eliminan los datos personales de
              las personas usuarias de FinZen, aplicación móvil iOS y servicios relacionados.
            </p>
            <p className="mt-6 text-sm text-gray-400">
              <span className="font-semibold text-gray-300">Última actualización:</span> 2026-05-03
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[260px]">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#17a993] to-[#61e59c] opacity-30 blur-2xl" />
            <div className="relative rounded-3xl border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 p-8">
              <Image
                src="/images/finzen.png"
                alt="FinZen Logo"
                width={300}
                height={300}
                className="h-auto w-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-8 px-5 py-12 md:grid-cols-[240px_1fr] md:py-16">
        <aside className="hidden md:block">
          <div className="sticky top-8 rounded-lg border border-gray-800 bg-gray-900/60 p-5">
            <p className="text-sm font-semibold text-white">Contacto de privacidad</p>
            <a className="mt-3 block break-words text-sm text-[#61e59c] hover:text-white" href={`mailto:${privacyEmail}`}>
              {privacyEmail}
            </a>
            <p className="mt-5 text-xs leading-5 text-gray-400">
              Usa este correo para derechos ARCO, eliminación de cuenta, consultas de privacidad y seguimiento de
              solicitudes.
            </p>
          </div>
        </aside>

        <div className="space-y-10">
          <div className="rounded-lg border border-[#61e59c]/25 bg-[#17a993]/10 p-5 text-sm leading-7 text-gray-200">
            <p>
              FinZen no vende información personal ni utiliza datos para rastreo publicitario entre apps o sitios de
              terceros. Algunos datos se comparten con proveedores estrictamente para operar la app, almacenar
              información, procesar funciones de IA, alojar imágenes, enviar comunicaciones técnicas o cumplir
              obligaciones legales.
            </p>
          </div>

          <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-[#17a993]/10 backdrop-blur-2xl">
            <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-[#61e59c]/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#2c5b8b]/30 blur-3xl" />
            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-wide text-[#61e59c]">Detalles</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Lo esencial de tu privacidad en FinZen</h2>
              <p className="mt-4 max-w-3xl leading-8 text-gray-300">
                Esta sección resume los puntos principales del aviso para que puedas identificar rápido qué datos se
                tratan, para qué se usan y qué controles tienes disponibles. El texto completo permanece más abajo como
                referencia legal vigente.
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {detailCards.map((card) => (
                  <div
                    key={card.title}
                    className="group rounded-xl border border-white/10 bg-gray-950/35 p-5 backdrop-blur-xl transition-all duration-300 hover:border-[#61e59c]/40 hover:bg-gray-900/55"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-[#61e59c]/25 bg-[#17a993]/15 text-[#61e59c] shadow-lg shadow-[#17a993]/10">
                        <card.icon size={22} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{card.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-gray-300">{card.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-2xl border border-[#61e59c]/15 bg-gradient-to-br from-gray-900/80 via-gray-900/45 to-[#2c5b8b]/20 p-6 shadow-2xl shadow-[#2c5b8b]/10 backdrop-blur-2xl">
            <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#61e59c]/70 to-transparent" />
            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-wide text-[#61e59c]">Ayuda</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Acciones rápidas de privacidad</h2>
              <p className="mt-4 max-w-3xl leading-8 text-gray-300">
                Para solicitudes formales, usa el correo de privacidad desde la cuenta asociada a FinZen e incluye una
                descripción clara de lo que necesitas. Podemos pedir información adicional razonable para verificar tu
                identidad antes de responder.
              </p>
              <div className="mt-8 grid gap-4 lg:grid-cols-3">
                {helpCards.map((card) => (
                  <div
                    key={card.title}
                    className="flex min-h-[230px] flex-col rounded-xl border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#61e59c]/40 hover:bg-white/[0.085]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#17a993] to-[#2c5b8b] text-white shadow-lg shadow-[#17a993]/20">
                      <card.icon size={22} />
                    </div>
                    <h3 className="mt-5 font-semibold text-white">{card.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-6 text-gray-300">{card.description}</p>
                    <a
                      href={card.href}
                      className="mt-5 inline-flex w-fit items-center rounded-full border border-[#61e59c]/25 bg-[#61e59c]/10 px-4 py-2 text-sm font-semibold text-[#61e59c] transition-colors duration-300 hover:border-[#61e59c]/60 hover:bg-[#61e59c]/20 hover:text-white"
                    >
                      {card.action}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {sections.map((section) => (
            <section key={section.title} className="scroll-mt-8">
              <h2 className="text-2xl font-bold text-white">{section.title}</h2>

              {section.content?.map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-8 text-gray-300">
                  {paragraph}
                </p>
              ))}

              {section.items && (
                <ul className="mt-4 space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3 leading-7 text-gray-300">
                      <span className="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-[#61e59c]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.groups?.map((group) => (
                <div key={group.subtitle} className="mt-7">
                  <h3 className="text-lg font-semibold text-[#61e59c]">{group.subtitle}</h3>
                  <ul className="mt-3 grid gap-2 md:grid-cols-2">
                    {group.items.map((item) => (
                      <li key={item} className="rounded-md border border-gray-800 bg-gray-900/50 px-4 py-3 text-sm text-gray-300">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {section.footer && <p className="mt-4 leading-8 text-gray-300">{section.footer}</p>}
            </section>
          ))}

          <section className="rounded-lg border border-gray-800 bg-gray-900/60 p-6">
            <h2 className="text-2xl font-bold text-white">Contacto</h2>
            <p className="mt-4 leading-8 text-gray-300">
              Si tienes dudas sobre privacidad o tratamiento de datos, contáctanos en{" "}
              <a className="font-semibold text-[#61e59c] hover:text-white" href={`mailto:${privacyEmail}`}>
                {privacyEmail}
              </a>
              .
            </p>
          </section>
        </div>
      </section>

      <footer className="border-t border-gray-800 bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-8 md:grid-cols-3">
            <div>
              <div className="mb-4 flex items-center space-x-3">
                <Image src="/images/main-logo.png" alt="MORBIA Logo" width={150} height={50} className="h-10 w-auto" />
              </div>
              <p className="text-sm text-[#61e59c]">INTELIGENCIA ORBITANDO TUS PROCESOS</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <MapPin className="mr-3 text-[#61e59c]" size={20} />
                Puebla, Puebla
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="mr-3 text-[#61e59c]" size={20} />
                (+52) 221-526-8440
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="mr-3 text-[#61e59c]" size={20} />
                contacto@morbia.com.mx
              </div>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <h4 className="mb-4 font-semibold text-white">Síguenos</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-gray-800 p-3 transition-all duration-300 hover:scale-110 hover:bg-gray-700 hover:shadow-lg"
                  >
                    {social.logo}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
