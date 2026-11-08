"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { SceneWrapper } from "@/components/experience/SceneWrapper";
import { LetterCorner } from "@/components/letter/LetterOrnaments";
import { useLanguage } from "@/hooks/useLanguage";
import { usePinnedScene } from "@/hooks/usePinnedScene";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollModeContext } from "@/hooks/useScrollModeContext";
import { MOTION } from "@/lib/animation-config";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";

function SealLotus({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden fill="none">
      <path
        d="M32 52 C26 40 16 30 10 26 C18 30 26 38 32 48 C38 38 46 30 54 26 C48 30 38 40 32 52 Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M32 48 C28 34 26 20 32 10 C38 20 36 34 32 48 Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <circle cx="32" cy="34" r="2.8" fill="currentColor" opacity="0.85" />
    </svg>
  );
}

function PlaqueLotus({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 28" className={className} aria-hidden fill="none">
      <path
        className="letter-plaque-draw"
        d="M36 24 C30 14 22 8 14 6 C22 10 28 14 36 22 C44 14 50 10 58 6 C50 8 42 14 36 24 Z"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinejoin="round"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
      />
      <path
        className="letter-plaque-draw"
        d="M36 22 C34 14 32 8 36 4 C40 8 38 14 36 22 Z"
        stroke="currentColor"
        strokeWidth="1"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
      />
    </svg>
  );
}

/**
 * Scene 03 — Editorial wedding letter on antique parchment.
 * Content-driven proportions · central axis · seal → unfold → calligraphy → plaque → signature.
 */
export function GrandInvitation() {
  const { content, locale } = useLanguage();
  const { cinematic } = useScrollModeContext();
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const letter = content.letter;
  const finale = content.final;
  const isBengali = locale === "bn";

  useGSAP(
    () => {
      if (!cinematic || reducedMotion || !sectionRef.current) return;
      registerGsap();
      gsap.to(".letter-seal-core", {
        scale: 1.03,
        duration: 2.8,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
      gsap.to(".letter-seal-pulse", {
        autoAlpha: 0.32,
        duration: 2.8,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    },
    {
      scope: sectionRef,
      dependencies: [cinematic, reducedMotion],
      revertOnUpdate: true,
    },
  );

  useGSAP(
    () => {
      if (!cinematic || !sectionRef.current) return;
      registerGsap();

      /* Parchment shell always present — only text loads in (no blank burgundy). */
      gsap.set(".letter-seal", { autoAlpha: 1, scale: 0.94 });
      gsap.set(".letter-seal-ring", { strokeDashoffset: 0.4 });
      gsap.set(".letter-seal-core", { scale: 0.92, autoAlpha: 1 });
      gsap.set(".letter-seal-pulse", { autoAlpha: 0.35 });

      gsap.set(".letter-sheet", { autoAlpha: 1, y: 18, clipPath: "none" });
      gsap.set(".letter-border", { autoAlpha: 0.35 });
      gsap.set(".letter-corner", { autoAlpha: 0 });

      const blur = reducedMotion ? "none" : "blur(5px)";
      gsap.set(".letter-eyebrow", {
        autoAlpha: 0,
        y: 10,
        letterSpacing: isBengali ? "0em" : "0.28em",
      });
      gsap.set(".letter-salutation", { autoAlpha: 0, y: 16, filter: blur });
      gsap.set(".letter-title-bn", { autoAlpha: 0, y: 18, filter: blur });
      gsap.set(".letter-subtitle", {
        autoAlpha: 0,
        y: 10,
        letterSpacing: isBengali ? "0em" : "0.22em",
      });
      gsap.set(".letter-paragraph", { autoAlpha: 0, y: 16, filter: blur });

      gsap.set(".letter-plaque", { autoAlpha: 0, y: 28, scale: 0.97 });
      gsap.set(".letter-plaque-border", { autoAlpha: 0 });
      gsap.set(".letter-plaque-lotus", { autoAlpha: 0, scale: 0.8 });
      gsap.set(".letter-plaque-draw", { strokeDashoffset: 1 });
      gsap.set(".letter-plaque-line", { autoAlpha: 0, y: 10 });

      gsap.set(".letter-date", { autoAlpha: 0, y: 12 });
      gsap.set(".letter-date-rule", { scaleX: 0, autoAlpha: 0 });
      gsap.set(".letter-signature", {
        autoAlpha: 0,
        y: 14,
        scale: 0.98,
        filter: blur,
        letterSpacing: isBengali ? "0em" : "0.26em",
      });
      gsap.set(".letter-sign-sub", { autoAlpha: 0, y: 8 });
      gsap.set(".letter-shimmer", { xPercent: -120, autoAlpha: 0 });
      gsap.set(".letter-skip", { autoAlpha: 0.75 });
    },
    {
      scope: sectionRef,
      dependencies: [cinematic, reducedMotion, isBengali],
      revertOnUpdate: true,
    },
  );

  usePinnedScene({
    sectionRef,
    sceneId: "grand-invitation",
    enabled: cinematic,
    build: (timeline) => {
      const clearBlur = reducedMotion ? {} : { filter: "blur(0px)" };

      timeline
        /* Seal settles */
        .to(
          ".letter-seal",
          { scale: 1, duration: 0.35, ease: MOTION.easeScrub },
          0,
        )
        .to(
          ".letter-seal-ring",
          {
            strokeDashoffset: 0,
            stagger: 0.04,
            duration: 0.4,
            ease: MOTION.easeScrub,
          },
          0.05,
        )
        .to(
          ".letter-seal-core",
          { scale: 1, duration: 0.35, ease: MOTION.easeScrub },
          0.15,
        )

        /* Sheet rises into place */
        .to(
          ".letter-sheet",
          { y: 0, duration: 0.4, ease: MOTION.easeScrub },
          0.1,
        )
        .to(
          ".letter-border",
          { autoAlpha: 1, duration: 0.3, ease: MOTION.easeScrub },
          0.25,
        )
        .to(
          ".letter-corner",
          {
            autoAlpha: 1,
            stagger: 0.04,
            duration: 0.25,
            ease: MOTION.easeScrub,
          },
          0.3,
        )

        /* Text load — headings */
        .to(
          ".letter-eyebrow",
          {
            autoAlpha: 1,
            y: 0,
            letterSpacing: isBengali ? "0em" : "0.16em",
            duration: 0.35,
            ease: MOTION.easeScrub,
          },
          0.4,
        )
        .to(
          ".letter-salutation",
          {
            autoAlpha: 1,
            y: 0,
            ...clearBlur,
            duration: 0.4,
            ease: MOTION.easeScrub,
          },
          0.55,
        )
        .to(
          ".letter-title-bn",
          {
            autoAlpha: 1,
            y: 0,
            ...clearBlur,
            duration: 0.42,
            ease: MOTION.easeScrub,
          },
          0.75,
        )
        .to(
          ".letter-subtitle",
          {
            autoAlpha: 1,
            y: 0,
            letterSpacing: isBengali ? "0em" : "0.12em",
            duration: 0.32,
            ease: MOTION.easeScrub,
          },
          0.95,
        )

        /* Paragraphs — reading order */
        .to(
          ".letter-paragraph",
          {
            autoAlpha: 1,
            y: 0,
            ...clearBlur,
            stagger: 0.18,
            duration: 0.4,
            ease: MOTION.easeScrub,
          },
          1.15,
        )

        /* Family plaque */
        .to(
          ".letter-plaque",
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: MOTION.easeScrub,
          },
          1.65,
        )
        .to(
          ".letter-plaque-border",
          { autoAlpha: 1, duration: 0.25, ease: MOTION.easeScrub },
          1.8,
        )
        .to(
          ".letter-plaque-lotus",
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.28,
            ease: MOTION.easeScrub,
          },
          1.85,
        )
        .to(
          ".letter-plaque-draw",
          {
            strokeDashoffset: 0,
            stagger: 0.04,
            duration: 0.3,
            ease: MOTION.easeScrub,
          },
          1.88,
        )
        .to(
          ".letter-plaque-line",
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.32,
            ease: MOTION.easeScrub,
          },
          2.0,
        )

        /* Date + signature finale */
        .to(
          ".letter-date",
          { autoAlpha: 1, y: 0, duration: 0.32, ease: MOTION.easeScrub },
          2.35,
        )
        .to(
          ".letter-date-rule",
          {
            scaleX: 1,
            autoAlpha: 1,
            duration: 0.28,
            ease: MOTION.easeScrub,
          },
          2.5,
        )
        .to(
          ".letter-signature",
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            ...clearBlur,
            letterSpacing: isBengali ? "0em" : "0.14em",
            duration: 0.42,
            ease: MOTION.easeScrub,
          },
          2.65,
        )
        .fromTo(
          ".letter-shimmer",
          { xPercent: -120, autoAlpha: 0.5 },
          {
            xPercent: 120,
            autoAlpha: 0,
            duration: 0.4,
            ease: MOTION.easeScrub,
          },
          2.85,
        )
        .to(
          ".letter-sign-sub",
          { autoAlpha: 1, y: 0, duration: 0.28, ease: MOTION.easeScrub },
          3.0,
        )
        .to(
          ".letter-skip",
          { autoAlpha: 0, duration: 0.2, ease: MOTION.easeScrub },
          3.1,
        )
        /* Soft exit so the handoff into the river scene isn’t a hard cut */
        .to(
          ".letter-sheet",
          {
            autoAlpha: 0.55,
            y: -10,
            scale: 0.985,
            duration: 0.45,
            ease: MOTION.easeScrub,
          },
          3.25,
        )
        .to(
          ".letter-seal-stage",
          { autoAlpha: 0, y: -8, duration: 0.35, ease: MOTION.easeScrub },
          3.3,
        );
    },
  });

  const skipToEnd = () => {
    const el = document.getElementById("grand-invitation");
    if (!el) return;
    const bottom = el.getBoundingClientRect().bottom + window.scrollY;
    window.scrollTo({
      top: Math.max(0, bottom - window.innerHeight),
      behavior: "smooth",
    });
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  return (
    <SceneWrapper
      ref={sectionRef}
      id="grand-invitation"
      tone="burgundy"
      innerClassName="max-w-[32rem] justify-start touch-pan-y sm:max-w-[34rem]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_12%,rgba(185,154,88,0.14),transparent_52%)]" />

      {cinematic ? (
        <button
          type="button"
          onClick={skipToEnd}
          className="letter-skip pointer-events-auto absolute top-[max(4.75rem,calc(env(safe-area-inset-top)+3.6rem))] right-4 z-30 min-h-11 rounded-full border border-antique-gold/35 bg-deep-burgundy/45 px-3 py-2 font-display text-[0.58rem] tracking-[0.12em] text-antique-ivory/85 uppercase backdrop-blur-sm"
        >
          Skip
        </button>
      ) : null}

      {/* Content column — centred axis, natural height */}
      <div className="relative z-10 mx-auto flex w-[min(94vw,32.5rem)] flex-col items-center pb-2">
        {/* Compact seal */}
        <div className="letter-seal-stage relative mb-3 shrink-0 will-change-transform">
          <div className="letter-seal relative h-[3.75rem] w-[3.75rem] text-antique-gold">
            <div className="letter-seal-pulse pointer-events-none absolute inset-[-10%] rounded-full bg-[radial-gradient(circle,rgba(185,154,88,0.38)_0%,transparent_70%)]" />
            <svg
              viewBox="0 0 120 120"
              className="h-full w-full"
              aria-hidden
              fill="none"
            >
              <circle
                className="letter-seal-ring"
                cx="60"
                cy="60"
                r="52"
                stroke="currentColor"
                strokeWidth="1.15"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset="1"
              />
              <circle
                className="letter-seal-ring"
                cx="60"
                cy="60"
                r="44"
                stroke="currentColor"
                strokeWidth="0.7"
                opacity="0.6"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset="1"
              />
              <circle
                className="letter-seal-ring"
                cx="60"
                cy="60"
                r="36"
                stroke="currentColor"
                strokeWidth="0.9"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset="1"
              />
            </svg>
            <div className="letter-seal-core absolute inset-[22%] flex items-center justify-center rounded-full bg-deep-burgundy/30">
              <SealLotus className="h-[72%] w-[72%]" />
            </div>
          </div>
        </div>

        {/* Parchment — content-driven, not viewport-stretched */}
        <article className="letter-sheet relative w-full origin-center overflow-hidden rounded-[1.85rem] bg-[linear-gradient(168deg,#fff9ed_0%,#f5e8d2_52%,#e9d5b2_100%)] px-[clamp(1.85rem,7.5vw,2.35rem)] pt-[clamp(2.35rem,6.5vw,2.75rem)] pb-[clamp(1.9rem,5.5vw,2.35rem)] text-deep-burgundy shadow-[0_18px_40px_rgba(20,6,10,0.28)] will-change-[clip-path]">
          {/* Double gold border — inset so it never hugs the card edge */}
          <div className="letter-border pointer-events-none absolute inset-[14px] rounded-[1.35rem] border border-antique-gold/55" />
          <div className="letter-border pointer-events-none absolute inset-[19px] rounded-[1.15rem] border border-antique-gold/25" />

          <LetterCorner className="letter-corner absolute top-5 left-5 z-10 h-5 w-5 text-antique-gold/90" />
          <LetterCorner className="letter-corner absolute top-5 right-5 z-10 h-5 w-5 rotate-90 text-antique-gold/90" />
          <LetterCorner className="letter-corner absolute bottom-5 left-5 z-10 h-5 w-5 -rotate-90 text-antique-gold/90" />
          <LetterCorner className="letter-corner absolute right-5 bottom-5 z-10 h-5 w-5 rotate-180 text-antique-gold/90" />

          <div className="relative z-10 mx-auto flex w-full max-w-[20.5rem] flex-col items-center text-center">
            {/* A — Invitation heading */}
            <p
              className={`letter-eyebrow text-[clamp(0.62rem,2.8vw,0.72rem)] text-[#6b5224] ${
                isBengali
                  ? "font-bn-body"
                  : "font-display tracking-[0.16em] uppercase"
              }`}
            >
              {letter.eyebrow}
            </p>

            <p
              className={`letter-salutation mt-3 text-[clamp(1.15rem,4.6vw,1.35rem)] leading-snug text-deep-burgundy/90 ${
                isBengali ? "font-bn-display" : "font-display italic"
              }`}
            >
              {letter.salutation}
            </p>

            {/* B — Bengali wedding heading */}
            <h2 className="letter-title-bn mt-4 font-bn-display text-[clamp(1.65rem,7.2vw,1.9rem)] leading-[1.2] text-sindoor-red">
              {letter.bengaliTitle}
            </h2>
            <p
              className={`letter-subtitle mt-2 text-[clamp(0.68rem,2.9vw,0.78rem)] text-[#6b5224] ${
                isBengali
                  ? "font-bn-body"
                  : "font-display tracking-[0.12em] uppercase"
              }`}
            >
              {letter.subtitle}
            </p>

            {/* C — Invitation message (controlled column, left-aligned) */}
            <div className="mt-6 w-full space-y-4 text-left">
              {letter.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className={`letter-paragraph text-[clamp(1rem,4vw,1.1rem)] leading-[1.7] text-deep-burgundy/90 ${
                    isBengali ? "font-bn-body" : "font-letter"
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* D — Family blessing plaque (same column width) */}
            <div className="letter-plaque relative mt-8 w-full touch-pan-y overflow-hidden bg-[linear-gradient(165deg,#3a121a_0%,#6e1c26_48%,#2a0e14_100%)] px-5 py-5 will-change-transform">
              <div className="letter-plaque-border pointer-events-none absolute inset-[7px] border border-antique-gold/45" />
              <div className="letter-plaque-border pointer-events-none absolute inset-[11px] border border-antique-gold/20" />

              <PlaqueLotus className="letter-plaque-lotus relative z-10 mx-auto h-6 w-16 text-antique-gold" />

              <p
                className={`letter-plaque-line relative z-10 mt-3 text-[clamp(0.72rem,3vw,0.8rem)] text-antique-ivory/90 ${
                  isBengali
                    ? "font-bn-body"
                    : "font-display tracking-[0.14em] uppercase"
                }`}
              >
                {letter.closing}
              </p>
              <p
                className={`letter-plaque-line relative z-10 mt-2 text-[clamp(1.05rem,4.4vw,1.25rem)] leading-snug text-antique-gold ${
                  isBengali ? "font-bn-display" : "font-display"
                }`}
              >
                {letter.families}
              </p>
            </div>

            {/* E — Date and final signature */}
            <div className="mt-8 flex w-full flex-col items-center">
              <p className="letter-date font-display text-[clamp(1.25rem,5vw,1.45rem)] text-deep-burgundy">
                {letter.date}
              </p>
              <div className="letter-date-rule mt-3 h-px w-14 origin-center bg-gradient-to-r from-transparent via-antique-gold to-transparent" />

              <div className="relative mt-5 overflow-hidden px-2">
                <p
                  className={`letter-signature text-[clamp(1.35rem,5.6vw,1.65rem)] text-sindoor-red ${
                    isBengali
                      ? "font-bn-display"
                      : "font-display tracking-[0.14em] uppercase"
                  }`}
                >
                  {finale.names}
                </p>
                <div className="letter-shimmer pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-antique-gold/40 to-transparent" />
              </div>
              <p
                className={`letter-sign-sub mt-2 text-[clamp(0.58rem,2.6vw,0.65rem)] text-deep-burgundy/75 ${
                  isBengali
                    ? "font-bn-body"
                    : "font-display tracking-[0.16em] uppercase"
                }`}
              >
                {finale.signatureSub}
              </p>
            </div>
          </div>
        </article>
      </div>
    </SceneWrapper>
  );
}
