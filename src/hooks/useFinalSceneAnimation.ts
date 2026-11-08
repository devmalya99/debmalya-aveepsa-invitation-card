"use client";

import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";
import { usePinnedScene } from "@/hooks/usePinnedScene";
import { MOTION } from "@/lib/animation-config";
import { gsap, registerGsap } from "@/lib/gsap";

type UseFinalSceneAnimationOptions = {
  sectionRef: RefObject<HTMLElement | null>;
  enabled: boolean;
  reducedMotion: boolean;
};

/**
 * Scene 06 — photograph unveil → families meet → card rises → blessing → replay.
 */
export function useFinalSceneAnimation({
  sectionRef,
  enabled,
  reducedMotion,
}: UseFinalSceneAnimationOptions) {
  useGSAP(
    () => {
      if (!enabled || !sectionRef.current) return;
      registerGsap();

      const blur = reducedMotion ? "none" : "blur(5px)";

      if (reducedMotion) {
        gsap.set(".rx-glow", { autoAlpha: 0.5, scale: 1 });
        gsap.set(".rx-photo-mask", { clipPath: "inset(0% 0% 0% 0%)" });
        gsap.set(".rx-photo", { scale: 1 });
        gsap.set(".rx-frame-path", { strokeDashoffset: 0 });
        gsap.set(".rx-frame-sweep", { autoAlpha: 0 });
        gsap.set(".rx-family-left, .rx-family-right", { autoAlpha: 1, x: 0 });
        gsap.set(".rx-family-ornament", { autoAlpha: 1, scale: 1 });
        gsap.set(".rx-family-divider", { scaleX: 1, autoAlpha: 1 });
        gsap.set(".rx-card", {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          boxShadow: "0 12px 28px rgba(0,0,0,0.28)",
        });
        gsap.set(".rx-card-border", { autoAlpha: 1 });
        gsap.set(".rx-lotus", { autoAlpha: 1, scale: 1 });
        gsap.set(".rx-heading", {
          autoAlpha: 1,
          y: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          filter: "none",
        });
        gsap.set(".rx-subtitle-word", { autoAlpha: 1, y: 0 });
        gsap.set(".rx-blessing-phrase", { autoAlpha: 1, y: 0 });
        gsap.set(".rx-attr", { autoAlpha: 1, y: 0 });
        gsap.set(".rx-signature", { autoAlpha: 1, y: 0, filter: "none" });
        gsap.set(".rx-shimmer", { autoAlpha: 0 });
        return;
      }

      gsap.set(".rx-glow", { autoAlpha: 0.2, scale: 0.92 });
      gsap.set(".rx-photo-mask", {
        clipPath: "inset(100% 0% 0% 0%)",
      });
      gsap.set(".rx-photo", {
        scale: 1.25,
        transformOrigin: "50% 35%",
      });
      gsap.set(".rx-frame-path", { strokeDashoffset: 1 });
      gsap.set(".rx-frame-sweep", {
        autoAlpha: 0,
        xPercent: -120,
      });

      gsap.set(".rx-family-left", { autoAlpha: 0, x: -28 });
      gsap.set(".rx-family-right", { autoAlpha: 0, x: 28 });
      gsap.set(".rx-family-ornament", { autoAlpha: 0, scale: 0.6 });
      gsap.set(".rx-family-divider", { scaleX: 0, autoAlpha: 0 });

      gsap.set(".rx-card", {
        autoAlpha: 0,
        y: 90,
        scale: 0.94,
        boxShadow: "0 0 0 rgba(0,0,0,0)",
      });
      gsap.set(".rx-card-border", { autoAlpha: 0 });

      gsap.set(".rx-lotus", { autoAlpha: 0, scale: 0.55 });
      gsap.set(".rx-heading", {
        autoAlpha: 0,
        y: 14,
        clipPath: "inset(100% 0% 0% 0%)",
        filter: blur,
      });
      gsap.set(".rx-subtitle-word", { autoAlpha: 0, y: 8 });
      gsap.set(".rx-blessing-phrase", { autoAlpha: 0, y: 10 });
      gsap.set(".rx-attr", { autoAlpha: 0, y: 10 });
      gsap.set(".rx-signature", {
        autoAlpha: 0,
        y: 10,
        filter: blur,
      });
      gsap.set(".rx-shimmer", {
        autoAlpha: 0,
        xPercent: -120,
      });
    },
    {
      scope: sectionRef,
      dependencies: [enabled, reducedMotion],
      revertOnUpdate: true,
    },
  );

  /* Static / non-cinematic: keep settled. */
  useGSAP(
    () => {
      if (enabled || !sectionRef.current) return;
      registerGsap();
      gsap.set(".rx-glow", { autoAlpha: 0.5 });
      gsap.set(".rx-photo-mask", { clipPath: "inset(0% 0% 0% 0%)" });
      gsap.set(".rx-photo", { scale: 1 });
      gsap.set(".rx-frame-path", { strokeDashoffset: 0 });
      gsap.set(".rx-family-left, .rx-family-right", { autoAlpha: 1, x: 0 });
      gsap.set(".rx-family-ornament", { autoAlpha: 1, scale: 1 });
      gsap.set(".rx-family-divider", { scaleX: 1, autoAlpha: 1 });
      gsap.set(".rx-card", {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        boxShadow: "0 12px 28px rgba(0,0,0,0.28)",
      });
      gsap.set(".rx-card-border", { autoAlpha: 1 });
      gsap.set(
        ".rx-lotus, .rx-heading, .rx-subtitle-word, .rx-blessing-phrase, .rx-attr, .rx-signature",
        {
          autoAlpha: 1,
          y: 0,
          x: 0,
          scale: 1,
          filter: "none",
          clipPath: "none",
        },
      );
    },
    {
      scope: sectionRef,
      dependencies: [enabled],
      revertOnUpdate: true,
    },
  );

  usePinnedScene({
    sectionRef,
    sceneId: "final-scene",
    enabled,
    scrub: 0.8,
    build: (timeline) => {
      if (reducedMotion) {
        timeline.to(".rx-glow", { duration: 1 });
        return;
      }

      const clearBlur = { filter: "blur(0px)" };

      timeline
        /* 0–20% Photograph unveil */
        .to(
          ".rx-glow",
          {
            autoAlpha: 0.55,
            scale: 1,
            duration: 0.18,
            ease: MOTION.easeScrub,
          },
          0,
        )
        .to(
          ".rx-photo-mask",
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.2,
            ease: MOTION.easeScrub,
          },
          0,
        )
        .to(
          ".rx-photo",
          {
            scale: 1,
            duration: 0.2,
            ease: MOTION.easeScrub,
          },
          0,
        )
        .to(
          ".rx-frame-path",
          {
            strokeDashoffset: 0,
            stagger: 0.02,
            duration: 0.16,
            ease: MOTION.easeScrub,
          },
          0.06,
        )
        .to(
          ".rx-frame-sweep",
          {
            autoAlpha: 0.55,
            xPercent: 120,
            duration: 0.12,
            ease: MOTION.easeScrub,
          },
          0.1,
        )
        .to(
          ".rx-frame-sweep",
          { autoAlpha: 0, duration: 0.04, ease: MOTION.easeScrub },
          0.18,
        )

        /* 20–35% Families meet */
        .to(
          ".rx-family-left",
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.1,
            ease: MOTION.easeScrub,
          },
          0.2,
        )
        .to(
          ".rx-family-right",
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.1,
            ease: MOTION.easeScrub,
          },
          0.2,
        )
        .to(
          ".rx-family-ornament",
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.08,
            ease: MOTION.easeScrub,
          },
          0.26,
        )
        .to(
          ".rx-family-divider",
          {
            scaleX: 1,
            autoAlpha: 1,
            duration: 0.08,
            ease: MOTION.easeScrub,
          },
          0.28,
        )

        /* 35–50% Card entrance */
        .to(
          ".rx-card",
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            boxShadow: "0 12px 28px rgba(0,0,0,0.28)",
            duration: 0.14,
            ease: MOTION.easeScrub,
          },
          0.35,
        )
        .to(
          ".rx-card-border",
          {
            autoAlpha: 1,
            duration: 0.1,
            ease: MOTION.easeScrub,
          },
          0.4,
        )

        /* 50–75% Heading + blessing */
        .to(
          ".rx-lotus",
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.08,
            ease: MOTION.easeScrub,
          },
          0.5,
        )
        .to(
          ".rx-heading",
          {
            autoAlpha: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            ...clearBlur,
            duration: 0.1,
            ease: MOTION.easeScrub,
          },
          0.54,
        )
        .to(
          ".rx-subtitle-word",
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.02,
            duration: 0.08,
            ease: MOTION.easeScrub,
          },
          0.6,
        )
        .to(
          ".rx-blessing-phrase",
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.03,
            duration: 0.08,
            ease: MOTION.easeScrub,
          },
          0.66,
        )

        /* 75–90% Attribution + signature */
        .to(
          ".rx-attr",
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.02,
            duration: 0.08,
            ease: MOTION.easeScrub,
          },
          0.75,
        )
        .to(
          ".rx-signature",
          {
            autoAlpha: 1,
            y: 0,
            ...clearBlur,
            duration: 0.08,
            ease: MOTION.easeScrub,
          },
          0.82,
        )
        .to(
          ".rx-shimmer",
          {
            autoAlpha: 0.45,
            xPercent: 120,
            duration: 0.08,
            ease: MOTION.easeScrub,
          },
          0.84,
        )
        .to(
          ".rx-shimmer",
          { autoAlpha: 0, duration: 0.03, ease: MOTION.easeScrub },
          0.9,
        )

        /* 90–100% Soft settle before guest blessing */
        .to(
          ".rx-glow",
          {
            autoAlpha: 0.48,
            duration: 0.06,
            ease: MOTION.easeScrub,
          },
          0.92,
        );
    },
  });
}
