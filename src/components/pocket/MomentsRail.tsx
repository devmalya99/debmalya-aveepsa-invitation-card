"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { momentCards } from "@/config/invite-media";
import type { Dictionary } from "@/i18n/dictionaries/types";

type MomentsRailProps = {
  dictionary: Dictionary;
};

export function MomentsRail({ dictionary }: MomentsRailProps) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [spark, setSpark] = useState(false);

  return (
    <section
      id="moments"
      className="relative flex h-dvh w-full snap-start snap-always flex-col overflow-hidden bg-dark-burgundy"
    >
      <div className="px-4 pt-[max(4.5rem,calc(env(safe-area-inset-top)+3.5rem))]">
        <p className="font-label text-[0.62rem] uppercase tracking-[0.24em] text-antique-gold">
          {dictionary.pocket.momentsHint}
        </p>
        <h2 className="mt-2 font-display text-3xl text-soft-white">
          {dictionary.hero.tagline}
        </h2>
      </div>

      <div className="mt-5 flex-1 overflow-hidden">
        <div
          className="flex h-full snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onScroll={(event) => {
            const el = event.currentTarget;
            const index = Math.round(el.scrollLeft / (el.clientWidth * 0.78));
            setActive(Math.min(Math.max(index, 0), momentCards.length - 1));
          }}
        >
          {momentCards.map((card, index) => (
            <motion.button
              key={card.id}
              type="button"
              className="relative h-[58dvh] w-[78vw] max-w-[22rem] shrink-0 snap-center overflow-hidden rounded-[1.25rem] border border-antique-gold/25 bg-[#f0e2c4] shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
              whileTap={reduceMotion ? undefined : { scale: 0.985 }}
              onClick={() => {
                setActive(index);
                setSpark(true);
                window.setTimeout(() => setSpark(false), 700);
                if ("vibrate" in navigator) navigator.vibrate?.(8);
              }}
            >
              <Image
                src={card.src}
                alt=""
                fill
                sizes="78vw"
                className="object-contain object-center p-1"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark-burgundy/85 via-dark-burgundy/40 to-transparent px-3 pb-3 pt-12 text-left">
                <span className="font-label text-[0.6rem] uppercase tracking-[0.2em] text-antique-gold">
                  {String(index + 1).padStart(2, "0")} / {momentCards.length}
                </span>
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-1.5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        {momentCards.map((card, index) => (
          <span
            key={card.id}
            className={`h-1.5 rounded-full transition-all ${
              active === index
                ? "w-5 bg-antique-gold"
                : "w-1.5 bg-soft-white/35"
            }`}
          />
        ))}
      </div>

      {spark ? (
        <motion.div
          className="pointer-events-none absolute inset-0 z-10"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-antique-gold/20 blur-2xl" />
        </motion.div>
      ) : null}
    </section>
  );
}
