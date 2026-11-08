export const SCENE_SCROLL = {
  /* Keep pins short enough that handoff to the next scene stays reachable. */
  "grand-reveal": { end: "+=200%" },
  "groom-bride": { end: "+=260%" },
  "grand-invitation": { end: "+=220%" },
  "venue-reveal": { end: "+=220%" },
  "wedding-events": { end: "+=220%" },
  /* Moderate pin — enough for unveil choreography without dominating the scroll. */
  "final-scene": { end: "+=180%" },
} as const;

export type SceneId = keyof typeof SCENE_SCROLL;

/** Narrative order: hero → identities → letter → destination → festivities → close */
export const SCENE_ORDER: SceneId[] = [
  "grand-reveal",
  "groom-bride",
  "grand-invitation",
  "venue-reveal",
  "wedding-events",
  "final-scene",
];

export const SCROLL_SCRUB = 1;

/**
 * Shared cinematic motion vocabulary — keep scene timelines on these easings/durations
 * so the invitation feels like one continuous film, not six unrelated effects.
 *
 * Text rule: long soft fades + small travel (no snappy scale/letter-spacing tricks).
 * Page rule: each pin fades in early, holds, then fades out into the next scene.
 */
export const MOTION = {
  easeOut: "power2.out",
  easeInOut: "power2.inOut",
  /** Prefer for copy — silky, not punchy */
  easeTextIn: "sine.out",
  easeTextOut: "sine.in",
  easeSoft: "power1.out",
  /** Scrubbed scroll segments stay linear so finger speed maps 1:1. */
  easeScrub: "none",
  /** Card / sheet settle */
  cardIn: { duration: 0.7, y: 20, scale: 0.97 },
  /** Primary headline — slow fade + gentle rise */
  titleIn: { duration: 0.85, y: 14 },
  /** Body / supporting lines */
  bodyIn: { duration: 0.7, y: 10 },
  /** Text leaving the frame */
  textOut: { duration: 0.55, y: -12 },
  /** Image zoom settle */
  imageZoom: { duration: 1.05, from: 1.1 },
  /** Full page crossfade at pin edges */
  pageFade: { duration: 0.4 },
  stagger: { tight: 0.08, normal: 0.12, loose: 0.18 },
} as const;
