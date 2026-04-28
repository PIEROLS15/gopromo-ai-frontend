import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

import { Button } from "@/components/ui/button";

type ResultsPaginationProps = {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  compact?: boolean;
  showWhenEmpty?: boolean;
  onFirstPage: () => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  onLastPage: () => void;
};

const ResultsPagination = (props: ResultsPaginationProps) => {
  const {
    totalItems,
    currentPage,
    totalPages,
    pageSize,
    compact = false,
    showWhenEmpty = false,
    onFirstPage,
    onPrevPage,
    onNextPage,
    onLastPage,
  } = props;

  if (totalItems <= 0 && !showWhenEmpty) return null;

  const firstResult = totalItems > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const lastResult = totalItems > 0 ? Math.min(currentPage * pageSize, totalItems) : 0;

  return (
    <div
      className={
        compact
          ? "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          : "mt-8 border-t border-border/70 pt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      }
    >
      <p className="text-sm text-muted-foreground">
        Mostrando {firstResult} - {lastResult} de {totalItems} resultados
      </p>

      <div className="flex items-center gap-2 self-end sm:self-auto">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full border-primary/40 text-primary hover:bg-primary/10"
          onClick={onFirstPage}
          disabled={currentPage === 1}
          aria-label="Primera pagina"
        >
          <ChevronsLeft className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full border-primary/40 text-primary hover:bg-primary/10"
          onClick={onPrevPage}
          disabled={currentPage === 1}
          aria-label="Pagina anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <span className="text-sm text-muted-foreground px-2">
          {currentPage} / {totalPages}
        </span>

        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full border-primary/40 text-primary hover:bg-primary/10"
          onClick={onNextPage}
          disabled={currentPage === totalPages}
          aria-label="Pagina siguiente"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full border-primary/40 text-primary hover:bg-primary/10"
          onClick={onLastPage}
          disabled={currentPage === totalPages}
          aria-label="Ultima pagina"
        >
          <ChevronsRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ResultsPagination;
