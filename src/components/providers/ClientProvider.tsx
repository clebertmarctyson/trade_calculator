"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const client = new QueryClient();

type ClientProviderProps = {
  children: React.ReactNode;
};

export const ClientProvider = ({ children }: ClientProviderProps) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
