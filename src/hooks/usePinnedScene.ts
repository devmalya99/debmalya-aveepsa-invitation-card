"use client";

import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";
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
}: UsePinnedSceneOptions) {
  useGSAP(
    () => {
      if (!enabled || !sectionRef.current) return;

      registerGsap();

      const trigger = sectionRef.current;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger,
          start,
          end: end ?? SCENE_SCROLL[sceneId].end,
          scrub: SCROLL_SCRUB,
          pin,
          anticipatePin: pin ? 1 : 0,
          invalidateOnRefresh: true,
          /* Finish the pin cleanly on fast flicks so the next scene can take over. */
          fastScrollEnd: true,
        },
      });

      build(timeline);
    },
    {
      scope: sectionRef,
      dependencies: [enabled, sceneId, pin, start, end],
      revertOnUpdate: true,
    },
  );
}
