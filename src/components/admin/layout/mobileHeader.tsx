"use client";

import { Menu } from "lucide-react";
import ThemeToggle from "@/components/shared/themeToggle";

const MobileHeader = ({ onMenu }: { onMenu: () => void }) => {
    return (
        <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border h-16 flex items-center justify-between px-4">
            <button onClick={onMenu} className="p-2 hover:bg-muted rounded-lg">
                <Menu className="w-6 h-6" />
            </button>

            <span className="font-bold text-foreground">PromoTrip Admin</span>

            <ThemeToggle />
        </header>
    );
};

export default MobileHeader;
