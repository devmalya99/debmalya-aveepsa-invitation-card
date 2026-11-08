"use client";

import { useEffect } from "react";
import { useAutoPlay } from "@/hooks/useAutoPlay";

const PX_PER_FRAME = 2.2;

/**
 * While auto-play is engaged and the invitation film is open,
 * gently scrolls the page until the guest interrupts or the end is reached.
 */
export function useAutoScroll(enabled: boolean) {
  const { isAutoPlaying, markProgrammatic } = useAutoPlay();

  useEffect(() => {
    if (!enabled || !isAutoPlaying) return;

    let raf = 0;
    let active = true;

    const tick = () => {
      if (!active) return;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0 || window.scrollY >= max - 1) {
        return;
      }
      markProgrammatic(80);
      window.scrollBy({ top: PX_PER_FRAME, left: 0, behavior: "auto" });
      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);

    return () => {
      active = false;
      window.cancelAnimationFrame(raf);
    };
  }, [enabled, isAutoPlaying, markProgrammatic]);
}
