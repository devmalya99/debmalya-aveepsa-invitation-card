"use client";

import { useEffect, useState } from "react";
import {
  PROGRESS_STEPS,
  SCENE_ORDER,
  SCENE_SCROLL,
  type SceneId,
} from "@/lib/animation-config";
import { registerGsap, ScrollTrigger } from "@/lib/gsap";

type ProgressBinding = {
  sceneId: SceneId;
  trigger: ScrollTrigger;
};

function stepIndexFor(sceneId: SceneId, pinProgress: number) {
  const steps = PROGRESS_STEPS;
  for (let i = 0; i < steps.length; i += 1) {
    const step = steps[i];
    if (step.sceneId !== sceneId) continue;
    const atEnd = pinProgress >= 0.999 && step.pinEnd >= 1;
    if (
      atEnd ||
      (pinProgress >= step.pinStart && pinProgress < step.pinEnd)
    ) {
      return i;
    }
  }
  return steps.findIndex((step) => step.sceneId === sceneId);
}

/**
 * Scene counter must use the same trigger + end as each scene's pin.
 * Opening canvas subdivides into couple / groom / bride progress steps.
 */
export function useSceneProgress(enabled: boolean) {
  const [activeScene, setActiveScene] = useState<SceneId>(SCENE_ORDER[0]);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    registerGsap();
    const bindings: ProgressBinding[] = [];

    let raf = 0;
    let pending: { sceneId: SceneId; pinProgress: number } | null = null;
    let lastStepIndex = -1;
    let lastProgressBucket = -1;

    const flush = () => {
      raf = 0;
      if (!pending) return;
      const { sceneId, pinProgress } = pending;
      pending = null;

      const stepIndex = Math.max(0, stepIndexFor(sceneId, pinProgress));
      const step = PROGRESS_STEPS[stepIndex];
      const span = Math.max(0.0001, step.pinEnd - step.pinStart);
      const local = Math.min(
        1,
        Math.max(0, (pinProgress - step.pinStart) / span),
      );
      /* ~2% buckets — keeps the bar smooth without React every frame. */
      const bucket = Math.round(local * 50);

      if (stepIndex !== lastStepIndex) {
        lastStepIndex = stepIndex;
        lastProgressBucket = bucket;
        setActiveScene(sceneId);
        setIndex(stepIndex);
        setProgress(local);
        return;
      }
      if (bucket !== lastProgressBucket) {
        lastProgressBucket = bucket;
        setProgress(local);
      }
    };

    const activate = (sceneId: SceneId, pinProgress: number) => {
      pending = { sceneId, pinProgress };
      if (!raf) raf = window.requestAnimationFrame(flush);
    };

    const syncActive = () => {
      const active = bindings.find((binding) => binding.trigger.isActive);
      if (!active) return;
      activate(active.sceneId, active.trigger.progress);
    };

    const mountProgressTriggers = () => {
      bindings.forEach((binding) => binding.trigger.kill());
      bindings.length = 0;

      SCENE_ORDER.forEach((sceneId) => {
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
          onEnter: () => activate(sceneId, 0),
          onEnterBack: () => activate(sceneId, 1),
          onUpdate: (self) => {
            if (!self.isActive) return;
            activate(sceneId, self.progress);
          },
        });

        bindings.push({ sceneId, trigger });
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
      if (raf) window.cancelAnimationFrame(raf);
      ScrollTrigger.removeEventListener("refresh", syncActive);
      bindings.forEach((binding) => binding.trigger.kill());
    };
  }, [enabled]);

  return {
    activeScene,
    index,
    progress,
    total: PROGRESS_STEPS.length,
  };
}
