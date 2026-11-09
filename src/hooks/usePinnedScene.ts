"use client";

import { useGSAP } from "@gsap/react";
import { useEffect, useRef, type RefObject } from "react";
import {
  SCENE_SCROLL,
  SCROLL_SCRUB,
  type SceneId,
} from "@/lib/animation-config";
import { gsap, registerGsap } from "@/lib/gsap";

type UsePinnedSceneOptions = {
  /** Element that GSAP pins / triggers. Must sit inside a React-stable outer wrapper. */
  sectionRef: RefObject<HTMLElement | null>;
  sceneId: SceneId;
  enabled: boolean;
  build: (timeline: gsap.core.Timeline) => void;
  /** Default true. Set false for tall scenes that must scroll naturally. */
  pin?: boolean;
  start?: string;
  end?: string;
  /** Override global SCROLL_SCRUB (e.g. 0.8 for softer finale lag). */
  scrub?: number | boolean;
  /** Fired with the pin ScrollTrigger progress (0–1). */
  onProgress?: (progress: number) => void;
  /** Override fastScrollEnd (false keeps intermediate opening beats reachable). */
  fastScrollEnd?: boolean;
};

/**
 * Scroll-linked scene timeline.
 * Cleanup is owned solely by useGSAP's context.revert().
 */
export function usePinnedScene({
  sectionRef,
  sceneId,
  enabled,
  build,
  pin = true,
  start = "top top",
  end,
  scrub = SCROLL_SCRUB,
  onProgress,
  fastScrollEnd = true,
}: UsePinnedSceneOptions) {
  const onProgressRef = useRef(onProgress);
  useEffect(() => {
    onProgressRef.current = onProgress;
  }, [onProgress]);

  useGSAP(
    () => {
      if (!enabled || !sectionRef.current) return;

      registerGsap();

      const trigger = sectionRef.current;

      const timeline = gsap.timeline({
        scrollTrigger: {
          id: `pin-${sceneId}`,
          trigger,
          start,
          end: end ?? SCENE_SCROLL[sceneId].end,
          scrub,
          pin,
          pinSpacing: true,
          /* anticipatePin repositions early and fights RAF auto-scroll at scene edges. */
          anticipatePin: 0,
          invalidateOnRefresh: true,
          /* Keep the pinned scene above the next one (stops venue bleeding into opening). */
          pinReparent: false,
          fastScrollEnd,
          onUpdate: (self) => {
            onProgressRef.current?.(self.progress);
          },
          onRefresh: (self) => {
            onProgressRef.current?.(self.progress);
          },
        },
      });

      build(timeline);
      onProgressRef.current?.(timeline.scrollTrigger?.progress ?? 0);
    },
    {
      scope: sectionRef,
      dependencies: [enabled, sceneId, pin, start, end, scrub, fastScrollEnd],
      revertOnUpdate: true,
    },
  );
}
