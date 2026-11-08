"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import { SceneWrapper } from "@/components/experience/SceneWrapper";
import { FinalePetals } from "@/components/finale/FinalePetals";
import { assets } from "@/data/assets";
import { useLanguage } from "@/hooks/useLanguage";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";
import { usePinnedScene } from "@/hooks/usePinnedScene";
import { useScrollModeContext } from "@/hooks/useScrollModeContext";
import { MOTION } from "@/lib/animation-config";
import { gsap, registerGsap } from "@/lib/gsap";

type FinalSceneProps = {
  onReplay: () => void;
};

function CardLotus({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 24" className={className} aria-hidden fill="none">
      <path
        d="M32 20 C28 12 22 8 16 6 C22 8 26 12 32 18 C38 12 42 8 48 6 C42 8 36 12 32 20 Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <circle cx="32" cy="12" r="1.6" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

/**
 * Scene 06 — Reception finale.
 * Stacked composition only: portrait → families → welcome card → replay.
 * No overlapping negative margins; no clip-path that collapses the photo.
 */
export function FinalScene({ onReplay }: FinalSceneProps) {
  const { content, locale } = useLanguage();
  const { cinematic } = useScrollModeContext();
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const copy = content.final;
  const isBengali = locale === "bn";

  useGSAP(
    () => {
      if (!cinematic || !sectionRef.current) return;
      registerGsap();

      gsap.set(".rx-glow", { autoAlpha: 0.45, scale: 1 });
      gsap.set(".rx-portrait", { autoAlpha: 1 });
      gsap.set(".rx-frame-path", { strokeDashoffset: 0 });
      gsap.set(".rx-photo", { scale: 1 });
      gsap.set(".rx-family", { autoAlpha: 1, y: 0 });
      gsap.set(".rx-card", { autoAlpha: 1, y: 0 });
      gsap.set(".rx-line", { autoAlpha: 1, y: 0 });
      gsap.set(".rx-signature", { autoAlpha: 1, y: 0 });
      gsap.set(".rx-replay", { autoAlpha: 1, y: 0 });
    },
    {
      scope: sectionRef,
      dependencies: [cinematic],
      revertOnUpdate: true,
    },
  );

  usePinnedScene({
    sectionRef,
    sceneId: "final-scene",
    enabled: cinematic,
    build: (timeline) => {
      timeline
        .to(
          ".rx-glow",
          {
            autoAlpha: 0.6,
            scale: 1.04,
            duration: 0.55,
            ease: MOTION.easeScrub,
          },
          0,
        )
        .to(
          ".rx-photo",
          { scale: 1.03, duration: 0.55, ease: MOTION.easeScrub },
          0,
        );
    },
  });

  const pressSpring = {
    type: "spring" as const,
    stiffness: 420,
    damping: 28,
  };

  return (
    <SceneWrapper
      ref={sectionRef}
      id="final-scene"
      tone="burgundy"
      innerClassName="max-w-[26rem] justify-center gap-0 overflow-y-auto touch-pan-y sm:max-w-lg"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="rx-glow absolute top-[8%] left-1/2 h-[min(48vw,12rem)] w-[min(48vw,12rem)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(185,154,88,0.3)_0%,transparent_70%)]" />
        <FinalePetals enabled={cinematic && !reducedMotion} />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[22rem] flex-col items-center pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {/* Portrait — width drives height; never max-h shorter than aspect box */}
        <div
          className="rx-portrait relative w-[min(46vw,11.5rem)] shrink-0"
          aria-label={copy.names}
        >
          <svg
            className="pointer-events-none absolute -inset-[3%] z-20 text-antique-gold"
            viewBox="0 0 200 260"
            fill="none"
            aria-hidden
          >
            <path
              className="rx-frame-path"
              d="M20 78 C20 34 58 12 100 12 C142 12 180 34 180 78 L180 236 C180 244 174 250 166 250 L34 250 C26 250 20 244 20 236 Z"
              stroke="currentColor"
              strokeWidth="1.6"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset="0"
            />
            <path
              className="rx-frame-path"
              d="M28 80 C28 42 62 22 100 22 C138 22 172 42 172 80 L172 228 C172 234 168 238 162 238 L38 238 C32 238 28 234 28 228 Z"
              stroke="currentColor"
              strokeWidth="0.8"
              opacity="0.55"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset="0"
            />
          </svg>

          <div
            className="relative aspect-[3/4] w-full overflow-hidden bg-deep-burgundy/40 shadow-[0_14px_28px_rgba(0,0,0,0.35)]"
            style={{
              borderRadius:
                "50% 50% 0.75rem 0.75rem / 22% 22% 0.75rem 0.75rem",
            }}
          >
            <Image
              src={assets.couple.finalBlessing}
              alt={copy.names}
              fill
              priority
              className="rx-photo object-cover object-[50%_18%] will-change-transform"
              sizes="(max-width: 430px) 46vw, 184px"
            />
          </div>
        </div>

        {/* Families — clear band under portrait, never under the photo */}
        <div className="rx-family mt-4 grid w-full grid-cols-2 gap-3 text-center">
          <div>
            <p className="font-display text-[0.55rem] tracking-[0.12em] text-antique-gold uppercase">
              Mazumdar Family
            </p>
            <p className="mt-1 font-bn-display text-[0.82rem] leading-snug text-antique-ivory">
              মজুমদার পরিবার
            </p>
          </div>
          <div>
            <p className="font-display text-[0.55rem] tracking-[0.12em] text-antique-gold uppercase">
              Chakrabarti Family
            </p>
            <p className="mt-1 font-bn-display text-[0.82rem] leading-snug text-antique-ivory">
              চক্রবর্তী পরিবার
            </p>
          </div>
        </div>

        <div
          className="mt-3 h-px w-16 bg-gradient-to-r from-transparent via-antique-gold to-transparent"
          aria-hidden
        />

        {/* Welcome card — no negative overlap onto portrait */}
        <article className="rx-card relative mt-3 w-full bg-[linear-gradient(168deg,#fff9ed_0%,#f4e6cf_55%,#e8d4b0_100%)] px-4 pt-3.5 pb-3.5 text-center text-deep-burgundy shadow-[0_12px_28px_rgba(0,0,0,0.28)]">
          <div className="pointer-events-none absolute inset-[5px] border border-antique-gold/50" />

          <CardLotus className="relative z-10 mx-auto h-4 w-12 text-antique-gold" />

          <p
            className={`rx-line relative z-10 mt-2 text-[1.1rem] leading-snug text-sindoor-red ${
              isBengali ? "font-bn-display" : "font-display"
            }`}
          >
            {isBengali ? "সাদর আমন্ত্রণ" : "With warm regards"}
          </p>
          <p className="rx-line relative z-10 mt-1 font-display text-[0.7rem] italic text-deep-burgundy/80">
            Welcome to our celebration
          </p>

          <p
            className={`rx-line relative z-10 mt-2.5 text-[0.82rem] leading-relaxed text-deep-burgundy/90 ${
              isBengali ? "font-bn-display" : "font-letter"
            }`}
          >
            {copy.blessing}
          </p>

          <div className="rx-line relative z-10 mx-auto mt-2.5 h-px w-10 bg-gradient-to-r from-transparent via-antique-gold to-transparent" />

          <p className="rx-line relative z-10 mt-2 font-display text-[0.52rem] tracking-[0.16em] text-[#6b5224] uppercase">
            With love from
          </p>
          {isBengali ? (
            <p className="rx-line relative z-10 mt-1 font-bn-display text-[0.85rem] text-deep-burgundy">
              মজুমদার ও চক্রবর্তী পরিবার
            </p>
          ) : null}
          <p className="rx-line relative z-10 mt-0.5 font-display text-[0.68rem] text-deep-burgundy/80">
            Mazumdar & Chakrabarti Families
          </p>

          <p
            className={`rx-signature relative z-10 mt-2.5 text-[0.8rem] text-sindoor-red ${
              isBengali
                ? "font-bn-display"
                : "font-display tracking-[0.14em] uppercase"
            }`}
          >
            {copy.names}
          </p>
        </article>

        <motion.button
          type="button"
          onClick={onReplay}
          className="rx-replay mt-3 inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-antique-gold/65 bg-deep-burgundy/55 px-4 py-2 text-antique-ivory transition hover:bg-antique-gold/15"
          whileTap={{ scale: 0.96 }}
          transition={pressSpring}
          aria-label={content.common.replay}
        >
          <span
            className="flex h-5 w-5 items-center justify-center rounded-full border border-antique-gold/50 font-display text-[0.7rem] text-antique-gold"
            aria-hidden
          >
            ↻
          </span>
          <span
            className={`text-[0.75rem] ${
              isBengali
                ? "font-bn-body"
                : "font-display tracking-[0.1em] uppercase"
            }`}
          >
            {content.common.replay}
          </span>
        </motion.button>
      </div>
    </SceneWrapper>
  );
}
