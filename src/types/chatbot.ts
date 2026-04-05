import type { TravelPackage } from "@/types/mockData";

export type ChatbotStep = "category" | "duration" | "level" | "results";

export interface ChatbotPreferences {
  category?: string;
  duration?: string;
  level?: string;
}

export interface ChatbotOption {
  label: string;
  value: string;
}

export interface ChatbotMessage {
  id: string;
  type: "bot" | "user";
  content: string;
  options?: ChatbotOption[];
  packages?: TravelPackage[];
}
