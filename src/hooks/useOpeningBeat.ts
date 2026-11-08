"use client";

import { useCallback, useState } from "react";

export type OpeningBeat = "couple" | "groom" | "bride" | "festivities";

/** Four equal holds on the shared opening pin. */
export function beatFromProgress(progress: number): OpeningBeat {
  if (progress < 0.25) return "couple";
  if (progress < 0.5) return "groom";
  if (progress < 0.75) return "bride";
  return "festivities";
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
