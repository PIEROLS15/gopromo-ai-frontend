import { Building2, User } from "lucide-react";

interface Props {
    role: "User" | "Supplier";
}

const ProfileHeader = ({ role }: Props) => {
    return (
        <>
            <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-2">
                    {role === "Supplier" ? (
                        <Building2 className="w-6 h-6" />
                    ) : (
                        <User className="w-6 h-6" />
                    )}
                    <h1 className="text-3xl font-bold text-foreground">
                        {role === "Supplier" ? "Datos de la Empresa" : "Mi Perfil"}
                    </h1>
                </div>
                <p className="text-muted-foreground">
                    {role === "Supplier"
                        ? "Administra la información de tu empresa"
                        : "Administra tu información personal"}
                </p>
            </div>
        </>
    );
}

export default ProfileHeader;
