import { Bot, LayoutGrid, CheckCircle, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const steps = [
    {
        number: 1,
        title: "Habla con la IA",
        description: "Cuéntale a nuestro asistente virtual tus preferencias, presupuesto y destino soñado.",
        icon: Bot,
    },
    {
        number: 2,
        title: "Elige tu plan",
        description: "La IA te recomendará las mejores opciones personalizadas para tu promoción.",
        icon: LayoutGrid,
    },
    {
        number: 3,
        title: "Reserva y Disfruta",
        description: "Confirma tu viaje de forma segura y prepárate para la experiencia.",
        icon: CheckCircle,
    },
];

const HowItWorksInfographic = () => {
    return (
        <section className="py-12 md:py-16 bg-[#e0ebeb] dark:bg-[#0e161b]">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
                    Cómo funciona: <span className="text-primary">Tu Viaje en 3 Pasos Simples</span>
                </h2>
                <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto text-sm md:text-base">
                    Planifica tu viaje escolar de forma rápida, segura y personalizada.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 items-stretch relative">
                    {steps.map((step, idx) => (
                        <div key={step.number} className="flex items-stretch">
                            <Card className="rounded-2xl shadow-md border border-primary/10 bg-card p-6 flex flex-col items-center text-center w-full relative">
                                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground font-bold text-sm w-8 h-8 rounded-full flex items-center justify-center shadow-md">
                                    {step.number}
                                </Badge>

                                <div className="mt-4 mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                    <step.icon className="w-8 h-8 text-primary" />
                                </div>

                                <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                            </Card>

                            {idx < steps.length - 1 && (
                                <div className="hidden md:flex items-center justify-center px-2">
                                    <ArrowRight className="w-6 h-6 text-primary/40" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorksInfographic;
