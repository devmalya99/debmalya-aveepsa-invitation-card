"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { getCountdownParts, type CountdownParts } from "@/lib/countdown";
import type { Dictionary } from "@/i18n/dictionaries/types";

type LiveCountdownProps = {
  dictionary: Dictionary;
};

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function LiveCountdown({ dictionary }: LiveCountdownProps) {
  const reduceMotion = useReducedMotion();
  const [parts, setParts] = useState<CountdownParts | null>(null);
  const d = dictionary.countdown;

  useEffect(() => {
    const tick = () => setParts(getCountdownParts());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!parts) {
    return (
      <div className="mx-auto grid max-w-2xl grid-cols-4 gap-3 sm:gap-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-24 animate-pulse border border-antique-gold/20 bg-dark-burgundy/40"
          />
        ))}
      </div>
    );
  }

  if (parts.complete) {
    return (
      <p className="mx-auto max-w-xl text-center font-display text-2xl text-antique-gold sm:text-3xl">
        {d.celebrated}
      </p>
    );
  }

  const units: Array<{ label: string; value: string }> = [
    { label: d.days, value: String(parts.days) },
    { label: d.hours, value: pad(parts.hours) },
    { label: d.minutes, value: pad(parts.minutes) },
    { label: d.seconds, value: pad(parts.seconds) },
  ];

  return (
    <div className="mx-auto grid max-w-2xl grid-cols-4 gap-3 sm:gap-5">
      {units.map((unit) => (
        <div
          key={unit.label}
          className="border border-antique-gold/35 bg-dark-burgundy/45 px-2 py-5 text-center backdrop-blur-sm"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.p
              key={unit.value}
              className="font-display text-3xl text-antique-gold sm:text-5xl"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {unit.value}
            </motion.p>
          </AnimatePresence>
          <p className="mt-2 font-label text-[0.65rem] uppercase tracking-[0.2em] text-muted-champagne">
            {unit.label}
          </p>
        </div>
      ))}
    </div>
  );
}
