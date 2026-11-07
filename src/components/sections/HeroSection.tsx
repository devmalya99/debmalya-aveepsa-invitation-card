"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { FloralCorner } from "@/components/decorations";
import { MotionCard } from "@/components/animations/MotionCard";
import type { Dictionary } from "@/i18n/dictionaries/types";

type HeroSectionProps = {
  dictionary: Dictionary;
};

export function HeroSection({ dictionary }: HeroSectionProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : -40],
  );
  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.65],
    [1, reduceMotion ? 1 : 0.2],
  );
  const d = dictionary.hero;

  return (
    <section
      ref={ref}
      id="opening"
      className="section-shell relative flex min-h-dvh items-center justify-center px-5 pb-16 pt-24"
    >
      <FloralCorner corner="tl" className="left-3 top-20 opacity-80 sm:left-8" />
      <FloralCorner corner="tr" className="right-3 top-20 opacity-80 sm:right-8" />

      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <MotionCard from="top" delay={0.05}>
          <p className="font-bengali-display text-2xl text-antique-gold sm:text-3xl">
            {d.shubhoBibaho}
          </p>
        </MotionCard>

        <MotionCard from="left" delay={0.15} className="mt-6">
          <h1 className="font-display text-5xl leading-none tracking-wide text-soft-white sm:text-7xl">
            {d.partnerOne}
          </h1>
        </MotionCard>

        <MotionCard from="scale" delay={0.28}>
          <span className="my-2 block font-display text-3xl text-antique-gold sm:text-4xl">
            {d.ampersand}
          </span>
        </MotionCard>

        <MotionCard from="right" delay={0.22}>
          <h1 className="font-display text-5xl leading-none tracking-wide text-soft-white sm:text-7xl">
            {d.partnerTwo}
          </h1>
        </MotionCard>

        <MotionCard from="bottom" delay={0.4} className="mt-8">
          <p className="font-label text-xs uppercase tracking-[0.28em] text-muted-champagne sm:text-sm">
            {d.date}
          </p>
        </MotionCard>

        <MotionCard from="bottom" delay={0.5} className="mt-4">
          <p className="max-w-md font-display text-xl italic text-dusty-rose sm:text-2xl">
            {d.tagline}
          </p>
        </MotionCard>

        <MotionCard from="top" delay={0.7} className="mt-14">
          <div className="flex flex-col items-center gap-2 text-muted-champagne/80">
            <span className="font-label text-[0.65rem] uppercase tracking-[0.3em]">
              {d.scrollHint}
            </span>
            <span className="h-8 w-px bg-gradient-to-b from-antique-gold to-transparent" />
          </div>
        </MotionCard>
      </motion.div>
    </section>
  );
}
