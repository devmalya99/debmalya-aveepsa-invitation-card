export function shouldUseCinematicScroll() {
  if (typeof window === "undefined") return false;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return false;

  /*
   * Always pin-only for this invite. Lenis ("smooth") virtualizes window scroll
   * without a ScrollTrigger scrollerProxy, which fights GSAP pins and traps
   * scroll at the venue → finale boundary (tablets / desktop responsive / iPad).
   * MobileOnlyGate already limits the experience to phone/tablet widths.
   */
  return "pin-only" as const;
}

export type ScrollMode = false | "pin-only" | "smooth";

/** Touch phones — use lighter ambient density. */
export function isCoarseMobile() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(pointer: coarse)").matches && window.innerWidth < 768
  );
}

/** Ambient particle counts — full desktop, capped on mobile. */
export const AMBIENT_DENSITY = {
  desktop: {
    gold: 6,
    petals: 10,
    leaves: 6,
    birds: 6,
    finalePetals: 6,
    finaleSparks: 6,
  },
  mobile: {
    gold: 3,
    petals: 5,
    leaves: 3,
    birds: 3,
    finalePetals: 3,
    finaleSparks: 3,
  },
} as const;

export function getAmbientDensity() {
  return isCoarseMobile() ? AMBIENT_DENSITY.mobile : AMBIENT_DENSITY.desktop;
}
