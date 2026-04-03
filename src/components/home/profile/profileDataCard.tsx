import { Card, CardContent } from "@/components/ui/card";
import SupplierProfileForm from "./supplierProfileForm";
import UserProfileForm from "./userProfileForm";
import type { UserInitial, SupplierInitial, ProfileInitialUser } from "@/types/login";

interface Props {
  isSupplier?: boolean;
  initialUser?: ProfileInitialUser;
}

const ProfileDataCard = ({ isSupplier, initialUser }: Props) => {
  const isSupplierLike = (u: unknown): u is { representativeName?: string; ruc?: string; companyName?: string } => {
    const v = u as { representativeName?: string; ruc?: string; companyName?: string };
    return typeof v.representativeName === "string" || typeof v.ruc === "string" || typeof v.companyName === "string";
  };
  const derivedIsSupplier = Boolean(initialUser && isSupplierLike(initialUser));
  const renderSupplier = isSupplier ?? derivedIsSupplier;
  return (
        <>
            <Card className="bg-card border border-white/80 shadow-sm">
                <CardContent>
                    <div className="p-4 w-full">{renderSupplier ? (
                        <SupplierProfileForm initialData={initialUser as SupplierInitial} />
                    ) : (
                        <UserProfileForm initialData={initialUser as UserInitial} />
                    )}</div>
                </CardContent>
            </Card>
        </>
    );
}

export default ProfileDataCard;
