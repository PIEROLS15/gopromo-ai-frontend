import { CheckCircle2, Eye, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { howItWorksExperienceCards } from "@/services/howItWorksContent.service";

const experienceIcons = {
  zap: Zap,
  eye: Eye,
  checkCircle2: CheckCircle2,
};

const ExperienceSection = () => {
  return (
    <section className="bg-background py-16">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-3">
            Experiencia
          </Badge>

          <h2 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
            Diseñado para ser <span className="text-primary">simple</span>, <span className="text-secondary">claro</span> y
            eficiente
          </h2>

          <p className="mx-auto max-w-xl text-muted-foreground">
            Optimizado para ofrecer claridad en la información y facilitar la toma de decisiones.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {howItWorksExperienceCards.map((card) => {
            const Icon = experienceIcons[card.icon];

            return (
              <Card key={card.title} variant="elevated" className="flex flex-col items-center gap-4 p-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-primary/20 to-primary/5">
                  <Icon className="h-7 w-7 text-primary" />
                </div>

                <div>
                  <h3 className="mb-1 text-lg font-bold text-foreground">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{card.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
