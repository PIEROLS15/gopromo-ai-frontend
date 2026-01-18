import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

const whyUs = [
    { title: "IA Personalizada", desc: "Recomendaciones basadas en tus necesidades" },
    { title: "Proveedores Verificados", desc: "Validamos documentación" },
    { title: "Pagos Seguros", desc: "Múltiples formas de pago" },
    { title: "Soporte 24/7", desc: "Siempre disponibles" },
    { title: "Precios Transparentes", desc: "Sin costos ocultos" },
    { title: "Experiencia Local", desc: "Conocemos los destinos" },
];

const WhyChooseUs = () => {
    return (
        <section className="relative flex items-center justify-center bg-primary/5">
            <div className="py-16 md:py-24">
                <div className="container px-4">
                    <div className="text-center mb-12">
                        <Badge variant="success" className="mb-4">
                            <CheckCircle2 className="w-3 h-3" />
                            ¿Por qué elegirnos?
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold">
                            La diferencia PromoTrip AI
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {whyUs.map(item => (
                            <div key={item.title} className="flex items-start gap-3">
                                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-bold">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
