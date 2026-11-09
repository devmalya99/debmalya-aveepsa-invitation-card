"use client";

import { useEffect } from "react";
import { useAutoPlay } from "@/hooks/useAutoPlay";
import {
  nextOpeningAutoTargetFromBeat,
  OPENING_BEATS,
  progressForBeat,
  type OpeningBeat,
} from "@/hooks/useOpeningBeat";
import { ScrollTrigger } from "@/lib/gsap";
import {
  getAutoScrollPxPerFrame,
  OPENING_AUTO_HOLD_MS,
  OPENING_EXIT_HOLD_MS,
  SCENE_READ_HOLD_MS,
  VENUE_READ_HOLD_MS,
} from "@/lib/performance";
import { emitOpeningBeat } from "@/lib/openingBeatBus";

function scrollYTo(top: number) {
  window.scrollTo(0, top);
  ScrollTrigger.update();
}

type SceneReadStop = {
  pinId: string;
  readAt: number;
  holdMs: number;
  approachPx?: number;
};

const SCENE_READ_STOPS: SceneReadStop[] = [
  {
    /* Flowing venue — hold early while the editorial folio is on screen. */
    pinId: "pin-venue-reveal",
    readAt: 0.22,
    holdMs: VENUE_READ_HOLD_MS,
    approachPx: 2.8,
  },
  {
    pinId: "pin-final-scene",
    readAt: 0.55,
    holdMs: SCENE_READ_HOLD_MS,
    approachPx: 2.4,
  },
];

/**
 * Auto-play: sequential opening beats only (cover → families → festivities).
 * Never race scroll toward pin end.
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
    let openingBeatIndex = 0;
    const heldPins = new Set<string>();
    const holdStartedAt = new Map<string, number>();
    const pxPerFrame = getAutoScrollPxPerFrame();
    const exitPxPerFrame = Math.max(pxPerFrame * 1.1, 4.5);

    const snapOpeningBeat = (beat: OpeningBeat) => {
      const pin = ScrollTrigger.getById("pin-grand-reveal");
      if (!pin) return false;
      const span = pin.end - pin.start;
      if (span <= 0) return false;
      emitOpeningBeat(beat);
      scrollYTo(pin.start + span * progressForBeat(beat));
      return true;
    };

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

      /* Still in opening journey — hold & snap beat-by-beat. */
      if (!leavingOpening && openingBeatIndex < OPENING_BEATS.length) {
        const currentBeat = OPENING_BEATS[openingBeatIndex] as OpeningBeat;
        const holdMs =
          currentBeat === "festivities"
            ? OPENING_EXIT_HOLD_MS
            : OPENING_AUTO_HOLD_MS;

        /* Keep pin parked on this beat while holding (recovers if ST drifts). */
        if (inOpening && openingPin) {
          const target = progressForBeat(currentBeat);
          if (Math.abs(openingPin.progress - target) > 0.04) {
            snapOpeningBeat(currentBeat);
          }
        } else if (openingPin && openingBeatIndex < OPENING_BEATS.length - 1) {
          /* Pin inactive too early — pull back to current beat, do not race to end. */
          snapOpeningBeat(currentBeat);
        }

        if (Date.now() - lastOpeningSnap >= holdMs) {
          lastOpeningSnap = Date.now();
          markProgrammatic(1600);
          const target = nextOpeningAutoTargetFromBeat(currentBeat);
          if (target.type === "exit") {
            leavingOpening = true;
            openingBeatIndex = OPENING_BEATS.length;
          } else {
            openingBeatIndex = OPENING_BEATS.indexOf(target.beat);
            snapOpeningBeat(target.beat);
          }
        }

        if (!leavingOpening) {
          raf = window.requestAnimationFrame(tick);
          return;
        }
      }

      for (const stop of SCENE_READ_STOPS) {
        if (heldPins.has(stop.pinId)) continue;
        const pin = ScrollTrigger.getById(stop.pinId);
        if (!pin) continue;

        /* Venue is unpinned — only hold while the section is actually active. */
        if (!pin.isActive) continue;

        const span = Math.max(1, pin.end - pin.start);
        const readTop = pin.start + span * stop.readAt;

        if (window.scrollY + 2 < readTop && pin.progress < stop.readAt - 0.02) {
          markProgrammatic(200);
          const approach = stop.approachPx ?? pxPerFrame;
          scrollYTo(Math.min(readTop, window.scrollY + approach));
          raf = window.requestAnimationFrame(tick);
          return;
        }

        if (!holdStartedAt.has(stop.pinId)) {
          holdStartedAt.set(stop.pinId, Date.now());
          if (stop.pinId !== "pin-venue-reveal") {
            scrollYTo(readTop);
          }
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

      if (leavingOpening || inOpening) {
        if (inOpening && openingPin) {
          scrollYTo(Math.min(max, window.scrollY + exitPxPerFrame));
          raf = window.requestAnimationFrame(tick);
          return;
        }
        leavingOpening = false;
      }

      scrollYTo(Math.min(max, window.scrollY + pxPerFrame));
      raf = window.requestAnimationFrame(tick);
    };

    /* Park on couple at start so first hold is readable. */
    snapOpeningBeat("couple");
    raf = window.requestAnimationFrame(tick);

    return () => {
      active = false;
      window.cancelAnimationFrame(raf);
      html.style.scrollBehavior = previousBehavior;
    };
  }, [enabled, isAutoPlaying, markProgrammatic]);
}
