"use client";

import { motion } from "motion/react";
import { WEDDING_CARD_MOTION } from "@/config/weddingCard";

type WeddingCardDatePlaqueProps = {
  bengaliDate: string;
  go: boolean;
  instant: boolean;
  delay: number;
};

export function WeddingCardDatePlaque({
  bengaliDate,
  go,
  instant,
  delay,
}: WeddingCardDatePlaqueProps) {
  return (
    <motion.div
      className="mx-auto mt-3 inline-flex max-w-full flex-col items-center"
      initial={false}
      animate={
        go
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 10, scale: 0.96 }
      }
      transition={{
        duration: instant ? 0 : WEDDING_CARD_MOTION.eventDuration,
        delay: instant ? 0 : delay,
        ease: WEDDING_CARD_MOTION.ease,
      }}
    >
      <div
        className="relative px-4 py-2"
        style={{
          background: "var(--wc-plaque-bg)",
          color: "var(--wc-plaque-text)",
          boxShadow: "inset 0 0 0 1px var(--wc-plaque-border)",
        }}
      >
        <span
          className="pointer-events-none absolute inset-[3px]"
          style={{ boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--wc-plaque-border) 45%, transparent)" }}
          aria-hidden
        />
        <p
          className="relative text-center"
          style={{
            fontFamily: "var(--wc-font-bn)",
            fontSize: "var(--wc-date-bn-size)",
            lineHeight: 1.35,
          }}
        >
          {bengaliDate}
        </p>
      </div>
    </motion.div>
  );
}
