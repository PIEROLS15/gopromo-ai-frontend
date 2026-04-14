import { HelpCircle } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { howItWorksFaqs } from "@/services/howItWorksContent.service";

const FAQSection = () => {
  return (
    <section className="bg-muted/40 py-16">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="mb-10 text-center">
          <div className="mb-3 flex justify-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
              <HelpCircle className="h-5 w-5 text-primary" />
            </div>
          </div>

          <h2 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">Preguntas Frecuentes</h2>
          <p className="text-muted-foreground">Respuestas a las dudas más comunes sobre el sistema.</p>
        </div>

        <Card variant="default" className="overflow-hidden">
          <CardContent className="p-0">
            <Accordion type="single" collapsible className="w-full">
              {howItWorksFaqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`item-${index}`} className={index === 0 ? "border-t-0" : ""}>
                  <AccordionTrigger className="px-6 py-4 text-left text-sm font-semibold text-foreground hover:text-primary hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>

                  <AccordionContent className="px-6 pb-4 text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FAQSection;
