"use client";

import { ThemeProvider } from "@/context/themeContext";

export function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}
