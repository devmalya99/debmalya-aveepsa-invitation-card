"use client";

import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";
import { usePinnedScene } from "@/hooks/usePinnedScene";
import { MOTION } from "@/lib/animation-config";
import { gsap, registerGsap } from "@/lib/gsap";

type UseWeddingEventsAnimationOptions = {
  sectionRef: RefObject<HTMLElement | null>;
  enabled: boolean;
  reducedMotion: boolean;
};

/**
 * Scene 05 master motion — initial states, pinned scrub choreography, mandala breathe.
 */
export function useWeddingEventsAnimation({
  sectionRef,
  enabled,
  reducedMotion,
}: UseWeddingEventsAnimationOptions) {
  useGSAP(
    () => {
      if (!enabled || !sectionRef.current) return;
      registerGsap();

      const blur = reducedMotion ? "none" : "blur(6px)";

      if (reducedMotion) {
        gsap.set(".events-atmosphere", { autoAlpha: 1 });
        gsap.set(".events-bg-mandala", { autoAlpha: 0.14, scale: 1, rotate: 0 });
        gsap.set(".events-mandala-glow", { autoAlpha: 0.55 });
        gsap.set(".events-mandala-sweep", { autoAlpha: 0 });
        gsap.set(".events-eyebrow", { autoAlpha: 1, y: 0, letterSpacing: "0.22em" });
        gsap.set(".events-ornament", { autoAlpha: 1 });
        gsap.set(".events-draw-path", { strokeDashoffset: 0 });
        gsap.set(".events-draw-fill", { opacity: 1 });
        gsap.set(".events-heading-bn-mask", { autoAlpha: 1 });
        gsap.set(".events-heading-bn", {
          autoAlpha: 1,
          y: 0,
          filter: "none",
          clipPath: "inset(0% 0% 0% 0%)",
        });
        gsap.set(".events-heading-en-word", { autoAlpha: 1, y: 0 });
        gsap.set(".events-subtitle", { autoAlpha: 1, y: 0 });
        gsap.set(".events-rail-line", { attr: { "stroke-dashoffset": 0 } });
        gsap.set(".events-rail-traveler", { autoAlpha: 0 });
        gsap.set(".event-medallion-wrap", { autoAlpha: 1, scale: 1 });
        gsap.set(".event-medallion-pulse", { autoAlpha: 0, scale: 1 });
        gsap.set(".event-line", { autoAlpha: 1, y: 0, filter: "none" });
        gsap.set(".event-0-underline, .event-1-underline", {
          scaleX: 1,
          autoAlpha: 1,
        });
        gsap.set(".events-center-bloom", { autoAlpha: 1, scale: 1 });
        gsap.set(".events-closing-rule", { scaleX: 1, autoAlpha: 1 });
        gsap.set(".events-closing-heart", { autoAlpha: 1, scale: 1 });
        gsap.set(".events-closing-sub", {
          autoAlpha: 1,
          y: 0,
          letterSpacing: "0.16em",
        });
        return;
      }

      gsap.set(".events-atmosphere", { autoAlpha: 1 });
      gsap.set(".events-mandala-spin", {
        rotate: 0,
        transformOrigin: "50% 50%",
      });
      gsap.set(".events-bg-mandala", {
        autoAlpha: 0,
        scale: 0.82,
        transformOrigin: "50% 50%",
      });
      gsap.set(".events-mandala-glow", { autoAlpha: 0, scale: 0.9 });
      gsap.set(".events-mandala-sweep", {
        autoAlpha: 0,
        xPercent: -120,
        rotate: 18,
      });

      gsap.set(".events-eyebrow", {
        autoAlpha: 0,
        y: 10,
        letterSpacing: "0.42em",
      });
      gsap.set(".events-ornament", { autoAlpha: 0 });
      gsap.set(".events-draw-path", { strokeDashoffset: 1 });
      gsap.set(".events-draw-fill", { opacity: 0 });
      gsap.set(".events-heading-bn", {
        autoAlpha: 0,
        y: 16,
        filter: blur,
        clipPath: "inset(100% 0% 0% 0%)",
      });
      gsap.set(".events-heading-en-word", { autoAlpha: 0, y: 10 });
      gsap.set(".events-subtitle", { autoAlpha: 0, y: 8 });

      gsap.set(".events-rail-line", { attr: { "stroke-dashoffset": 1 } });
      gsap.set(".events-rail-traveler", {
        autoAlpha: 0,
        y: 0,
        scale: 0.6,
      });
      gsap.set(".event-medallion-wrap", { autoAlpha: 0, scale: 0.55 });
      gsap.set(".event-medallion-pulse", { autoAlpha: 0, scale: 0.7 });
      gsap.set(".event-line", { autoAlpha: 0, y: 12, filter: blur });
      gsap.set(".event-0-underline, .event-1-underline", {
        scaleX: 0,
        autoAlpha: 0,
      });
      gsap.set(".events-center-bloom", { autoAlpha: 0, scale: 0.7 });
      gsap.set(".events-closing-rule", { scaleX: 0, autoAlpha: 0 });
      gsap.set(".events-closing-heart", { autoAlpha: 0, scale: 0.5 });
      gsap.set(".events-closing-sub", {
        autoAlpha: 0,
        y: 8,
        letterSpacing: "0.36em",
      });
    },
    {
      scope: sectionRef,
      dependencies: [enabled, reducedMotion],
      revertOnUpdate: true,
    },
  );

  /* Ultra-slow rotate on wrapper; soft breathe on artwork — no property fights. */
  useGSAP(
    () => {
      if (!enabled || reducedMotion || !sectionRef.current) return;
      registerGsap();

      const rotate = gsap.to(".events-mandala-spin", {
        rotate: 360,
        duration: 110,
        repeat: -1,
        ease: "none",
        paused: true,
        transformOrigin: "50% 50%",
      });

      const breathe = gsap.to(".events-mandala-breathe", {
        scale: 1.025,
        duration: 4.8,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        paused: true,
        transformOrigin: "50% 50%",
      });

      const glowBreathe = gsap.to(".events-mandala-glow", {
        autoAlpha: 0.42,
        scale: 1.04,
        duration: 5.2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        paused: true,
      });

      const trigger = sectionRef.current;
      const onEnter = () => {
        rotate.play();
        breathe.play();
        glowBreathe.play();
      };
      const onLeave = () => {
        rotate.pause();
        breathe.pause();
        glowBreathe.pause();
      };

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) onEnter();
            else onLeave();
          });
        },
        { threshold: 0.2 },
      );
      observer.observe(trigger);

      const onVisibility = () => {
        if (document.hidden) {
          rotate.pause();
          breathe.pause();
          glowBreathe.pause();
        } else if (trigger.getBoundingClientRect().top < window.innerHeight) {
          onEnter();
        }
      };
      document.addEventListener("visibilitychange", onVisibility);

      return () => {
        observer.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
        rotate.kill();
        breathe.kill();
        glowBreathe.kill();
      };
    },
    {
      scope: sectionRef,
      dependencies: [enabled, reducedMotion],
      revertOnUpdate: true,
    },
  );

  /* Non-cinematic / static: keep draw paths and copy fully visible. */
  useGSAP(
    () => {
      if (enabled || !sectionRef.current) return;
      registerGsap();
      gsap.set(".events-bg-mandala", { autoAlpha: 0.14, scale: 1 });
      gsap.set(".events-mandala-glow", { autoAlpha: 0.4 });
      gsap.set(".events-draw-path", { strokeDashoffset: 0 });
      gsap.set(".events-draw-fill", { opacity: 1 });
      gsap.set(".events-rail-line", { attr: { "stroke-dashoffset": 0 } });
      gsap.set(".events-rail-traveler", { autoAlpha: 0 });
      gsap.set(".event-medallion-wrap", { autoAlpha: 1, scale: 1 });
      gsap.set(".event-line", { autoAlpha: 1, y: 0, filter: "none" });
      gsap.set(".event-0-underline, .event-1-underline", {
        scaleX: 1,
        autoAlpha: 1,
      });
      gsap.set(".events-center-bloom", { autoAlpha: 1, scale: 1 });
      gsap.set(".events-closing-rule", { scaleX: 1, autoAlpha: 1 });
      gsap.set(".events-closing-heart", { autoAlpha: 1, scale: 1 });
      gsap.set(".events-closing-sub", { autoAlpha: 1, y: 0 });
      gsap.set(".events-eyebrow, .events-ornament, .events-heading-bn, .events-heading-en-word, .events-subtitle", {
        autoAlpha: 1,
        y: 0,
        filter: "none",
        clipPath: "none",
      });
    },
    {
      scope: sectionRef,
      dependencies: [enabled],
      revertOnUpdate: true,
    },
  );

  usePinnedScene({
    sectionRef,
    sceneId: "wedding-events",
    enabled,
    build: (timeline) => {
      if (reducedMotion) {
        /* Settled state already applied — keep a tiny scrub so pin still works. */
        timeline.to(".events-bg-mandala", { duration: 1 });
        return;
      }

      const clearBlur = { filter: "blur(0px)" };

      timeline
        /* 0–15% Mandala awaken */
        .to(
          ".events-mandala-glow",
          { autoAlpha: 0.55, scale: 1, duration: 0.12, ease: MOTION.easeScrub },
          0,
        )
        .to(
          ".events-bg-mandala",
          {
            autoAlpha: 0.14,
            scale: 1,
            duration: 0.15,
            ease: MOTION.easeScrub,
          },
          0.02,
        )
        .to(
          ".events-mandala-sweep",
          {
            autoAlpha: 0.45,
            xPercent: 120,
            duration: 0.12,
            ease: MOTION.easeScrub,
          },
          0.08,
        )
        .to(
          ".events-mandala-sweep",
          { autoAlpha: 0, duration: 0.04, ease: MOTION.easeScrub },
          0.14,
        )

        /* 15–30% Headings */
        .to(
          ".events-eyebrow",
          {
            autoAlpha: 1,
            y: 0,
            letterSpacing: "0.22em",
            duration: 0.1,
            ease: MOTION.easeScrub,
          },
          0.15,
        )
        .to(
          ".events-ornament",
          { autoAlpha: 1, duration: 0.04, ease: MOTION.easeScrub },
          0.18,
        )
        .to(
          ".events-ornament .events-draw-path",
          {
            strokeDashoffset: 0,
            stagger: 0.015,
            duration: 0.1,
            ease: MOTION.easeScrub,
          },
          0.18,
        )
        .to(
          ".events-ornament .events-draw-fill",
          { opacity: 1, duration: 0.05, ease: MOTION.easeScrub },
          0.24,
        )
        .to(
          ".events-heading-bn",
          {
            autoAlpha: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            ...clearBlur,
            duration: 0.1,
            ease: MOTION.easeScrub,
          },
          0.2,
        )
        .to(
          ".events-heading-en-word",
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.02,
            duration: 0.08,
            ease: MOTION.easeScrub,
          },
          0.24,
        )
        .to(
          ".events-subtitle",
          { autoAlpha: 1, y: 0, duration: 0.06, ease: MOTION.easeScrub },
          0.28,
        )

        /* 30–45% Timeline draw + first marker */
        .to(
          ".events-rail-line",
          {
            attr: { "stroke-dashoffset": 0.55 },
            duration: 0.1,
            ease: MOTION.easeScrub,
          },
          0.3,
        )
        .to(
          ".event-medallion-wrap-0",
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.08,
            ease: MOTION.easeScrub,
          },
          0.32,
        )
        .to(
          ".event-medallion-wrap-0 .events-draw-path",
          {
            strokeDashoffset: 0,
            stagger: 0.01,
            duration: 0.08,
            ease: MOTION.easeScrub,
          },
          0.33,
        )
        .to(
          ".event-medallion-pulse-0",
          {
            autoAlpha: 0.55,
            scale: 1.35,
            duration: 0.08,
            ease: MOTION.easeScrub,
          },
          0.34,
        )
        .to(
          ".event-medallion-pulse-0",
          {
            autoAlpha: 0,
            scale: 1.55,
            duration: 0.06,
            ease: MOTION.easeScrub,
          },
          0.4,
        )
        .to(
          ".events-rail-traveler",
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.04,
            ease: MOTION.easeScrub,
          },
          0.34,
        )
        .to(
          ".events-rail-traveler",
          {
            y: 72,
            duration: 0.1,
            ease: MOTION.easeScrub,
          },
          0.36,
        )

        /* 45–65% Event one content */
        .to(
          ".event-0-eyebrow",
          {
            autoAlpha: 1,
            y: 0,
            ...clearBlur,
            duration: 0.05,
            ease: MOTION.easeScrub,
          },
          0.45,
        )
        .to(
          ".event-0-title",
          {
            autoAlpha: 1,
            y: 0,
            ...clearBlur,
            duration: 0.05,
            ease: MOTION.easeScrub,
          },
          0.48,
        )
        .to(
          ".event-0-bn-date",
          {
            autoAlpha: 1,
            y: 0,
            ...clearBlur,
            duration: 0.045,
            ease: MOTION.easeScrub,
          },
          0.51,
        )
        .to(
          ".event-0-underline",
          {
            scaleX: 1,
            autoAlpha: 1,
            duration: 0.04,
            ease: MOTION.easeScrub,
          },
          0.54,
        )
        .to(
          ".event-0-en-date",
          {
            autoAlpha: 1,
            y: 0,
            ...clearBlur,
            duration: 0.045,
            ease: MOTION.easeScrub,
          },
          0.56,
        )
        .to(
          ".event-0-meta",
          {
            autoAlpha: 1,
            y: 0,
            ...clearBlur,
            duration: 0.045,
            ease: MOTION.easeScrub,
          },
          0.59,
        )
        .to(
          ".events-rail-line",
          {
            attr: { "stroke-dashoffset": 0.28 },
            duration: 0.08,
            ease: MOTION.easeScrub,
          },
          0.58,
        )
        .to(
          ".events-rail-traveler",
          {
            y: 118,
            duration: 0.08,
            ease: MOTION.easeScrub,
          },
          0.58,
        )

        /* 65–80% Center bloom + second marker + reception heading */
        .to(
          ".events-center-bloom",
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.07,
            ease: MOTION.easeScrub,
          },
          0.65,
        )
        .to(
          ".events-rail-line",
          {
            attr: { "stroke-dashoffset": 0 },
            duration: 0.08,
            ease: MOTION.easeScrub,
          },
          0.68,
        )
        .to(
          ".events-rail-traveler",
          {
            y: 200,
            duration: 0.08,
            ease: MOTION.easeScrub,
          },
          0.68,
        )
        .to(
          ".event-medallion-wrap-1",
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.07,
            ease: MOTION.easeScrub,
          },
          0.7,
        )
        .to(
          ".event-medallion-wrap-1 .events-draw-path",
          {
            strokeDashoffset: 0,
            stagger: 0.01,
            duration: 0.07,
            ease: MOTION.easeScrub,
          },
          0.71,
        )
        .to(
          ".event-medallion-pulse-1",
          {
            autoAlpha: 0.5,
            scale: 1.35,
            duration: 0.07,
            ease: MOTION.easeScrub,
          },
          0.72,
        )
        .to(
          ".event-medallion-pulse-1",
          {
            autoAlpha: 0,
            scale: 1.55,
            duration: 0.05,
            ease: MOTION.easeScrub,
          },
          0.77,
        )
        .to(
          ".event-1-eyebrow",
          {
            autoAlpha: 1,
            y: 0,
            ...clearBlur,
            duration: 0.05,
            ease: MOTION.easeScrub,
          },
          0.73,
        )
        .to(
          ".event-1-title",
          {
            autoAlpha: 1,
            y: 0,
            ...clearBlur,
            duration: 0.05,
            ease: MOTION.easeScrub,
          },
          0.76,
        )

        /* 80–95% Reception dates */
        .to(
          ".event-1-bn-date",
          {
            autoAlpha: 1,
            y: 0,
            ...clearBlur,
            duration: 0.04,
            ease: MOTION.easeScrub,
          },
          0.8,
        )
        .to(
          ".event-1-underline",
          {
            scaleX: 1,
            autoAlpha: 1,
            duration: 0.04,
            ease: MOTION.easeScrub,
          },
          0.83,
        )
        .to(
          ".event-1-en-date",
          {
            autoAlpha: 1,
            y: 0,
            ...clearBlur,
            duration: 0.04,
            ease: MOTION.easeScrub,
          },
          0.86,
        )
        .to(
          ".event-1-meta",
          {
            autoAlpha: 1,
            y: 0,
            ...clearBlur,
            duration: 0.04,
            ease: MOTION.easeScrub,
          },
          0.89,
        )
        .to(
          ".events-rail-traveler",
          { autoAlpha: 0, duration: 0.04, ease: MOTION.easeScrub },
          0.9,
        )

        /* 95–100% Blessing */
        .to(
          ".events-closing-rule",
          {
            scaleX: 1,
            autoAlpha: 1,
            duration: 0.04,
            ease: MOTION.easeScrub,
          },
          0.94,
        )
        .to(
          ".events-closing-heart",
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.03,
            ease: MOTION.easeScrub,
          },
          0.96,
        )
        .to(
          ".events-closing-sub",
          {
            autoAlpha: 1,
            y: 0,
            letterSpacing: "0.16em",
            duration: 0.04,
            ease: MOTION.easeScrub,
          },
          0.97,
        );
    },
  });
}
