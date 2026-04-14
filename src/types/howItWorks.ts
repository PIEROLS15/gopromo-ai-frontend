export type HowItWorksStepIcon = "search" | "barChart2" | "calendarCheck";

export type HowItWorksTrustIcon = "eye" | "info" | "lock";

export type HowItWorksExperienceIcon = "zap" | "eye" | "checkCircle2";

export interface HowItWorksStep {
  number: string;
  title: string;
  icon: HowItWorksStepIcon;
  image: string;
  description: string;
  benefits: string[];
}

export interface HowItWorksTrustCard {
  icon: HowItWorksTrustIcon;
  title: string;
  description: string;
  items: string[];
}

export interface HowItWorksExperienceCard {
  icon: HowItWorksExperienceIcon;
  title: string;
  description: string;
}

export interface HowItWorksFaq {
  question: string;
  answer: string;
}
