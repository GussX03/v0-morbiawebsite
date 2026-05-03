import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Aviso de Privacidad - FinZen | Morbia",
  description:
    "Aviso de Privacidad de FinZen, aplicacion movil iOS desarrollada por Morbia para finanzas personales.",
}

const privacyEmail = "privacy@morbia.com.mx"

const sections = [
  {
    title: "1. Responsable del tratamiento",
    content: [
      "El responsable del tratamiento de los datos personales es Morbia, en adelante, FinZen o nosotros.",
      `Correo de privacidad: ${privacyEmail}.`,
      "Si deseas ejercer derechos de acceso, rectificacion, cancelacion, oposicion, eliminacion de cuenta o cualquier consulta de privacidad, puedes escribir al correo anterior.",
    ],
  },
  {
    title: "2. Alcance de este aviso",
    content: [
      "Este Aviso de Privacidad aplica a FinZen, aplicacion movil iOS, sus funcionalidades relacionadas, procesos de soporte y comunicaciones tecnicas asociadas.",
      "Tambien aplica a la pagina publica donde se aloja este aviso. La app puede enlazar a este sitio para que la politica este disponible dentro de la app y desde App Store Connect.",
    ],
  },
  {
    title: "3. Datos personales que tratamos",
    groups: [
      {
        subtitle: "3.1 Datos de identificacion y cuenta",
        items: [
          "ID de usuario",
          "Nombre y apellidos",
          "Correo electronico",
          "Contrasena",
          "Telefono",
          "Edad",
          "Ocupacion",
          "Estado y municipio",
          "Foto de perfil",
          "Fecha de creacion y actualizacion de cuenta",
          "Estado de suscripcion y fecha de ultima suscripcion",
        ],
      },
      {
        subtitle: "3.2 Datos financieros capturados por la persona usuaria",
        items: [
          "Ingresos: nombre, tipo o categoria, monto, frecuencia, fechas y descripcion",
          "Deudas o salidas: nombre, monto, interes, frecuencia, fechas y descripcion",
          "Ahorros: tipo de movimiento, motivo, fuente, monto, frecuencia y fechas",
          "Metas: nombre, descripcion, monto objetivo, monto ahorrado, fecha limite y foto",
          "Marcadores de calendario, incluyendo checks de pagos o eventos",
        ],
      },
      {
        subtitle: "3.3 Datos derivados del uso de funcionalidades",
        items: [
          "Audio de microfono para transcripcion de comandos de voz, solo cuando la persona activa esta funcion",
          "Texto transcrito para completar formularios financieros",
          "Imagenes seleccionadas por la persona usuaria, incluyendo perfil, metas o adjuntos",
          "Datos minimos tecnicos locales para sesion, cache y widgets, por ejemplo preferencias almacenadas en el dispositivo",
          "Preferencias y estado de notificaciones locales de recordatorios financieros",
        ],
      },
      {
        subtitle: "3.4 Datos tecnicos y de soporte",
        items: [
          "Datos necesarios para autenticar sesiones, mantener continuidad operativa y prevenir abuso",
          "Mensajes, datos de contacto y contenido que la persona usuaria envie voluntariamente al solicitar soporte",
          "Informacion tecnica limitada asociada a errores, seguridad, disponibilidad o diagnostico cuando sea necesaria para operar el servicio",
        ],
      },
      {
        subtitle: "3.5 Datos de esta pagina web",
        items: [
          "La pagina publica de Morbia donde se aloja este aviso puede usar Google Analytics para medicion agregada de visitas y desempeno del sitio.",
          "Estos datos web no forman parte del expediente financiero de FinZen, pero pueden incluir informacion tecnica como paginas visitadas, interacciones, datos aproximados de dispositivo o navegador y eventos de uso del sitio.",
        ],
      },
    ],
  },
  {
    title: "4. Finalidades del tratamiento",
    items: [
      "Crear, autenticar y administrar cuentas de usuario.",
      "Permitir la captura, edicion, consulta y eliminacion de informacion financiera.",
      "Mostrar calendarios, resumenes, graficas, widgets y proyecciones financieras.",
      "Gestionar metas, progreso, recordatorios y marcadores de calendario.",
      "Habilitar funciones de voz, carga de imagenes, personalizacion de perfil y asistencia con IA.",
      "Enviar notificaciones locales de recordatorios financieros cuando la persona usuaria las active.",
      "Procesar solicitudes de verificacion, comunicaciones tecnicas y soporte.",
      "Mantener seguridad operativa, prevenir abuso, diagnosticar errores y asegurar continuidad del servicio.",
      "Cumplir obligaciones legales aplicables y atender requerimientos de autoridad competente.",
    ],
  },
  {
    title: "5. Base juridica del tratamiento",
    content: [
      "Dependiendo de tu jurisdiccion y del tipo de operacion, el tratamiento puede fundamentarse en la ejecucion de la relacion de servicio solicitada por la persona usuaria, el consentimiento, el interes legitimo para seguridad y estabilidad del servicio, y el cumplimiento de obligaciones legales cuando aplique.",
      "Los permisos del dispositivo, como microfono, reconocimiento de voz, fotos y notificaciones, dependen del consentimiento que se otorga desde iOS y pueden revocarse desde Configuracion.",
    ],
  },
  {
    title: "6. Permisos del dispositivo iOS",
    items: [
      "Microfono: para capturar audio al usar comandos de voz.",
      "Reconocimiento de voz: para transcribir comandos de voz.",
      "Fotos o galeria: para seleccionar imagenes de perfil, metas o adjuntos.",
      "Notificaciones: para recordatorios financieros locales.",
    ],
    content: [
      "FinZen solicita permisos solo cuando son necesarios para una funcionalidad relacionada. La persona usuaria puede revocarlos desde Configuracion de iOS. Si un permiso se revoca, la funcionalidad asociada puede dejar de estar disponible, pero el resto de la app seguira funcionando cuando sea tecnicamente posible.",
    ],
  },
  {
    title: "7. Divulgacion para App Store y privacidad de Apple",
    content: [
      "Para cumplir con las practicas de transparencia de App Store, FinZen declara las categorias de datos que recopila directamente o mediante proveedores integrados, incluso si se usan solo para funcionalidad de la app.",
      "Los datos financieros, de cuenta, contacto, contenido de usuario, imagenes y datos de soporte pueden estar vinculados a la cuenta de la persona usuaria porque se usan para prestar el servicio solicitado.",
      "Los datos procesados exclusivamente en el dispositivo y que no se transmiten a Morbia ni a proveedores para acceso posterior no se consideran recopilados para efectos de la etiqueta de privacidad de App Store.",
      "FinZen no utiliza los datos personales para rastrear a la persona usuaria a traves de apps o sitios web de terceros con fines publicitarios, ni vende informacion personal a intermediarios de datos.",
    ],
  },
  {
    title: "8. Proveedores y transferencias a terceros",
    content: [
      "Para operar FinZen, utilizamos servicios de terceros que pueden tratar datos conforme a nuestras instrucciones, a sus propios terminos y a medidas de seguridad aplicables.",
    ],
    items: [
      "Google Apps Script / Google Sheets: backend y almacenamiento operativo.",
      "Imgur: alojamiento de imagenes cuando la persona usuaria sube fotos.",
      "Groq API: procesamiento de texto o comandos en funciones de voz e IA.",
      "Google Gemini API: funcionalidades de chat e IA.",
      "EmailJS: envio de correos de verificacion o comunicacion tecnica.",
      "Servicios de Apple: infraestructura del sistema, App Store, permisos del dispositivo y notificaciones del dispositivo.",
      "Google Analytics: medicion agregada de uso de esta pagina web publica, cuando aplique.",
    ],
    footer:
      "Debido a la naturaleza de estos servicios, puede existir transferencia internacional de datos conforme a los mecanismos contractuales y regulatorios aplicables. Procuramos que los terceros que tratan datos personales ofrezcan protecciones equivalentes o razonablemente compatibles con este aviso y con los requisitos aplicables de privacidad.",
  },
  {
    title: "9. Conservacion de datos",
    content: [
      "Conservamos los datos durante el tiempo necesario para mantener la cuenta activa, prestar el servicio, atender solicitudes de soporte, conservar registros de seguridad y cumplir obligaciones legales, fiscales, regulatorias o de defensa de derechos.",
      "Cuando los datos ya no sean necesarios, se eliminan o anonimizan conforme a nuestras politicas internas y obligaciones legales. Las copias residuales de respaldo pueden permanecer por un periodo limitado hasta su reemplazo o eliminacion tecnica ordinaria.",
    ],
  },
  {
    title: "10. Eliminacion de cuenta y datos",
    content: [
      "FinZen permite iniciar la eliminacion de cuenta dentro de la app, desde la seccion de perfil. Tambien puedes solicitar seguimiento escribiendo a privacy@morbia.com.mx desde el correo asociado a tu cuenta.",
      "Al solicitar la eliminacion, se elimina el registro de la cuenta en nuestros sistemas operativos y los datos asociados que no estemos obligados legalmente a conservar. Si existe una obligacion legal de retencion, se limita el uso de esos datos y se informa cuando corresponda.",
      "La eliminacion puede afectar de forma permanente el acceso a historial financiero, metas, imagenes, preferencias y cualquier contenido asociado a la cuenta.",
    ],
  },
  {
    title: "11. Revocacion de consentimiento y controles de privacidad",
    items: [
      "Puedes revocar permisos de microfono, reconocimiento de voz, fotos y notificaciones desde Configuracion de iOS.",
      "Puedes dejar de recibir recordatorios desactivando notificaciones o cambiando preferencias dentro de la app cuando la opcion este disponible.",
      "Puedes solicitar eliminacion de cuenta o datos escribiendo a privacy@morbia.com.mx.",
      "Puedes solicitar informacion adicional sobre proveedores, transferencias o tratamiento de datos mediante el mismo correo.",
    ],
  },
  {
    title: "12. Derechos de las personas usuarias",
    content: [
      "Puedes solicitar, segun la legislacion aplicable, acceso a tus datos personales, rectificacion de datos inexactos o incompletos, cancelacion o eliminacion de datos cuando corresponda, oposicion o limitacion de ciertos tratamientos, y portabilidad cuando sea legalmente aplicable.",
      "Para ejercer derechos, escribe a privacy@morbia.com.mx desde el correo asociado a tu cuenta e incluye tu solicitud especifica. Podemos solicitar informacion adicional razonable para verificar tu identidad antes de responder.",
    ],
  },
  {
    title: "13. Seguridad de la informacion",
    content: [
      "Aplicamos medidas tecnicas y organizativas razonables para proteger los datos frente a acceso no autorizado, perdida, alteracion o destruccion. Estas medidas pueden incluir controles de acceso, limitacion de permisos, registros operativos, separacion de entornos y buenas practicas de seguridad en los proveedores usados.",
      "Sin embargo, ningun sistema es completamente infalible. Si identificamos un incidente que requiera notificacion conforme a la ley aplicable, tomaremos las medidas correspondientes.",
    ],
  },
  {
    title: "14. Datos financieros y ausencia de asesoramiento financiero",
    content: [
      "FinZen ayuda a registrar, visualizar y organizar informacion financiera personal capturada por la persona usuaria. La app no sustituye asesoria financiera, fiscal, contable o legal profesional.",
      "Las recomendaciones, resumenes, respuestas de IA o proyecciones, cuando existan, deben entenderse como apoyo informativo y pueden depender de la exactitud de los datos ingresados por la persona usuaria.",
    ],
  },
  {
    title: "15. Menores de edad",
    content: [
      "FinZen no esta dirigida a menores de edad sin supervision legal. Si detectamos tratamiento no autorizado de datos de menores, tomaremos medidas para su eliminacion conforme a la ley aplicable.",
    ],
  },
  {
    title: "16. Cambios a este aviso",
    content: [
      "Podemos actualizar este Aviso de Privacidad para reflejar cambios legales, tecnicos u operativos. Publicaremos la version vigente con su fecha de actualizacion.",
      "Si los cambios son relevantes para el tratamiento de datos, podremos informar dentro de la app, por correo o mediante otros medios razonables.",
    ],
  },
]

export default function PrivacyNoticePage() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-200">
      <section className="border-b border-gray-800 bg-gray-900/80">
        <div className="mx-auto max-w-5xl px-5 py-8 md:py-10">
          <Link href="/" className="text-sm font-medium text-[#00d4e8] transition-colors hover:text-white">
            Morbia
          </Link>
          <div className="mt-10 max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#00d4e8]">FinZen</p>
            <h1 className="text-4xl font-bold text-white md:text-6xl">Aviso de Privacidad</h1>
            <p className="mt-5 text-lg leading-8 text-gray-300">
              Este Aviso de Privacidad describe como se recopilan, usan, almacenan y eliminan los datos personales de
              las personas usuarias de FinZen, aplicacion movil iOS y servicios relacionados.
            </p>
            <p className="mt-6 text-sm text-gray-400">
              <span className="font-semibold text-gray-300">Ultima actualizacion:</span> 2026-05-03
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-8 px-5 py-12 md:grid-cols-[240px_1fr] md:py-16">
        <aside className="hidden md:block">
          <div className="sticky top-8 rounded-lg border border-gray-800 bg-gray-900/60 p-5">
            <p className="text-sm font-semibold text-white">Contacto de privacidad</p>
            <a className="mt-3 block break-words text-sm text-[#00d4e8] hover:text-white" href={`mailto:${privacyEmail}`}>
              {privacyEmail}
            </a>
            <p className="mt-5 text-xs leading-5 text-gray-400">
              Usa este correo para derechos ARCO, eliminacion de cuenta, consultas de privacidad y seguimiento de
              solicitudes.
            </p>
          </div>
        </aside>

        <div className="space-y-10">
          <div className="rounded-lg border border-[#00d4e8]/25 bg-[#00d4e8]/10 p-5 text-sm leading-7 text-gray-200">
            <p>
              FinZen no vende informacion personal ni utiliza datos para rastreo publicitario entre apps o sitios de
              terceros. Algunos datos se comparten con proveedores estrictamente para operar la app, almacenar
              informacion, procesar funciones de IA, alojar imagenes, enviar comunicaciones tecnicas o cumplir
              obligaciones legales.
            </p>
          </div>

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
                      <span className="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-[#00d4e8]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.groups?.map((group) => (
                <div key={group.subtitle} className="mt-7">
                  <h3 className="text-lg font-semibold text-[#00d4e8]">{group.subtitle}</h3>
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
              Si tienes dudas sobre privacidad o tratamiento de datos, contactanos en{" "}
              <a className="font-semibold text-[#00d4e8] hover:text-white" href={`mailto:${privacyEmail}`}>
                {privacyEmail}
              </a>
              .
            </p>
          </section>
        </div>
      </section>
    </main>
  )
}
