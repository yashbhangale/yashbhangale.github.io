"use client";

import { LoadingScreen, LoadingProvider } from "./LoadingScreen";

interface ClientWrapperProps {
  children: React.ReactNode;
}

export function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <LoadingProvider>
      <LoadingScreen />
      {children}
    </LoadingProvider>
  );
} 