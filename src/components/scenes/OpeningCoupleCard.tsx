"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { assets } from "@/data/assets";
import { useLanguage } from "@/hooks/useLanguage";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

type OpeningCoupleCardProps = {
  className?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

/** Royal cover — artwork frame with editorial type in the ivory arch. */
export function OpeningCoupleCard({ className = "" }: OpeningCoupleCardProps) {
  const { content, locale } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();
  const [sequenceOn, setSequenceOn] = useState(false);
  const copy = content.grandReveal;
  const isBengali = locale === "bn";
  const instant = reducedMotion;
  const go = sequenceOn || instant;

  useEffect(() => {
    if (instant) {
      setSequenceOn(true);
      return;
    }
    const timer = window.setTimeout(() => setSequenceOn(true), 40);
    return () => window.clearTimeout(timer);
  }, [instant]);

  const d = (ms: number) => (instant ? 0 : ms / 1000);

  return (
    <article
      className={`relative h-full min-h-0 w-full overflow-hidden ${className}`}
      aria-label={isBengali ? "বিবাহ আমন্ত্রণ প্রচ্ছদ" : "Wedding invitation cover"}
    >
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={go ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.04 }}
        transition={{ duration: instant ? 0 : 0.55, ease: EASE }}
      >
        <Image
          src={assets.decorations.royalCoverFrame}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_42%]"
        />
        {/* Soft parchment wash so type stays legible in the ivory arch. */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 38%, rgba(248,238,219,0.22) 0%, rgba(248,238,219,0.08) 42%, rgba(40,20,12,0.18) 100%)",
          }}
          aria-hidden
        />
      </motion.div>

      <div className="relative z-10 flex h-full min-h-0 w-full flex-col items-center justify-center px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(3.75rem,calc(env(safe-area-inset-top)+2.75rem))]">
        <div className="flex w-full max-w-[22rem] flex-col items-center text-center sm:max-w-[26rem]">
          {/* Monogram */}
          <motion.div
            className="relative mb-3 flex h-14 w-14 items-center justify-center sm:mb-4 sm:h-16 sm:w-16"
            initial={false}
            animate={
              go
                ? { opacity: 1, scale: 1, rotate: 0 }
                : { opacity: 0, scale: 0.86, rotate: -6 }
            }
            transition={{
              duration: instant ? 0 : 0.5,
              delay: d(900),
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
                stroke="rgba(181,138,80,0.75)"
                strokeWidth="0.9"
                strokeLinecap="round"
                initial={false}
                style={{ pathLength: 0 }}
                animate={
                  go
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: 0, opacity: 0.35 }
                }
                transition={{
                  duration: instant ? 0 : 0.7,
                  delay: d(400),
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
                  duration: instant ? 0 : 0.65,
                  delay: d(520),
                  ease: EASE,
                }}
              />
            </svg>
            <span
              className={`relative z-10 text-[0.95rem] tracking-[0.08em] text-[#5c1520] sm:text-[1.05rem] ${
                isBengali ? "font-bn-display" : "font-hero"
              }`}
            >
              {copy.monogram}
            </span>
          </motion.div>

          {/* Blessing */}
          <div className="overflow-hidden">
            <motion.p
              className={`text-[0.62rem] tracking-[0.28em] text-[#B58A50] uppercase sm:text-[0.68rem] ${
                isBengali ? "font-bn-body tracking-[0.12em] normal-case" : "font-display"
              }`}
              initial={false}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 0, y: "110%" }}
              transition={{
                duration: instant ? 0 : 0.55,
                delay: d(1300),
                ease: EASE,
              }}
            >
              {copy.blessing}
            </motion.p>
          </div>

          {/* Names */}
          <div className="mt-3 flex w-full flex-col items-center gap-0.5 sm:mt-4">
            <div className="overflow-hidden pb-0.5">
              <motion.h1
                className={`text-[clamp(2rem,9vw,2.85rem)] leading-[1.05] text-[#5c1520] ${
                  isBengali ? "font-bn-display font-semibold" : "font-hero font-medium"
                }`}
                initial={false}
                animate={go ? { opacity: 1, y: 0 } : { opacity: 0, y: "110%" }}
                transition={{
                  duration: instant ? 0 : 0.6,
                  delay: d(1800),
                  ease: EASE,
                }}
              >
                {copy.nameOne}
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.span
                className={`block text-[clamp(1.15rem,4.5vw,1.45rem)] leading-none text-[#B58A50] ${
                  isBengali ? "font-bn-display" : "font-display italic"
                }`}
                initial={false}
                animate={go ? { opacity: 1, y: 0 } : { opacity: 0, y: "110%" }}
                transition={{
                  duration: instant ? 0 : 0.5,
                  delay: d(2050),
                  ease: EASE,
                }}
              >
                {copy.ampersand}
              </motion.span>
            </div>
            <div className="overflow-hidden pb-0.5">
              <motion.h2
                className={`text-[clamp(2rem,9vw,2.85rem)] leading-[1.05] text-[#5c1520] ${
                  isBengali ? "font-bn-display font-semibold" : "font-hero font-medium"
                }`}
                initial={false}
                animate={go ? { opacity: 1, y: 0 } : { opacity: 0, y: "110%" }}
                transition={{
                  duration: instant ? 0 : 0.6,
                  delay: d(2200),
                  ease: EASE,
                }}
              >
                {copy.nameTwo}
              </motion.h2>
            </div>
          </div>

          {/* Date frame */}
          <motion.div
            className="mt-4 flex w-full max-w-[14rem] flex-col items-center sm:mt-5"
            initial={false}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{
              duration: instant ? 0 : 0.5,
              delay: d(2500),
              ease: EASE,
            }}
          >
            <div
              className="h-px w-12"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(181,138,80,0.85), transparent)",
              }}
              aria-hidden
            />
            <div
              className="mt-2.5 w-full px-3 py-2"
              style={{
                boxShadow:
                  "inset 0 0 0 1px rgba(181,138,80,0.45), inset 0 0 0 3px rgba(217,189,140,0.28)",
              }}
            >
              <p
                className={`text-[0.78rem] tracking-[0.18em] text-[#5c1520] uppercase sm:text-[0.85rem] ${
                  isBengali
                    ? "font-bn-display tracking-[0.04em] normal-case"
                    : "font-display"
                }`}
              >
                {isBengali ? copy.date : copy.dateEn}
              </p>
            </div>
            <div
              className="mt-2.5 h-px w-12"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(181,138,80,0.85), transparent)",
              }}
              aria-hidden
            />
          </motion.div>

          {/* Romantic line + explore */}
          <motion.p
            className={`mt-4 max-w-[17rem] text-[0.78rem] leading-relaxed text-[#702632]/88 sm:mt-5 sm:text-[0.84rem] ${
              isBengali ? "font-bn-body" : "font-display italic"
            }`}
            initial={false}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{
              duration: instant ? 0 : 0.5,
              delay: d(3000),
              ease: EASE,
            }}
          >
            {copy.tagline}
          </motion.p>

          <motion.div
            className="mt-3 flex flex-col items-center gap-1.5 sm:mt-4"
            initial={false}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{
              duration: instant ? 0 : 0.5,
              delay: d(3200),
              ease: EASE,
            }}
          >
            <p
              className={`text-[0.58rem] tracking-[0.24em] text-[#B58A50] uppercase sm:text-[0.62rem] ${
                isBengali ? "font-bn-body tracking-[0.08em] normal-case" : "font-display"
              }`}
            >
              {copy.exploreLabel}
            </p>
            <motion.span
              className="block text-[#B58A50]"
              aria-hidden
              animate={
                instant
                  ? { y: 0 }
                  : { y: [0, 5, 0] }
              }
              transition={
                instant
                  ? { duration: 0 }
                  : { duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: d(3600) }
              }
            >
              <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
                <path
                  d="M7 1v12.5M7 13.5 2.5 9M7 13.5 11.5 9"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.span>
          </motion.div>
        </div>
      </div>
    </article>
  );
}
