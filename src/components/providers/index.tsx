"use client";

import { ClientProvider } from "@/components/providers/ClientProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
    <ClientProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </ClientProvider>
  );
};

export default Providers;
