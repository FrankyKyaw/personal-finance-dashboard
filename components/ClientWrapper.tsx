"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactNode } from "react";
import SessionWrapper from "@/components/SessionWrapper";

const queryClient = new QueryClient();

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return (
    <SessionWrapper>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </SessionWrapper>
  );
}
