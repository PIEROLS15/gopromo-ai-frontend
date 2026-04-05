"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AuthService } from "@/services/auth.service";
import type { Supplier, User } from "@/types/login";

type SessionUser = User | Supplier;

type SessionContextType = {
  user: SessionUser | null;
  isAuthenticated: boolean;
  roleName: string | null;
  loading: boolean;
  refreshSession: () => Promise<SessionUser | null>;
  logout: () => Promise<void>;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    try {
      const response = await AuthService.me();
      const currentUser = response.data.user;
      setUser(currentUser);
      return currentUser;
    } catch {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await AuthService.logout();
    } finally {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    void refreshSession();
  }, [refreshSession]);

  const value = useMemo(
    () => {
      const roleName = user?.role?.name ?? null;

      return {
        user,
        isAuthenticated: Boolean(user),
        roleName,
        loading,
        refreshSession,
        logout,
      };
    },
    [user, loading, refreshSession, logout],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used within SessionProvider");
  }

  return context;
}
