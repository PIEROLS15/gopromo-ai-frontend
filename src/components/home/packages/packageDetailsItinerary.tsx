import { Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { TourPackageResponse } from "@/types/tourPackage";

type ItineraryDay = TourPackageResponse["itinerary"]["days"][number];

type TimelineDaySectionProps = {
  day: ItineraryDay;
  isLastDay: boolean;
};

function TimelineDaySection({ day, isLastDay }: TimelineDaySectionProps) {
  const steps = [...day.steps].sort((a, b) => a.order - b.order);

  return (
    <div>
      <div className="flex items-center gap-3 mb-4 mt-1">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1">
          <span className="text-xs font-bold text-primary">Dia {day.day}</span>
          <span className="text-xs text-muted-foreground">-</span>
          <span className="text-xs font-semibold text-foreground">{day.title}</span>
        </div>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="space-y-0">
        {steps.map((step, index) => {
          const isLastStep = index === steps.length - 1;
          const showConnector = !isLastStep || !isLastDay;
          const connectorBottomClass = isLastStep
            ? isLastDay
              ? "bottom-4"
              : "-bottom-10"
            : "-bottom-5";

          return (
            <div key={`${day.day}-${step.order}-${index}`} className="relative grid grid-cols-[40px_1fr] gap-4 pb-5">
              <div className="relative flex items-start justify-center">
                <div className="z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary/50 bg-background text-sm font-bold text-primary">
                  {index + 1}
                </div>
                {showConnector && (
                  <div
                    className={`absolute left-1/2 top-9 -translate-x-1/2 border-l-2 border-dashed border-primary/40 ${connectorBottomClass}`}
                  />
                )}
              </div>

              <div className="pt-0.5">
                {step.hour && <p className="text-lg font-bold text-secondary leading-none mb-1.5">{step.hour}</p>}
                <p className="text-xl sm:text-2xl font-bold leading-tight text-foreground">{step.title}</p>
                {step.description && (
                  <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{step.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

type PackageDetailsItineraryProps = {
  days: ItineraryDay[];
  modalOpen: boolean;
  onModalOpenChange: (open: boolean) => void;
};

const PackageDetailsItinerary = (props: PackageDetailsItineraryProps) => {
  const { days, modalOpen, onModalOpenChange } = props;
  const visibleDays = days.slice(0, 2);
  const shouldShowFullButton = days.length > 2;

  return (
    <div className="w-full min-w-0 flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
          <Clock className="w-4 h-4 text-primary" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Itinerario</h2>
      </div>

      {days.length > 0 ? (
        <>
          <div className="space-y-2">
            {visibleDays.map((day, index) => (
              <TimelineDaySection
                key={day.day}
                day={day}
                isLastDay={index === visibleDays.length - 1}
              />
            ))}
          </div>

          {shouldShowFullButton && (
            <Button variant="outline" className="mt-4 self-center sm:self-start gap-2" onClick={() => onModalOpenChange(true)}>
              Ver itinerario completo ({days.length} dias)
            </Button>
          )}

          <Dialog open={modalOpen} onOpenChange={onModalOpenChange}>
            <DialogContent className="max-w-lg w-[calc(100%-2rem)] mx-auto max-h-[85vh] flex flex-col rounded-2xl border border-border">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" /> Itinerario completo - {days.length} dias
                </DialogTitle>
              </DialogHeader>
              <ScrollArea className="flex-1 pr-2 overflow-y-auto">
                <div className="space-y-2 py-2 pr-2">
                  {days.map((day, index) => (
                    <TimelineDaySection key={`full-${day.day}`} day={day} isLastDay={index === days.length - 1} />
                  ))}
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <p className="text-muted-foreground text-sm">Este paquete aun no tiene itinerario disponible.</p>
      )}
    </div>
  );
};

export default PackageDetailsItinerary;
