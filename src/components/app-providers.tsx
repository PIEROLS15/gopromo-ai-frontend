"use client";

import { ThemeProvider } from "@/context/themeContext";
import { SessionProvider } from "@/context/sessionContext";

export function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  );
}
