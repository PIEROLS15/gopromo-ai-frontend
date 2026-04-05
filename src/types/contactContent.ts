export type ContactInfoIcon = "phone" | "mail" | "mapPin" | "clock";

export interface ContactInfoItem {
  icon: ContactInfoIcon;
  title: string;
  value: string;
  description: string;
  action: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
