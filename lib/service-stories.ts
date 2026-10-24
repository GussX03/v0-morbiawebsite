export type ServiceStory = {
  headline: string
  summary: string
  imageAlt: string
  audience: string
  overview: string[]
  signals: { title: string; text: string }[]
  solutions: { title: string; text: string }[]
  example: { title: string; context: string; before: string; after: string }
  benefits: { title: string; text: string }[]
  questions: { question: string; answer: string }[]
}

export const serviceStories: Record<string, ServiceStory> = {
  "presencia-digital": {
    headline: "Una presencia digital clara, de principio a fin.",
    summary: "Conecta SEO, Google Maps, redes sociales, fotografía, video y campañas para presentar tu negocio con coherencia y facilitar el contacto.",
    imageAlt: "Contacto fácil de encontrar. Botón turquesa en una superficie de piedra clara",
    audience: "Para negocios que quieren explicar mejor lo que ofrecen, mantener sus canales al día y entender qué acciones acercan a sus clientes.",
    overview: [
      "Una persona puede descubrir tu negocio en Google, revisar el mapa, entrar a tus redes y consultar tu sitio antes de escribirte. Si los horarios cambian, las fotos ya no representan el lugar o cada canal cuenta algo distinto, le cuesta saber qué haces y cómo continuar.",
      "Morbia revisa esos puntos y propone un plan que puede incluir SEO, Perfil de Empresa en Google para negocios elegibles, gestión de redes sociales, fotografía y video, campañas de Google o Meta y medición. El alcance, los canales y el calendario se acuerdan de acuerdo con tus objetivos y recursos.",
    ],
    signals: [
      { title: "Cada canal presenta una versión distinta", text: "Los servicios, horarios, imágenes o formas de contacto no coinciden entre tu sitio, Google y redes sociales." },
      { title: "Publicar se vuelve una tarea de último momento", text: "No hay una planificación de contenido y cuesta mostrar con continuidad lo que hace valioso a tu negocio." },
      { title: "Hay actividad, pero no claridad sobre qué funciona", text: "Las visitas, mensajes y campañas se revisan por separado, sin una lectura común de las acciones importantes." },
    ],
    solutions: [
      { title: "Auditoría y estrategia por canales", text: "Revisamos cómo te encuentran, qué información reciben y qué necesita lograr cada canal. Priorizamos mejoras realistas en vez de abrir perfiles o campañas sin un objetivo claro." },
      { title: "SEO para buscadores y respuestas de IA", text: "Mejoramos la base técnica y el contenido de tu sitio para que explique con claridad tus servicios y pueda ser rastreado. Una estrategia útil también organiza la información para que los buscadores y asistentes entiendan mejor el contexto, sin fórmulas ni promesas de posición." },
      { title: "Perfil de Empresa en Google y Maps", text: "Ayudamos a crear o reclamar el perfil, completar datos, categorías, horarios, enlaces, fotos y publicaciones, y responder a reseñas reales sin comprar opiniones ni incentivar calificaciones. Google limita estos perfiles a negocios elegibles; trabajamos con invitaciones de acceso y el negocio conserva la propiedad de su cuenta." },
      { title: "Redes sociales con una línea editorial", text: "Definimos los canales, temas, tono, calendario, textos y piezas que tienen sentido para tu audiencia. La publicación y la atención de comentarios o mensajes se acuerdan dentro del alcance de cada proyecto." },
      { title: "Fotografía y producción de video", text: "Planeamos imágenes de tus espacios, productos, servicios y equipo, además de videos cortos para redes o campañas. Los formatos y entregables se definen antes de cada producción." },
      { title: "Campañas y medición de resultados", text: "Configuramos y optimizamos campañas en Google Ads o Meta, con objetivos, anuncios y seguimiento acordados. La inversión publicitaria se paga por separado a cada plataforma; con acceso autorizado revisamos Search Console, GA4, estadísticas del perfil y los paneles de anuncios." },
    ],
    example: {
      title: "De canales separados a una ruta fácil de seguir.",
      context: "Imagina un negocio de servicios que recibe preguntas desde Google, su sitio y varias redes sociales.",
      before: "Cada perfil tiene horarios o descripciones distintas. Las fotos no muestran el servicio actual y el equipo no sabe qué publicaciones llevan a llamadas o solicitudes.",
      after: "La información se revisa y ordena, las publicaciones siguen una línea común y las campañas se miden con eventos acordados. El equipo obtiene una base más clara para ajustar su siguiente paso.",
    },
    benefits: [
      { title: "Una marca coherente en sus canales", text: "Tu negocio explica sus servicios y formas de contacto de manera consistente en los puntos donde las personas te buscan." },
      { title: "Contenido visual propio y útil", text: "Fotos y videos muestran lo que realmente ofreces y pueden adaptarse a tus páginas, perfiles y campañas." },
      { title: "Mejor criterio para priorizar", text: "Los datos disponibles ayudan a distinguir qué canales reciben atención y qué vale la pena probar después." },
    ],
    questions: [
      { question: "¿Pueden garantizar que mi negocio aparezca primero en Google o en una respuesta de IA?", answer: "No. Google explica que la visibilidad local depende de factores como relevancia, distancia y notoriedad, y ningún proveedor puede comprar una mejor posición orgánica. En buscadores y asistentes trabajamos la información, el sitio y la medición, pero la inclusión y el orden dependen de sistemas externos." },
      { question: "¿Cualquier negocio puede tener un perfil en Google Maps?", answer: "No. Google exige que los negocios elegibles tengan contacto presencial con sus clientes durante el horario declarado. Revisamos las reglas vigentes antes de solicitar o modificar un perfil y no creamos ubicaciones que no existen." },
      { question: "¿Las cuentas y los perfiles quedan a nombre de Morbia?", answer: "No. El negocio conserva la propiedad de sus cuentas. Para trabajar usamos los permisos de administrador o colaborador que correspondan, sin pedir que compartas contraseñas." },
      { question: "¿Ustedes toman las fotos y producen los videos?", answer: "Sí, cuando la producción forma parte del alcance acordado. Definimos qué contenido se necesita, dónde se realizará, los formatos y las entregas antes de programar la sesión." },
      { question: "¿El presupuesto de anuncios está incluido?", answer: "No. Los honorarios de planeación y gestión se especifican por separado de la inversión que el cliente autoriza y paga a Google, Meta u otra plataforma." },
      { question: "¿Cómo sabré si la estrategia funciona?", answer: "Acordamos los indicadores y, con tu autorización, revisamos el desempeño orgánico en Search Console y las visitas o acciones medibles en GA4, el perfil de Google y los paneles de anuncios. El detalle depende de los permisos y de que la medición esté configurada correctamente." },
    ],
  },
  "paginas-web": {
    headline: "Tu web, trabajando para tu negocio.",
    summary: "Una página que explica tu valor, genera confianza y facilita que el siguiente cliente dé el primer paso.",
    imageAlt: "Una página abre camino. Entrada de piedra clara hacia un jardín iluminado",
    audience: "Para negocios que quieren presentar mejor lo que hacen y empresas que necesitan ordenar su atención en línea.",
    overview: [
      "Tu página suele ser el primer encuentro con alguien que todavía no te conoce. Si la información está desactualizada, cuesta encontrar un servicio o desde el celular es difícil contactarte, esa persona puede irse sin saber lo que tu negocio realmente ofrece.",
      "Diseñamos ese recorrido para que tus visitantes entiendan qué haces, para quién es y cómo empezar contigo. Y cuando necesitas más que una presentación, creamos herramientas para recibir solicitudes, compartir información o acompañar a tus clientes desde un mismo lugar.",
    ],
    signals: [
      { title: "Te preguntan siempre lo mismo", text: "Tus clientes necesitan escribirte para conocer servicios, encontrar información básica o saber cómo solicitar una cotización." },
      { title: "Tu página ya no representa tu negocio", text: "Has crecido, pero tu presencia digital se quedó atrás y no muestra la calidad con la que hoy trabajas." },
      { title: "Todo llega por canales distintos", text: "Recibes datos incompletos por mensajes y correos, y tu equipo tiene que reconstruir cada solicitud." },
    ],
    solutions: [
      { title: "Una presentación que inspira confianza", text: "Organizamos tus servicios, tu propuesta y las preguntas de tus clientes para que sea sencillo entender por qué elegirte." },
      { title: "Páginas para campañas concretas", text: "Damos a cada promoción un destino enfocado, con un mensaje claro y una acción que ayude a continuar la conversación." },
      { title: "Catálogos y portafolios fáciles de recorrer", text: "Mostramos lo que vendes o el trabajo que realizas con una estructura cómoda para comparar y pedir información." },
      { title: "Un espacio propio para tus clientes", text: "Podemos concentrar documentos, solicitudes o información útil para que cada persona encuentre lo que necesita sin perseguir mensajes." },
      { title: "Solicitudes mejor preparadas", text: "Diseñamos formularios que piden lo importante desde el principio y llevan la información al lugar donde tu equipo puede atenderla." },
    ],
    example: {
      title: "De una visita a una conversación con contexto.",
      context: "Imagina una empresa de servicios que recibe muchas preguntas, pero pocas solicitudes con la información necesaria para cotizar.",
      before: "El visitante encuentra una lista general de servicios, escribe por WhatsApp y tu equipo empieza desde cero: qué necesita, cuándo lo necesita y para qué tipo de negocio.",
      after: "La página le ayuda a identificar el servicio adecuado, responde sus primeras dudas y le permite enviar una solicitud ordenada. Tu equipo puede concentrarse antes en preparar una respuesta útil.",
    },
    benefits: [
      { title: "Más claridad para quien te visita", text: "Cada sección responde una pregunta y ayuda a dar el siguiente paso sin perderse entre información dispersa." },
      { title: "Una mejor primera impresión", text: "Tu presencia digital acompaña la calidad de tu servicio y se adapta a la forma en que las personas navegan desde el celular." },
      { title: "Una base para seguir creciendo", text: "Puedes empezar con lo que hoy necesita tu negocio y evaluar nuevas funciones conforme cambien tus prioridades." },
    ],
    questions: [
      { question: "¿Necesito tener todos mis textos y fotos listos?", answer: "Podemos empezar revisando lo que ya tienes. Identificamos qué información sirve, qué hace falta y cómo presentarla para que tus clientes entiendan tu negocio. Las fotografías, textos y materiales definitivos se acuerdan dentro del alcance del proyecto." },
      { question: "¿Pueden mejorar una página que ya existe?", answer: "Sí. Primero revisamos qué conviene conservar y qué está dificultando la experiencia. Con esa información definimos si es suficiente mejorar algunas partes o si conviene replantear el recorrido completo." },
      { question: "¿La página puede crecer después?", answer: "Planeamos el punto de partida con tus necesidades actuales. Si más adelante quieres incorporar solicitudes, un catálogo o un espacio para clientes, revisamos esas funciones contigo y su relación con lo que ya está construido." },
    ],
  },
  chatbots: {
    headline: "Cada conversación merece una respuesta.",
    summary: "Ayuda a tus clientes a resolver dudas y dar el siguiente paso, incluso cuando tu equipo está ocupado.",
    imageAlt: "Atención con un siguiente paso. Una ruta turquesa conecta tres piezas sobre piedra clara",
    audience: "Para negocios que reciben consultas repetidas, atienden fuera de horario o quieren dar mejor seguimiento a sus oportunidades.",
    overview: [
      "Una persona pregunta por un servicio mientras tu equipo atiende una llamada. Otra escribe después del cierre. Al día siguiente hay mensajes pendientes, dudas repetidas y conversaciones cuyo contexto se ha perdido. Mantener una atención cercana se vuelve más difícil conforme crece el negocio.",
      "Un chatbot puede recibir esas primeras preguntas, orientar con la información de tu empresa y reunir lo necesario para continuar. Diseñamos la conversación para que la persona sepa qué puede resolver y cuándo necesita la atención de tu equipo.",
    ],
    signals: [
      { title: "Los mensajes se acumulan", text: "Responder las mismas dudas ocupa tiempo que podrías dedicar a atender solicitudes que requieren una conversación personal." },
      { title: "Hay oportunidades fuera de horario", text: "La gente te busca cuando puede, pero no siempre coincide con el momento en que tu equipo está disponible." },
      { title: "El seguimiento empieza sin contexto", text: "Cuando llega una conversación a la persona correcta, el cliente tiene que volver a explicar lo que necesita." },
    ],
    solutions: [
      { title: "Primeras respuestas en tu sitio web", text: "Orientamos a quien llega a tu página para que encuentre servicios, resuelva dudas frecuentes y elija cómo continuar." },
      { title: "Atención desde WhatsApp", text: "Diseñamos un recorrido conversacional para el canal que tus clientes ya utilizan, según las posibilidades de tu operación y cuenta." },
      { title: "Información consistente", text: "Tomamos como referencia la información que tu negocio aprueba para responder sobre sus servicios, procesos y formas de contacto." },
      { title: "Solicitudes con los datos importantes", text: "El asistente puede preguntar qué necesita la persona y reunir el contexto que tu equipo requiere para atenderla mejor." },
      { title: "Un siguiente paso claro", text: "Definimos cuándo continuar con una respuesta, canalizar a una persona o dejar una solicitud para seguimiento, sin encerrar al cliente en un ciclo de preguntas." },
    ],
    example: {
      title: "Una consulta nocturna puede avanzar desde hoy.",
      context: "Imagina que alguien conoce tu negocio por una recomendación y entra a preguntar por un servicio cuando ya cerraste.",
      before: "El mensaje espera hasta la mañana. Cuando el equipo responde, todavía necesita averiguar qué servicio busca la persona y qué información puede compartirle.",
      after: "El asistente explica lo básico, identifica la necesidad y reúne la solicitud. Al retomar la conversación, tu equipo conoce el contexto y puede enfocarse en la parte que requiere atención personal.",
    },
    benefits: [
      { title: "Menos preguntas repetidas para tu equipo", text: "Las dudas frecuentes tienen un primer punto de atención y las personas de tu negocio se concentran en conversaciones con más valor." },
      { title: "Un recorrido más fácil para el cliente", text: "La conversación orienta y ofrece alternativas claras para seguir, sin obligar a buscar entre muchas páginas." },
      { title: "Más contexto para dar seguimiento", text: "La solicitud puede llegar con los datos acordados, para que tu equipo retome el hilo de forma más ordenada." },
    ],
    questions: [
      { question: "¿El chatbot reemplaza a mi equipo?", answer: "Su función es apoyarlo. Puede resolver una primera parte de la atención y reunir información, mientras tu equipo se ocupa de decisiones, excepciones y conversaciones que necesitan trato personal. Definimos juntos esa división." },
      { question: "¿Cómo aprende la información de mi negocio?", answer: "Partimos de la información que nos compartas y apruebes: servicios, preguntas frecuentes, procesos y criterios de atención. Revisamos las respuestas antes de publicarlo y acordamos cómo actualizar ese contenido." },
      { question: "¿Puede atender cualquier consulta sin supervisión?", answer: "Diseñamos límites claros. Si falta información, una consulta está fuera del alcance o requiere una decisión humana, el recorrido debe explicar cómo contactar al equipo. La inteligencia artificial puede equivocarse, por lo que la revisión y las actualizaciones forman parte de una atención responsable." },
    ],
  },
  "automatizacion-de-procesos": {
    headline: "Que el trabajo avance sin perseguirlo.",
    summary: "Conecta tareas, avisos y seguimientos para que tu equipo recupere tiempo y tenga claro qué sigue.",
    imageAlt: "Avisos que sostienen el avance. Tres canales en una pared de piedra con una pieza turquesa",
    audience: "Para equipos que dependen de recordatorios, capturas repetidas y seguimientos manuales para que la operación avance.",
    overview: [
      "Una solicitud llega por correo, alguien la copia en una hoja, otra persona pide una aprobación y después hay que recordar enviar el documento. Cada paso parece pequeño, pero juntos consumen atención y hacen que el proceso dependa de que nadie olvide nada.",
      "Conectamos esas acciones para que la información llegue a quien la necesita y cada avance tenga un siguiente paso. Empezamos por un proceso concreto, entendemos sus excepciones y buscamos una mejora que tu equipo pueda usar en su trabajo diario.",
    ],
    signals: [
      { title: "Tienes que recordar cada pendiente", text: "Sin un mensaje de seguimiento, una aprobación o una entrega puede quedarse esperando aunque todo esté listo para avanzar." },
      { title: "La misma información se captura varias veces", text: "Los datos pasan de un correo a una hoja y después a otro sistema, con esfuerzo duplicado y versiones distintas." },
      { title: "No sabes dónde se detuvo una solicitud", text: "Para conocer el estado de un trámite necesitas preguntar a varias personas y revisar más de una conversación." },
    ],
    solutions: [
      { title: "Aprobaciones que llegan a la persona correcta", text: "Organizamos solicitudes y responsables para que una autorización tenga el contexto necesario y un camino claro para continuar." },
      { title: "Avisos en el momento adecuado", text: "Configuramos recordatorios y notificaciones alrededor de los eventos que importan a tu operación, evitando depender de la memoria del equipo." },
      { title: "Datos completos desde el inicio", text: "Reunimos y revisamos la información acordada antes de enviarla al siguiente paso, para reducir vueltas y aclaraciones." },
      { title: "Seguimientos conectados", text: "Ayudamos a que correos, respuestas y cambios de estado formen parte del mismo recorrido de trabajo." },
      { title: "Documentos donde deben estar", text: "Podemos preparar o entregar archivos a partir de los datos del proceso, con las revisiones que tu negocio necesite." },
    ],
    example: {
      title: "De una solicitud suelta a un proceso visible.",
      context: "Imagina una empresa donde cada pedido necesita revisión, autorización y envío de documentación al cliente.",
      before: "El equipo copia los datos, pregunta quién autoriza y manda recordatorios. El estado del pedido se entiende revisando mensajes entre varias personas.",
      after: "La solicitud reúne los datos importantes, avisa al responsable y continúa después de la aprobación. Los avisos y la documentación siguen el recorrido acordado, y las excepciones llegan a una persona para revisarlas.",
    },
    benefits: [
      { title: "Tiempo que vuelve a tu equipo", text: "Las acciones repetidas dejan de ocupar la misma atención en cada solicitud, para dedicar más energía a clientes y mejoras." },
      { title: "Responsables y siguientes pasos claros", text: "Cada persona puede entender qué le toca y qué necesita para avanzar, con menos preguntas y seguimiento disperso." },
      { title: "Una mejora que puedes observar", text: "Acordamos qué revisar, como tiempos de atención o solicitudes pendientes, para evaluar si el proceso está funcionando mejor." },
    ],
    questions: [
      { question: "¿Tengo que cambiar todas las herramientas que uso?", answer: "Primero revisamos las que ya tienes y las posibilidades de conectarlas. La propuesta parte de lo que tu equipo necesita resolver; cualquier cambio de herramienta se explica y se acuerda antes de implementarlo." },
      { question: "¿Qué conviene automatizar primero?", answer: "Un buen punto de partida es una tarea frecuente, con pasos claros y un problema que puedas observar: demoras, información incompleta o mucho seguimiento manual. Juntos evaluamos su impacto y las excepciones que necesitan atención humana." },
      { question: "¿Cómo sé si la automatización está ayudando?", answer: "Definimos el resultado esperado antes de construir. Podemos observar el tiempo de un proceso, las solicitudes que se quedan pendientes o el trabajo que tu equipo necesita hacer manualmente. El resultado depende del proceso, sus herramientas y la adopción del equipo." },
    ],
  },
  rpa: {
    headline: "Las tareas repetidas pueden pesar menos.",
    summary: "Deja las capturas y movimientos rutinarios en un recorrido organizado, y a tu equipo las decisiones que importan.",
    imageAlt: "Repite lo definido, con control. Piezas claras recorren un mecanismo circular sobre fondo oscuro",
    audience: "Para áreas administrativas y operativas que repiten los mismos pasos entre herramientas, documentos y sistemas.",
    overview: [
      "Cuando una persona pasa buena parte del día copiando datos, descargando archivos o actualizando registros, su experiencia queda atrapada en una tarea que se repite. Además, cualquier cambio, interrupción o dato inesperado puede obligarla a empezar otra vez.",
      "RPA significa automatizar una secuencia de tareas repetitivas. Revisamos contigo qué pasos pueden ejecutarse de forma ordenada, qué debe validar una persona y cómo atender los casos que se salen de lo habitual. La prioridad es que la operación sea comprensible y controlable.",
    ],
    signals: [
      { title: "Tu equipo copia datos de una pantalla a otra", text: "La tarea cambia de registro, pero los pasos son prácticamente los mismos y necesitan atención cada vez." },
      { title: "Los reportes llegan después de mucho trabajo", text: "Antes de revisar la información, alguien tiene que reunir archivos y actualizar registros de forma manual." },
      { title: "Una tarea rutinaria depende de una persona", text: "Cuando esa persona está ocupada, falta o necesita atender otra prioridad, el trabajo se acumula." },
    ],
    solutions: [
      { title: "Información que pasa de un lugar a otro", text: "Organizamos tareas de captura entre herramientas para reducir los movimientos que una persona repite con cada registro." },
      { title: "Rutinas con un orden definido", text: "Convertimos una tarea repetible en un recorrido con inicio, validaciones y una condición clara para terminar." },
      { title: "Datos preparados para el siguiente equipo", text: "Podemos reunir y trasladar información operativa para que otra área trabaje con los datos que necesita." },
      { title: "Reportes que requieren menos preparación", text: "Ayudamos a actualizar la información recurrente para que el esfuerzo se concentre antes en revisarla y entenderla." },
      { title: "Ejecuciones y excepciones visibles", text: "Acordamos cuándo debe correr la tarea y cómo avisar si aparece un caso que necesita revisión humana." },
    ],
    example: {
      title: "Una mañana con menos capturas pendientes.",
      context: "Imagina un equipo administrativo que actualiza diariamente información de varios archivos en una herramienta de trabajo.",
      before: "Una persona abre cada archivo, busca la información y repite la captura. Al terminar, necesita revisar si faltó algún registro o hubo un dato inesperado.",
      after: "La rutina sigue los pasos acordados, actualiza los registros permitidos y separa los casos que necesitan atención. El equipo revisa las excepciones y utiliza su tiempo para resolverlas con criterio.",
    },
    benefits: [
      { title: "Menos esfuerzo en la misma rutina", text: "Las personas pueden dedicar su atención a resolver incidencias y acompañar otras prioridades de la operación." },
      { title: "Pasos más consistentes", text: "La secuencia se ejecuta con las reglas acordadas y permite identificar cuándo una situación requiere detenerse y revisar." },
      { title: "Mayor claridad sobre lo pendiente", text: "El equipo conoce qué pudo avanzar y qué necesita una decisión, sin tratar cada registro como si fuera completamente nuevo." },
    ],
    questions: [
      { question: "¿En qué se diferencia de automatizar un proceso?", answer: "La automatización de procesos conecta el recorrido completo del trabajo, como una solicitud y su aprobación. RPA se enfoca en ejecutar pasos repetitivos, por ejemplo capturar información entre herramientas. Pueden complementarse dentro de una misma solución." },
      { question: "¿Funciona con cualquier sistema?", answer: "Necesitamos revisar las herramientas, los permisos y la estabilidad de cada paso. Algunos sistemas facilitan la automatización y otros presentan límites. Te explicamos esa viabilidad antes de definir el alcance." },
      { question: "¿Qué ocurre si cambia una pantalla o aparece un error?", answer: "Los cambios en las herramientas pueden requerir ajustes. Por eso acordamos cómo detectar interrupciones, qué tareas deben detenerse y cómo avisar al equipo para que revise el caso y la operación pueda continuar con control." },
    ],
  },
  "inteligencia-artificial": {
    headline: "Tu conocimiento, más cerca de tu equipo.",
    summary: "Convierte documentos, preguntas y datos dispersos en ayuda útil para el trabajo de cada día.",
    imageAlt: "IA desde fuentes confiables. Paneles transparentes sobre una superficie azul oscuro",
    audience: "Para empresas que quieren usar inteligencia artificial en una necesidad concreta de atención, información o trabajo interno.",
    overview: [
      "En tu empresa ya existe mucho conocimiento: documentos, conversaciones, experiencia del equipo y respuestas que alguien ha preparado antes. El problema aparece cuando encontrar lo correcto toma demasiado tiempo o depende de preguntar siempre a la misma persona.",
      "Aplicamos inteligencia artificial para apoyar tareas específicas: localizar información, ordenar documentos, resumir una consulta o preparar una primera respuesta. Diseñamos el uso alrededor de una necesidad real, con fuentes acordadas y revisión humana cuando el contexto lo requiere.",
    ],
    signals: [
      { title: "Encontrar información consume demasiado tiempo", text: "Las respuestas existen, pero están repartidas entre carpetas, documentos y personas que no siempre están disponibles." },
      { title: "Tu equipo lee mucho para ubicar lo importante", text: "Cada mensaje o documento necesita revisarse antes de saber qué contiene y quién debe atenderlo." },
      { title: "Quieres usar IA, pero necesitas un caso claro", text: "Hay muchas herramientas disponibles y cuesta identificar cuál aportaría algo útil al trabajo de tu empresa." },
    ],
    solutions: [
      { title: "Un asistente para consultas internas", text: "Acercamos al equipo la información de referencia que necesita para resolver preguntas frecuentes sobre el negocio." },
      { title: "Mensajes y documentos mejor organizados", text: "Podemos ayudar a identificar su tema o tipo para preparar su revisión y llevarlos al recorrido adecuado." },
      { title: "Lo importante de una lectura extensa", text: "Preparamos resúmenes que sirvan como primer apoyo para revisar información, conservando el acceso a la fuente original." },
      { title: "Conocimiento más fácil de consultar", text: "Organizamos una forma de preguntar sobre materiales aprobados por tu empresa, con límites según la información disponible." },
      { title: "Apoyo para preparar el siguiente paso", text: "La IA puede proponer un borrador o una orientación que una persona revisa antes de tomar una decisión o compartirla." },
    ],
    example: {
      title: "La experiencia del negocio, al alcance de más personas.",
      context: "Imagina un equipo que recibe consultas sobre servicios y necesita buscar la respuesta en varios documentos internos.",
      before: "Cada persona busca en carpetas o interrumpe a alguien con más experiencia. La respuesta tarda y puede depender del documento que haya encontrado primero.",
      after: "Un asistente consulta los materiales acordados y ofrece una primera orientación. El equipo revisa el contexto, confirma la información y dedica más atención a los casos que realmente necesitan criterio.",
    },
    benefits: [
      { title: "Información más accesible", text: "El conocimiento de referencia puede estar más cerca de las personas que lo necesitan para hacer su trabajo." },
      { title: "Menos esfuerzo para empezar", text: "Un resumen, una clasificación o un borrador ayuda a llegar antes al momento de revisar y decidir." },
      { title: "Un uso de IA con propósito", text: "Cada función responde a una tarea concreta y se evalúa por su utilidad para el equipo, con límites claros." },
    ],
    questions: [
      { question: "¿Necesito saber de inteligencia artificial para empezar?", answer: "No. Lo importante es identificar una tarea que hoy requiere mucho esfuerzo o una información difícil de consultar. Te ayudamos a valorar si la IA es adecuada y a definir cómo debería apoyar a las personas que la usarán." },
      { question: "¿La inteligencia artificial siempre responde bien?", answer: "Puede equivocarse o interpretar una pregunta fuera de contexto. Definimos fuentes, límites y formas de revisión según la tarea. Las decisiones importantes deben conservar la supervisión de una persona con el criterio necesario." },
      { question: "¿Qué información necesita mi empresa compartir?", answer: "Depende del objetivo. Antes de implementar revisamos qué materiales son necesarios, quién debe consultarlos y qué restricciones hay que respetar. La propuesta debe explicar el tratamiento de la información y las herramientas que participan." },
    ],
  },
  "analisis-de-datos": {
    headline: "Ve lo importante. Decide con contexto.",
    summary: "Reúne la información de tu negocio en una lectura clara para saber dónde poner atención y qué hacer después.",
    imageAlt: "Un indicador, una pregunta. Una esfera transparente sobre una placa turquesa",
    audience: "Para empresas que necesitan entender ventas, seguimiento y operación sin perseguir archivos ni preparar reportes desde cero.",
    overview: [
      "Vender, atender y operar genera información todos los días. Pero tener muchos datos no significa tener una respuesta clara: qué está avanzando, dónde se acumula trabajo o qué necesita atención antes de convertirse en un problema mayor.",
      "Ayudamos a conectar esa información y a presentarla de una forma que puedas usar. Primero definimos las preguntas de tu negocio y después organizamos los indicadores y reportes que permiten responderlas, sin llenar la pantalla de cifras que nadie utiliza.",
    ],
    signals: [
      { title: "Cada área maneja una versión distinta", text: "Hay varias hojas y reportes, pero cuesta identificar qué dato está actualizado y cómo se relaciona con los demás." },
      { title: "Preparar el reporte toma demasiado tiempo", text: "El equipo invierte horas reuniendo información antes de poder hablar sobre lo que está pasando." },
      { title: "Detectas los problemas cuando ya crecieron", text: "Los pendientes y cambios importantes no son visibles hasta que alguien hace una revisión especial." },
    ],
    solutions: [
      { title: "Una vista de la operación", text: "Organizamos un tablero que permita reconocer el estado del trabajo y los puntos que necesitan atención." },
      { title: "Indicadores que responden preguntas", text: "Elegimos contigo qué vale la pena observar y cómo interpretar cada dato dentro del contexto de tu negocio." },
      { title: "Ventas y seguimiento más claros", text: "Ayudamos a visualizar oportunidades, solicitudes y avances para que las conversaciones del equipo partan de información compartida." },
      { title: "Fuentes de información conectadas", text: "Revisamos dónde están tus datos y cómo reunirlos con una estructura consistente y actualizaciones acordadas." },
      { title: "Reportes para tomar acción", text: "Presentamos la información con el detalle que necesita cada responsable para pasar de observar un número a decidir un siguiente paso." },
    ],
    example: {
      title: "Una reunión que empieza por lo que importa.",
      context: "Imagina una empresa que reúne cada semana reportes de ventas y seguimiento antes de decidir sus prioridades.",
      before: "La reunión empieza comparando archivos y preguntando cuál es el más reciente. Parte del tiempo se va en aclarar los datos en lugar de resolver los pendientes.",
      after: "El equipo consulta una vista acordada de la información y reconoce qué necesita atención. La conversación puede enfocarse en por qué sucede, quién lo atenderá y qué conviene hacer después.",
    },
    benefits: [
      { title: "Una lectura compartida del negocio", text: "El equipo puede conversar con referencias consistentes y entender cómo se relacionan sus resultados." },
      { title: "Menos preparación manual de reportes", text: "La información puede reunirse de forma más ordenada para dedicar más tiempo a interpretarla." },
      { title: "Prioridades con más contexto", text: "Los indicadores ayudan a formular mejores preguntas y a decidir dónde hace falta revisar con mayor detalle." },
    ],
    questions: [
      { question: "¿Sirve si hoy sólo trabajo con hojas de cálculo?", answer: "Puede ser un buen punto de partida. Revisamos cómo están organizados los archivos, quién los actualiza y qué preguntas quieres responder. A partir de eso definimos qué se puede aprovechar y qué información necesita ordenarse." },
      { question: "¿Qué indicadores debería ver mi empresa?", answer: "Los que ayuden a tomar decisiones reales. Por ejemplo, qué solicitudes esperan atención o cómo avanza el seguimiento comercial. La selección depende de tus objetivos y de los datos que puedas mantener de forma confiable." },
      { question: "¿La información se actualiza sola?", answer: "Depende de las fuentes y las posibilidades de conexión. Definimos la frecuencia de actualización y las tareas que siguen siendo responsabilidad del equipo, para que cada persona sepa qué está viendo y qué tan reciente es." },
    ],
  },
}

export const serviceApproach = [
  { title: "Entendemos cómo trabajas", text: "Escuchamos a las personas que viven el proceso y revisamos qué les quita tiempo, qué esperan tus clientes y qué herramientas ya utilizan." },
  { title: "Elegimos un punto de partida", text: "Definimos una necesidad concreta, el alcance y cómo reconocer una mejora. Te explicamos qué incluye la propuesta para que puedas decidir con claridad." },
  { title: "Lo ponemos a trabajar contigo", text: "Probamos el recorrido con situaciones reales de tu operación, resolvemos ajustes y acordamos el acompañamiento que necesita tu equipo para usarlo." },
] as const
