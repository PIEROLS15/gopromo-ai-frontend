import type { Metadata } from "next";

import HowItWorksView from "@/components/home/how-it-works/howItWorksView";

export const metadata: Metadata = {
  title: "Cómo funciona | GoPromo AI",
  description:
    "Aprende cómo funciona GoPromo AI: explora paquetes escolares verificados, compara opciones y reserva con seguridad en tres pasos simples.",
};

const HowItWorksPage = () => {
  return <HowItWorksView />;
};

export default HowItWorksPage;
