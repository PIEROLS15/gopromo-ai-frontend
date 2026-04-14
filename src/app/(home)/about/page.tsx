import HeroSection from "@/components/home/about/heroSection";
import StatsGrid from "@/components/home/about/statsGrid";
import MissionVision from "@/components/home/about/missionVision";
import WhyChooseUs from "@/components/home/about/whyChooseUs";

export const metadata = {
  title: "Nosotros | GoPromo AI",
};

const About = () => {

  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />
        <StatsGrid />
        <MissionVision />
        <WhyChooseUs />
      </main>

    </div>
  );
};

export default About;
