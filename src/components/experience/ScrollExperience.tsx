"use client";

import type { ReactNode } from "react";
import { useScrollMode } from "@/hooks/useScrollMode";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { ScrollModeProvider } from "@/hooks/useScrollModeContext";

type ScrollExperienceProps = {
  children: ReactNode;
};

export function ScrollExperience({ children }: ScrollExperienceProps) {
  const { mode, ready, cinematic } = useScrollMode();
  useSmoothScroll(mode);

  // Never blank the invitation while detecting scroll mode — show content immediately.
  return (
    <ScrollModeProvider value={{ mode: ready ? mode : false, cinematic: ready ? cinematic : false }}>
      {children}
    </ScrollModeProvider>
  );
}
