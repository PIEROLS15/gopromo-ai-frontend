interface Props {
    role: "USER" | "SUPPLIER";
}

const ProfileHeader = ({ role }: Props) => {
    return (
        <>
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                    Mi Perfil
                </h1>
                <p className="text-muted-foreground">
                    {role === "SUPPLIER"
                        ? "Administra la información de tu empresa"
                        : "Administra tu información personal"}
                </p>
            </div>
        </>
    );
}

export default ProfileHeader;
