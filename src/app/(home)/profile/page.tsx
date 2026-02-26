"use client";
import { useSession } from "@/context/sessionContext";
import type { User, Supplier } from "@/types/login";
 

import ProfileHeader from "@/components/home/profile/profileHeader";
import ProfileAvatarCard from "@/components/home/profile/profileAvatarCard";
import ProfileDataCard from "@/components/home/profile/profileDataCard";
import ProfileSecurityCard from "@/components/home/profile/profileSecurityCard";

const ProfilePage = () => {
  const { user, loading } = useSession();
  const currentUser = user as User | Supplier | null;
  const roleNameFromUser = (currentUser?.role?.name ?? "").toString();
  const headerRole = (roleNameFromUser.toUpperCase() === "SUPPLIER" ? "Supplier" : "User") as "User" | "Supplier";
    if (loading) {
      return <div className="loading">Cargando perfil...</div>;
    }
    return (
        <>
            <div className="min-h-screen bg-background">
                <main className="pt-28 pb-16 flex justify-center">
                    <div className="w-full max-w-4xl px-4 space-y-6">
                        <ProfileHeader role={headerRole} />
                        <ProfileAvatarCard role={headerRole} />
                        <ProfileDataCard initialUser={user ?? undefined} />
                        <ProfileSecurityCard />
                    </div>
                </main>
            </div>
        </>
    );
};

export default ProfilePage;
