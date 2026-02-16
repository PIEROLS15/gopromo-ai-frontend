import { Card, CardContent } from "@/components/ui/card";
import SupplierProfileForm from "./supplierProfileForm";
import UserProfileForm from "./userProfileForm";
import type { User, Supplier } from "@/types/login";

interface Props {
    isSupplier: boolean;
    initialUser?: User | Supplier;
}

const ProfileDataCard = ({ isSupplier, initialUser }: Props) => {
  type SupplierInitial = {
    representativeName?: string;
    companyName?: string;
    email?: string;
    phone?: string;
    ruc?: string;
  };
  type UserInitial = {
    fullName?: string;
    email?: string;
    phone?: string;
    educationalInstitution?: string;
  };
  return (
        <>
            <Card className="bg-card border border-white/80 shadow-sm">
                <CardContent>
                    <div className="p-4 w-full">{isSupplier ? (
                        <SupplierProfileForm initialData={initialUser as unknown as SupplierInitial} />
                    ) : (
                        <UserProfileForm initialData={initialUser as unknown as UserInitial} />
                    )}</div>
                </CardContent>
            </Card>
        </>
    );
}

export default ProfileDataCard;
