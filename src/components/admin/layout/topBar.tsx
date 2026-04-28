"use client";

import { Bell, User, LogOut, ChevronDown } from "lucide-react";
import ThemeToggle from "@/components/shared/themeToggle";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "@/context/sessionContext";
import { getAdminRouteTitle } from "@/lib/admin/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TopBar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useSession();

    const title = getAdminRouteTitle(pathname);
    const displayName =
        user && "fullName" in user
            ? user.fullName
            : user?.representativeName ?? "Admin";
    const email = user?.email ?? "admin@promotrip.pe";
    const initial = displayName.charAt(0).toUpperCase() || "A";

    const handleLogout = async () => {
        await logout();
        router.push("/");
        router.refresh();
    };

  return (
        <header className="hidden lg:block sticky top-0 z-30 h-16 bg-card/95 backdrop-blur border-b border-border px-4">
            <div className="h-full flex items-center justify-between">
                <h1 className="text-lg font-semibold text-foreground capitalize">{title}</h1>

                <div className="flex items-center gap-3">
                <ThemeToggle />

                <Button variant="ghost" size="icon" className="relative !transition-none">
                    <Bell className="w-5 h-5 !transition-none" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary text-secondary-foreground text-xs rounded-full flex items-center justify-center" />
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-2 hover:bg-muted p-1.5 rounded-lg transition-colors">
                            <Avatar className="h-8 w-8 border-2 border-primary">
                                <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-sm">
                                    {initial}
                                </AvatarFallback>
                            </Avatar>
                            <div className="hidden sm:block text-left">
                                <p className="text-sm font-medium text-foreground">{displayName}</p>
                                <p className="text-xs text-muted-foreground">{email}</p>
                            </div>
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem asChild>
                            <Link href="/perfil" className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Mi Perfil
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/" className="flex items-center gap-2">
                                <LogOut className="w-4 h-4" />
                                Volver al sitio
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={handleLogout}
                            className="text-destructive focus:text-destructive"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Cerrar sesión
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            </div>
        </header>
    );
};

export default TopBar;
