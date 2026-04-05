import type { ContactInfoItem, FaqItem } from "@/types/contactContent";

export const contactInfo: ContactInfoItem[] = [
  {
    icon: "phone",
    title: "Teléfono",
    value: "+51 999 888 777",
    description: "Lunes a Viernes, 8am - 6pm",
    action: "tel:+51999888777",
  },
  {
    icon: "mail",
    title: "Email",
    value: "info@promotrip.pe",
    description: "Respuesta en 24 horas",
    action: "mailto:info@promotrip.pe",
  },
  {
    icon: "mapPin",
    title: "Oficina",
    value: "Av. Principal 123",
    description: "San Vicente de Cañete, Lima",
    action: "#",
  },
  {
    icon: "clock",
    title: "Horario",
    value: "Lun - Vie: 8am - 6pm",
    description: "Sáb: 9am - 1pm",
    action: "#",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "¿Cómo reservo un paquete para mi colegio?",
    answer:
      "Puedes usar nuestro chat IA para recibir recomendaciones personalizadas, o navegar directamente en la sección de paquetes. El proceso de reserva es guiado en 5 simples pasos.",
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Aceptamos tarjetas de crédito/débito (Culqi/Niubiz), Yape, Plin y transferencias bancarias. Todos los pagos son 100% seguros.",
  },
  {
    question: "¿Cómo sé que los proveedores son confiables?",
    answer:
      "Todos nuestros proveedores pasan por un proceso de verificación que incluye validación de RUC con SUNAT, documentos legales y referencias de otras instituciones.",
  },
  {
    question: "¿Puedo personalizar un paquete?",
    answer:
      "¡Sí! Puedes agregar promociones extras durante la reserva o contactar directamente al proveedor para solicitudes especiales.",
  },
];
