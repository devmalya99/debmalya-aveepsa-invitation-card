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

  // Optimistic cinematic while detecting — GrandReveal used to hide the whole
  // card until ready flipped, which left Scene 01 empty for a beat.
  return (
    <ScrollModeProvider
      value={{
        mode: ready ? mode : "pin-only",
        cinematic: ready ? cinematic : true,
      }}
    >
      {children}
    </ScrollModeProvider>
  );
}
