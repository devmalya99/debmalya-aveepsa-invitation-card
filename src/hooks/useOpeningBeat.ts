"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { subscribeOpeningBeat } from "@/lib/openingBeatBus";

export type OpeningBeat = "couple" | "families" | "festivities";

export const OPENING_BEATS: OpeningBeat[] = [
  "couple",
  "families",
  "festivities",
];

/** Three holds: cover → families → festivities. */
export function beatFromProgress(progress: number): OpeningBeat {
  if (progress < 1 / 3) return "couple";
  if (progress < 2 / 3) return "families";
  return "festivities";
}

/** Snap targets — midpoints of each third. */
export function progressForBeat(beat: OpeningBeat): number {
  switch (beat) {
    case "couple":
      return 1 / 6;
    case "families":
      return 0.5;
    case "festivities":
      return 5 / 6;
  }
}

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
  if (span <= 0) return false;
  const top = st.start + span * Math.min(1, Math.max(0, progress));
  scrollYInstant(top);
  return true;
}

export function scrollPastOpeningPin(_behavior: ScrollBehavior = "auto") {
  const opening = ScrollTrigger.getById("pin-grand-reveal");
  if (!opening) return false;

  const venueRoot = document.getElementById("venue-reveal");
  if (venueRoot) {
    const top =
      venueRoot.getBoundingClientRect().top +
      window.scrollY -
      Math.max(12, window.innerHeight * 0.04);
    scrollYInstant(Math.max(0, top));
    return true;
  }

  const venue = ScrollTrigger.getById("pin-venue-reveal");
  if (venue) {
    scrollYInstant(venue.start);
    return true;
  }

  scrollYInstant(opening.end + Math.max(24, window.innerHeight * 0.08));
  return true;
}

export function nextOpeningAutoTargetFromBeat(
  beat: OpeningBeat,
): { type: "beat"; beat: OpeningBeat } | { type: "exit" } {
  const index = OPENING_BEATS.indexOf(beat);
  if (index < 0) return { type: "beat", beat: "couple" };
  if (index >= OPENING_BEATS.length - 1) return { type: "exit" };
  return { type: "beat", beat: OPENING_BEATS[index + 1] };
}

export function nextOpeningAutoTarget(
  progress: number,
): { type: "beat"; beat: OpeningBeat } | { type: "exit" } {
  return nextOpeningAutoTargetFromBeat(beatFromProgress(progress));
}

/**
 * Opening-canvas beat state.
 * Explicit next/prev owns the card after swipe/auto — pin progress must not
 * overwrite mid-snap.
 */
export function useOpeningBeat() {
  const [beat, setBeat] = useState<OpeningBeat>("couple");
  const beatRef = useRef<OpeningBeat>("couple");
  const lockUntilRef = useRef(0);

  const lockBeat = useCallback((ms = 1200) => {
    lockUntilRef.current = Date.now() + ms;
  }, []);

  const applyBeat = useCallback(
    (next: OpeningBeat, lockMs = 1400) => {
      beatRef.current = next;
      setBeat(next);
      lockBeat(lockMs);
    },
    [lockBeat],
  );

  useEffect(() => {
    return subscribeOpeningBeat((next) => {
      applyBeat(next, 1600);
    });
  }, [applyBeat]);

  const onPinProgress = useCallback((progress: number) => {
    if (Date.now() < lockUntilRef.current) return;
    const next = beatFromProgress(progress);
    if (next === beatRef.current) return;
    beatRef.current = next;
    setBeat(next);
  }, []);

  const goToBeat = useCallback(
    (next: OpeningBeat) => {
      applyBeat(next, 1200);
      scrollPinToProgress(progressForBeat(next), "auto");
    },
    [applyBeat],
  );

  const goNext = useCallback(() => {
    const current = beatRef.current;
    const index = OPENING_BEATS.indexOf(current);
    if (index < 0) return;

    if (index >= OPENING_BEATS.length - 1) {
      lockBeat(900);
      scrollPastOpeningPin("auto");
      return;
    }

    const next = OPENING_BEATS[index + 1];
    applyBeat(next, 1400);
    scrollPinToProgress(progressForBeat(next), "auto");
  }, [applyBeat, lockBeat]);

  const goPrev = useCallback(() => {
    const current = beatRef.current;
    const index = OPENING_BEATS.indexOf(current);
    if (index <= 0) {
      applyBeat("couple", 1200);
      scrollPinToProgress(progressForBeat("couple"), "auto");
      return;
    }
    const prev = OPENING_BEATS[index - 1];
    applyBeat(prev, 1200);
    scrollPinToProgress(progressForBeat(prev), "auto");
  }, [applyBeat]);

  return { beat, onPinProgress, goNext, goPrev, goToBeat, lockBeat };
}
