"use client";

import { motion, useReducedMotion } from "motion/react";

function Leaf({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 28 40" className={className} fill="currentColor">
      <path d="M14 2C8 10 3 18 3 25c0 7 5 12 11 13 6-1 11-6 11-13C25 18 20 10 14 2Z" />
      <path
        d="M14 8c-1 6-2 11-2 16"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="1.2"
      />
    </svg>
  );
}

const leaves = Array.from({ length: 8 }, (_, id) => ({
  id,
  left: `${10 + id * 11}%`,
  delay: id * 0.7,
  duration: 12 + (id % 4),
  color: id % 2 === 0 ? "text-emerald-700/70" : "text-lime-800/60",
}));

export function StoryLeaves() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[14] overflow-hidden">
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className={`absolute top-[-10%] ${leaf.color}`}
          style={{ left: leaf.left }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, leaf.id % 2 === 0 ? 30 : -28, 10],
            rotate: [0, 120, 240],
            opacity: [0, 0.8, 0.6, 0],
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Leaf className="h-8 w-6 drop-shadow" />
        </motion.div>
      ))}
    </div>
  );
}
