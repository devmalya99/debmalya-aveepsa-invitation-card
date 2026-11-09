"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import type { ScrollMode } from "@/lib/performance";

/**
 * Optional Lenis path. Currently unused — `shouldUseCinematicScroll` returns
 * pin-only because Lenis without scrollerProxy traps scroll past venue pins.
 * Kept wired so a future, properly-proxied smooth mode can opt in again.
 */
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

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value as number, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
      ScrollTrigger.scrollerProxy(document.documentElement);
      ScrollTrigger.refresh();
    };
  }, [mode]);
}
