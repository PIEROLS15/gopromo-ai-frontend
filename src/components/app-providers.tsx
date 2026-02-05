"use client";

import { ThemeProvider } from "@/context/themeContext";
import { AuthProvider } from "@/context/authContext";
import { Toaster } from "@/components/ui/toaster";

export function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}

