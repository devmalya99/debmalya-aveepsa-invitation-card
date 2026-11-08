/**
 * @deprecated Festivities no longer use a scrubbed GSAP pin.
 * They enter as a Framer Motion layer on the GrandReveal opening canvas.
 */
export function useWeddingEventsAnimation(_options?: {
  sectionRef?: unknown;
  enabled?: boolean;
  reducedMotion?: boolean;
}) {
  /* no-op — kept so old imports do not break during the canvas merge */
}
