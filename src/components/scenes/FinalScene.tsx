"use client";

import Image from "next/image";
import { useCallback, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { SceneWrapper } from "@/components/experience/SceneWrapper";
import { FinalePetals } from "@/components/finale/FinalePetals";
import { assets } from "@/data/assets";
import { useFinalSceneAnimation } from "@/hooks/useFinalSceneAnimation";
import { useLanguage } from "@/hooks/useLanguage";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollModeContext } from "@/hooks/useScrollModeContext";
import { gsap, registerGsap } from "@/lib/gsap";


function CardLotus({
  className = "",
  bloomKey = 0,
}: {
  className?: string;
  bloomKey?: number;
}) {
  return (
    <motion.svg
      key={bloomKey}
      viewBox="0 0 64 24"
      className={className}
      aria-hidden
      fill="none"
      initial={{ scale: 0.85, opacity: 0.7 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
    >
      <path
        className="rx-lotus-path"
        d="M32 20 C28 12 22 8 16 6 C22 8 26 12 32 18 C38 12 42 8 48 6 C42 8 36 12 32 20 Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <circle cx="32" cy="12" r="1.6" fill="currentColor" opacity="0.8" />
    </motion.svg>
  );
}

function FamilyOrnament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none">
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1" />
      <path
        d="M12 4 C13.5 7 13.5 9 12 12 C10.5 9 10.5 7 12 4 Z
           M12 20 C10.5 17 10.5 15 12 12 C13.5 15 13.5 17 12 20 Z"
        stroke="currentColor"
        strokeWidth="0.9"
      />
    </svg>
  );
}

function splitWords(text: string) {
  return text.split(/\s+/).filter(Boolean);
}

/**
 * Split blessing into phrase groups without breaking Bengali grapheme clusters.
 * Uses punctuation / mid-dot / natural pauses — never per-character.
 */
function splitBlessingPhrases(text: string): string[] {
  const parts = text
    .split(/(?<=[।.!?…])\s+|(?<=·)\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
  return parts.length > 0 ? parts : [text];
}

/**
 * Scene 06 — Reception finale.
 * Photograph unveil → families meet → ivory card rises → blessing → replay.
 */
export function FinalScene() {
  const { content, locale } = useLanguage();
  const { cinematic } = useScrollModeContext();
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [lotusBloom, setLotusBloom] = useState(0);
  const copy = content.final;
  const isBengali = locale === "bn";

  const headingText = isBengali ? "সাদর আমন্ত্রণ" : "With warm regards";
  const subtitleWords = useMemo(
    () => splitWords("Welcome to our celebration"),
    [],
  );
  const blessingPhrases = useMemo(
    () => splitBlessingPhrases(copy.blessing),
    [copy.blessing],
  );

  useFinalSceneAnimation({
    sectionRef,
    enabled: cinematic,
    reducedMotion,
  });

  const pressSpring = {
    type: "spring" as const,
    stiffness: 420,
    damping: 28,
  };

  const onPhotoPress = useCallback(() => {
    if (reducedMotion || !sectionRef.current) return;
    registerGsap();
    const frame = sectionRef.current.querySelectorAll(".rx-frame-path");
    gsap.fromTo(
      frame,
      { strokeOpacity: 0.55 },
      {
        strokeOpacity: 1,
        duration: 0.28,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut",
      },
    );
  }, [reducedMotion]);

  const onLotusTap = useCallback(() => {
    setLotusBloom((value) => value + 1);
  }, []);

  return (
    <SceneWrapper
      ref={sectionRef}
      id="final-scene"
      tone="burgundy"
      innerClassName="max-w-[26rem] justify-center gap-0 sm:max-w-lg"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="rx-glow absolute top-[8%] left-1/2 h-[min(48vw,12rem)] w-[min(48vw,12rem)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(185,154,88,0.3)_0%,transparent_70%)]" />
        <FinalePetals enabled={cinematic && !reducedMotion} />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[22rem] flex-col items-center pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {/* Portrait — viewport fixed; image scales + clip unveils independently */}
        <motion.button
          type="button"
          className="rx-portrait relative w-[min(46vw,11.5rem)] shrink-0 border-0 bg-transparent p-0"
          aria-label={copy.names}
          onClick={onPhotoPress}
          whileTap={reducedMotion ? undefined : { scale: 0.985 }}
          transition={pressSpring}
        >
          <svg
            className="pointer-events-none absolute -inset-[4%] z-20 text-antique-gold"
            viewBox="0 0 200 200"
            fill="none"
            aria-hidden
          >
            <circle
              className="rx-frame-path"
              cx="100"
              cy="100"
              r="94"
              stroke="currentColor"
              strokeWidth="1.6"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset="1"
            />
            <circle
              className="rx-frame-path"
              cx="100"
              cy="100"
              r="87"
              stroke="currentColor"
              strokeWidth="0.85"
              opacity="0.55"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset="1"
            />
          </svg>

          <div
            className="rx-frame-sweep pointer-events-none absolute inset-y-[10%] left-0 z-30 w-1/4 rounded-full bg-gradient-to-r from-transparent via-[rgba(255,242,214,0.45)] to-transparent mix-blend-soft-light"
            aria-hidden
          />

          <div className="rx-photo-mask relative aspect-square w-full overflow-hidden rounded-full bg-deep-burgundy/40 shadow-[0_14px_28px_rgba(0,0,0,0.35)] will-change-[clip-path]">
            <Image
              src={assets.couple.finalBlessing}
              alt={copy.names}
              fill
              priority
              className="rx-photo object-cover object-[50%_22%] will-change-transform"
              sizes="(max-width: 430px) 46vw, 184px"
            />
          </div>
        </motion.button>

        {/* Families — independent left / right entrances */}
        <div className="rx-family relative mt-4 grid w-full grid-cols-2 gap-3 text-center">
          <div className="rx-family-left">
            <p className="font-display text-[0.55rem] tracking-[0.12em] text-antique-gold uppercase">
              Mazumdar Family
            </p>
            <p className="mt-1 font-bn-display text-[0.82rem] leading-snug text-antique-ivory">
              মজুমদার পরিবার
            </p>
          </div>
          <div className="rx-family-right">
            <p className="font-display text-[0.55rem] tracking-[0.12em] text-antique-gold uppercase">
              Chakrabarti Family
            </p>
            <p className="mt-1 font-bn-display text-[0.82rem] leading-snug text-antique-ivory">
              চক্রবর্তী পরিবার
            </p>
          </div>
          <FamilyOrnament className="rx-family-ornament pointer-events-none absolute top-1/2 left-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-antique-gold/80" />
        </div>

        <div
          className="rx-family-divider mt-3 h-px w-16 origin-center bg-gradient-to-r from-transparent via-antique-gold to-transparent"
          aria-hidden
        />

        {/* Welcome card — GSAP owns .rx-card transform; press lives on inner shell */}
        <article className="rx-card relative mt-3 w-full will-change-transform">
          <motion.div
            className="stationery-sheet relative w-full px-4 pt-3.5 pb-3.5 text-center"
            whileTap={reducedMotion ? undefined : { scale: 0.985 }}
            transition={pressSpring}
          >
            <div className="rx-card-border pointer-events-none absolute inset-[5px] border border-antique-gold/50" />

            <button
              type="button"
              className="rx-lotus relative z-10 mx-auto block border-0 bg-transparent p-0 will-change-transform"
              aria-label="Ornament"
              onClick={onLotusTap}
            >
              <CardLotus
                className="mx-auto h-4 w-12 text-antique-gold"
                bloomKey={lotusBloom}
              />
            </button>

            <div className="rx-heading-mask relative z-10 mt-2 overflow-hidden">
              <p
                className={`rx-heading text-[1.1rem] leading-snug text-sindoor-red ${
                  isBengali ? "font-bn-display" : "font-display"
                }`}
              >
                {headingText}
              </p>
            </div>

            <p className="relative z-10 mt-1 font-display text-[0.7rem] italic text-deep-burgundy/80">
              {subtitleWords.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className="rx-subtitle-word inline-block will-change-transform"
                >
                  {word}
                  {index < subtitleWords.length - 1 ? "\u00A0" : null}
                </span>
              ))}
            </p>

            <div className="relative z-10 mt-2.5 space-y-1">
              {blessingPhrases.map((phrase, index) => (
                <p
                  key={`blessing-${index}`}
                  className={`rx-blessing-phrase text-[0.82rem] leading-relaxed text-deep-burgundy/90 ${
                    isBengali ? "font-bn-display" : "font-letter"
                  }`}
                >
                  {phrase}
                </p>
              ))}
            </div>

            <div className="rx-attr relative z-10 mx-auto mt-2.5 h-px w-10 bg-gradient-to-r from-transparent via-antique-gold to-transparent" />

            <p className="rx-attr relative z-10 mt-2 font-display text-[0.52rem] tracking-[0.16em] text-[#6b5224] uppercase">
              With love from
            </p>
            {isBengali ? (
              <p className="rx-attr relative z-10 mt-1 font-bn-display text-[0.85rem] text-deep-burgundy">
                মজুমদার ও চক্রবর্তী পরিবার
              </p>
            ) : null}
            <p className="rx-attr relative z-10 mt-0.5 font-display text-[0.68rem] text-deep-burgundy/80">
              Mazumdar & Chakrabarti Families
            </p>

            <div className="relative z-10 mt-2.5 overflow-hidden">
              <p
                className={`rx-signature relative text-[0.8rem] text-sindoor-red ${
                  isBengali
                    ? "font-bn-display"
                    : "font-display tracking-[0.14em] uppercase"
                }`}
              >
                {copy.names}
              </p>
              <span
                className="rx-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[rgba(185,154,88,0.35)] to-transparent"
                aria-hidden
              />
            </div>
          </motion.div>
        </article>

      </div>
    </SceneWrapper>
  );
}
