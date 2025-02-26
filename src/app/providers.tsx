"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import type React from "react";

function Providers({ children }: { children: React.ReactNode; }) {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <Toaster />
      {children}
    </QueryClientProvider>
  );
}

export default Providers

