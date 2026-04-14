import Image from "next/image";
import { BarChart2, CalendarCheck, CheckCircle2, Search } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { howItWorksSteps } from "@/services/howItWorksContent.service";

const stepIcons = {
  search: Search,
  barChart2: BarChart2,
  calendarCheck: CalendarCheck,
};

const StepsSection = () => {
  return (
    <section className="bg-background py-16">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">Los 3 pasos principales</h2>
          <p className="text-muted-foreground">Desde explorar hasta reservar, todo en un mismo lugar.</p>
        </div>

        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="absolute top-12 right-[calc(16.67%+1rem)] left-[calc(16.67%+1rem)] z-0 hidden h-px bg-primary/20 md:block" />

          {howItWorksSteps.map((step) => {
            const Icon = stepIcons[step.icon];

            return (
              <Card key={step.number} variant="step" className="relative z-10 flex flex-col overflow-hidden">
                <div className="relative flex w-full items-center justify-center bg-linear-to-br from-primary/5 to-primary/10 px-6 pt-6 pb-2">
                  <Image
                    src={step.image}
                    alt={step.title}
                    width={220}
                    height={160}
                    className="h-40 w-auto rounded-lg object-cover shadow-md"
                  />
                </div>

                <CardHeader className="pb-3">
                  <div className="mb-2 flex items-center gap-3">
                    <div className="shadow-glow flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary">
                      <Icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="text-3xl leading-none font-black text-primary/20">{step.number}</span>
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col gap-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                  <Separator />
                  <ul className="flex flex-col gap-2">
                    {step.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span className="text-foreground">{benefit}</span>
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

export default StepsSection;
