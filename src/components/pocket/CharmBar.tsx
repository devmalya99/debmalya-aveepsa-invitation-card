"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { StoryBirds } from "@/components/storybook/fx/StoryBirds";
import type { Dictionary } from "@/i18n/dictionaries/types";

type CharmBarProps = {
  dictionary: Dictionary;
};

const charms = [
  { id: "lotus", label: "পদ্ম", path: "M20 6c-4 5-7 9-7 14 0-5-3-9-7-14 4 2 7 2 14 0Zm0 28c4-5 7-9 7-14 0 5 3 9 7 14-4-2-7-2-14 0Z" },
  { id: "shankha", label: "শঙ্খ", path: "M26 8c6 5 9 13 5 21-4 8-14 12-22 8 9-1 15-7 14-15-1-7-6-11-12-12 7-2 12 0 15-2Z" },
  { id: "diya", label: "প্রদীপ", path: "M10 28c4-9 10-14 10-14s6 5 10 14c-6 4-14 4-20 0Zm10-16c0 4-2 6-2 6s-2-2-2-6 2-5 2-5 2 1 2 5Z" },
  { id: "birds", label: "পাখি", path: "M8 22c6-2 10-6 14-6-2 4-2 8 0 12-5-1-10-2-14-6Zm24 0c-6-2-10-6-14-6 2 4 2 8 0 12 5-1 10-2 14-6Z" },
] as const;

export function CharmBar({ dictionary }: CharmBarProps) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const showBirds = active === "birds";

  return (
    <section
      id="charms"
      className="relative flex h-dvh w-full snap-start snap-always flex-col overflow-hidden bg-[radial-gradient(ellipse_at_top,#491923,transparent_50%),#25171A]"
    >
      {showBirds ? <StoryBirds /> : null}

      <div className="relative z-10 px-4 pt-[max(4.5rem,calc(env(safe-area-inset-top)+3.5rem))]">
        <p className="font-label text-[0.62rem] uppercase tracking-[0.24em] text-antique-gold">
          {dictionary.pocket.charmsHint}
        </p>
        <h2 className="mt-2 font-display text-3xl text-soft-white">
          {dictionary.heritage.title}
        </h2>
        <p className="mt-3 max-w-sm font-body text-sm leading-relaxed text-dusty-rose">
          {dictionary.heritage.body}
        </p>
      </div>

      <div className="relative z-10 mt-8 grid grid-cols-2 gap-3 px-4">
        {charms.map((charm) => {
          const isOn = active === charm.id;
          return (
            <motion.button
              key={charm.id}
              type="button"
              onClick={() => {
                setActive(isOn ? null : charm.id);
                if ("vibrate" in navigator) navigator.vibrate?.(10);
              }}
              className={`rounded-2xl border px-3 py-5 text-left transition ${
                isOn
                  ? "border-antique-gold bg-antique-gold/15"
                  : "border-antique-gold/25 bg-dark-burgundy/40"
              }`}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            >
              <svg
                aria-hidden
                viewBox="0 0 40 40"
                className="h-10 w-10 text-antique-gold"
                fill="none"
              >
                <motion.path
                  d={charm.path}
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                  animate={
                    isOn && !reduceMotion
                      ? { pathLength: [0.2, 1], opacity: [0.5, 1] }
                      : { pathLength: 1, opacity: 1 }
                  }
                  transition={{ duration: 0.8 }}
                />
              </svg>
              <p className="mt-3 font-bengali-body text-sm text-soft-white">
                {charm.label}
              </p>
            </motion.button>
          );
        })}
      </div>

      <AnimateCharmFx active={active} />
    </section>
  );
}

function AnimateCharmFx({ active }: { active: string | null }) {
  const reduceMotion = useReducedMotion();
  if (!active || active === "birds" || reduceMotion) return null;

  const tone =
    active === "diya"
      ? "bg-[#f0c46a]"
      : active === "lotus"
        ? "bg-[#e891a8]"
        : "bg-[#f5efe4]";

  return (
    <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
      {Array.from({ length: 10 }).map((_, index) => (
        <motion.span
          key={`${active}-${index}`}
          className={`absolute h-2 w-2 rounded-full ${tone}`}
          style={{ left: `${8 + (index % 5) * 18}%`, bottom: "12%" }}
          initial={{ y: 0, opacity: 0, scale: 0.6 }}
          animate={{
            y: [0, -(120 + (index % 4) * 40)],
            opacity: [0, 1, 0],
            x: [(index % 2 === 0 ? -12 : 12), (index % 2 === 0 ? 18 : -18)],
          }}
          transition={{
            duration: 1.8 + (index % 3) * 0.25,
            delay: index * 0.12,
            repeat: Infinity,
          }}
        />
      ))}
      {active === "diya" ? (
        <motion.div
          className="absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(ellipse_at_bottom,rgba(240,196,106,0.28),transparent_70%)]"
          animate={{ opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
      ) : null}
    </div>
  );
}
