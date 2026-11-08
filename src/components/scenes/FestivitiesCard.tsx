"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { WeddingCardDivider } from "@/components/events/WeddingCardDivider";
import { WeddingCardEventBlock } from "@/components/events/WeddingCardEventBlock";
import {
  getWeddingCardCopy,
  WEDDING_CARD_MOTION,
} from "@/config/weddingCard";
import { useLanguage } from "@/hooks/useLanguage";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

type FestivitiesCardProps = {
  className?: string;
};

/**
 * Royal editorial Wedding Celebrations card for the opening canvas.
 * Copy + tokens: `src/config/weddingCard.ts`. Atmosphere stays on GrandReveal.
 */
export function FestivitiesCard({ className = "" }: FestivitiesCardProps) {
  const { locale } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();
  const [sequenceOn, setSequenceOn] = useState(false);
  const copy = getWeddingCardCopy(locale);
  const [wedding, reception] = copy.items;
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
      WEDDING_CARD_MOTION.sequenceStartMs,
    );
    return () => window.clearTimeout(timer);
  }, [instant]);

  return (
    <motion.div
      className={`wedding-card relative flex h-full min-h-0 w-full flex-col items-center justify-center ${className}`}
      initial={
        instant
          ? false
          : { opacity: 0, scale: 0.98, filter: "blur(8px)" }
      }
      animate={
        go
          ? { opacity: 1, scale: 1, filter: "blur(0px)" }
          : { opacity: 0, scale: 0.98, filter: "blur(8px)" }
      }
      transition={{
        duration: instant ? 0 : WEDDING_CARD_MOTION.shellDuration,
        ease: WEDDING_CARD_MOTION.ease,
      }}
      style={{ maxWidth: "var(--wc-content-max)" }}
    >
      {/* Soft paper sheen — behind content */}
      <div
        className="wedding-card-shimmer pointer-events-none absolute inset-x-[-8%] inset-y-[-4%] z-0 opacity-60"
        aria-hidden
      />

      {/* Sparse floating accents */}
      <span
        className="wedding-card-float pointer-events-none absolute top-[8%] left-[6%] z-0 h-2 w-2 rounded-full opacity-35"
        style={{ background: "var(--wc-accent)" }}
        aria-hidden
      />
      <span
        className="wedding-card-float-delayed pointer-events-none absolute top-[18%] right-[8%] z-0 h-1.5 w-1.5 rounded-full opacity-30"
        style={{ background: "var(--wc-primary)" }}
        aria-hidden
      />
      <span
        className="wedding-card-float pointer-events-none absolute bottom-[14%] left-[10%] z-0 h-1.5 w-1.5 rotate-45 opacity-25"
        style={{ background: "var(--wc-accent)" }}
        aria-hidden
      />

      <div className="relative z-10 flex w-full flex-col items-center px-1">
        <header className="w-full shrink-0 text-center">
          <motion.p
            className="uppercase"
            style={{
              fontFamily: "var(--wc-font-en)",
              fontSize: "var(--wc-eyebrow-size)",
              letterSpacing: "0.22em",
              color: "var(--wc-accent)",
            }}
            initial={false}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{
              duration: instant ? 0 : 0.45,
              delay: d(0.08),
              ease: WEDDING_CARD_MOTION.ease,
            }}
          >
            {copy.eyebrow}
          </motion.p>

          <div className="mt-2.5 overflow-hidden">
            <motion.h2
              className="text-balance"
              style={{
                fontFamily: "var(--wc-font-bn)",
                fontSize: "var(--wc-heading-bn-size)",
                lineHeight: 1.28,
                color: "var(--wc-primary)",
              }}
              initial={false}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 0, y: "100%" }}
              transition={{
                duration: instant ? 0 : WEDDING_CARD_MOTION.headingDuration,
                delay: d(0.18),
                ease: WEDDING_CARD_MOTION.ease,
              }}
            >
              {copy.headingBn}
            </motion.h2>
          </div>

          <motion.p
            className="mt-1.5"
            style={{
              fontFamily: "var(--wc-font-en)",
              fontSize: "var(--wc-heading-en-size)",
              letterSpacing: "0.04em",
              color: "var(--wc-secondary)",
            }}
            initial={false}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{
              duration: instant ? 0 : 0.45,
              delay: d(0.36),
              ease: WEDDING_CARD_MOTION.ease,
            }}
          >
            {copy.headingEn}
          </motion.p>

          <motion.p
            className="mt-1.5 text-balance"
            style={{
              fontFamily: "var(--wc-font-bn)",
              fontSize: "var(--wc-subtitle-size)",
              color: "var(--wc-body)",
              lineHeight: 1.4,
            }}
            initial={false}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{
              duration: instant ? 0 : 0.4,
              delay: d(0.46),
              ease: WEDDING_CARD_MOTION.ease,
            }}
          >
            {copy.subtitle}
          </motion.p>

          <motion.div
            className="mx-auto mt-3 flex justify-center"
            style={{ color: "var(--wc-accent)" }}
            initial={false}
            animate={
              go
                ? { opacity: 1, scaleX: 1 }
                : { opacity: 0, scaleX: 0.4 }
            }
            transition={{
              duration: instant ? 0 : WEDDING_CARD_MOTION.ornamentDuration,
              delay: d(0.56),
              ease: WEDDING_CARD_MOTION.ease,
            }}
          >
            <WeddingCardDivider className="h-4 w-[9.5rem]" />
          </motion.div>
        </header>

        <div
          className="flex w-full flex-col items-center"
          style={{
            marginTop: "var(--wc-section-gap)",
            gap: "var(--wc-event-gap)",
          }}
        >
          <WeddingCardEventBlock
            event={wedding}
            go={go}
            instant={instant}
            baseDelay={WEDDING_CARD_MOTION.eventBaseDelays[0]}
          />

          <motion.div
            className="flex w-full flex-col items-center gap-2"
            style={{ color: "var(--wc-accent)" }}
            initial={false}
            animate={go ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              duration: instant ? 0 : 0.4,
              delay: d(1.12),
              ease: WEDDING_CARD_MOTION.ease,
            }}
          >
            <div
              className="h-px w-16 origin-center"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--wc-accent), transparent)",
              }}
            />
          </motion.div>

          <WeddingCardEventBlock
            event={reception}
            go={go}
            instant={instant}
            baseDelay={WEDDING_CARD_MOTION.eventBaseDelays[1]}
          />
        </div>

        <motion.footer
          className="w-full shrink-0 text-center"
          style={{ marginTop: "var(--wc-section-gap)" }}
          initial={false}
          animate={go ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{
            duration: instant ? 0 : WEDDING_CARD_MOTION.footerDuration,
            delay: d(WEDDING_CARD_MOTION.footerDelay),
            ease: WEDDING_CARD_MOTION.ease,
          }}
        >
          <WeddingCardDivider className="mx-auto h-3.5 w-[7.5rem]" />
          <p
            className="mt-2"
            style={{
              fontFamily: "var(--wc-font-en)",
              fontSize: "1rem",
              color: "var(--wc-accent)",
              lineHeight: 1,
            }}
            aria-hidden
          >
            ♥
          </p>
          <p
            className="mt-1.5 uppercase"
            style={{
              fontFamily: "var(--wc-font-en)",
              fontSize: "var(--wc-footer-size)",
              letterSpacing: "0.18em",
              color: "var(--wc-body)",
            }}
          >
            {copy.footer}
          </p>
        </motion.footer>
      </div>
    </motion.div>
  );
}
