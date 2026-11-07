"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { ScrollMode } from "@/lib/performance";

type ScrollModeContextValue = {
  mode: ScrollMode;
  cinematic: boolean;
};

const ScrollModeContext = createContext<ScrollModeContextValue>({
  mode: false,
  cinematic: false,
});

export function ScrollModeProvider({
  value,
  children,
}: {
  value: ScrollModeContextValue;
  children: ReactNode;
}) {
  return (
    <ScrollModeContext.Provider value={value}>{children}</ScrollModeContext.Provider>
  );
}

export function useScrollModeContext() {
  return useContext(ScrollModeContext);
}
