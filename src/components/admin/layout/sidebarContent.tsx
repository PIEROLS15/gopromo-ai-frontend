"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    Building2,
    Calendar,
    Users,
    CreditCard,
    Settings,
} from "lucide-react";
import { useSession } from "@/context/sessionContext";
import { canAccessAdminPath } from "@/lib/admin/access";

const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/packages", label: "Paquetes", icon: Package },
    { href: "/admin/providers", label: "Proveedores", icon: Building2 },
    { href: "/admin/bookings", label: "Reservas", icon: Calendar },
    { href: "/admin/users", label: "Usuarios", icon: Users },
    { href: "/admin/payments", label: "Pagos", icon: CreditCard },
    { href: "/admin/settings", label: "Configuración", icon: Settings },
];

export default function SidebarContent({
    onNavigate,
}: {
    onNavigate?: () => void;
}) {
    const pathname = usePathname();
    const { roleName } = useSession();

    const visibleItems = navItems.filter((item) =>
        canAccessAdminPath(item.href, roleName),
    );

    return (
        <nav className="p-4 space-y-1">
            {visibleItems.map((item) => {
                const isActive =
                    item.href === "/admin"
                        ? pathname === "/admin"
                        : pathname.startsWith(item.href);

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={onNavigate}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                            }`}
                    >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    );
}
