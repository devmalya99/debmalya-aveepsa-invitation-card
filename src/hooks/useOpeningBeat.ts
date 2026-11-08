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

/** Instant scroll — CSS smooth + options behavior fight GSAP pins on mobile. */
function scrollYInstant(top: number) {
  window.scrollTo(0, top);
  ScrollTrigger.update();
}

export function scrollPinToProgress(
  progress: number,
  _behavior: ScrollBehavior = "auto",
) {
  const st = ScrollTrigger.getById("pin-grand-reveal");
  if (!st) return false;
  const span = st.end - st.start;
  const top = st.start + span * Math.min(1, Math.max(0, progress));
  scrollYInstant(top);
  return true;
}

export function scrollPastOpeningPin(_behavior: ScrollBehavior = "auto") {
  const st = ScrollTrigger.getById("pin-grand-reveal");
  if (!st) return false;
  /* Past pin end + into venue so auto-scroll cannot flicker on the boundary. */
  const top = st.end + Math.max(80, window.innerHeight * 0.35);
  scrollYInstant(top);
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
        if (!scrollPastOpeningPin("auto")) {
          window.scrollBy({
            top: window.innerHeight * 0.85,
            behavior: "auto",
          });
        }
        return current;
      }

      const next = OPENING_BEATS[index + 1];
      /* Instant scroll — smooth lag made phones feel stuck on couple. */
      if (!scrollPinToProgress(progressForBeat(next), "auto")) {
        /* Pin not ready yet — still advance the Framer card. */
        window.scrollBy({
          top: window.innerHeight * 0.35,
          behavior: "auto",
        });
      }
      return next;
    });
  }, []);

  const goPrev = useCallback(() => {
    setBeat((current) => {
      const index = OPENING_BEATS.indexOf(current);
      if (index <= 0) {
        scrollPinToProgress(progressForBeat("couple"), "auto");
        return "couple";
      }
      const prev = OPENING_BEATS[index - 1];
      if (!scrollPinToProgress(progressForBeat(prev), "auto")) {
        window.scrollBy({
          top: -window.innerHeight * 0.35,
          behavior: "auto",
        });
      }
      return prev;
    });
  }, []);

  return { beat, onPinProgress, goNext, goPrev, goToBeat };
}
