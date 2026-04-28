import StatusBadge from "@/components/admin/ui/statusBadge";
import SupplierActionsMenu from "@/components/admin/suppliers/supplierActionsMenu";
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
import type { AdminSupplier, AdminSuppliersMeta } from "@/types/adminViews";

type SuppliersTableProps = {
  suppliers: AdminSupplier[];
  meta: AdminSuppliersMeta;
  page: number;
  loading: boolean;
  error: string | null;
  actionLoadingId: number | null;
  onRetry: () => void;
  onFirstPage: () => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  onLastPage: () => void;
  onViewDetails: (supplierId: number) => void;
  onApprove: (supplier: AdminSupplier) => void;
  onToggleActive: (supplier: AdminSupplier) => void;
};

const SuppliersTable = ({
  suppliers,
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
  onApprove,
  onToggleActive,
}: SuppliersTableProps) => {
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
              {suppliers.map((supplier) => (
                <Card key={supplier.id} className="rounded-xl border border-primary/20 bg-white dark:bg-(--admin-surface)">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-foreground">{supplier.companyName}</p>
                        <p className="text-sm text-muted-foreground">{supplier.ruc}</p>
                      </div>
                      <SupplierActionsMenu
                        supplier={supplier}
                        disabled={actionLoadingId === supplier.id}
                        onViewDetails={onViewDetails}
                        onApprove={onApprove}
                        onToggleActive={onToggleActive}
                      />
                    </div>

                    <div className="text-sm text-muted-foreground">
                      <p>{supplier.email}</p>
                      <p>{supplier.phone}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <StatusBadge label={supplier.verified ? "Verificado" : "Pendiente"} />
                      <StatusBadge label={supplier.active ? "Activo" : "Inactivo"} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="hidden md:block">
              <Table className="min-w-195 bg-white dark:bg-(--admin-surface)">
                <TableHeader className="bg-white dark:bg-(--admin-surface) border-b border-primary/40 [&_tr]:border-primary/40">
                  <TableRow>
                    <TableHead>Empresa</TableHead>
                    <TableHead>RUC</TableHead>
                    <TableHead>Representante</TableHead>
                    <TableHead>Contacto</TableHead>
                    <TableHead>Verificacion</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {suppliers.map((supplier) => (
                    <TableRow key={supplier.id}>
                      <TableCell className="font-medium text-foreground">{supplier.companyName}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{supplier.ruc}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{supplier.representativeName}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        <p>{supplier.email}</p>
                        <p className="text-xs">{supplier.phone}</p>
                      </TableCell>
                      <TableCell>
                        <StatusBadge label={supplier.verified ? "Verificado" : "Pendiente"} />
                      </TableCell>
                      <TableCell>
                        <StatusBadge label={supplier.active ? "Activo" : "Inactivo"} />
                      </TableCell>
                      <TableCell className="text-right">
                        <SupplierActionsMenu
                          supplier={supplier}
                          disabled={actionLoadingId === supplier.id}
                          onViewDetails={onViewDetails}
                          onApprove={onApprove}
                          onToggleActive={onToggleActive}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        ) : null}

        {!loading && !error && suppliers.length === 0 ? (
          <p className="text-sm text-muted-foreground p-6">
            No se encontraron proveedores con esos filtros.
          </p>
        ) : null}

        {!loading && !error ? (
          <div className="px-4 pt-4 pb-4 border-t border-primary/40">
            <ResultsPagination
              totalItems={meta.total}
              currentPage={page}
              totalPages={meta.totalPages || 1}
              pageSize={meta.limit}
              compact
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

export default SuppliersTable;
