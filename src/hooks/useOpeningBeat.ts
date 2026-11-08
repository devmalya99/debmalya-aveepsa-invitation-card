"use client";

import { useCallback, useState } from "react";

export type OpeningBeat = "couple" | "groom" | "bride";

export function beatFromProgress(progress: number): OpeningBeat {
  if (progress < 1 / 3) return "couple";
  if (progress < 2 / 3) return "groom";
  return "bride";
}

/**
 * Opening-canvas beat state, driven by the pin ScrollTrigger progress
 * (via usePinnedScene onProgress) — not a second competing trigger.
 */
export function useOpeningBeat() {
  const [beat, setBeat] = useState<OpeningBeat>("couple");

  const onPinProgress = useCallback((progress: number) => {
    const next = beatFromProgress(progress);
    setBeat((prev) => (prev === next ? prev : next));
  }, []);

  return { beat, onPinProgress };
}
