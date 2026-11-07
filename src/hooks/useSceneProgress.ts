"use client";

import { useEffect, useState } from "react";
import { SCENE_ORDER, type SceneId } from "@/lib/animation-config";
import { registerGsap, ScrollTrigger } from "@/lib/gsap";

export function useSceneProgress(enabled: boolean) {
  const [activeScene, setActiveScene] = useState<SceneId>(SCENE_ORDER[0]);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    registerGsap();
    const triggers: ScrollTrigger[] = [];

    SCENE_ORDER.forEach((sceneId, sceneIndex) => {
      const element = document.getElementById(sceneId);
      if (!element) return;

      const trigger = ScrollTrigger.create({
        trigger: element,
        /*
         * Outer scene root grows with the GSAP pin-spacer, so top→bottom
         * already matches the real pinned scroll range (no SCENE_SCROLL %).
         */
        start: "top top",
        end: "bottom top",
        onEnter: () => {
          setActiveScene(sceneId);
          setIndex(sceneIndex);
        },
        onEnterBack: () => {
          setActiveScene(sceneId);
          setIndex(sceneIndex);
        },
        onUpdate: (self) => {
          if (!self.isActive) return;
          setActiveScene(sceneId);
          setIndex(sceneIndex);
          setProgress(self.progress);
        },
      });

      triggers.push(trigger);
    });

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((trigger) => {
        trigger.kill();
      });
      ScrollTrigger.refresh();
    };
  }, [enabled]);

  return {
    activeScene,
    index,
    progress,
    total: SCENE_ORDER.length,
  };
}
