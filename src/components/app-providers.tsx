"use client";

import { ThemeProvider } from "@/context/themeContext";
import { SessionProvider } from "@/context/sessionContext";
import { ChatProvider } from "@/context/chatContext";

const AppProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ThemeProvider>
      <SessionProvider>
        <ChatProvider>{children}</ChatProvider>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
