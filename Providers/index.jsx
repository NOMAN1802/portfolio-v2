"use client";
import * as React from "react";

import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import UserProvider from "@/context/user.provider";


const queryClient = new QueryClient();

export function Providers({ children }) {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        
          <Toaster position="top-center" />
          { children }
        
      </UserProvider>
    </QueryClientProvider>
  );
}