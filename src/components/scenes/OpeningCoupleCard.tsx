"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  DateMedallion,
  PortraitArchFrame,
} from "@/components/reveal/HeroOrnaments";
import { assets } from "@/data/assets";
import { useLanguage } from "@/hooks/useLanguage";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, registerGsap } from "@/lib/gsap";

type OpeningCoupleCardProps = {
  className?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;
/** Wait for envelope → film handoff to settle before the sequence starts. */
const SEQUENCE_START_MS = 380;

/** Layer A — couple composition with sequential Framer entrance. */
export function OpeningCoupleCard({ className = "" }: OpeningCoupleCardProps) {
  const { content, locale } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [sequenceOn, setSequenceOn] = useState(false);
  const copy = content.grandReveal;
  const isBengali = locale === "bn";
  const instant = reducedMotion;

  useEffect(() => {
    if (instant) {
      setSequenceOn(true);
      return;
    }
    const timer = window.setTimeout(() => setSequenceOn(true), SEQUENCE_START_MS);
    return () => window.clearTimeout(timer);
  }, [instant]);

  /* Ornament SVGs ship with dash-offset=1 for scrub scenes — settle them here. */
  useLayoutEffect(() => {
    if (!rootRef.current) return;
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.set(".reveal-draw-path", { strokeDashoffset: 0 });
      gsap.set(".reveal-plaque-border, .reveal-plaque-border-inner", {
        strokeDashoffset: 0,
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const go = sequenceOn || instant;

  return (
    <div
      ref={rootRef}
      className={`reveal-scene-fade flex w-full flex-col items-center text-center ${className}`}
    >
      <motion.div
        className="reveal-heading-mask relative z-10 overflow-hidden pb-0.5"
        initial={false}
        animate={
          go ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
        }
        transition={{
          duration: instant ? 0 : 0.55,
          delay: instant ? 0 : 0.85,
          ease: EASE,
        }}
      >
        <p
          className={`reveal-kicker text-[1.15rem] leading-none text-sindoor-red sm:text-[1.25rem] ${
            isBengali ? "font-bn-display" : "font-display tracking-[0.06em]"
          }`}
        >
          {copy.kicker}
        </p>
      </motion.div>

      <motion.div
        className="mt-2 h-px w-11 origin-center bg-gradient-to-r from-transparent via-antique-gold/80 to-transparent"
        initial={false}
        animate={go ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{
          duration: instant ? 0 : 0.45,
          delay: instant ? 0 : 1.0,
          ease: EASE,
        }}
      />

      <motion.div
        className="reveal-parallax-photo reveal-portrait-stage relative mt-2.5 w-[min(72vw,18.5rem)]"
        initial={false}
        animate={go ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
        transition={{
          duration: instant ? 0 : 0.7,
          delay: instant ? 0 : 0.05,
          ease: EASE,
        }}
      >
        <div className="pointer-events-none absolute -inset-5 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(185,154,88,0.2)_0%,transparent_68%)]" />

        <div className="relative aspect-square w-full">
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={go ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              duration: instant ? 0 : 0.55,
              delay: instant ? 0 : 0.15,
              ease: EASE,
            }}
          >
            <PortraitArchFrame />
          </motion.div>

          <div className="absolute inset-[5.5%] overflow-hidden rounded-full">
            <motion.div
              className="reveal-photo-reveal absolute inset-0 overflow-hidden rounded-full bg-[#2a1612] shadow-[inset_0_12px_28px_rgba(40,16,12,0.28)]"
              initial={false}
              animate={
                go
                  ? { clipPath: "circle(78% at 50% 50%)", opacity: 1 }
                  : { clipPath: "circle(0% at 50% 58%)", opacity: 0.85 }
              }
              transition={{
                duration: instant ? 0 : 1.05,
                delay: instant ? 0 : 0.12,
                ease: EASE,
              }}
            >
              <motion.div
                className="absolute inset-0"
                initial={false}
                animate={go ? { scale: 1 } : { scale: 1.14 }}
                transition={{
                  duration: instant ? 0 : 1.25,
                  delay: instant ? 0 : 0.12,
                  ease: EASE,
                }}
              >
                <Image
                  src={assets.couple.grandReveal}
                  alt={copy.namesEn}
                  fill
                  priority
                  unoptimized
                  className="reveal-photo object-cover object-[42%_center]"
                  sizes="(max-width: 430px) 72vw, 296px"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="mt-3 w-full px-1">
        <div className="reveal-names-bn-mask overflow-hidden pb-0.5">
          <motion.h1
            className="reveal-names-bn font-bn-display text-[1.65rem] leading-[1.22] text-balance text-[#5c1520] sm:text-[1.85rem]"
            initial={false}
            animate={go ? { opacity: 1, y: "0%" } : { opacity: 0, y: "110%" }}
            transition={{
              duration: instant ? 0 : 0.6,
              delay: instant ? 0 : 1.15,
              ease: EASE,
            }}
          >
            {copy.namesBn}
          </motion.h1>
        </div>

        <motion.p
          className="reveal-names-en mt-1 font-display text-[0.88rem] tracking-[0.12em] text-deep-burgundy/88 uppercase sm:text-[0.94rem]"
          initial={false}
          animate={
            go
              ? { opacity: 1, y: 0, letterSpacing: "0.12em" }
              : { opacity: 0, y: 10, letterSpacing: "0.22em" }
          }
          transition={{
            duration: instant ? 0 : 0.55,
            delay: instant ? 0 : 1.32,
            ease: EASE,
          }}
        >
          {copy.namesEn}
        </motion.p>

        <motion.div
          className="reveal-date-plaque"
          initial={false}
          animate={
            go
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 14, scale: 0.97 }
          }
          transition={{
            duration: instant ? 0 : 0.55,
            delay: instant ? 0 : 1.48,
            ease: EASE,
          }}
        >
          <DateMedallion
            dateBn={copy.date}
            dateEn={copy.dateEn}
            className="mt-3"
          />
        </motion.div>

        <motion.p
          className="reveal-location mt-3 font-display text-[0.78rem] tracking-[0.05em] text-deep-burgundy/85"
          initial={false}
          animate={go ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{
            duration: instant ? 0 : 0.5,
            delay: instant ? 0 : 1.64,
            ease: EASE,
          }}
        >
          {copy.location}
        </motion.p>

        <motion.p
          className={`reveal-tagline mx-auto mt-1.5 max-w-[17rem] text-[0.74rem] leading-relaxed text-deep-burgundy/75 ${
            isBengali ? "font-bn-body" : "font-display italic"
          }`}
          initial={false}
          animate={go ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{
            duration: instant ? 0 : 0.55,
            delay: instant ? 0 : 1.78,
            ease: EASE,
          }}
        >
          {copy.tagline}
        </motion.p>
      </div>
    </div>
  );
}
