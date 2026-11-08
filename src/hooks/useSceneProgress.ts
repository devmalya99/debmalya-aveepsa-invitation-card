"use client";

import { useEffect, useState } from "react";
import {
  SCENE_ORDER,
  SCENE_SCROLL,
  type SceneId,
} from "@/lib/animation-config";
import { registerGsap, ScrollTrigger } from "@/lib/gsap";

type ProgressBinding = {
  sceneId: SceneId;
  sceneIndex: number;
  trigger: ScrollTrigger;
};

/**
 * Scene counter must use the same trigger + end as each scene's pin.
 * Tracking the outer wrapper with end:"bottom top" desyncs once pin-spacers
 * resize the layout — the UI can show 06/06 while still on scene 02.
 */
export function useSceneProgress(enabled: boolean) {
  const [activeScene, setActiveScene] = useState<SceneId>(SCENE_ORDER[0]);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    registerGsap();
    const bindings: ProgressBinding[] = [];

    const activate = (sceneId: SceneId, sceneIndex: number, value: number) => {
      setActiveScene(sceneId);
      setIndex(sceneIndex);
      setProgress(value);
    };

    const syncActive = () => {
      const active = bindings.find((binding) => binding.trigger.isActive);
      if (!active) return;
      activate(active.sceneId, active.sceneIndex, active.trigger.progress);
    };

    const mountProgressTriggers = () => {
      bindings.forEach((binding) => binding.trigger.kill());
      bindings.length = 0;

      SCENE_ORDER.forEach((sceneId, sceneIndex) => {
        const root = document.getElementById(sceneId);
        if (!root) return;

        /* Prefer the pinned <section> — same node usePinnedScene pins. */
        const section = root.querySelector("section");
        const triggerElement = section ?? root;

        const trigger = ScrollTrigger.create({
          id: `progress-${sceneId}`,
          trigger: triggerElement,
          start: "top top",
          end: SCENE_SCROLL[sceneId].end,
          onEnter: () => activate(sceneId, sceneIndex, 0),
          onEnterBack: () => activate(sceneId, sceneIndex, 1),
          onUpdate: (self) => {
            if (!self.isActive) return;
            activate(sceneId, sceneIndex, self.progress);
          },
        });

        bindings.push({ sceneId, sceneIndex, trigger });
      });

      syncActive();
    };

    mountProgressTriggers();
    ScrollTrigger.refresh();

    /* Pins mount in sibling effects — remount progress after layout settles. */
    const remount = window.setTimeout(() => {
      mountProgressTriggers();
      ScrollTrigger.refresh();
      syncActive();
    }, 160);

    ScrollTrigger.addEventListener("refresh", syncActive);

    return () => {
      window.clearTimeout(remount);
      ScrollTrigger.removeEventListener("refresh", syncActive);
      bindings.forEach((binding) => binding.trigger.kill());
    };
  }, [enabled]);

  return {
    activeScene,
    index,
    progress,
    total: SCENE_ORDER.length,
  };
}
