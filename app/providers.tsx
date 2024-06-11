"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { QueryClientProvider } from '@tanstack/react-query';
import { ReduxProvider } from "@/shared/providers/redux/provider";
import { queryClient } from "@/shared/providers/query";
import { Toaster } from "sonner";
export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <ReduxProvider>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>
          <NextThemesProvider defaultTheme="system" attribute="class" {...themeProps}>
            {children}
          </NextThemesProvider>
          <Toaster richColors />
        </NextUIProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
}
