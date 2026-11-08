export function shouldUseCinematicScroll() {
  if (typeof window === "undefined") return false;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return false;

  const coarse = window.matchMedia("(pointer: coarse)").matches;

  // Prefer native touch scrolling on phones; keep pinning via GSAP only.
  // Short viewports still pin — otherwise opening layers stay stuck on couple.
  if (coarse && window.innerWidth < 768) {
    return "pin-only" as const;
  }

  if (window.innerHeight < 560) {
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

/**
 * Auto-scroll pixels per frame while moving between readable stops.
 * Soft cruise — not a blur, not a multi-minute crawl.
 */
export function getAutoScrollPxPerFrame() {
  return isCoarseMobile() ? 7.5 : 8.5;
}

/** How long auto-play holds each opening card before snapping to the next. */
export const OPENING_AUTO_HOLD_MS = 3200;

/** Hold on festivities before leaving toward venue. */
export const OPENING_EXIT_HOLD_MS = 2800;

/** How long auto-play pauses on venue / finale once the card is readable. */
export const SCENE_READ_HOLD_MS = 3800;
