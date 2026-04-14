import { ArrowRight, Eye, Info, Lock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { howItWorksTrustCards } from "@/services/howItWorksContent.service";

const trustIcons = {
  eye: Eye,
  info: Info,
  lock: Lock,
};

const TrustSection = () => {
  return (
    <section className="bg-muted/40 py-16">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-3">
            Seguridad
          </Badge>

          <h2 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
            ¿Cómo garantizamos <span className="text-primary">seguridad</span> en cada reserva?
          </h2>

          <p className="mx-auto max-w-xl text-muted-foreground">
            Optimizado para ofrecer claridad en la información y facilitar la toma de decisiones con confianza.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {howItWorksTrustCards.map((card) => {
            const Icon = trustIcons[card.icon];

            return (
              <Card key={card.title} variant="feature" className="flex flex-col">
                <CardHeader className="pb-3">
                  <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-base">{card.title}</CardTitle>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col gap-3">
                  <p className="text-sm leading-relaxed text-muted-foreground">{card.description}</p>
                  <ul className="mt-auto flex flex-col gap-1.5">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm">
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-primary" />
                        <span className="font-medium text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
