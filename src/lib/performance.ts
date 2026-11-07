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
