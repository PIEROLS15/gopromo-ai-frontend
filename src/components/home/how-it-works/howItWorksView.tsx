import ExperienceSection from "@/components/home/how-it-works/experienceSection";
import FAQSection from "@/components/home/how-it-works/faqSection";
import HeroSection from "@/components/home/how-it-works/heroSection";
import StepsSection from "@/components/home/how-it-works/stepsSection";
import TrustSection from "@/components/home/how-it-works/trustSection";

const HowItWorksView = () => {
  return (
    <main className="pt-16 md:pt-20">
      <HeroSection />
      <StepsSection />
      <TrustSection />
      <ExperienceSection />
      <FAQSection />
    </main>
  );
};

export default HowItWorksView;
