"use client";

import Link from "next/link";
import { X, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import SidebarContent from "./sidebarContent";

const MobileSidebar = ({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) => {
    return (
        <>
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 lg:hidden flex flex-col ${open ? "translate-x-0" : "-translate-x-full"}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between h-16 px-4 border-b border-border">
                    <Link href="/admin" className="flex items-center gap-2">
                        <div className="w-8 h-8 gradient-hero rounded-lg flex items-center justify-center">
                            <Package className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <span className="font-bold">GoPromo Admin</span>
                    </Link>

                    <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto">
                    <SidebarContent onNavigate={onClose} />
                </div>
                <div className="p-4 border-t border-border">
                    <Link href="/">
                        <Button variant="outline" className="w-full">
                            Volver al sitio
                        </Button>
                    </Link>
                </div>
            </aside>

            {/* Overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}
        </>
    );
};

export default MobileSidebar;
