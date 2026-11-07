"use client";

import { motion, useReducedMotion } from "motion/react";

const stars = [
  { top: "14%", left: "18%", delay: 0 },
  { top: "22%", left: "62%", delay: 1.4 },
  { top: "30%", left: "78%", delay: 2.8 },
  { top: "18%", left: "42%", delay: 4.1 },
];

export function StoryStars() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[13] overflow-hidden">
      {stars.map((star, index) => (
        <motion.span
          key={index}
          className="absolute h-px w-28 origin-left bg-gradient-to-r from-transparent via-[#FFFDF8] to-transparent"
          style={{ top: star.top, left: star.left, rotate: -28 }}
          initial={{ opacity: 0, x: -40, scaleX: 0.2 }}
          animate={{
            opacity: [0, 1, 0],
            x: [0, 160],
            scaleX: [0.2, 1, 0.4],
          }}
          transition={{
            duration: 2.2,
            delay: star.delay,
            repeat: Infinity,
            repeatDelay: 5,
            ease: "easeOut",
          }}
        />
      ))}
      {Array.from({ length: 24 }).map((_, index) => (
        <motion.span
          key={`dot-${index}`}
          className="absolute h-1 w-1 rounded-full bg-[#FFFDF8]/80"
          style={{
            top: `${8 + ((index * 17) % 50)}%`,
            left: `${6 + ((index * 29) % 88)}%`,
          }}
          animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{
            duration: 2.6 + (index % 4) * 0.4,
            repeat: Infinity,
            delay: index * 0.12,
          }}
        />
      ))}
    </div>
  );
}
