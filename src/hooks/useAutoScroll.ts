"use client";

import { useEffect } from "react";
import { useAutoPlay } from "@/hooks/useAutoPlay";
import {
  nextOpeningAutoTarget,
  progressForBeat,
  scrollPastOpeningPin,
  scrollPinToProgress,
} from "@/hooks/useOpeningBeat";
import { ScrollTrigger } from "@/lib/gsap";
import {
  getAutoScrollPxPerFrame,
  OPENING_AUTO_HOLD_MS,
} from "@/lib/performance";

/**
 * Auto-play scroll:
 * - Opening pin: snap card → card on a fixed timer (not slow pixel crawl).
 * - Later scenes: continuous px/frame scroll.
 */
export function useAutoScroll(enabled: boolean) {
  const { isAutoPlaying, markProgrammatic } = useAutoPlay();

  useEffect(() => {
    if (!enabled || !isAutoPlaying) return;

    let raf = 0;
    let active = true;
    let lastOpeningSnap = Date.now();
    const pxPerFrame = getAutoScrollPxPerFrame();

    const tick = () => {
      if (!active) return;

      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0 || window.scrollY >= max - 1) {
        return;
      }

      const openingPin = ScrollTrigger.getById("pin-grand-reveal");
      if (openingPin?.isActive) {
        if (Date.now() - lastOpeningSnap >= OPENING_AUTO_HOLD_MS) {
          lastOpeningSnap = Date.now();
          markProgrammatic(900);
          const target = nextOpeningAutoTarget(openingPin.progress);
          if (target.type === "exit") {
            scrollPastOpeningPin("auto");
          } else {
            scrollPinToProgress(progressForBeat(target.beat), "auto");
          }
        }
        raf = window.requestAnimationFrame(tick);
        return;
      }

      markProgrammatic(80);
      window.scrollBy({ top: pxPerFrame, left: 0, behavior: "auto" });
      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);

    return () => {
      active = false;
      window.cancelAnimationFrame(raf);
    };
  }, [enabled, isAutoPlaying, markProgrammatic]);
}
