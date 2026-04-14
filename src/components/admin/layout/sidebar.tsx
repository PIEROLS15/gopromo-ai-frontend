import SidebarContent from "./sidebarContent";
import Link from "next/link";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
    return (
        <aside className="w-64 bg-card border-r border-border min-h-screen hidden lg:flex flex-col">
            <div className="h-16 px-4 border-b border-border flex items-center">
                <Link href="/admin" className="flex items-center gap-2">
                    <div className="w-8 h-8 gradient-hero rounded-lg flex items-center justify-center">
                        <Package className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="font-bold">
                        GoPromo <span className="text-primary">Admin</span>
                    </span>
                </Link>
            </div>

            <div className="flex-1">
                <SidebarContent />
            </div>

            <div className="p-4 border-t border-border">
                <Link href="/">
                    <Button variant="outline" className="w-full">
                        Volver al sitio
                    </Button>
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;
