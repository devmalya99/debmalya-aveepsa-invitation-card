"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SceneWrapper } from "@/components/experience/SceneWrapper";
import { assets } from "@/data/assets";
import { useLanguage } from "@/hooks/useLanguage";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";
import { registerGsap, ScrollTrigger } from "@/lib/gsap";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const staggerBlock = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

/**
 * Editorial celebration folio — atmosphere only, no address or maps.
 * Natural document flow with Framer whileInView entrances (no GSAP pin).
 */
export function VenueReveal() {
  const { content, locale } = useLanguage();
  const prefersReduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const venue = content.venue;
  const isBengali = locale === "bn";
  const instant = prefersReduced;

  /*
   * Lightweight marker for auto-play / progress — never pin.
   * An empty scrub timeline was locking scroll past this section.
   */
  useEffect(() => {
    if (!sectionRef.current) return;
    registerGsap();

    const trigger = ScrollTrigger.create({
      id: "pin-venue-reveal",
      trigger: sectionRef.current,
      start: "top 80%",
      end: "bottom top",
      invalidateOnRefresh: true,
    });

    const refresh = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    const later = window.setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      window.cancelAnimationFrame(refresh);
      window.clearTimeout(later);
      trigger.kill();
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    instant ? [0, 0] : [16, -16],
  );

  const view = {
    once: true,
    amount: 0.35,
  } as const;

  return (
    <SceneWrapper
      ref={sectionRef}
      id="venue-reveal"
      tone="ivory"
      layout="flow"
      innerClassName="max-w-[26rem] items-center sm:max-w-lg"
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={instant ? false : { opacity: 0 }}
        whileInView={instant ? undefined : { opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.55, ease: EASE }}
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_18%,rgba(185,154,88,0.12),transparent_55%)]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto flex w-full max-w-[22rem] flex-col items-center text-center sm:max-w-[24rem]">
        {/* Section A — Introduction */}
        <motion.p
          className={`text-[0.62rem] tracking-[0.28em] text-[#B58A50] uppercase sm:text-[0.68rem] ${
            isBengali ? "font-bn-body tracking-[0.1em] normal-case" : "font-display"
          }`}
          variants={fadeUp}
          initial={instant ? false : "hidden"}
          whileInView={instant ? undefined : "visible"}
          viewport={view}
          transition={{ duration: instant ? 0 : 0.5, ease: EASE }}
        >
          {venue.eyebrow}
        </motion.p>

        <div className="mt-2.5 overflow-hidden pb-0.5">
          <motion.h2
            className={`text-[clamp(1.85rem,7.5vw,2.45rem)] leading-[1.12] text-[#5c1520] ${
              isBengali ? "font-bn-display font-semibold" : "font-display font-medium"
            }`}
            initial={instant ? false : { opacity: 0, y: "110%" }}
            whileInView={instant ? undefined : { opacity: 1, y: "0%" }}
            viewport={view}
            transition={{ duration: instant ? 0 : 0.6, delay: instant ? 0 : 0.08, ease: EASE }}
          >
            {venue.heading}
          </motion.h2>
        </div>

        <motion.p
          className={`mt-2 max-w-[18rem] text-[0.88rem] leading-relaxed text-deep-burgundy/82 sm:text-[0.95rem] ${
            isBengali ? "font-bn-body" : "font-letter italic"
          }`}
          variants={fadeUp}
          initial={instant ? false : "hidden"}
          whileInView={instant ? undefined : "visible"}
          viewport={view}
          transition={{ duration: instant ? 0 : 0.5, delay: instant ? 0 : 0.16, ease: EASE }}
        >
          {venue.subtitle}
        </motion.p>

        <motion.div
          className="mt-4 h-px w-14 origin-center bg-gradient-to-r from-transparent via-antique-gold to-transparent"
          initial={instant ? false : { opacity: 0, scaleX: 0.3 }}
          whileInView={instant ? undefined : { opacity: 1, scaleX: 1 }}
          viewport={view}
          transition={{ duration: instant ? 0 : 0.45, delay: instant ? 0 : 0.22, ease: EASE }}
          aria-hidden
        />

        {/* Section B — Hero photograph */}
        <motion.figure
          className="mt-6 w-[92%] sm:w-full"
          initial={instant ? false : { opacity: 0, scale: 0.985 }}
          whileInView={instant ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: instant ? 0 : 0.65, delay: instant ? 0 : 0.05, ease: EASE }}
        >
          <div
            ref={photoRef}
            className="relative overflow-hidden rounded-[0.35rem] p-[3px] shadow-[0_14px_34px_rgba(64,21,29,0.12)]"
            style={{
              boxShadow:
                "inset 0 0 0 1px rgba(181,138,80,0.55), inset 0 0 0 3px rgba(217,189,140,0.35), 0 14px 34px rgba(64,21,29,0.12)",
            }}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[0.22rem] bg-[#E5D1AE]/40">
              <motion.div
                className="absolute inset-0"
                style={{ y: parallaxY }}
                initial={instant ? false : { opacity: 0, scale: 1.08 }}
                whileInView={instant ? undefined : { opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: instant ? 0 : 0.85, ease: EASE }}
              >
                <Image
                  src={assets.decorations.bhagirathiBoat}
                  alt=""
                  fill
                  sizes="(max-width: 430px) 90vw, 420px"
                  className="object-cover object-[center_42%]"
                  priority={false}
                />
              </motion.div>
            </div>
          </div>

          <figcaption className="mt-3 flex items-center justify-center gap-3">
            <motion.span
              className="h-px w-6 bg-gradient-to-r from-transparent to-antique-gold/80"
              initial={instant ? false : { opacity: 0, x: -8 }}
              whileInView={instant ? undefined : { opacity: 1, x: 0 }}
              viewport={view}
              transition={{ duration: instant ? 0 : 0.45, delay: instant ? 0 : 0.15, ease: EASE }}
              aria-hidden
            />
            <motion.p
              className={`text-[0.58rem] tracking-[0.22em] text-[#B58A50] uppercase sm:text-[0.62rem] ${
                isBengali ? "font-bn-body tracking-[0.08em] normal-case" : "font-display"
              }`}
              initial={instant ? false : { opacity: 0, y: 8 }}
              whileInView={instant ? undefined : { opacity: 1, y: 0 }}
              viewport={view}
              transition={{ duration: instant ? 0 : 0.45, delay: instant ? 0 : 0.2, ease: EASE }}
            >
              {venue.photoCaption}
            </motion.p>
            <motion.span
              className="h-px w-6 bg-gradient-to-l from-transparent to-antique-gold/80"
              initial={instant ? false : { opacity: 0, x: 8 }}
              whileInView={instant ? undefined : { opacity: 1, x: 0 }}
              viewport={view}
              transition={{ duration: instant ? 0 : 0.45, delay: instant ? 0 : 0.15, ease: EASE }}
              aria-hidden
            />
          </figcaption>
        </motion.figure>

        {/* Section C — Celebration description */}
        <motion.div
          className="mt-8 w-full max-w-[20rem]"
          variants={instant ? undefined : staggerBlock}
          initial={instant ? false : "hidden"}
          whileInView={instant ? undefined : "visible"}
          viewport={view}
        >
          <motion.h3
            className={`text-[clamp(1.2rem,4.8vw,1.45rem)] leading-snug text-[#5c1520] ${
              isBengali ? "font-bn-display font-semibold" : "font-display"
            }`}
            variants={fadeUp}
            transition={{ duration: instant ? 0 : 0.5, ease: EASE }}
          >
            {venue.storyHeading}
          </motion.h3>
          <motion.p
            className={`mt-3 text-[0.88rem] leading-[1.65] text-deep-burgundy/88 sm:text-[0.92rem] ${
              isBengali ? "font-bn-body" : "font-letter"
            }`}
            variants={fadeUp}
            transition={{ duration: instant ? 0 : 0.55, ease: EASE }}
          >
            {venue.storyBody}
          </motion.p>
        </motion.div>

        {/* Section D — Closing */}
        <motion.div
          className="mt-10 mb-2 flex w-full max-w-[18rem] flex-col items-center"
          variants={instant ? undefined : staggerBlock}
          initial={instant ? false : "hidden"}
          whileInView={instant ? undefined : "visible"}
          viewport={view}
        >
          <motion.div
            className="flex items-center gap-2"
            variants={fadeUp}
            transition={{ duration: instant ? 0 : 0.45, ease: EASE }}
            aria-hidden
          >
            <span className="h-px w-8 bg-gradient-to-r from-transparent via-antique-gold to-transparent" />
            <span className="h-1.5 w-1.5 rotate-45 border border-antique-gold/70" />
            <span className="h-px w-8 bg-gradient-to-r from-transparent via-antique-gold to-transparent" />
          </motion.div>

          <motion.p
            className={`mt-4 text-[0.95rem] leading-relaxed text-[#702632] sm:text-[1.02rem] ${
              isBengali ? "font-bn-display" : "font-display italic"
            }`}
            variants={fadeUp}
            transition={{ duration: instant ? 0 : 0.55, ease: EASE }}
          >
            {venue.closing}
          </motion.p>
        </motion.div>
      </div>
    </SceneWrapper>
  );
}
