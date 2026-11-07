export const SCENE_SCROLL = {
  "grand-reveal": { end: "+=200%" },
  "groom-bride": { end: "+=320%" },
  "grand-invitation": { end: "+=160%" },
  "venue-reveal": { end: "+=220%" },
  "wedding-events": { end: "+=220%" },
  "final-scene": { end: "+=160%" },
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
