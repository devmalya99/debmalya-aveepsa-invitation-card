"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { FamilyHeritageMandala } from "@/components/events/FamilyHeritageMandala";
import { LetterCorner } from "@/components/letter/LetterOrnaments";
import {
  FAMILY_HERITAGE_MOTION,
  getFamilyHeritageCopy,
  type FamilyMemberRow,
} from "@/config/familyHeritage";
import { useLanguage } from "@/hooks/useLanguage";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

type UnionFamiliesCardProps = {
  className?: string;
};

const EASE = FAMILY_HERITAGE_MOTION.ease;

type FamilyColumnProps = {
  sectionLabel: string;
  name: string;
  relation: string;
  members: FamilyMemberRow[];
  isBengali: boolean;
  go: boolean;
  instant: boolean;
  sideDelay: number;
};

function FamilyColumn({
  sectionLabel,
  name,
  relation,
  members,
  isBengali,
  go,
  instant,
  sideDelay,
}: FamilyColumnProps) {
  const d = (delay: number) => (instant ? 0 : sideDelay + delay);

  return (
    <div className="min-w-0 flex-1 text-center">
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
        transition={{ duration: instant ? 0 : 0.4, delay: d(0), ease: EASE }}
      >
        {sectionLabel}
      </motion.p>

      <div className="mt-1.5 overflow-hidden pb-0.5">
        <motion.h3
          className="text-balance font-semibold"
          style={{
            fontFamily: isBengali ? "var(--fh-font-bn)" : "var(--fh-font-hero)",
            fontSize: "var(--fh-name-size)",
            lineHeight: "var(--fh-name-lh)",
            color: "var(--fh-primary)",
          }}
          initial={false}
          animate={go ? { opacity: 1, y: 0 } : { opacity: 0, y: "110%" }}
          transition={{
            duration: instant ? 0 : FAMILY_HERITAGE_MOTION.nameDuration,
            delay: d(0.1),
            ease: EASE,
          }}
        >
          {name}
        </motion.h3>
      </div>

      <motion.p
        className="mt-0.5"
        style={{
          fontFamily: isBengali ? "var(--fh-font-bn)" : "var(--fh-font-en)",
          fontSize: "var(--fh-relation-size)",
          fontStyle: isBengali ? "normal" : "italic",
          color: "var(--fh-body)",
        }}
        initial={false}
        animate={go ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: instant ? 0 : 0.4, delay: d(0.18), ease: EASE }}
      >
        {relation}
      </motion.p>

      <motion.div
        className="mx-auto mt-2 h-px w-10 origin-center"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--fh-accent), transparent)",
        }}
        initial={false}
        animate={go ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.3 }}
        transition={{ duration: instant ? 0 : 0.4, delay: d(0.24), ease: EASE }}
        aria-hidden
      />

      <ul className="mt-2.5 flex flex-col gap-2">
        {members.map((row, index) => (
          <motion.li
            key={`${sectionLabel}-${row.label}`}
            className="flex flex-col items-center gap-0.5"
            initial={false}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{
              duration: instant ? 0 : FAMILY_HERITAGE_MOTION.rowDuration,
              delay: d(0.3 + index * FAMILY_HERITAGE_MOTION.rowStagger),
              ease: EASE,
            }}
          >
            <span
              className="font-semibold uppercase"
              style={{
                fontFamily: "var(--fh-font-en)",
                fontSize: "var(--fh-label-size)",
                letterSpacing: "0.14em",
                color: "var(--fh-muted-gold)",
                lineHeight: 1.2,
              }}
            >
              {row.label}
            </span>
            <span
              className="max-w-full text-balance font-semibold"
              style={{
                fontFamily: isBengali ? "var(--fh-font-bn)" : "var(--fh-font-en)",
                fontSize: "var(--fh-value-size)",
                lineHeight: 1.35,
                color: "var(--fh-primary)",
              }}
            >
              {row.value}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/** Royal heritage sheet — both families after the cover beat. */
export function UnionFamiliesCard({ className = "" }: UnionFamiliesCardProps) {
  const { locale } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();
  const [sequenceOn, setSequenceOn] = useState(false);
  const copy = getFamilyHeritageCopy(locale);
  const isBengali = locale === "bn";
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
      className={`family-heritage relative flex max-h-[calc(100svh-6.25rem)] w-full flex-col overflow-hidden ${className}`}
      style={{
        colorScheme: "only light",
        backgroundColor: "var(--fh-bg)",
        paddingLeft: "var(--fh-pad-x)",
        paddingRight: "var(--fh-pad-x)",
        paddingTop: "var(--fh-pad-y)",
        paddingBottom: "var(--fh-pad-y)",
      }}
    >
      {/* Soft radial light */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 30%, color-mix(in srgb, var(--fh-accent) 18%, transparent), transparent 58%)",
        }}
        initial={false}
        animate={go ? { opacity: 0.55 } : { opacity: 0 }}
        transition={{ duration: instant ? 0 : 0.45, ease: EASE }}
        aria-hidden
      />
      <div
        className="family-heritage-paper pointer-events-none absolute inset-0 opacity-[0.05]"
        aria-hidden
      />

      {/* Double gold border + soft shimmer */}
      <motion.div
        className="pointer-events-none absolute z-20"
        style={{
          inset: "var(--fh-border-outer)",
          boxShadow:
            "inset 0 0 0 1px color-mix(in srgb, var(--fh-border) 72%, transparent)",
        }}
        initial={false}
        animate={go ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: instant ? 0 : 0.5, delay: d(0.35), ease: EASE }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute z-20"
        style={{
          inset: "var(--fh-border-inner)",
          boxShadow:
            "inset 0 0 0 1px color-mix(in srgb, var(--fh-muted-gold) 55%, transparent)",
        }}
        initial={false}
        animate={go ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: instant ? 0 : 0.5, delay: d(0.42), ease: EASE }}
        aria-hidden
      />
      {!instant ? (
        <div
          className="family-heritage-shimmer pointer-events-none absolute z-20 opacity-40"
          style={{ inset: "var(--fh-border-outer)" }}
          aria-hidden
        />
      ) : null}

      <LetterCorner className="absolute top-3 left-3 z-30 h-6 w-6 text-[var(--fh-accent)] sm:h-7 sm:w-7" />
      <LetterCorner className="absolute top-3 right-3 z-30 h-6 w-6 rotate-90 text-[var(--fh-accent)] sm:h-7 sm:w-7" />
      <LetterCorner className="absolute bottom-3 left-3 z-30 h-6 w-6 -rotate-90 text-[var(--fh-accent)] sm:h-7 sm:w-7" />
      <LetterCorner className="absolute right-3 bottom-3 z-30 h-6 w-6 rotate-180 text-[var(--fh-accent)] sm:h-7 sm:w-7" />

      <FamilyHeritageMandala go={go} instant={instant} />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center">
        <div
          className="flex w-full flex-col items-center"
          style={{ maxWidth: "var(--fh-content-max)" }}
        >
          {/* Monogram */}
          <motion.div
            className="relative mb-2.5 flex h-11 w-11 items-center justify-center sm:mb-3 sm:h-12 sm:w-12"
            initial={false}
            animate={
              go
                ? { opacity: 1, scale: 1, rotate: 0 }
                : { opacity: 0, scale: 0.88, rotate: -5 }
            }
            transition={{
              duration: instant ? 0 : FAMILY_HERITAGE_MOTION.monogramDuration,
              delay: d(0.55),
              ease: EASE,
            }}
            whileHover={instant ? undefined : { scale: 1.04 }}
          >
            <svg
              viewBox="0 0 64 64"
              className="absolute inset-0 h-full w-full"
              aria-hidden
            >
              <motion.circle
                cx="32"
                cy="32"
                r="29"
                fill="none"
                stroke="rgba(181,138,80,0.78)"
                strokeWidth="0.9"
                strokeLinecap="round"
                initial={false}
                style={{ pathLength: 0 }}
                animate={
                  go
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: 0, opacity: 0.3 }
                }
                transition={{
                  duration: instant ? 0 : 0.65,
                  delay: d(0.4),
                  ease: EASE,
                }}
              />
              <motion.circle
                cx="32"
                cy="32"
                r="25.5"
                fill="none"
                stroke="rgba(217,189,140,0.55)"
                strokeWidth="0.55"
                strokeLinecap="round"
                initial={false}
                style={{ pathLength: 0 }}
                animate={
                  go
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: 0, opacity: 0.25 }
                }
                transition={{
                  duration: instant ? 0 : 0.6,
                  delay: d(0.48),
                  ease: EASE,
                }}
              />
            </svg>
            <span
              className="relative z-10 tracking-[0.06em]"
              style={{
                fontFamily: isBengali ? "var(--fh-font-bn)" : "var(--fh-font-hero)",
                fontSize: "0.78rem",
                color: "var(--fh-primary)",
              }}
            >
              {copy.monogram}
            </span>
          </motion.div>

          {/* Blessing */}
          <div className="overflow-hidden">
            <motion.p
              className="uppercase"
              style={{
                fontFamily: "var(--fh-font-en)",
                fontSize: "var(--fh-blessing-size)",
                letterSpacing: isBengali ? "0.08em" : "0.26em",
                color: "var(--fh-accent)",
                textTransform: isBengali ? "none" : "uppercase",
              }}
              initial={false}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 0, y: "110%" }}
              transition={{
                duration: instant ? 0 : FAMILY_HERITAGE_MOTION.blessingDuration,
                delay: d(0.7),
                ease: EASE,
              }}
            >
              {copy.blessing}
            </motion.p>
          </div>

          {/* Headings */}
          <header className="mt-2 w-full text-center sm:mt-2.5">
            <motion.p
              className="font-semibold uppercase"
              style={{
                fontFamily: "var(--fh-font-en)",
                fontSize: "var(--fh-heading-en-size)",
                letterSpacing: "var(--fh-heading-en-tracking)",
                color: "var(--fh-accent)",
              }}
              initial={false}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{
                duration: instant ? 0 : FAMILY_HERITAGE_MOTION.headingDuration,
                delay: d(0.85),
                ease: EASE,
              }}
            >
              {copy.headingEn}
            </motion.p>

            {isBengali ? (
              <div className="mt-1 overflow-hidden">
                <motion.p
                  className="text-balance font-semibold"
                  style={{
                    fontFamily: "var(--fh-font-bn)",
                    fontSize: "var(--fh-heading-bn-size)",
                    lineHeight: 1.35,
                    color: "var(--fh-body)",
                  }}
                  initial={false}
                  animate={go ? { opacity: 1, y: 0 } : { opacity: 0, y: "105%" }}
                  transition={{
                    duration: instant ? 0 : 0.5,
                    delay: d(0.95),
                    ease: EASE,
                  }}
                >
                  {copy.headingBn}
                </motion.p>
              </div>
            ) : null}
          </header>

          {/* Two family columns */}
          <div className="mt-3.5 w-full sm:mt-4">
            <div className="flex items-start gap-2.5 sm:gap-3.5">
              <FamilyColumn
                sectionLabel={copy.groom.sectionLabel}
                name={copy.groom.name}
                relation={copy.groom.relation}
                members={copy.groom.members}
                isBengali={isBengali}
                go={go}
                instant={instant}
                sideDelay={1.05}
              />

              <div
                className="mt-1 w-px shrink-0 self-stretch bg-gradient-to-b from-transparent via-[color:var(--fh-accent)]/50 to-transparent"
                aria-hidden
              />

              <FamilyColumn
                sectionLabel={copy.bride.sectionLabel}
                name={copy.bride.name}
                relation={copy.bride.relation}
                members={copy.bride.members}
                isBengali={isBengali}
                go={go}
                instant={instant}
                sideDelay={1.18}
              />
            </div>
          </div>

          {/* Closing plaque */}
          <motion.div
            className="mt-3.5 flex w-full max-w-[15rem] flex-col items-center sm:mt-4"
            initial={false}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{
              duration: instant ? 0 : FAMILY_HERITAGE_MOTION.closingDuration,
              delay: d(1.7),
              ease: EASE,
            }}
          >
            <div
              className="h-px w-10"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--fh-accent), transparent)",
              }}
              aria-hidden
            />
            <div
              className="mt-2 w-full px-3 py-1.5"
              style={{
                boxShadow:
                  "inset 0 0 0 1px color-mix(in srgb, var(--fh-border) 50%, transparent), inset 0 0 0 3px color-mix(in srgb, var(--fh-muted-gold) 30%, transparent)",
              }}
            >
              <p
                className="uppercase"
                style={{
                  fontFamily: "var(--fh-font-en)",
                  fontSize: "var(--fh-closing-size)",
                  letterSpacing: "0.16em",
                  color: "var(--fh-accent)",
                }}
              >
                {copy.closingLine}
              </p>
            </div>
            <div
              className="mt-2 h-px w-10"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--fh-accent), transparent)",
              }}
              aria-hidden
            />
          </motion.div>
        </div>
      </div>
    </article>
  );
}
