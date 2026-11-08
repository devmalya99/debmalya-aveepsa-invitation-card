export const SCENE_SCROLL = {
  /*
   * One pinned canvas: couple → groom → bride → festivities.
   * Keep the pin short enough that auto-play / swipe don't linger ~10s per card.
   */
  "grand-reveal": { end: "+=200%" },
  "venue-reveal": { end: "+=180%" },
  /* Moderate pin — enough for unveil choreography without dominating the scroll. */
  "final-scene": { end: "+=160%" },
  /* Guest name form — one viewport, light hold */
  "guest-blessing": { end: "+=90%" },
} as const;

export type SceneId = keyof typeof SCENE_SCROLL;

/** Pin / DOM scene order (opening layers live inside grand-reveal). */
export const SCENE_ORDER: SceneId[] = [
  "grand-reveal",
  "venue-reveal",
  "final-scene",
  "guest-blessing",
];

/**
 * Progress counter steps — layer-by-layer inside the opening pin,
 * then one step per remaining scene.
 */
export type ProgressStep = {
  id: string;
  sceneId: SceneId;
  /** Inclusive start of pin progress [0, 1]. */
  pinStart: number;
  /** Exclusive end of pin progress [0, 1] (1 = inclusive at end). */
  pinEnd: number;
};

export const PROGRESS_STEPS: ProgressStep[] = [
  { id: "couple", sceneId: "grand-reveal", pinStart: 0, pinEnd: 0.25 },
  {
    id: "groom-family",
    sceneId: "grand-reveal",
    pinStart: 0.25,
    pinEnd: 0.5,
  },
  {
    id: "bride-family",
    sceneId: "grand-reveal",
    pinStart: 0.5,
    pinEnd: 0.75,
  },
  {
    id: "festivities",
    sceneId: "grand-reveal",
    pinStart: 0.75,
    pinEnd: 1,
  },
  { id: "venue-reveal", sceneId: "venue-reveal", pinStart: 0, pinEnd: 1 },
  { id: "final-scene", sceneId: "final-scene", pinStart: 0, pinEnd: 1 },
  { id: "guest-blessing", sceneId: "guest-blessing", pinStart: 0, pinEnd: 1 },
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
