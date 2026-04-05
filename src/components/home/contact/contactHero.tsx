import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const ContactHero = () => {
    return (
        <section className="relative h-[50vh] min-h-100 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    src="/hero-contacto.jpg"
                    alt="Equipo de atención al cliente"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-b from-foreground/70 to-foreground/50" />
            </div>

            <div className="relative z-10 text-center px-4">
                <Badge variant="turquoise" className="mb-4">
                    Contáctanos
                </Badge>

                <h1 className="text-4xl md:text-6xl font-bold text-card mb-4">
                    ¿Tienes preguntas?
                    <br />
                    <span className="text-secondary">Estamos aquí</span>
                </h1>

                <p className="text-card/90 text-lg max-w-2xl mx-auto">
                    Nuestro equipo está listo para ayudarte a planificar el viaje escolar perfecto
                </p>
            </div>
        </section>
    );
};

export default ContactHero;
