"use client";

import { useCallback, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";

export type OpeningBeat = "couple" | "groom" | "bride" | "festivities";

export const OPENING_BEATS: OpeningBeat[] = [
  "couple",
  "groom",
  "bride",
  "festivities",
];

/** Four equal holds on the shared opening pin. */
export function beatFromProgress(progress: number): OpeningBeat {
  if (progress < 0.25) return "couple";
  if (progress < 0.5) return "groom";
  if (progress < 0.75) return "bride";
  return "festivities";
}

/** Snap targets — midpoints of each quarter so the beat reads clearly. */
export function progressForBeat(beat: OpeningBeat): number {
  switch (beat) {
    case "couple":
      return 0.12;
    case "groom":
      return 0.37;
    case "bride":
      return 0.62;
    case "festivities":
      return 0.87;
  }
}

export function scrollPinToProgress(
  progress: number,
  behavior: ScrollBehavior = "smooth",
) {
  const st = ScrollTrigger.getById("pin-grand-reveal");
  if (!st) return false;
  const span = st.end - st.start;
  const top = st.start + span * Math.min(1, Math.max(0, progress));
  window.scrollTo({ top, behavior });
  ScrollTrigger.update();
  return true;
}

export function scrollPastOpeningPin(behavior: ScrollBehavior = "smooth") {
  const st = ScrollTrigger.getById("pin-grand-reveal");
  if (!st) return false;
  /* Jump clearly past pin spacing so venue can take over on phones. */
  const top = st.end + Math.max(48, window.innerHeight * 0.2);
  window.scrollTo({ top, behavior });
  ScrollTrigger.update();
  return true;
}

/** Next auto-play snap while the opening pin is active. */
export function nextOpeningAutoTarget(
  progress: number,
): { type: "beat"; beat: OpeningBeat } | { type: "exit" } {
  if (progress < 0.24) return { type: "beat", beat: "groom" };
  if (progress < 0.49) return { type: "beat", beat: "bride" };
  if (progress < 0.74) return { type: "beat", beat: "festivities" };
  return { type: "exit" };
}

/**
 * Opening-canvas beat state.
 * Driven by pin progress, with explicit next/prev for mobile swipe.
 */
export function useOpeningBeat() {
  const [beat, setBeat] = useState<OpeningBeat>("couple");

  const onPinProgress = useCallback((progress: number) => {
    const next = beatFromProgress(progress);
    setBeat((prev) => (prev === next ? prev : next));
  }, []);

  const goToBeat = useCallback((next: OpeningBeat) => {
    setBeat(next);
    scrollPinToProgress(progressForBeat(next), "smooth");
  }, []);

  const goNext = useCallback(() => {
    setBeat((current) => {
      const index = OPENING_BEATS.indexOf(current);
      if (index < 0) return current;

      if (index >= OPENING_BEATS.length - 1) {
        /* Leave the opening pin toward venue. */
        if (!scrollPastOpeningPin("smooth")) {
          window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
        }
        return current;
      }

      const next = OPENING_BEATS[index + 1];
      scrollPinToProgress(progressForBeat(next), "smooth");
      return next;
    });
  }, []);

  const goPrev = useCallback(() => {
    setBeat((current) => {
      const index = OPENING_BEATS.indexOf(current);
      if (index <= 0) {
        scrollPinToProgress(progressForBeat("couple"), "smooth");
        return "couple";
      }
      const prev = OPENING_BEATS[index - 1];
      scrollPinToProgress(progressForBeat(prev), "smooth");
      return prev;
    });
  }, []);

  return { beat, onPinProgress, goNext, goPrev, goToBeat };
}
