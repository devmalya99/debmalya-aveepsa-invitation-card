"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { SceneWrapper } from "@/components/experience/SceneWrapper";
import {
  AlpanaMandala,
  CornerLotus,
  DateMedallion,
  FloatingPetals,
  GoldParticles,
  PortraitArchFrame,
} from "@/components/reveal/HeroOrnaments";
import { assets } from "@/data/assets";
import { useLanguage } from "@/hooks/useLanguage";
import { usePinnedScene } from "@/hooks/usePinnedScene";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollModeContext } from "@/hooks/useScrollModeContext";
import { MOTION } from "@/lib/animation-config";
import { gsap, registerGsap } from "@/lib/gsap";

/**
 * Scene 01 — Editorial wedding album cover.
 * Preserves original couple photograph (couple-01); ornamental frame only.
 */
export function GrandReveal() {
  const { content, locale } = useLanguage();
  const { cinematic } = useScrollModeContext();
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const copy = content.grandReveal;
  const isBengali = locale === "bn";

  const entrancePlayedRef = useRef(false);

  /* Entrance plays once — wait for scroll mode so cinematic flip cannot re-run it. */
  useGSAP(
    () => {
      if (!sectionRef.current) return;
      registerGsap();

      const showSettled = () => {
        gsap.set(
          [
            ".reveal-atmosphere",
            ".reveal-mandala",
            ".reveal-particles",
            ".reveal-photo-mask",
            ".reveal-photo",
            ".reveal-portrait-stage",
            ".reveal-text-line",
            ".reveal-scene-fade",
            ".reveal-petals",
            ".reveal-draw-path",
            ".reveal-mandala-center",
            ".reveal-lotus",
          ],
          { autoAlpha: 1, strokeDashoffset: 0, clearProps: "clipPath,y,scale" },
        );
        gsap.set(".reveal-photo", { scale: 1 });
        gsap.set(".reveal-photo-mask", {
          clipPath: "inset(0% 0% 0% 0%)",
        });
      };

      if (reducedMotion) {
        showSettled();
        entrancePlayedRef.current = true;
        return;
      }

      // Still detecting scroll mode — keep cover hidden (no flash-then-replay).
      if (!cinematic) {
        if (!entrancePlayedRef.current) {
          gsap.set(
            [
              ".reveal-atmosphere",
              ".reveal-mandala",
              ".reveal-particles",
              ".reveal-photo-mask",
              ".reveal-photo",
              ".reveal-portrait-stage",
              ".reveal-text-line",
              ".reveal-petals",
              ".reveal-lotus",
              ".reveal-mandala-center",
            ],
            { autoAlpha: 0 },
          );
        }
        return;
      }

      if (entrancePlayedRef.current) {
        showSettled();
        return;
      }
      entrancePlayedRef.current = true;

      gsap.set(".reveal-atmosphere", { autoAlpha: 0 });
      gsap.set(".reveal-mandala", { autoAlpha: 0, scale: 0.96 });
      gsap.set(".reveal-particles", { autoAlpha: 0 });
      gsap.set(".reveal-petals", { autoAlpha: 0 });
      gsap.set(".reveal-lotus", { autoAlpha: 0 });
      gsap.set(".reveal-portrait-stage", {
        autoAlpha: 0,
        y: 14,
        scale: 0.985,
      });
      gsap.set(".reveal-photo-mask", {
        autoAlpha: 0,
        clipPath: "inset(10% 8% 12% 8%)",
      });
      gsap.set(".reveal-photo", {
        scale: 1.04,
        autoAlpha: 0,
      });
      gsap.set(".reveal-text-line", {
        autoAlpha: 0,
        y: 10,
      });
      gsap.set(".reveal-draw-path", { strokeDashoffset: 1 });
      gsap.set(".reveal-mandala-center", { autoAlpha: 0 });
      gsap.set(".reveal-scene-fade", { autoAlpha: 1 });

      const entrance = gsap.timeline({
        defaults: { ease: MOTION.easeTextIn },
      });

      entrance
        .to(".reveal-atmosphere", { autoAlpha: 1, duration: 0.7 }, 0)
        .to(
          ".reveal-mandala",
          { autoAlpha: 0.22, scale: 1, duration: 1, ease: MOTION.easeSoft },
          0.04,
        )
        .to(
          ".reveal-draw-path",
          {
            strokeDashoffset: 0,
            stagger: MOTION.stagger.tight,
            duration: 1.05,
            ease: MOTION.easeSoft,
          },
          0.06,
        )
        .to(
          ".reveal-mandala-center",
          { autoAlpha: 0.75, duration: 0.4 },
          0.7,
        )
        .to(
          ".reveal-lotus",
          {
            autoAlpha: 0.7,
            stagger: MOTION.stagger.tight,
            duration: 0.55,
          },
          0.4,
        )
        .to(".reveal-particles", { autoAlpha: 1, duration: 0.55 }, 0.5)
        .to(
          ".reveal-portrait-stage",
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            ease: MOTION.easeOut,
          },
          0.28,
        )
        .to(
          ".reveal-photo-mask",
          {
            autoAlpha: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.05,
            ease: MOTION.easeInOut,
          },
          0.32,
        )
        .to(
          ".reveal-photo",
          {
            scale: 1,
            autoAlpha: 1,
            duration: 1.05,
            ease: MOTION.easeOut,
          },
          0.32,
        )
        .to(
          ".reveal-text-line",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            stagger: MOTION.stagger.normal,
            ease: MOTION.easeTextIn,
          },
          0.9,
        )
        .to(".reveal-petals", { autoAlpha: 1, duration: 0.55 }, 1.25);
    },
    { scope: sectionRef, dependencies: [cinematic, reducedMotion] },
  );

  /*
   * Scroll timeline = page film strip:
   * hold → text drifts out line by line → full page fade into next scene.
   */
  usePinnedScene({
    sectionRef,
    sceneId: "grand-reveal",
    enabled: cinematic,
    build: (timeline) => {
      timeline
        .fromTo(
          ".reveal-parallax-bg",
          { y: 0, scale: 1 },
          {
            y: -40,
            scale: 1.05,
            duration: 1,
            ease: MOTION.easeScrub,
          },
          0,
        )
        .fromTo(
          ".reveal-parallax-photo",
          { y: 0 },
          {
            y: 20,
            duration: 1,
            ease: MOTION.easeScrub,
          },
          0,
        )
        .fromTo(
          ".reveal-photo",
          { scale: 1 },
          {
            scale: 1.06,
            duration: 1,
            ease: MOTION.easeScrub,
          },
          0,
        )
        /* Text leaves first — staggered soft rise + fade */
        .fromTo(
          ".reveal-text-line",
          { autoAlpha: 1, y: 0 },
          {
            autoAlpha: 0,
            y: MOTION.textOut.y,
            stagger: MOTION.stagger.normal,
            duration: 0.55,
            ease: MOTION.easeScrub,
          },
          0.38,
        )
        /* Portrait eases away */
        .fromTo(
          ".reveal-portrait-stage",
          { autoAlpha: 1, y: 0, scale: 1 },
          {
            autoAlpha: 0,
            y: -16,
            scale: 0.97,
            duration: 0.5,
            ease: MOTION.easeScrub,
          },
          0.58,
        )
        /* Full page fade-out = transition into Scene 02 */
        .fromTo(
          ".reveal-scene-fade",
          { autoAlpha: 1 },
          {
            autoAlpha: 0,
            duration: MOTION.pageFade.duration,
            ease: MOTION.easeScrub,
          },
          0.72,
        )
        .fromTo(
          ".reveal-atmosphere",
          { autoAlpha: 1 },
          {
            autoAlpha: 0,
            duration: MOTION.pageFade.duration,
            ease: MOTION.easeScrub,
          },
          0.72,
        );
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
      <div className="reveal-atmosphere pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_32%,rgba(255,248,236,0.95)_0%,rgba(246,235,215,0.55)_42%,transparent_72%)]" />
        <div className="reveal-parallax-bg absolute top-[8%] left-1/2 h-[22rem] w-[22rem] -translate-x-1/2 sm:h-[24rem] sm:w-[24rem]">
          <AlpanaMandala className="h-full w-full opacity-100" />
        </div>
        <Image
          src={assets.decorations.alpana}
          alt=""
          width={300}
          height={300}
          className="reveal-parallax-bg absolute top-[10%] left-1/2 -translate-x-1/2 object-contain opacity-[0.07]"
          style={{ width: 300, height: "auto" }}
          sizes="300px"
        />
        <CornerLotus className="reveal-lotus absolute top-[18%] left-2 h-12 w-12 opacity-70 sm:left-4" />
        <CornerLotus className="reveal-lotus absolute top-[18%] right-2 h-12 w-12 rotate-90 opacity-70 sm:right-4" />
        <CornerLotus className="reveal-lotus absolute bottom-[14%] left-3 h-10 w-10 -rotate-90 opacity-50" />
        <CornerLotus className="reveal-lotus absolute right-3 bottom-[14%] h-10 w-10 rotate-180 opacity-50" />
        <GoldParticles />
        <FloatingPetals />
      </div>

      <div className="reveal-scene-fade relative z-10 flex w-full flex-col items-center text-center">
        <div className="flex w-full flex-col items-center">
          <p className="reveal-text-line reveal-kicker font-bn-display text-[1.05rem] leading-none text-sindoor-red sm:text-[1.15rem]">
            {copy.kicker}
          </p>
          <div className="reveal-text-line mt-2 h-px w-14 bg-gradient-to-r from-transparent via-antique-gold to-transparent" />
        </div>

        <div className="reveal-parallax-photo reveal-portrait-stage relative mt-4 w-[min(78vw,19.5rem)] sm:w-[20.5rem]">
          <div className="pointer-events-none absolute -inset-6 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(185,154,88,0.22)_0%,transparent_68%)]" />

          <div className="relative aspect-[7/9] w-full">
            <PortraitArchFrame />
            <div
              className="reveal-photo-mask absolute inset-[8.5%] overflow-hidden shadow-[0_18px_40px_rgba(64,21,29,0.18)]"
              style={{
                borderRadius: "50% 50% 12px 12px / 38% 38% 12px 12px",
              }}
            >
              <Image
                src={assets.couple.grandReveal}
                alt={copy.namesEn}
                fill
                priority
                className="reveal-photo object-cover object-[50%_18%]"
                sizes="(max-width: 430px) 78vw, 330px"
              />
            </div>
          </div>
        </div>

        <div className="mt-5 w-full px-1">
          <h1 className="reveal-text-line reveal-names-bn font-bn-display text-[1.85rem] leading-[1.2] text-balance text-deep-burgundy sm:text-[2.15rem]">
            {copy.namesBn}
          </h1>
          <p className="reveal-text-line reveal-names-en mt-1.5 font-display text-[0.95rem] tracking-[0.12em] text-deep-burgundy/90 uppercase sm:text-base">
            {copy.namesEn}
          </p>

          <DateMedallion
            dateBn={copy.date}
            dateEn={copy.dateEn}
            className="reveal-text-line mt-4"
          />

          <p className="reveal-text-line reveal-location mt-3 font-display text-[0.82rem] tracking-[0.04em] text-deep-burgundy">
            {copy.location}
          </p>

          <p
            className={`reveal-text-line reveal-tagline mx-auto mt-2 max-w-[17rem] text-[0.8rem] leading-relaxed text-deep-burgundy/80 ${
              isBengali ? "font-bn-body" : "font-display italic"
            }`}
          >
            {copy.tagline}
          </p>
        </div>
      </div>
    </SceneWrapper>
  );
}
