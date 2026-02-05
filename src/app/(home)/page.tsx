"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import HeroSection from "@/components/home/heroSection";
import FeaturedPackages, { type Package } from "@/components/home/featuredPackage";
import TrustSection from "@/components/home/trustSection";

const HomePage = () => {;
    const [, setIsSearchActive] = useState(false);
    const router = useRouter();

    const handleOpenChat = () => {
    };

    const handleSelectPackage = (pkg: Package) => {
        router.push(`/reservar/${pkg.id}`);
    };

    return (
        <>
            <div className="min-h-screen bg-background">
                <main >
                    <HeroSection
                        onOpenChat={handleOpenChat}
                        onSearchActiveChange={setIsSearchActive}
                    />
                    <FeaturedPackages onSelectPackage={handleSelectPackage} />


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
