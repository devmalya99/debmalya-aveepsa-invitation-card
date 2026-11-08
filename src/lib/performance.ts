export function shouldUseCinematicScroll() {
  if (typeof window === "undefined") return false;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return false;

  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const shortViewport = window.innerHeight < 560;
  if (shortViewport) return false;

  // Prefer native touch scrolling on phones; keep pinning via GSAP only.
  if (coarse && window.innerWidth < 768) {
    return "pin-only" as const;
  }

  return "smooth" as const;
}

export type ScrollMode = false | "pin-only" | "smooth";

/** Touch phones — use lighter ambient density and softer auto-scroll. */
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

/** Auto-scroll pixels per frame — slower on phones to cut sustained load. */
export function getAutoScrollPxPerFrame() {
  return isCoarseMobile() ? 3.6 : 5.8;
}
