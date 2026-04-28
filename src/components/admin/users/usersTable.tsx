import ResultsPagination from "@/components/shared/resultsPagination";
import StatusBadge from "@/components/admin/ui/statusBadge";
import UserActionsMenu from "@/components/admin/users/userActionsMenu";
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
import { formatAdminDate } from "@/services/adminData.service";
import type { AdminUserRow } from "@/types/adminViews";

type UsersTableProps = {
  users: AdminUserRow[];
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
  onViewDetails: (userId: number) => void;
  onEdit: (userId: number) => void;
  onDelete: (user: AdminUserRow) => void;
};

const UsersTable = ({
  users,
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
  onEdit,
  onDelete,
}: UsersTableProps) => {
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
              {users.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">No se encontraron usuarios.</p>
              ) : (
                users.map((user) => (
                  <Card key={user.id} className="rounded-xl border border-primary/20 bg-white dark:bg-(--admin-surface)">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-foreground">{user.fullName}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <UserActionsMenu
                          user={user}
                          disabled={actionLoadingId === user.id}
                          onViewDetails={onViewDetails}
                          onEdit={onEdit}
                          onDelete={onDelete}
                        />
                      </div>

                      <div className="text-sm text-muted-foreground">
                        <p>{user.phone}</p>
                        <p>{user.institution}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <StatusBadge label={user.roleName} />
                        <span className="text-xs text-muted-foreground">{formatAdminDate(user.createdAt)}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            <div className="hidden md:block">
              <Table className="min-w-190 bg-white dark:bg-(--admin-surface)">
                <TableHeader className="bg-white dark:bg-(--admin-surface)  border-b border-primary/40 [&_tr]:border-primary/40">
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Correo</TableHead>
                    <TableHead>Telefono</TableHead>
                    <TableHead>Institucion</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Registro</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="py-10 text-center text-sm text-muted-foreground">
                        No se encontraron usuarios.
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium text-foreground">{user.fullName}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{user.email}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{user.phone}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{user.institution}</TableCell>
                        <TableCell>
                          <StatusBadge label={user.roleName} />
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{formatAdminDate(user.createdAt)}</TableCell>
                        <TableCell className="text-right">
                          <UserActionsMenu
                            user={user}
                            disabled={actionLoadingId === user.id}
                            onViewDetails={onViewDetails}
                            onEdit={onEdit}
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

export default UsersTable;
