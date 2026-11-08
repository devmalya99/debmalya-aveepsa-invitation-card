"use client";

import Image from "next/image";
import { useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useGSAP } from "@gsap/react";
import { SceneWrapper } from "@/components/experience/SceneWrapper";
import {
  AlpanaMandala,
  CornerLotus,
  FlightOfBirds,
  FloatingPetals,
  GoldParticles,
} from "@/components/reveal/HeroOrnaments";
import { OpeningCoupleCard } from "@/components/scenes/OpeningCoupleCard";
import { UnionFamilyCard } from "@/components/scenes/UnionFamilyCard";
import { assets } from "@/data/assets";
import { useLanguage } from "@/hooks/useLanguage";
import { useOpeningBeat } from "@/hooks/useOpeningBeat";
import { usePinnedScene } from "@/hooks/usePinnedScene";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollModeContext } from "@/hooks/useScrollModeContext";
import { MOTION } from "@/lib/animation-config";
import { gsap, registerGsap } from "@/lib/gsap";

const LAYER_EASE = [0.22, 1, 0.36, 1] as const;

const LAYER_MOTION = {
  couple: {
    initial: { opacity: 0, y: 56, scale: 0.96, filter: "blur(0px)" },
    animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, y: -48, scale: 0.98, filter: "blur(4px)" },
  },
  groom: {
    initial: { opacity: 0, x: -80, rotate: -2.5, scale: 0.97 },
    animate: { opacity: 1, x: 0, rotate: 0, scale: 1 },
    exit: { opacity: 0, x: 64, rotate: 1.5, scale: 0.98 },
  },
  bride: {
    initial: { opacity: 0, x: 80, rotate: 2.5, scale: 0.97, filter: "blur(0px)" },
    animate: { opacity: 1, x: 0, rotate: 0, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, y: 52, scale: 0.97, filter: "blur(4px)" },
  },
} as const;

/**
 * Opening canvas — one pin, shared atmosphere.
 * Cards swap with Framer Motion from different directions.
 */
export function GrandReveal() {
  const { locale } = useLanguage();
  const { cinematic } = useScrollModeContext();
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const entrancePlayedRef = useRef(false);
  const { beat, onPinProgress } = useOpeningBeat();
  const isBengali = locale === "bn";

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      registerGsap();

      const settledTargets = [
        ".reveal-atmosphere",
        ".reveal-mandala-wrap",
        ".reveal-mandala",
        ".reveal-mandala-art",
        ".reveal-particles",
        ".reveal-petals",
        ".reveal-birds",
        ".reveal-lotus",
        ".reveal-heading-mask",
        ".reveal-kicker",
        ".reveal-portrait-stage",
        ".reveal-arch-frame",
        ".reveal-photo-reveal",
        ".reveal-photo",
        ".reveal-names-bn",
        ".reveal-names-en",
        ".reveal-date-plaque",
        ".reveal-date-bn",
        ".reveal-date-en",
        ".reveal-location",
        ".reveal-tagline",
        ".reveal-scene-fade",
        ".reveal-draw-path",
        ".reveal-mandala-center",
        ".reveal-frame-sweep",
        ".reveal-plaque-lotus",
      ];

      const showSettled = () => {
        gsap.set(settledTargets, {
          autoAlpha: 1,
          clearProps: "clipPath,y,scale,letterSpacing,filter",
        });
        gsap.set(".reveal-draw-path", { strokeDashoffset: 0 });
        gsap.set(".reveal-photo", { scale: 1 });
        gsap.set(".reveal-photo-reveal", {
          clipPath: "inset(0% 0% 0% 0%)",
        });
        gsap.set(".reveal-kicker", { y: "0%" });
        gsap.set(".reveal-names-bn", { y: "0%" });
        gsap.set(".reveal-names-en", { letterSpacing: "0.12em" });
        gsap.set(".reveal-frame-sweep", {
          autoAlpha: 0,
          strokeDashoffset: 1,
        });
        gsap.set(".reveal-arch-frame", { filter: "brightness(1)" });
      };

      if (reducedMotion || !cinematic) {
        showSettled();
        entrancePlayedRef.current = true;
        return;
      }

      if (entrancePlayedRef.current) {
        showSettled();
        return;
      }
      entrancePlayedRef.current = true;

      gsap.set(".reveal-atmosphere", { autoAlpha: 0.85 });
      gsap.set(".reveal-mandala-wrap", {
        autoAlpha: 0.7,
        scale: 0.97,
        rotate: -2,
      });
      gsap.set(".reveal-mandala-art", { autoAlpha: 0.12 });
      gsap.set(".reveal-particles", { autoAlpha: 0 });
      gsap.set(".reveal-petals", { autoAlpha: 0 });
      gsap.set(".reveal-birds", { autoAlpha: 0 });
      gsap.set(".reveal-lotus", { autoAlpha: 0.25 });
      gsap.set(".reveal-mandala-path", { strokeDashoffset: 0.25 });
      gsap.set(".reveal-mandala-center", { autoAlpha: 0.35 });
      gsap.set(".reveal-kicker", { y: "100%", autoAlpha: 1 });
      gsap.set(".reveal-heading-mask", { autoAlpha: 1 });
      gsap.set(".reveal-portrait-stage", { autoAlpha: 1 });
      gsap.set(".reveal-arch-frame", { autoAlpha: 1 });
      gsap.set(
        ".reveal-arch-outer, .reveal-arch-inner, .reveal-arch-base, .reveal-frame-lotus",
        { strokeDashoffset: 0 },
      );
      gsap.set(".reveal-photo-reveal", {
        clipPath: "inset(0% 0% 0% 0%)",
        autoAlpha: 1,
      });
      gsap.set(".reveal-photo", { scale: 1.06, autoAlpha: 1 });
      gsap.set(".reveal-frame-sweep", { autoAlpha: 0, strokeDashoffset: 1 });
      gsap.set(".reveal-names-bn-mask", { autoAlpha: 1 });
      gsap.set(".reveal-names-bn", { y: "100%", autoAlpha: 1 });
      gsap.set(".reveal-names-en", { autoAlpha: 0, letterSpacing: "0.2em" });
      gsap.set(".reveal-date-plaque", { autoAlpha: 1 });
      gsap.set(".reveal-plaque-border, .reveal-plaque-border-inner", {
        strokeDashoffset: 0,
      });
      gsap.set(".reveal-plaque-lotus", { autoAlpha: 0.55 });
      gsap.set(".reveal-date-bn", { autoAlpha: 0.7, y: 3 });
      gsap.set(".reveal-date-en", { autoAlpha: 0.6, y: 2 });
      gsap.set(".reveal-location", { autoAlpha: 0.4, y: 4 });
      gsap.set(".reveal-tagline", { autoAlpha: 0.35, y: 4 });
      gsap.set(".reveal-scene-fade", { autoAlpha: 1 });

      const T = 1.35;
      const entrance = gsap.timeline({
        defaults: { ease: MOTION.easeTextIn },
      });

      entrance
        .to(".reveal-atmosphere", { autoAlpha: 1, duration: T * 0.35 }, 0)
        .to(
          ".reveal-mandala-wrap",
          {
            autoAlpha: 1,
            scale: 1,
            rotate: 0,
            duration: T * 0.45,
            ease: MOTION.easeSoft,
          },
          0,
        )
        .to(
          ".reveal-mandala-art",
          { autoAlpha: 0.22, duration: T * 0.4, ease: MOTION.easeSoft },
          0.04,
        )
        .to(
          ".reveal-mandala-path",
          {
            strokeDashoffset: 0,
            stagger: 0.02,
            duration: T * 0.5,
            ease: MOTION.easeSoft,
          },
          0,
        )
        .to(".reveal-mandala-center", { autoAlpha: 0.7, duration: 0.35 }, 0.08)
        .to(
          ".reveal-lotus",
          { autoAlpha: 0.55, stagger: 0.04, duration: 0.4 },
          0.06,
        )
        .to(".reveal-particles", { autoAlpha: 1, duration: 0.4 }, 0.1)
        .to(
          ".reveal-photo",
          { scale: 1, duration: T * 0.55, ease: MOTION.easeOut },
          0,
        )
        .to(
          ".reveal-kicker",
          { y: "0%", duration: T * 0.32, ease: MOTION.easeOut },
          0.05,
        )
        .to(
          ".reveal-frame-sweep",
          {
            autoAlpha: 1,
            strokeDashoffset: 0,
            duration: 0.55,
            ease: "power1.inOut",
          },
          0.2,
        )
        .to(".reveal-frame-sweep", { autoAlpha: 0, duration: 0.3 }, 0.55)
        .to(
          ".reveal-names-bn",
          { y: "0%", duration: T * 0.3, ease: MOTION.easeOut },
          0.18,
        )
        .to(
          ".reveal-names-en",
          {
            autoAlpha: 1,
            letterSpacing: "0.12em",
            duration: T * 0.28,
            ease: MOTION.easeSoft,
          },
          0.28,
        )
        .to(".reveal-plaque-lotus", { autoAlpha: 0.85, duration: 0.3 }, 0.4)
        .to(".reveal-date-bn", { autoAlpha: 1, y: 0, duration: 0.35 }, 0.38)
        .to(".reveal-date-en", { autoAlpha: 1, y: 0, duration: 0.32 }, 0.44)
        .to(".reveal-location", { autoAlpha: 1, y: 0, duration: 0.35 }, 0.5)
        .to(".reveal-tagline", { autoAlpha: 1, y: 0, duration: 0.4 }, 0.58)
        .to(".reveal-birds", { autoAlpha: 1, duration: 0.45 }, 0.45)
        .to(".reveal-petals", { autoAlpha: 1, duration: 0.4 }, 0.65);
    },
    {
      scope: sectionRef,
      dependencies: [cinematic, reducedMotion],
      revertOnUpdate: false,
    },
  );

  usePinnedScene({
    sectionRef,
    sceneId: "grand-reveal",
    enabled: cinematic,
    onProgress: onPinProgress,
    build: (timeline) => {
      /* Pin spacer only — card swaps are Framer Motion, not scrub fades. */
      timeline
        .fromTo(
          ".reveal-parallax-bg",
          { y: 0, scale: 1 },
          { y: -14, scale: 1.02, duration: 3, ease: MOTION.easeScrub },
          0,
        )
        .to({}, { duration: 3 }, 0);
    },
  });

  const activeBeat = cinematic ? beat : "couple";
  const motionOff = reducedMotion;

  return (
    <SceneWrapper
      ref={sectionRef}
      id="grand-reveal"
      tone="ivory"
      className="overflow-hidden"
      innerClassName="max-w-[26rem] justify-center sm:max-w-lg"
    >
      <div className="reveal-atmosphere pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_28%,rgba(255,248,236,0.92)_0%,rgba(246,235,215,0.42)_48%,transparent_74%)]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="reveal-parallax-bg reveal-mandala-wrap absolute top-[max(4.35rem,calc(env(safe-area-inset-top)+3.15rem))] left-1/2 h-[min(42vw,11.5rem)] w-[min(42vw,11.5rem)] -translate-x-1/2">
          <div
            className="relative h-full w-full overflow-hidden rounded-full"
            style={{
              maskImage:
                "radial-gradient(circle, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.18) 46%, transparent 70%)",
              WebkitMaskImage:
                "radial-gradient(circle, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.18) 46%, transparent 70%)",
            }}
          >
            <Image
              src={assets.decorations.headingMandala}
              alt=""
              fill
              className="reveal-mandala-art object-cover opacity-[0.28] [filter:sepia(0.4)_saturate(0.5)_brightness(1.18)]"
              sizes="200px"
            />
            <AlpanaMandala className="absolute inset-0 h-full w-full opacity-100" />
          </div>
        </div>

        <CornerLotus className="reveal-lotus absolute top-[max(5.1rem,calc(env(safe-area-inset-top)+3.8rem))] left-2.5 h-8 w-8 opacity-45 sm:left-4" />
        <CornerLotus className="reveal-lotus absolute top-[max(5.1rem,calc(env(safe-area-inset-top)+3.8rem))] right-2.5 h-8 w-8 rotate-90 opacity-45 sm:right-4" />
        <CornerLotus className="reveal-lotus absolute bottom-[8%] left-3 h-7 w-7 -rotate-90 opacity-30" />
        <CornerLotus className="reveal-lotus absolute right-3 bottom-[8%] h-7 w-7 rotate-180 opacity-30" />
        <GoldParticles />
        <FlightOfBirds />
        <FloatingPetals />
      </div>

      <div className="relative z-10 h-full min-h-0 w-full">
        <AnimatePresence mode="sync" initial={false}>
          {activeBeat === "couple" ? (
            <motion.div
              key="opening-couple"
              className="absolute inset-0 flex items-center justify-center"
              initial={motionOff ? false : LAYER_MOTION.couple.initial}
              animate={LAYER_MOTION.couple.animate}
              exit={motionOff ? undefined : LAYER_MOTION.couple.exit}
              transition={{ duration: 0.55, ease: LAYER_EASE }}
            >
              <OpeningCoupleCard />
            </motion.div>
          ) : null}

          {activeBeat === "groom" ? (
            <motion.div
              key="opening-groom"
              className="absolute inset-0 flex items-center justify-center"
              initial={motionOff ? false : LAYER_MOTION.groom.initial}
              animate={LAYER_MOTION.groom.animate}
              exit={motionOff ? undefined : LAYER_MOTION.groom.exit}
              transition={{ duration: 0.58, ease: LAYER_EASE }}
            >
              <UnionFamilyCard side="groom" />
            </motion.div>
          ) : null}

          {activeBeat === "bride" ? (
            <motion.div
              key="opening-bride"
              className="absolute inset-0 flex items-center justify-center"
              initial={motionOff ? false : LAYER_MOTION.bride.initial}
              animate={LAYER_MOTION.bride.animate}
              exit={motionOff ? undefined : LAYER_MOTION.bride.exit}
              transition={{ duration: 0.58, ease: LAYER_EASE }}
            >
              <UnionFamilyCard side="bride" />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <span className="sr-only">
        {isBengali ? "শুভ বিবাহ আমন্ত্রণ" : "Wedding invitation opening"}
      </span>
    </SceneWrapper>
  );
}
