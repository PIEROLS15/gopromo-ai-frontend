import Header from "@/components/home/layout/header";
import HeroSection from "@/components/home/about/heroSection";
import StatsGrid from "@/components/home/about/statsGrid";
import MissionVision from "@/components/home/about/missionVision";
import ValuesGrid from "@/components/home/about/valuesGrid";
import TeamGrid from "@/components/home/about/teamGrid";
import WhyChooseUs from "@/components/home/about/whyChooseUs";

export const metadata = {
  title: "Nosotros | GoPromo AI",
};

const About = () => {

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <HeroSection />
        <StatsGrid />
        <MissionVision />
        <ValuesGrid />
        <TeamGrid />
        <WhyChooseUs />
      </main>

    </div>
  );
};

export default About;
