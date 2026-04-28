"use client";

import { Bell, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import ThemeToggle from "@/components/shared/themeToggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSession } from "@/context/sessionContext";
import { getAdminRouteTitle } from "@/lib/admin/navigation";

const MobileHeader = ({ onMenu }: { onMenu: () => void }) => {
    const pathname = usePathname();
    const { user } = useSession();

    const title = getAdminRouteTitle(pathname);
    const displayName =
        user && "fullName" in user
            ? user.fullName
            : user?.representativeName ?? "Admin";
    const initial = displayName.charAt(0).toUpperCase() || "A";
    const notificationsCount = 3;

    return (
        <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border h-16 flex items-center justify-between px-4">
            <button onClick={onMenu} className="p-2 hover:bg-muted rounded-lg">
                <Menu className="w-6 h-6" />
            </button>

            <span className="font-semibold text-foreground">{title}</span>

            <div className="flex items-center gap-2">
                <ThemeToggle />
                <Button variant="ghost" size="icon" className="relative h-9 w-9 !transition-none">
                    <Bell className="w-5 h-5 !transition-none" />
                    {notificationsCount > 0 ? (
                        <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-secondary text-secondary-foreground text-[10px] leading-4 text-center">
                            {notificationsCount}
                        </span>
                    ) : null}
                </Button>
                <Link href="/perfil" aria-label="Mi perfil">
                    <Avatar className="h-8 w-8 border-2 border-primary">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                            {initial}
                        </AvatarFallback>
                    </Avatar>
                </Link>
            </div>
        </header>
    );
};

export default MobileHeader;
