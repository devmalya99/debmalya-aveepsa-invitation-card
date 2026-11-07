"use client";

import { useEffect, useState } from "react";
import { shouldUseCinematicScroll, type ScrollMode } from "@/lib/performance";

export function useScrollMode() {
  const [mode, setMode] = useState<ScrollMode>(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setMode(shouldUseCinematicScroll());
    sync();
    setReady(true);

    window.addEventListener("resize", sync);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    media.addEventListener("change", sync);

    return () => {
      window.removeEventListener("resize", sync);
      media.removeEventListener("change", sync);
    };
  }, []);

  return { mode, ready, cinematic: Boolean(mode) };
}
