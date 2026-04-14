import type {
  HowItWorksExperienceCard,
  HowItWorksFaq,
  HowItWorksStep,
  HowItWorksTrustCard,
} from "@/types/howItWorks";

export const howItWorksSteps: HowItWorksStep[] = [
  {
    number: "01",
    title: "Explora",
    icon: "search",
    image: "/step-explora.png",
    description:
      "Encuentra paquetes de viaje verificados según destino, nivel educativo y presupuesto.",
    benefits: [
      "Filtros inteligentes por destino y categoría",
      "Información clara de cada paquete",
      "Comparación rápida entre opciones",
    ],
  },
  {
    number: "02",
    title: "Compara",
    icon: "barChart2",
    image: "/step-compara.png",
    description:
      "Revisa precios, actividades, duración y beneficios de varios paquetes en una vista clara.",
    benefits: [
      "Tabla comparativa lado a lado",
      "Detalles transparentes de servicios",
      "Beneficios visibles al instante",
    ],
  },
  {
    number: "03",
    title: "Reserva",
    icon: "calendarCheck",
    image: "/step-reserva.png",
    description:
      "Confirma tu viaje con pagos protegidos y acompañamiento directo durante todo el proceso.",
    benefits: [
      "Protección SSL en cada pago",
      "Confirmación inmediata por correo",
      "Soporte disponible en cada paso",
    ],
  },
];

export const howItWorksTrustCards: HowItWorksTrustCard[] = [
  {
    icon: "eye",
    title: "Navegación intuitiva",
    description:
      "Interfaz organizada y estructurada que facilita encontrar la opción correcta sin complicaciones.",
    items: ["Interfaz organizada", "Documentación formal"],
  },
  {
    icon: "info",
    title: "Información transparente",
    description:
      "Cada paquete muestra en detalle qué incluye y qué no, sin letra pequeña ni sorpresas.",
    items: ["Actividades detalladas", "Costos visibles"],
  },
  {
    icon: "lock",
    title: "Protección digital",
    description:
      "Tu información y pagos están protegidos mediante cifrado seguro y procesamiento confiable.",
    items: ["Certificado SSL", "Procesamiento con Culqi"],
  },
];

export const howItWorksExperienceCards: HowItWorksExperienceCard[] = [
  {
    icon: "zap",
    title: "Simple",
    description:
      "Proceso en pocos pasos, sin formularios complejos ni registros innecesarios para comenzar.",
  },
  {
    icon: "eye",
    title: "Claro",
    description:
      "Cada sección del sistema comunica con claridad qué información necesitas y cómo actuar.",
  },
  {
    icon: "checkCircle2",
    title: "Eficiente",
    description:
      "Funciona en móvil, tablet y escritorio. Adaptado para que reserves desde cualquier dispositivo.",
  },
];

export const howItWorksFaqs: HowItWorksFaq[] = [
  {
    question: "¿Cómo se verifican los proveedores?",
    answer:
      "Cada proveedor pasa por un proceso de validación interna donde se revisan sus documentos legales, RUC, experiencia y calidad de sus paquetes. Solo los proveedores verificados aparecen en la plataforma con el sello de verificación.",
  },
  {
    question: "¿Qué métodos de pago están disponibles?",
    answer:
      "Actualmente aceptamos pagos mediante tarjeta de crédito y débito a través de Culqi, una plataforma de pagos segura y certificada. Próximamente habilitaremos más métodos.",
  },
  {
    question: "¿Se puede modificar una reserva?",
    answer:
      "Las reservas pueden ser modificadas antes de la fecha límite indicada por el proveedor. Para solicitar cambios, comunícate directamente desde la sección 'Mis Reservaciones' o a través del chat de soporte.",
  },
  {
    question: "¿Cómo funciona la recomendación IA?",
    answer:
      "Nuestro asistente de inteligencia artificial analiza tus preferencias, nivel educativo, destino y presupuesto para sugerirte los paquetes más adecuados. Cuanta más información compartas, más precisa será la recomendación.",
  },
];
