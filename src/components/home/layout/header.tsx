"use client";

import { Backpack, MessageCircle, Menu, X, User, LayoutDashboard, LogOut, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "@/components/shared/themeToggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSession } from "@/context/sessionContext";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, roleName, logout } = useSession();

    const pathname = usePathname();
    const router = useRouter();

    const navLinks = [
        { href: "/", label: "Inicio" },
        { href: "/how-it-works", label: "Cómo funciona" },
        { href: "/packages", label: "Paquetes" },
        { href: "/about", label: "Nosotros" },
        { href: "/contact", label: "Contacto" },
    ];

    const isActive = (path: string) => pathname === path;

    const displayName =
        user && "fullName" in user
            ? user.fullName
            : user?.representativeName ?? "Usuario";

    const getInitials = (name: string) => {
        return (
            name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2) || "U"
        );
    };

    const handleLogout = async () => {
        await logout();
        router.push("/");
        router.refresh();
    };

    const showAdminLink = roleName === "Admin";
    const showProviderLink = roleName === "Supplier";
    const showPanelLink = showAdminLink || showProviderLink;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16 md:h-20">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 md:w-12 md:h-12 gradient-hero rounded-xl flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
                            <Backpack className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg md:text-xl font-bold text-foreground">
                                GoPromo <span className="text-primary">AI</span>
                            </span>
                            <span className="text-[10px] md:text-xs text-muted-foreground -mt-1">
                                Viajes Estudiantiles
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(link.href)
                                    ? "bg-primary-light text-primary"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden lg:flex items-center gap-3">
                        <ThemeToggle />

                        {showPanelLink && (
                            <Link href="/admin">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full"
                                    title={showAdminLink ? "Panel Admin" : "Mi Panel"}
                                >
                                    <LayoutDashboard className="w-4 h-4" />
                                </Button>
                            </Link>
                        )}

                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="gap-2 px-2">
                                        <Avatar className="w-8 h-8">
                                            <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                                                {getInitials(displayName)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="hidden xl:inline text-sm font-medium max-w-25 truncate">
                                            {displayName}
                                        </span>
                                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                    <DropdownMenuItem asChild>
                                        <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
                                            <User className="w-4 h-4" />
                                            Mi Perfil
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={handleLogout}
                                        className="text-destructive focus:text-destructive cursor-pointer"
                                    >
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Cerrar sesión
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link href="/login">
                                <Button variant="ghost" size="sm" className="gap-2">
                                    <User className="w-4 h-4" />
                                    Ingresar
                                </Button>
                            </Link>
                        )}

                        <Button variant="turquoise" size="sm" className="gap-2">
                            <MessageCircle className="w-4 h-4" />
                            Hablar con IA
                        </Button>
                    </div>

                    {/* Mobile & Tablet Menu Button */}
                    <button
                        className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6 text-foreground" />
                        ) : (
                            <Menu className="w-6 h-6 text-foreground" />
                        )}
                    </button>
                </div>

                {/* Mobile & Tablet Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden py-4 border-t border-border animate-slide-in-up">
                        <nav className="flex flex-col gap-2 mb-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`px-4 py-3 rounded-lg text-base font-medium transition-all ${isActive(link.href)
                                        ? "bg-primary-light text-primary"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        <div className="flex flex-col gap-2 pt-4 border-t border-border">
                            <div className="flex items-center justify-between px-4 py-2">
                                <span className="text-sm text-muted-foreground">Tema</span>
                                <ThemeToggle />
                            </div>

                            {showPanelLink && (
                                <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
                                    <Button variant="ghost" className="w-full gap-2">
                                        <LayoutDashboard className="w-4 h-4" />
                                        {showAdminLink ? "Panel Admin" : "Mi Panel"}
                                    </Button>
                                </Link>
                            )}

                            {user ? (
                                <>
                                    <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="w-full">
                                        <Button variant="outline" className="w-full gap-2">
                                            <Avatar className="w-6 h-6">
                                                <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                                                    {getInitials(displayName)}
                                                </AvatarFallback>
                                            </Avatar>
                                            Mi Perfil
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        className="w-full gap-2 text-destructive hover:text-destructive"
                                        onClick={() => {
                                            handleLogout();
                                            setIsMenuOpen(false);
                                        }}
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Cerrar sesión
                                    </Button>
                                </>
                            ) : (
                                <Link href="/login" onClick={() => setIsMenuOpen(false)} className="w-full">
                                    <Button variant="outline" className="w-full gap-2">
                                        <User className="w-4 h-4" />
                                        Ingresar
                                    </Button>
                                </Link>
                            )}

                            <Button variant="turquoise" className="w-full gap-2">
                                <MessageCircle className="w-4 h-4" />
                                Hablar con IA
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
