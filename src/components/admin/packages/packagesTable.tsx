import StatusBadge from "@/components/admin/ui/statusBadge";
import PackageActionsMenu from "@/components/admin/packages/packageActionsMenu";
import ResultsPagination from "@/components/shared/resultsPagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { AdminPackage } from "@/types/adminViews";

type PackagesTableProps = {
  packages: AdminPackage[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  page: number;
  loading: boolean;
  error: string | null;
  actionLoadingId: number | null;
  onRetry: () => void;
  onFirstPage: () => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  onLastPage: () => void;
  onViewDetails: (packageId: number) => void;
  onToggleActive: (pkg: AdminPackage) => void;
  onDelete: (pkg: AdminPackage) => void;
};

const PackagesTable = ({
  packages,
  meta,
  page,
  loading,
  error,
  actionLoadingId,
  onRetry,
  onFirstPage,
  onPrevPage,
  onNextPage,
  onLastPage,
  onViewDetails,
  onToggleActive,
  onDelete,
}: PackagesTableProps) => {
  return (
    <Card className="overflow-hidden rounded-2xl bg-white dark:bg-(--admin-surface) border-primary/40">
      <CardContent className="p-0 overflow-x-auto">
        {loading ? (
          <div className="p-10 grid place-items-center">
            <div className="h-7 w-7 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        ) : null}

        {!loading && error ? (
          <div className="p-6 space-y-3">
            <p className="text-sm text-muted-foreground">{error}</p>
            <Button onClick={onRetry} size="sm">
              Reintentar
            </Button>
          </div>
        ) : null}

        {!loading && !error ? (
          <>
            <div className="md:hidden p-4 space-y-3">
              {packages.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">No se encontraron paquetes.</p>
              ) : (
                packages.map((pkg) => (
                  <Card key={pkg.id} className="rounded-xl border border-primary/20 bg-white dark:bg-(--admin-surface)">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-foreground">{pkg.name}</p>
                          <p className="text-sm text-muted-foreground">{pkg.destination}</p>
                        </div>
                        <PackageActionsMenu
                          pkg={pkg}
                          disabled={actionLoadingId === pkg.id}
                          onViewDetails={onViewDetails}
                          onToggleActive={onToggleActive}
                          onDelete={onDelete}
                        />
                      </div>

                      <div className="text-sm text-muted-foreground">
                        <p>{pkg.providerName}</p>
                        <p>S/{pkg.price.toLocaleString("es-PE")}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <StatusBadge label={pkg.active ? "Activo" : "Inactivo"} />
                        <StatusBadge label={pkg.categoryName} />
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            <div className="hidden md:block">
              <Table className="min-w-195 bg-white dark:bg-(--admin-surface)">
                <TableHeader className="bg-white dark:bg-(--admin-surface) border-b border-primary/40 [&_tr]:border-primary/40">
                  <TableRow>
                    <TableHead>Paquete</TableHead>
                    <TableHead>Destino</TableHead>
                    <TableHead>Proveedor</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {packages.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="py-10 text-center text-sm text-muted-foreground">
                        No se encontraron paquetes.
                      </TableCell>
                    </TableRow>
                  ) : (
                    packages.map((pkg) => (
                      <TableRow key={pkg.id}>
                        <TableCell className="font-medium text-foreground">{pkg.name}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{pkg.destination}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{pkg.providerName}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">S/{pkg.price.toLocaleString("es-PE")}</TableCell>
                        <TableCell>
                          <StatusBadge label={pkg.active ? "Activo" : "Inactivo"} />
                        </TableCell>
                        <TableCell className="text-right">
                          <PackageActionsMenu
                            pkg={pkg}
                            disabled={actionLoadingId === pkg.id}
                            onViewDetails={onViewDetails}
                            onToggleActive={onToggleActive}
                            onDelete={onDelete}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </>
        ) : null}

        {!loading && !error ? (
          <div className="px-4 pt-4 pb-4 border-t border-primary/40">
            <ResultsPagination
              totalItems={meta.total}
              currentPage={page}
              totalPages={meta.totalPages || 1}
              pageSize={meta.limit}
              compact
              showWhenEmpty
              onFirstPage={onFirstPage}
              onPrevPage={onPrevPage}
              onNextPage={onNextPage}
              onLastPage={onLastPage}
            />
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default PackagesTable;
