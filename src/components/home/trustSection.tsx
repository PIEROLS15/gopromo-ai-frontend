import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CreditCard, Award, Headphones, CheckCircle2, Building2 } from "lucide-react";

const features = [
    {
        icon: Shield,
        title: "Proveedores Verificados",
        description: "Validamos RUC y documentación con RENIEC/SUNAT para tu seguridad.",
        badge: "RENIEC",
    },
    {
        icon: CreditCard,
        title: "Pagos Seguros",
        description: "Procesa con Culqi, Niubiz, Yape o Plin. Comisión transparente.",
        badge: "Culqi",
    },
    {
        icon: Award,
        title: "Calidad Garantizada",
        description: "Paquetes revisados y con reseñas reales de otras instituciones.",
        badge: "Certificado",
    },
    {
        icon: Headphones,
        title: "Soporte 24/7",
        description: "Asistencia por WhatsApp, email o chat en cualquier momento.",
        badge: "24/7",
    },
];

const partners = [
    { name: "RENIEC", icon: Building2 },
    { name: "MINCETUR", icon: Building2 },
    { name: "Culqi", icon: CreditCard },
    { name: "DRE Cañete", icon: Award },
];

const TrustSection = () => {
    return (
        <section className="py-16 md:py-24 bg-primary-light/50 flex items-center justify-center">
            <div className="container px-4">
                {/* Section Header */}
                <div className="text-center mb-10 md:mb-14">
                    <Badge variant="primary" className="mb-4 gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Confianza y Seguridad
                    </Badge>
                    <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
                        Tu tranquilidad es{" "}
                        <span className="text-primary">nuestra prioridad</span>
                    </h2>
                    <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                        Trabajamos con las instituciones más confiables del Perú para
                        garantizar viajes seguros y memorables.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {features.map((feature) => (
                        <Card key={feature.title} variant="feature" className="text-center p-6">
                            <CardContent className="p-0">
                                <div className="w-14 h-14 gradient-hero rounded-xl flex items-center justify-center mx-auto mb-4 shadow-glow">
                                    <feature.icon className="w-7 h-7 text-primary-foreground" />
                                </div>
                                <Badge variant="turquoise" className="mb-3 text-[10px]">
                                    {feature.badge}
                                </Badge>
                                <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Partners */}
                <div className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border">
                    <p className="text-center text-sm text-muted-foreground mb-6">
                        Aliados estratégicos que respaldan nuestra plataforma
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                        {partners.map((partner) => (
                            <div
                                key={partner.name}
                                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                            >
                                <partner.icon className="w-6 h-6" />
                                <span className="font-semibold">{partner.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
