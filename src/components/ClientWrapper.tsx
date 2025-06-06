"use client";

import { LoadingScreen } from "./LoadingScreen";

interface ClientWrapperProps {
  children: React.ReactNode;
}

export function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <>
      <LoadingScreen />
      {children}
    </>
  );
} 