"use client";

import { motion, useReducedMotion } from "motion/react";

function PetalSvg({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 32" className={className} fill="currentColor">
      <path d="M12 2C8 8 4 14 5 21c1 5 4 8 7 9 3-1 6-4 7-9 1-7-3-13-7-19Z" />
    </svg>
  );
}

const flakes = Array.from({ length: 12 }, (_, id) => ({
  id,
  left: `${5 + ((id * 8) % 90)}%`,
  size: 12 + (id % 4) * 4,
  delay: id * 0.45,
  duration: 10 + (id % 5),
  drift: id % 2 === 0 ? 28 : -24,
  color:
    id % 3 === 0
      ? "text-[#f2b6c4]/80"
      : id % 3 === 1
        ? "text-[#e891a8]/75"
        : "text-[#fff1f4]/70",
}));

export function StoryPetals() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[15] overflow-hidden"
    >
      {flakes.map((flake) => (
        <motion.div
          key={flake.id}
          className={`absolute top-[-10%] ${flake.color}`}
          style={{ left: flake.left, width: flake.size }}
          animate={{
            y: ["0vh", "115vh"],
            x: [0, flake.drift, flake.drift * 0.35],
            rotate: [0, 80, 160],
            opacity: [0, 0.85, 0.65, 0],
          }}
          transition={{
            duration: flake.duration,
            delay: flake.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <PetalSvg className="h-auto w-full drop-shadow-sm" />
        </motion.div>
      ))}
    </div>
  );
}
