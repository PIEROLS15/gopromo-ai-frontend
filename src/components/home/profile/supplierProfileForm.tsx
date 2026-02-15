import { Building2, User, Phone, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const SupplierProfileForm = () => {
    return (
        <>
            <Card className="bg-card border border-white/80 shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Building2 className="w-5 h-5" />
                        Datos de la Empresa
                    </CardTitle>
                    <CardDescription>
                        Información visible para los clientes
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <Input placeholder="Representante legal" />
                            <Input placeholder="Nombre de la empresa" />
                        </div>
                        <Input placeholder="Teléfono" />
                        <Input value="20123456789" disabled />
                        <Separator />
                        <Button className="gap-2">
                            <Save className="w-4 h-4" />
                            Guardar Cambios
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}

export default SupplierProfileForm;
