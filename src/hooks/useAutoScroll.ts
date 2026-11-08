"use client";

import { useEffect } from "react";
import { useAutoPlay } from "@/hooks/useAutoPlay";
import {
  nextOpeningAutoTarget,
  progressForBeat,
} from "@/hooks/useOpeningBeat";
import { ScrollTrigger } from "@/lib/gsap";
import {
  getAutoScrollPxPerFrame,
  OPENING_AUTO_HOLD_MS,
  OPENING_EXIT_HOLD_MS,
} from "@/lib/performance";

/** Instant Y write — avoids CSS smooth scroll fighting RAF. */
function scrollYTo(top: number) {
  window.scrollTo(0, top);
  ScrollTrigger.update();
}

/**
 * Auto-play scroll:
 * - Opening pin: snap card → card on a fixed timer.
 * - Leaving opening: faster crawl past the pin, then cruise later scenes.
 * - Keeps ticking at document end briefly so late-mounted venue pins are caught.
 */
export function useAutoScroll(enabled: boolean) {
  const { isAutoPlaying, markProgrammatic } = useAutoPlay();

  useEffect(() => {
    if (!enabled || !isAutoPlaying) return;

    const html = document.documentElement;
    const previousBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";

    let raf = 0;
    let active = true;
    let lastOpeningSnap = Date.now();
    let leavingOpening = false;
    let endWaitStartedAt: number | null = null;
    let lastEndRefreshAt = 0;
    const pxPerFrame = getAutoScrollPxPerFrame();
    const exitPxPerFrame = Math.max(pxPerFrame * 2.2, 14);

    const tick = () => {
      if (!active) return;

      const max = html.scrollHeight - window.innerHeight;
      const atEnd = max <= 0 || window.scrollY >= max - 2;

      if (atEnd) {
        /*
         * Venue / finale chunks can mount after we reach the opening pin end.
         * Keep polling + refreshing so auto-play resumes when height grows.
         */
        if (endWaitStartedAt == null) endWaitStartedAt = Date.now();
        const waited = Date.now() - endWaitStartedAt;
        if (waited < 8000) {
          if (Date.now() - lastEndRefreshAt > 400) {
            lastEndRefreshAt = Date.now();
            ScrollTrigger.refresh();
          }
          markProgrammatic(200);
          raf = window.requestAnimationFrame(tick);
        }
        return;
      }
      endWaitStartedAt = null;

      const openingPin = ScrollTrigger.getById("pin-grand-reveal");
      const inOpening = Boolean(openingPin?.isActive);
      const openingProgress = openingPin?.progress ?? 0;

      if (inOpening && !leavingOpening) {
        const holdMs =
          openingProgress >= 0.74 ? OPENING_EXIT_HOLD_MS : OPENING_AUTO_HOLD_MS;

        if (Date.now() - lastOpeningSnap >= holdMs) {
          lastOpeningSnap = Date.now();
          markProgrammatic(1200);
          const target = nextOpeningAutoTarget(openingProgress);
          if (target.type === "exit") {
            leavingOpening = true;
          } else {
            const span = openingPin!.end - openingPin!.start;
            const top =
              openingPin!.start +
              span * Math.min(1, Math.max(0, progressForBeat(target.beat)));
            scrollYTo(top);
          }
        }

        if (!leavingOpening) {
          raf = window.requestAnimationFrame(tick);
          return;
        }
      }

      markProgrammatic(200);
      const step = leavingOpening && inOpening ? exitPxPerFrame : pxPerFrame;
      scrollYTo(Math.min(max, window.scrollY + step));

      if (leavingOpening && !inOpening) {
        leavingOpening = false;
      }

      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);

    return () => {
      active = false;
      window.cancelAnimationFrame(raf);
      html.style.scrollBehavior = previousBehavior;
    };
  }, [enabled, isAutoPlaying, markProgrammatic]);
}
