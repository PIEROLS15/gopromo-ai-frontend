import { Camera } from "lucide-react";
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSession } from "@/context/sessionContext";
import { getProfileAvatarData } from "@/lib/profile/avatar";
import type { User, Supplier } from "@/types/login";

interface Props {
  role: "User" | "Supplier";
}

const ProfileAvatarCard = ({ role }: Props) => {
  const { user } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);
  type CurrentUser = User | Supplier | null;
  const currentUser = user as unknown as CurrentUser;

  const { displayName, initials, roleNameDisplay } = getProfileAvatarData(
    currentUser,
    role
  );

  return (
    <>
      <Card className="bg-card border border-white/80 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            <span className="text-sm font-semibold">Imagen de Perfil</span>
          </div>
          <CardDescription>
            Tu foto de perfil será visible para otros usuarios
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            <Avatar className="w-32 h-32 border-4 border-primary/20">
              <AvatarFallback className="text-3xl bg-primary text-primary-foreground">{initials || "U"}</AvatarFallback>
            </Avatar>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-1 right-1 flex items-center justify-center w-9 h-9 rounded-full bg-primary text-primary-foreground shadow-md transition-all cursor-pointer hover:bg-primary/90 hover:scale-105 hover:shadow-lg">
              <Camera className="w-4 h-4" />
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-semibold">{displayName}</h3>
            <p className="text-muted-foreground">{currentUser?.email ?? ""}</p>
            <p className="text-sm text-muted-foreground mt-1">{roleNameDisplay}</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ProfileAvatarCard;
