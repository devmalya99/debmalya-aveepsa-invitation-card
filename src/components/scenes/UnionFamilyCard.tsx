"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { FamilyHeritageMandala } from "@/components/events/FamilyHeritageMandala";
import { FamilyHeritageRow } from "@/components/events/FamilyHeritageRow";
import { LetterCorner } from "@/components/letter/LetterOrnaments";
import {
  FAMILY_HERITAGE_MOTION,
  getFamilyHeritageCopy,
} from "@/config/familyHeritage";
import { useLanguage } from "@/hooks/useLanguage";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

type FamilySide = "groom" | "bride";

type UnionFamilyCardProps = {
  side: FamilySide;
  className?: string;
};

/**
 * Royal Bengali family heritage card for the opening canvas.
 * Copy + tokens: `src/config/familyHeritage.ts`.
 */
export function UnionFamilyCard({ side, className = "" }: UnionFamilyCardProps) {
  const { locale } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();
  const [sequenceOn, setSequenceOn] = useState(false);
  const copy = getFamilyHeritageCopy(locale);
  const isBengali = locale === "bn";
  const isGroom = side === "groom";
  const family = isGroom ? copy.groom : copy.bride;
  const instant = reducedMotion;
  const go = sequenceOn || instant;
  const d = (delay: number) => (instant ? 0 : delay);

  useEffect(() => {
    if (instant) {
      setSequenceOn(true);
      return;
    }
    const timer = window.setTimeout(
      () => setSequenceOn(true),
      FAMILY_HERITAGE_MOTION.sequenceStartMs,
    );
    return () => window.clearTimeout(timer);
  }, [instant]);

  return (
    <article
      className={`family-heritage relative flex max-h-[calc(100svh-6.5rem)] w-full flex-col overflow-hidden ${className}`}
      style={{
        colorScheme: "only light",
        backgroundColor: "#F7EEDC",
        paddingLeft: "var(--fh-pad-x)",
        paddingRight: "var(--fh-pad-x)",
        paddingTop: "var(--fh-pad-y)",
        paddingBottom: "var(--fh-pad-y)",
      }}
    >
      {/* Soft paper wash */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 28%, color-mix(in srgb, var(--fh-accent) 16%, transparent), transparent 62%)",
        }}
        aria-hidden
      />
      <div
        className="family-heritage-paper pointer-events-none absolute inset-0 opacity-[0.04]"
        aria-hidden
      />

      {/* Double antique-gold border */}
      <div
        className="pointer-events-none absolute z-20"
        style={{
          inset: "var(--fh-border-outer)",
          boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--fh-border) 70%, transparent)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute z-20"
        style={{
          inset: "var(--fh-border-inner)",
          boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--fh-muted-gold) 55%, transparent)",
        }}
        aria-hidden
      />

      <LetterCorner className="absolute top-3 left-3 z-30 h-6 w-6 text-[var(--fh-accent)] sm:h-7 sm:w-7" />
      <LetterCorner className="absolute top-3 right-3 z-30 h-6 w-6 rotate-90 text-[var(--fh-accent)] sm:h-7 sm:w-7" />
      <LetterCorner className="absolute bottom-3 left-3 z-30 h-6 w-6 -rotate-90 text-[var(--fh-accent)] sm:h-7 sm:w-7" />
      <LetterCorner className="absolute right-3 bottom-3 z-30 h-6 w-6 rotate-180 text-[var(--fh-accent)] sm:h-7 sm:w-7" />

      {/* Sparse float accents */}
      <span
        className={`pointer-events-none absolute top-[12%] left-[9%] z-0 h-1.5 w-1.5 rounded-full opacity-30 ${instant ? "" : "family-heritage-float"}`}
        style={{ background: "var(--fh-accent)" }}
        aria-hidden
      />
      <span
        className={`pointer-events-none absolute top-[22%] right-[10%] z-0 h-1 w-1 rounded-full opacity-25 ${instant ? "" : "family-heritage-float-delayed"}`}
        style={{ background: "var(--fh-primary)" }}
        aria-hidden
      />

      {/* Mandala watermark — behind all copy */}
      <FamilyHeritageMandala go={go} instant={instant} />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center">
        <div
          className="flex w-full flex-col items-center"
          style={{ maxWidth: "var(--fh-content-max)" }}
        >
          <header className="w-full text-center">
            <motion.p
              className="font-semibold uppercase"
              style={{
                fontFamily: "var(--fh-font-en)",
                fontSize: "var(--fh-heading-en-size)",
                letterSpacing: "var(--fh-heading-en-tracking)",
                color: "var(--fh-accent)",
              }}
              initial={false}
              animate={
                go
                  ? { opacity: 1, y: 0, letterSpacing: "0.2em" }
                  : { opacity: 0, y: 12, letterSpacing: "0.32em" }
              }
              transition={{
                duration: instant ? 0 : FAMILY_HERITAGE_MOTION.headingDuration,
                delay: d(0.2),
                ease: FAMILY_HERITAGE_MOTION.ease,
              }}
            >
              {copy.headingEn}
            </motion.p>

            {isBengali ? (
              <div className="mt-1.5 overflow-hidden">
                <motion.p
                  className="text-balance font-semibold"
                  style={{
                    fontFamily: "var(--fh-font-bn)",
                    fontSize: "var(--fh-heading-bn-size)",
                    lineHeight: 1.4,
                    color: "var(--fh-body)",
                  }}
                  initial={false}
                  animate={
                    go ? { opacity: 1, y: 0 } : { opacity: 0, y: "105%" }
                  }
                  transition={{
                    duration: instant ? 0 : 0.6,
                    delay: d(0.34),
                    ease: FAMILY_HERITAGE_MOTION.ease,
                  }}
                >
                  {copy.headingBn}
                </motion.p>
              </div>
            ) : null}
          </header>

          <div className="mt-4 w-full text-center sm:mt-5">
            <motion.p
              className="font-semibold uppercase"
              style={{
                fontFamily: "var(--fh-font-en)",
                fontSize: "var(--fh-section-size)",
                letterSpacing: "var(--fh-section-tracking)",
                color: "var(--fh-accent)",
              }}
              initial={false}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{
                duration: instant ? 0 : 0.45,
                delay: d(0.48),
                ease: FAMILY_HERITAGE_MOTION.ease,
              }}
            >
              {family.sectionLabel}
            </motion.p>

            <motion.h3
              className="mt-2 text-balance font-bold"
              style={{
                fontFamily: isBengali ? "var(--fh-font-bn)" : "var(--fh-font-en)",
                fontSize: "var(--fh-name-size)",
                lineHeight: "var(--fh-name-lh)",
                color: "var(--fh-primary)",
              }}
              initial={false}
              animate={
                go
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.96 }
              }
              transition={{
                duration: instant ? 0 : FAMILY_HERITAGE_MOTION.nameDuration,
                delay: d(0.58),
                ease: FAMILY_HERITAGE_MOTION.ease,
              }}
            >
              {family.name}
            </motion.h3>

            <motion.div
              className="mx-auto mt-2.5 h-px w-14 origin-center"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--fh-accent), transparent)",
              }}
              initial={false}
              animate={go ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.3 }}
              transition={{
                duration: instant ? 0 : 0.45,
                delay: d(0.68),
                ease: FAMILY_HERITAGE_MOTION.ease,
              }}
              aria-hidden
            />
          </div>

          <dl className="mt-3.5 flex w-full flex-col items-center gap-2.5 sm:mt-4 sm:gap-3">
            {family.members.map((row, index) => (
              <FamilyHeritageRow
                key={`${side}-${row.label}`}
                row={row}
                go={go}
                instant={instant}
                delay={0.78 + index * FAMILY_HERITAGE_MOTION.rowStagger}
                isBengali={isBengali}
                showDivider={index < family.members.length - 1}
              />
            ))}
          </dl>

          {!isGroom ? (
            <motion.p
              className="mt-1 uppercase"
              style={{
                fontFamily: "var(--fh-font-en)",
                fontSize: "var(--fh-closing-size)",
                letterSpacing: "0.16em",
                color: "var(--fh-accent)",
              }}
              initial={false}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{
                duration: instant ? 0 : FAMILY_HERITAGE_MOTION.closingDuration,
                delay: d(0.78 + family.members.length * FAMILY_HERITAGE_MOTION.rowStagger + 0.1),
                ease: FAMILY_HERITAGE_MOTION.ease,
              }}
            >
              {copy.closingLine}
            </motion.p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
