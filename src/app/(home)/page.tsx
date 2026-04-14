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

                    <div className="pointer-events-none relative z-50 -mt-20 -mb-px md:-mt-24 lg:-mt-28">
                        <svg
                            viewBox="0 0 1440 120"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                            className="block h-20 w-full md:h-24 lg:h-28"
                            aria-hidden="true"
                        >
                            <path
                                d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                                fill="var(--hero-wave-divider)"
                            />
                        </svg>
                    </div>

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
