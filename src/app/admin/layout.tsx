"use client";

import { useState } from "react";
import Sidebar from "@/components/admin/layout/sidebar";
import TopBar from "@/components/admin/layout/topBar";
import MobileHeader from "@/components/admin/layout/mobileHeader";
import MobileSidebar from "@/components/admin/layout/mobileSidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-muted/30">
            {/* Mobile header */}
            <MobileHeader onMenu={() => setSidebarOpen(true)} />

            {/* Mobile sidebar */}
            <MobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex">
                {/* Desktop sidebar */}
                <Sidebar />

                <div className="flex-1 min-h-screen">
                    {/* Desktop topbar */}
                    <TopBar />

                    <main className="p-4 lg:p-6 pt-20 lg:pt-6">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
