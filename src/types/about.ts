export type AboutValueIcon = "heart" | "lightbulb" | "users" | "award";

export type AboutStatIcon =
  | "plane"
  | "graduationCap"
  | "badgeCheck"
  | "thumbsUp";

export interface AboutValue {
  icon: AboutValueIcon;
  title: string;
  description: string;
}

export interface AboutStat {
  icon: AboutStatIcon;
  number: string;
  label: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
}
