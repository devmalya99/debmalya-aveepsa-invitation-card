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
import { FestivitiesCard } from "@/components/scenes/FestivitiesCard";
import { OpeningCoupleCard } from "@/components/scenes/OpeningCoupleCard";
import { UnionFamiliesCard } from "@/components/scenes/UnionFamiliesCard";
import { assets } from "@/data/assets";
import { useLanguage } from "@/hooks/useLanguage";
import { useOpeningBeat } from "@/hooks/useOpeningBeat";
import { useOpeningLayerSwipe } from "@/hooks/useOpeningLayerSwipe";
import { usePinnedScene } from "@/hooks/usePinnedScene";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollModeContext } from "@/hooks/useScrollModeContext";
import { MOTION } from "@/lib/animation-config";
import { gsap, registerGsap } from "@/lib/gsap";

const LAYER_EASE = [0.22, 1, 0.36, 1] as const;

const LAYER_MOTION = {
  couple: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, y: -20 },
  },
  families: {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -24 },
  },
  festivities: {
    initial: { opacity: 0, scale: 0.985 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, y: -28 },
  },
} as const;

/**
 * Opening canvas — one pin, shared atmosphere.
 * Beats: royal cover → families → festivities.
 */
export function GrandReveal() {
  const { locale } = useLanguage();
  const { cinematic } = useScrollModeContext();
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const entrancePlayedRef = useRef(false);
  const { beat, onPinProgress, goNext, goPrev } = useOpeningBeat();
  const isBengali = locale === "bn";
  const showAmbient = beat !== "couple";

  useOpeningLayerSwipe(layerRef, {
    enabled: !reducedMotion,
    onNext: goNext,
    onPrev: goPrev,
  });

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      registerGsap();

      const showSettled = () => {
        gsap.set(
          [
            ".reveal-atmosphere",
            ".reveal-mandala-wrap",
            ".reveal-mandala-art",
            ".reveal-particles",
            ".reveal-petals",
            ".reveal-birds",
            ".reveal-lotus",
            ".reveal-mandala-center",
          ],
          { autoAlpha: 1, clearProps: "y,scale,rotate" },
        );
        gsap.set(".reveal-draw-path, .reveal-mandala-path", {
          strokeDashoffset: 0,
        });
        gsap.set(".reveal-mandala-art", { autoAlpha: 0.22 });
        gsap.set(".reveal-lotus", { autoAlpha: 0.55 });
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

      gsap.set(".reveal-atmosphere", { autoAlpha: 0.7 });
      gsap.set(".reveal-mandala-wrap", {
        autoAlpha: 0.45,
        scale: 0.96,
        rotate: -2,
      });
      gsap.set(".reveal-mandala-art", { autoAlpha: 0.08 });
      gsap.set(".reveal-particles", { autoAlpha: 0 });
      gsap.set(".reveal-petals", { autoAlpha: 0 });
      gsap.set(".reveal-birds", { autoAlpha: 0 });
      gsap.set(".reveal-lotus", { autoAlpha: 0.15 });
      gsap.set(".reveal-mandala-path", { strokeDashoffset: 0.35 });
      gsap.set(".reveal-mandala-center", { autoAlpha: 0.25 });

      const entrance = gsap.timeline({
        defaults: { ease: MOTION.easeTextIn },
      });

      entrance
        .to(".reveal-atmosphere", { autoAlpha: 1, duration: 0.55 }, 0)
        .to(
          ".reveal-mandala-wrap",
          {
            autoAlpha: 1,
            scale: 1,
            rotate: 0,
            duration: 0.7,
            ease: MOTION.easeSoft,
          },
          0.05,
        )
        .to(
          ".reveal-mandala-art",
          { autoAlpha: 0.22, duration: 0.55, ease: MOTION.easeSoft },
          0.1,
        )
        .to(
          ".reveal-mandala-path",
          {
            strokeDashoffset: 0,
            stagger: 0.02,
            duration: 0.7,
            ease: MOTION.easeSoft,
          },
          0.08,
        )
        .to(".reveal-mandala-center", { autoAlpha: 0.7, duration: 0.4 }, 0.2)
        .to(
          ".reveal-lotus",
          { autoAlpha: 0.55, stagger: 0.05, duration: 0.45 },
          0.15,
        )
        .to(".reveal-particles", { autoAlpha: 1, duration: 0.5 }, 0.25)
        .to(".reveal-birds", { autoAlpha: 1, duration: 0.55 }, 0.55)
        .to(".reveal-petals", { autoAlpha: 1, duration: 0.5 }, 0.75);
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
    fastScrollEnd: false,
    build: (timeline) => {
      timeline
        .fromTo(
          ".reveal-parallax-bg",
          { y: 0, scale: 1 },
          { y: -16, scale: 1.025, duration: 4, ease: MOTION.easeScrub },
          0,
        )
        .to({}, { duration: 4 }, 0);
    },
  });

  const activeBeat = beat;
  const motionOff = reducedMotion;

  return (
    <SceneWrapper
      ref={sectionRef}
      id="grand-reveal"
      tone="ivory"
      className="overflow-hidden"
      innerClassName="!max-w-none max-w-none px-0 pt-0 pb-0 sm:max-w-none"
    >
      <div className="reveal-atmosphere pointer-events-none absolute inset-0">
        {/* Opaque base so venue never shows through family/festivity layers. */}
        <div className="absolute inset-0" style={{ backgroundColor: "#f6ebd6" }} />
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: showAmbient ? 1 : 0 }}
          aria-hidden={!showAmbient}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_28%,rgba(255,248,236,0.92)_0%,rgba(246,235,215,0.55)_48%,rgba(246,235,214,0.92)_100%)]" />
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
      </div>

      <div
        ref={layerRef}
        className="relative z-10 h-full min-h-0 w-full"
        style={{ touchAction: "pan-y" }}
        role="group"
        aria-roledescription="carousel"
        aria-label={
          isBengali ? "বিবাহের আমন্ত্রণ স্তর" : "Wedding invitation layers"
        }
      >
        <AnimatePresence mode="sync" initial={false}>
          {activeBeat === "couple" ? (
            <motion.div
              key="opening-couple"
              className="absolute inset-0"
              initial={motionOff ? false : LAYER_MOTION.couple.initial}
              animate={LAYER_MOTION.couple.animate}
              exit={motionOff ? undefined : LAYER_MOTION.couple.exit}
              transition={{ duration: 0.4, ease: LAYER_EASE }}
            >
              <OpeningCoupleCard />
            </motion.div>
          ) : null}

          {activeBeat === "families" ? (
            <motion.div
              key="opening-families"
              className="absolute inset-0 overflow-hidden"
              style={{ backgroundColor: "#f6ebd6" }}
              initial={motionOff ? false : LAYER_MOTION.families.initial}
              animate={LAYER_MOTION.families.animate}
              exit={motionOff ? undefined : LAYER_MOTION.families.exit}
              transition={{ duration: 0.5, ease: LAYER_EASE }}
            >
              {/* Full-bleed like the cover — no nested scroll, no letterbox margins. */}
              <UnionFamiliesCard className="h-full w-full" />
            </motion.div>
          ) : null}

          {activeBeat === "festivities" ? (
            <motion.div
              key="opening-festivities"
              className="absolute inset-0 flex items-center justify-center px-4 pt-[max(4.25rem,calc(env(safe-area-inset-top)+3.25rem))] pb-6"
              style={{ backgroundColor: "#f6ebd6" }}
              initial={motionOff ? false : LAYER_MOTION.festivities.initial}
              animate={LAYER_MOTION.festivities.animate}
              exit={motionOff ? undefined : LAYER_MOTION.festivities.exit}
              transition={{ duration: 0.7, ease: LAYER_EASE }}
            >
              <FestivitiesCard />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <span className="sr-only">
        {isBengali
          ? "সোয়াইপ করে পরবর্তী স্তরে যান"
          : "Swipe to move between invitation layers"}
      </span>
    </SceneWrapper>
  );
}
