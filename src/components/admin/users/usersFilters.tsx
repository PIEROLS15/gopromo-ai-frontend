import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { RoleItem } from "@/types/adminRoles";

type UsersFiltersProps = {
  usersSearch: string;
  onUsersSearchChange: (value: string) => void;
  usersRoleFilter: string;
  onUsersRoleFilterChange: (value: string) => void;
  roles: RoleItem[];
};

const UsersFilters = ({
  usersSearch,
  onUsersSearchChange,
  usersRoleFilter,
  onUsersRoleFilterChange,
  roles,
}: UsersFiltersProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-3">
      <div className="relative w-full max-w-md">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={usersSearch}
          onChange={(event) => onUsersSearchChange(event.target.value)}
          placeholder="Buscar por nombre o correo..."
          className="pl-10 bg-white dark:bg-(--admin-surface) border-primary/40 hover:border-primary/50 dark:hover:border-primary/60 transition-none!"
        />
      </div>

      <Select value={usersRoleFilter} onValueChange={onUsersRoleFilterChange}>
        <SelectTrigger className="w-full lg:w-45 bg-white dark:bg-(--admin-surface) border-primary/40 hover:border-primary/50 dark:hover:border-primary/60 transition-none!">
          <SelectValue placeholder="Rol" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-(--admin-surface) border-primary/40">
          <SelectItem value="all">Todos</SelectItem>
          {roles.map((role) => (
            <SelectItem key={role.id} value={role.name.toLowerCase()}>
              {role.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default UsersFilters;
