"use client";

import { motion } from "motion/react";
import { WeddingCardDatePlaque } from "@/components/events/WeddingCardDatePlaque";
import {
  WEDDING_CARD_MOTION,
  type WeddingCardEvent,
} from "@/config/weddingCard";

type WeddingCardEventBlockProps = {
  event: WeddingCardEvent;
  go: boolean;
  instant: boolean;
  baseDelay: number;
  /** English locale must not render Bengali titles/dates. */
  showBengali?: boolean;
};

export function WeddingCardEventBlock({
  event,
  go,
  instant,
  baseDelay,
  showBengali = true,
}: WeddingCardEventBlockProps) {
  const d = (offset: number) => (instant ? 0 : baseDelay + offset);
  const accentColor =
    event.accent === "turmeric" ? "var(--wc-accent)" : "var(--wc-primary)";

  return (
    <motion.article
      className="w-full text-center"
      initial={false}
      animate={go ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{
        duration: instant ? 0 : WEDDING_CARD_MOTION.eventDuration,
        delay: d(0),
        ease: WEDDING_CARD_MOTION.ease,
      }}
    >
      <motion.p
        className="uppercase"
        style={{
          fontFamily: "var(--wc-font-en)",
          fontSize: showBengali
            ? "var(--wc-event-label-size)"
            : "var(--wc-event-title-size)",
          letterSpacing: showBengali ? "0.18em" : "0.08em",
          color: showBengali ? accentColor : "var(--wc-secondary)",
          lineHeight: 1.25,
        }}
        initial={false}
        animate={go ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{
          duration: instant ? 0 : 0.4,
          delay: d(0.06),
          ease: WEDDING_CARD_MOTION.ease,
        }}
      >
        {event.titleEn}
      </motion.p>

      {showBengali ? (
        <motion.h3
          className="mt-2 text-balance"
          style={{
            fontFamily: "var(--wc-font-bn)",
            fontSize: "var(--wc-event-title-size)",
            lineHeight: 1.3,
            color: "var(--wc-secondary)",
          }}
          initial={false}
          animate={go ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{
            duration: instant ? 0 : 0.5,
            delay: d(0.14),
            ease: WEDDING_CARD_MOTION.ease,
          }}
        >
          {event.titleBn}
        </motion.h3>
      ) : null}

      <WeddingCardDatePlaque
        date={showBengali ? event.bengaliDate : event.englishDate}
        useBengaliScript={showBengali}
        go={go}
        instant={instant}
        delay={d(0.24)}
      />

      {showBengali ? (
        <motion.p
          className="mt-2.5"
          style={{
            fontFamily: "var(--wc-font-en)",
            fontSize: "var(--wc-date-en-size)",
            lineHeight: 1.35,
            color: "var(--wc-primary)",
          }}
          initial={false}
          animate={go ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{
            duration: instant ? 0 : 0.4,
            delay: d(0.34),
            ease: WEDDING_CARD_MOTION.ease,
          }}
        >
          {event.englishDate}
        </motion.p>
      ) : null}

      <motion.p
        className={showBengali ? "mt-1" : "mt-2.5"}
        style={{
          fontFamily: "var(--wc-font-en)",
          fontSize: "var(--wc-meta-size)",
          letterSpacing: "0.04em",
          color: "var(--wc-body)",
        }}
        initial={false}
        animate={go ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{
          duration: instant ? 0 : 0.4,
          delay: d(showBengali ? 0.42 : 0.34),
          ease: WEDDING_CARD_MOTION.ease,
        }}
      >
        {event.day}
        <span className="mx-1.5 opacity-40" aria-hidden>
          ·
        </span>
        {event.time}
      </motion.p>
    </motion.article>
  );
}
