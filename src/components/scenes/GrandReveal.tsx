"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { SceneWrapper } from "@/components/experience/SceneWrapper";
import {
  AlpanaMandala,
  CornerLotus,
  DateMedallion,
  FlightOfBirds,
  FloatingPetals,
  GoldParticles,
  PortraitArchFrame,
} from "@/components/reveal/HeroOrnaments";
import { UnionFamilyCard } from "@/components/scenes/UnionFamilyCard";
import { assets } from "@/data/assets";
import { useLanguage } from "@/hooks/useLanguage";
import { usePinnedScene } from "@/hooks/usePinnedScene";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollModeContext } from "@/hooks/useScrollModeContext";
import { MOTION } from "@/lib/animation-config";
import { gsap, registerGsap } from "@/lib/gsap";

/**
 * Opening canvas — one pin, three beats on the same atmosphere:
 * couple composition → groom family → bride family.
 * Birds / petals stay; only content layers swap.
 */
export function GrandReveal() {
  const { content, locale } = useLanguage();
  const { cinematic } = useScrollModeContext();
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const copy = content.grandReveal;
  const isBengali = locale === "bn";
  const entrancePlayedRef = useRef(false);

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

      /* Union layer starts hidden — scrub brings it in after the couple beat. */
      gsap.set(".opening-layer-union", { autoAlpha: 0, y: 18 });
      gsap.set(".union-glow", { autoAlpha: 0.35, scale: 0.85 });
      gsap.set(".union-mandala-mask", { clipPath: "circle(12% at 50% 50%)" });
      gsap.set(".union-mandala-art", { scale: 1.04, autoAlpha: 0.95 });
      gsap.set(".union-shimmer", { rotate: 0, autoAlpha: 0 });
      gsap.set(".union-caption, .union-caption-bn", { autoAlpha: 0, y: 8 });
      gsap.set(".union-family-groom, .union-family-bride", {
        autoAlpha: 0,
        y: 18,
      });
      gsap.set(".union-family-row", { autoAlpha: 0, y: 8 });
      gsap.set(".union-family-rule", { scaleX: 0 });
      gsap.set(".union-bridge", { autoAlpha: 0, scaleX: 0 });
      gsap.set(".union-finale", { autoAlpha: 0, y: 10 });
      gsap.set(".union-particle, .identity-border, .identity-corner", {
        autoAlpha: 1,
      });

      if (!reducedMotion) {
        gsap.to(".union-mandala-spin", {
          rotate: 360,
          duration: 80,
          repeat: -1,
          ease: "none",
          transformOrigin: "50% 50%",
        });
      }

      if (reducedMotion || !cinematic) {
        showSettled();
        gsap.set(".opening-layer-union", { autoAlpha: 1, y: 0 });
        gsap.set(".union-mandala-mask", { clipPath: "circle(50% at 50% 50%)" });
        gsap.set(".union-caption, .union-caption-bn", { autoAlpha: 1, y: 0 });
        gsap.set(".union-family-groom, .union-family-bride", {
          autoAlpha: 1,
          y: 0,
        });
        gsap.set(".union-family-row", { autoAlpha: 1, y: 0 });
        gsap.set(".union-family-rule", { scaleX: 1 });
        gsap.set(".union-finale", { autoAlpha: 1, y: 0 });
        entrancePlayedRef.current = true;
        return;
      }

      if (entrancePlayedRef.current) {
        showSettled();
        return;
      }
      entrancePlayedRef.current = true;

      /*
       * Keep the couple portrait on screen from frame one — a 4s staged hide
       * made Scene 01 look empty after the envelope opened. Polish around it.
       */
      gsap.set(".reveal-atmosphere", { autoAlpha: 0.85 });
      gsap.set(".reveal-mandala-wrap", { autoAlpha: 0.7, scale: 0.97, rotate: -2 });
      gsap.set(".reveal-mandala", { autoAlpha: 0.35 });
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
      /* Frame + photo already drawn — never leave a blank hole in the card. */
      gsap.set(
        ".reveal-arch-outer, .reveal-arch-inner, .reveal-arch-base, .reveal-frame-lotus",
        { strokeDashoffset: 0 },
      );
      gsap.set(".reveal-photo-reveal", {
        clipPath: "inset(0% 0% 0% 0%)",
        autoAlpha: 1,
      });
      gsap.set(".reveal-photo", { scale: 1.06, autoAlpha: 1 });
      gsap.set(".reveal-frame-sweep", {
        autoAlpha: 0,
        strokeDashoffset: 1,
      });

      gsap.set(".reveal-names-bn-mask", { autoAlpha: 1 });
      gsap.set(".reveal-names-bn", { y: "100%", autoAlpha: 1 });
      gsap.set(".reveal-names-en", {
        autoAlpha: 0,
        letterSpacing: "0.2em",
      });

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
        .to(
          ".reveal-plaque-border, .reveal-plaque-border-inner",
          {
            strokeDashoffset: 0,
            duration: T * 0.28,
            stagger: 0.04,
            ease: MOTION.easeSoft,
          },
          0.32,
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
    build: (timeline) => {
      /*
       * Shared atmosphere (birds/petals) never leaves.
       * Timeline spans ~3 units → progress thirds:
       * couple 0–⅓ | groom ⅓–⅔ | bride ⅔–1.
       */
      timeline
        /* ── Beat A (0–1): hold couple ── */
        .fromTo(
          ".reveal-parallax-bg",
          { y: 0, scale: 1 },
          { y: -10, scale: 1.015, duration: 1, ease: MOTION.easeScrub },
          0,
        )
        .fromTo(
          ".reveal-parallax-photo",
          { y: 0 },
          { y: 6, duration: 1, ease: MOTION.easeScrub },
          0,
        )
        .to(
          ".opening-layer-couple",
          {
            autoAlpha: 0,
            y: -14,
            duration: 0.28,
            ease: MOTION.easeScrub,
          },
          0.85,
        )

        /* ── Beat B1 (1–2): union card + groom family ── */
        .to(
          ".opening-layer-union",
          { autoAlpha: 1, y: 0, duration: 0.3, ease: MOTION.easeScrub },
          1.0,
        )
        .to(
          ".union-glow",
          {
            autoAlpha: 0.5,
            scale: 1,
            duration: 0.4,
            ease: MOTION.easeScrub,
          },
          1.05,
        )
        .to(
          ".union-mandala-mask",
          {
            clipPath: "circle(50% at 50% 50%)",
            duration: 0.5,
            ease: MOTION.easeScrub,
          },
          1.05,
        )
        .to(
          ".union-mandala-art",
          { autoAlpha: 1, scale: 1, duration: 0.45, ease: MOTION.easeScrub },
          1.08,
        )
        .fromTo(
          ".union-shimmer",
          { autoAlpha: 0.3, rotate: -12 },
          {
            autoAlpha: 0,
            rotate: 18,
            duration: 0.35,
            ease: MOTION.easeScrub,
          },
          1.25,
        )
        .to(
          ".union-caption",
          { autoAlpha: 1, y: 0, duration: 0.25, ease: MOTION.easeScrub },
          1.2,
        )
        .to(
          ".union-caption-bn",
          { autoAlpha: 1, y: 0, duration: 0.22, ease: MOTION.easeScrub },
          1.28,
        )
        .to(
          ".union-mandala-stage",
          { scale: 0.72, y: -12, duration: 0.3, ease: MOTION.easeScrub },
          1.35,
        )
        .to(
          ".union-family-groom",
          { autoAlpha: 1, y: 0, duration: 0.28, ease: MOTION.easeScrub },
          1.4,
        )
        .to(
          ".union-family-groom .union-family-rule",
          { scaleX: 1, duration: 0.18, ease: MOTION.easeScrub },
          1.48,
        )
        .to(
          ".union-family-groom .union-family-row",
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.22,
            ease: MOTION.easeScrub,
          },
          1.52,
        )
        /* Hold groom through end of beat 2 */
        .to({}, { duration: 0.28 }, 1.72)

        /* Bridge into beat B2 */
        .to(
          ".union-family-groom",
          {
            autoAlpha: 0,
            y: -14,
            duration: 0.24,
            ease: MOTION.easeScrub,
          },
          2.0,
        )
        .to(
          ".union-bridge",
          {
            autoAlpha: 1,
            scaleX: 1,
            duration: 0.2,
            ease: MOTION.easeScrub,
          },
          2.02,
        )
        .to(
          ".union-bridge",
          { autoAlpha: 0, duration: 0.16, ease: MOTION.easeScrub },
          2.18,
        )

        /* ── Beat B2 (2–3): bride family ── */
        .to(
          ".union-family-bride",
          { autoAlpha: 1, y: 0, duration: 0.28, ease: MOTION.easeScrub },
          2.15,
        )
        .to(
          ".union-family-bride .union-family-rule",
          { scaleX: 1, duration: 0.18, ease: MOTION.easeScrub },
          2.25,
        )
        .to(
          ".union-family-bride .union-family-row",
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.22,
            ease: MOTION.easeScrub,
          },
          2.3,
        )
        .to(
          ".union-finale",
          { autoAlpha: 1, y: 0, duration: 0.22, ease: MOTION.easeScrub },
          2.55,
        )
        .to({}, { duration: 0.3 }, 2.7);
    },
  });

  return (
    <SceneWrapper
      ref={sectionRef}
      id="grand-reveal"
      tone="ivory"
      className="overflow-hidden"
      innerClassName="max-w-[26rem] justify-center sm:max-w-lg"
    >
      {/* Ambient atmosphere */}
      <div className="reveal-atmosphere pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_28%,rgba(255,248,236,0.92)_0%,rgba(246,235,215,0.42)_48%,transparent_74%)]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Circular mandala — atmosphere behind the heading only */}
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

      {/* Layer A — couple composition */}
      <div className="opening-layer-couple reveal-scene-fade relative z-10 flex w-full flex-col items-center text-center will-change-transform">
        <div className="reveal-heading-mask relative z-10 overflow-hidden pb-0.5">
          <p
            className={`reveal-kicker reveal-exit-line text-[1.15rem] leading-none text-sindoor-red sm:text-[1.25rem] ${
              isBengali ? "font-bn-display" : "font-display tracking-[0.06em]"
            }`}
          >
            {copy.kicker}
          </p>
        </div>
        <div className="reveal-exit-line mt-2 h-px w-11 bg-gradient-to-r from-transparent via-antique-gold/80 to-transparent" />

        <div className="reveal-parallax-photo reveal-portrait-stage relative mt-2.5 w-[min(72vw,18.5rem)]">
          <div className="pointer-events-none absolute -inset-5 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(185,154,88,0.2)_0%,transparent_68%)]" />

          <div className="relative aspect-square w-full">
            <PortraitArchFrame />

            <div className="absolute inset-[5.5%] overflow-hidden rounded-full">
              <div className="reveal-photo-reveal absolute inset-0 overflow-hidden rounded-full bg-[#2a1612] shadow-[inset_0_12px_28px_rgba(40,16,12,0.28)]">
                <Image
                  src={assets.couple.grandReveal}
                  alt={copy.namesEn}
                  fill
                  priority
                  unoptimized
                  className="reveal-photo object-cover object-[42%_center]"
                  sizes="(max-width: 430px) 72vw, 296px"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 w-full px-1">
          <div className="reveal-names-bn-mask overflow-hidden pb-0.5">
            <h1 className="reveal-names-bn reveal-exit-line font-bn-display text-[1.65rem] leading-[1.22] text-balance text-[#5c1520] sm:text-[1.85rem]">
              {copy.namesBn}
            </h1>
          </div>
          <p className="reveal-names-en reveal-exit-line mt-1 font-display text-[0.88rem] tracking-[0.12em] text-deep-burgundy/88 uppercase sm:text-[0.94rem]">
            {copy.namesEn}
          </p>

          <DateMedallion
            dateBn={copy.date}
            dateEn={copy.dateEn}
            className="reveal-exit-line mt-3"
          />

          <p className="reveal-location reveal-exit-line mt-3 font-display text-[0.78rem] tracking-[0.05em] text-deep-burgundy/85">
            {copy.location}
          </p>

          <p
            className={`reveal-tagline reveal-exit-line mx-auto mt-1.5 max-w-[17rem] text-[0.74rem] leading-relaxed text-deep-burgundy/75 ${
              isBengali ? "font-bn-body" : "font-display italic"
            }`}
          >
            {copy.tagline}
          </p>
        </div>
      </div>

      {/* Layer B — family card (same canvas; birds/petals keep moving behind) */}
      <div className="opening-layer-union pointer-events-none absolute inset-x-0 top-0 bottom-0 z-20 flex items-center justify-center">
        <UnionFamilyCard />
      </div>
    </SceneWrapper>
  );
}
