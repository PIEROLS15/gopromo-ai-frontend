import { mockPackages } from "@/lib/mock-data";
import type {
  ChatbotMessage,
  ChatbotOption,
  ChatbotPreferences,
} from "@/types/chatbot";
import type { TravelPackage } from "@/types/mockData";

export const chatbotStorageKeys = {
  messages: "chatbot_messages",
  step: "chatbot_step",
  preferences: "chatbot_preferences",
};

const categoryOptions: ChatbotOption[] = [
  { label: "Aventura", value: "aventura" },
  { label: "Educativo", value: "educativo" },
  { label: "Cultural", value: "cultural" },
  { label: "Relajacion", value: "relajacion" },
];

const durationOptions: ChatbotOption[] = [
  { label: "1 dia", value: "1 dia" },
  { label: "2-3 dias", value: "2-3 dias" },
  { label: "1 semana", value: "1 semana" },
  { label: "Cualquiera", value: "cualquiera" },
];

const levelOptions: ChatbotOption[] = [
  { label: "Primaria", value: "primaria" },
  { label: "Secundaria", value: "secundaria" },
  { label: "Superior", value: "superior" },
  { label: "Cualquiera", value: "cualquiera" },
];

export const getInitialChatbotMessages = (): ChatbotMessage[] => [
  {
    id: "1",
    type: "bot",
    content:
      "Hola! Soy PromoTrip AI, tu asistente inteligente de viajes. Te ayudare a encontrar el viaje ideal para tu grupo estudiantil.",
  },
  {
    id: "2",
    type: "bot",
    content: "Que tipo de experiencia buscas?",
    options: categoryOptions,
  },
];

export const getDurationQuestionMessage = (id: string): ChatbotMessage => ({
  id,
  type: "bot",
  content: "Perfecto! Cuanto tiempo tienen disponible?",
  options: durationOptions,
});

export const getLevelQuestionMessage = (id: string): ChatbotMessage => ({
  id,
  type: "bot",
  content: "Para que nivel educativo es el viaje?",
  options: levelOptions,
});

export const getGenericReplyMessage = (id: string): ChatbotMessage => ({
  id,
  type: "bot",
  content:
    "Gracias por tu mensaje. Para ayudarte mejor, puedes usar las opciones sugeridas, reiniciar la busqueda o contactar directamente con nuestro equipo.",
});

export const getResultsMessage = (
  id: string,
  results: TravelPackage[]
): ChatbotMessage => ({
  id,
  type: "bot",
  content: `Encontre ${results.length} paquete${results.length !== 1 ? "s" : ""} perfecto${
    results.length !== 1 ? "s" : ""
  } para ustedes:`,
  packages: results,
});

export const filterPackagesByPreferences = (
  preferences: ChatbotPreferences
): TravelPackage[] => {
  let filtered = mockPackages.filter((pkg) => {
    if (preferences.category && preferences.category !== "cualquiera") {
      if (pkg.category !== preferences.category) return false;
    }

    if (preferences.duration && preferences.duration !== "cualquiera") {
      if (preferences.duration === "1 dia" && pkg.duration !== "1 día") return false;
      if (
        preferences.duration === "2-3 dias" &&
        !["2 días", "3 días"].includes(pkg.duration)
      ) {
        return false;
      }
      if (
        preferences.duration === "1 semana" &&
        !pkg.duration.toLowerCase().includes("semana")
      ) {
        return false;
      }
    }

    if (preferences.level && preferences.level !== "cualquiera") {
      if (pkg.level !== preferences.level) return false;
    }

    return true;
  });

  if (filtered.length === 0 && preferences.category) {
    filtered = mockPackages.filter((pkg) => pkg.category === preferences.category);
  }

  if (filtered.length === 0) {
    filtered = mockPackages;
  }

  return filtered;
};

export const toLabel = (value: string): string =>
  value.charAt(0).toUpperCase() + value.slice(1);
