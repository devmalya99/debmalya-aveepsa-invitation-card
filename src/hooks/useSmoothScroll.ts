"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import type { ScrollMode } from "@/lib/performance";

export function useSmoothScroll(mode: ScrollMode) {
  useEffect(() => {
    if (mode !== "smooth") return;

    registerGsap();
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      touchMultiplier: 1.2,
      autoRaf: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
      ScrollTrigger.refresh();
    };
  }, [mode]);
}
