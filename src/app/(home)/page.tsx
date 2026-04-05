"use client";

import { useState } from "react";
import HeroSection from "@/components/home/heroSection";
import FeaturedPackages from "@/components/home/featuredPackage";
import TrustSection from "@/components/home/trustSection";
import HowItWorksInfographic from "@/components/home/howItWorksInfographic";

const HomePage = () => {
    const [, setIsSearchActive] = useState(false);

    return (
        <>
            <div className="min-h-screen bg-background">
                <main >
                    <HeroSection
                        onSearchActiveChange={setIsSearchActive}
                    />

                    <HowItWorksInfographic />

                    <FeaturedPackages onSelectPackage={() => { }} />

                    <TrustSection />

                </main>

                {/* AI Chat */}
                {/* <ChatFloatingButton onClick={handleOpenChat} isOpen={isChatOpen} hidden={isSearchActive} />
        <AIChat isOpen={isChatOpen} onClose={handleCloseChat} /> */}
            </div>
        </>
    );
};

export default HomePage;
