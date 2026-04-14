import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
  return (
    <section className="bg-linear-to-br from-background via-primary/5 to-background py-16 text-center md:py-24">
      <div className="container mx-auto max-w-2xl px-4">
        <Badge variant="turquoise" className="mb-4">
          GoPromo AI
        </Badge>

        <h1 className="mb-4 text-3xl leading-tight font-bold text-foreground md:text-5xl">
          ¿Cómo funciona <span className="text-primary">GoPromo AI</span>?
        </h1>

        <p className="text-base text-muted-foreground md:text-lg">
          Organiza el viaje escolar en <span className="font-semibold text-foreground">tres pasos simples y seguros</span>. Sin
          complicaciones, con información clara en cada etapa.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
