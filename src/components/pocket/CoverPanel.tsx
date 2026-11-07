"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { inviteMedia } from "@/config/invite-media";
import { WEDDING } from "@/config/wedding";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";

type CoverPanelProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function CoverPanel({ locale, dictionary }: CoverPanelProps) {
  const reduceMotion = useReducedMotion();
  const [opened, setOpened] = useState(false);
  const [bursts, setBursts] = useState<number[]>([]);

  function openInvite() {
    setOpened(true);
    setBursts((prev) => [...prev, Date.now()]);
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate?.(12);
    }
    window.setTimeout(() => {
      document
        .getElementById("moments")
        ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    }, 420);
  }

  return (
    <section
      id="cover"
      className="relative flex h-dvh w-full snap-start snap-always flex-col overflow-hidden bg-[#f0e2c4]"
    >
      <div className="relative mx-auto mt-[max(3.5rem,env(safe-area-inset-top))] h-[58dvh] w-[min(92vw,26rem)]">
        <Image
          src={inviteMedia.cover}
          alt=""
          fill
          priority
          sizes="92vw"
          className="object-contain object-center drop-shadow-[0_16px_30px_rgba(37,23,26,0.28)]"
        />
      </div>

      <div className="relative z-10 mt-auto flex flex-col items-center px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4 text-center">
        <p className="font-bengali-display text-xl text-antique-gold">
          {dictionary.hero.shubhoBibaho}
        </p>
        <h1 className="mt-1 font-display text-[clamp(1.8rem,8vw,2.6rem)] leading-none text-dark-burgundy">
          {WEDDING.couple.shortNames[locale]}
        </h1>
        <p className="mt-2 font-label text-[0.65rem] uppercase tracking-[0.22em] text-antique-gold">
          {dictionary.hero.date}
        </p>

        <button
          type="button"
          onClick={openInvite}
          className="mt-5 flex flex-col items-center gap-2"
          aria-label={dictionary.pocket.tapCover}
        >
          <motion.span
            className="grid h-14 w-14 place-items-center rounded-full border border-antique-gold/50 bg-deep-wine text-2xl text-soft-white shadow-[0_8px_24px_rgba(73,25,35,0.35)]"
            whileTap={reduceMotion ? undefined : { scale: 0.92 }}
            animate={
              reduceMotion || opened
                ? undefined
                : { scale: [1, 1.06, 1] }
            }
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            ♥
          </motion.span>
          <span className="font-label text-[0.62rem] uppercase tracking-[0.2em] text-dark-burgundy/70">
            {opened ? dictionary.pocket.openCard : dictionary.pocket.tapCover}
          </span>
        </button>
      </div>

      <AnimatePresence>
        {bursts.map((id) => (
          <motion.div
            key={id}
            className="pointer-events-none absolute inset-0 z-20"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4 }}
            onAnimationComplete={() =>
              setBursts((prev) => prev.filter((item) => item !== id))
            }
          >
            {Array.from({ length: 14 }).map((_, index) => {
              const angle = (index / 14) * Math.PI * 2;
              return (
                <motion.span
                  key={index}
                  className="absolute left-1/2 top-[62%] h-2.5 w-2 rounded-full bg-[#e891a8]"
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos(angle) * (70 + (index % 4) * 18),
                    y: Math.sin(angle) * (90 + (index % 3) * 22) - 40,
                    opacity: 0,
                    scale: 0.4,
                  }}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                />
              );
            })}
          </motion.div>
        ))}
      </AnimatePresence>
    </section>
  );
}
