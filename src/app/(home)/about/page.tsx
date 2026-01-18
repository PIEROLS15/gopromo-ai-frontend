"use client";

import Header from "@/components/home/layout/header";
import HeroSection from "@/components/home/about2/heroSection";
import StatsGrid from "@/components/home/about2/statsGrid";
import MissionVision from "@/components/home/about2/missionVision";
import ValuesGrid from "@/components/home/about2/valuesGrid";
import TeamGrid from "@/components/home/about2/teamGrid";
import WhyChooseUs from "@/components/home/about2/whyChooseUs";

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
