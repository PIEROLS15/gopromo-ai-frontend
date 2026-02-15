import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SupplierProfileForm from "./supplierProfileForm";
import UserProfileForm from "./userProfileForm";

interface Props {
    isSupplier: boolean;
}

const ProfileDataCard = ({ isSupplier }: Props) => {
    return (
        <>
            <Card className="bg-card border border-white/80 shadow-sm">
                <CardHeader>
                    <CardTitle>
                        {isSupplier ? "Datos de la empresa" : "Datos personales"}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {isSupplier ? <SupplierProfileForm /> : <UserProfileForm />}
                </CardContent>
            </Card>
        </>
    );
}

export default ProfileDataCard;
