import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
    return (
        <section className="relative h-[50vh] min-h-100 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    src="/hero-students.jpg"
                    alt="Estudiantes"
                    fill
                    priority
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-linear-to-b from-foreground/70 to-foreground/50" />
            </div>

            <div className="relative z-10 text-center px-4">
                <Badge variant="turquoise" className="mb-4">
                    Sobre Nosotros
                </Badge>

                <h1 className="text-4xl md:text-6xl font-bold text-card mb-4">
                    Transformamos la educación<br />
                    a través del <span className="text-secondary">turismo</span>
                </h1>

                <p className="text-card/90 text-lg max-w-2xl mx-auto">
                    Somos la primera plataforma en Cañete que usa IA para conectar colegios con experiencias educativas.
                </p>
            </div>
        </section>
    );
};

export default HeroSection;
