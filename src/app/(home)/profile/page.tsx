"use client";
import { useState } from "react";

import ProfileHeader from "@/components/home/profile/profileHeader";
import ProfileAvatarCard from "@/components/home/profile/profileAvatarCard";
import UserProfileForm from "@/components/home/profile/userProfileForm";
import SupplierProfileForm from "@/components/home/profile/supplierProfileForm";
import SecurityCard from "@/components/home/profile/profileSecurityCard";

const ProfilePage = () => {
    const [role] = useState<"USER" | "SUPPLIER">("USER");
    return (
        <>
            <div className="min-h-screen bg-background">
                <main className="pt-28 pb-16 flex justify-center">
                    <div className="w-full max-w-4xl px-4 space-y-6">
                        <ProfileHeader role={role} />
                        <ProfileAvatarCard role={role} />
                        {role === "SUPPLIER" ? (
                            <SupplierProfileForm />
                        ) : (
                            <UserProfileForm />
                        )}
                        <SecurityCard />
                    </div>
                </main>
            </div>
        </>
    );
};

export default ProfilePage;
