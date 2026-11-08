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
  SCENE_READ_HOLD_MS,
  VENUE_READ_HOLD_MS,
} from "@/lib/performance";

/** Instant Y write — avoids CSS smooth scroll fighting RAF. */
function scrollYTo(top: number) {
  window.scrollTo(0, top);
  ScrollTrigger.update();
}

type SceneReadStop = {
  pinId: string;
  /** Pin progress where the scene is readable enough to pause. */
  readAt: number;
  holdMs: number;
  /** Softer approach so the unveil doesn’t blur past. */
  approachPx?: number;
};

/** Pause mid-pin so venue / finale can be read — then continue past. */
const SCENE_READ_STOPS: SceneReadStop[] = [
  {
    pinId: "pin-venue-reveal",
    readAt: 0.62,
    holdMs: VENUE_READ_HOLD_MS,
    approachPx: 4.2,
  },
  { pinId: "pin-final-scene", readAt: 0.62, holdMs: SCENE_READ_HOLD_MS + 400 },
];

/**
 * Auto-play scroll:
 * - Opening: snap card → card with readable holds.
 * - Venue / finale: cruise to a readable frame, pause, then leave.
 * - Never dies at a temporary document end (late-mounted scenes).
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
    const heldPins = new Set<string>();
    const holdStartedAt = new Map<string, number>();
    const pxPerFrame = getAutoScrollPxPerFrame();
    /* Leave festivities gently — a fast exit made the schedule card feel skipped. */
    const exitPxPerFrame = Math.max(pxPerFrame * 1.15, 8);

    const tick = () => {
      if (!active) return;

      const max = html.scrollHeight - window.innerHeight;
      const atEnd = max <= 0 || window.scrollY >= max - 2;

      if (atEnd) {
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

      /* Venue / finale — pause once readable, then leave the pin. */
      for (const stop of SCENE_READ_STOPS) {
        if (heldPins.has(stop.pinId)) continue;
        const pin = ScrollTrigger.getById(stop.pinId);
        if (!pin?.isActive) continue;

        const span = pin.end - pin.start;
        const readTop = pin.start + span * stop.readAt;

        if (pin.progress < stop.readAt - 0.02) {
          markProgrammatic(200);
          const approach = stop.approachPx ?? pxPerFrame;
          scrollYTo(Math.min(readTop, window.scrollY + approach));
          raf = window.requestAnimationFrame(tick);
          return;
        }

        if (!holdStartedAt.has(stop.pinId)) {
          holdStartedAt.set(stop.pinId, Date.now());
          scrollYTo(readTop);
        }

        const heldFor = Date.now() - (holdStartedAt.get(stop.pinId) ?? 0);
        if (heldFor < stop.holdMs) {
          markProgrammatic(200);
          raf = window.requestAnimationFrame(tick);
          return;
        }

        heldPins.add(stop.pinId);
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
