"use client";

import { motion } from "motion/react";

type UnionOrnamentProps = {
  className?: string;
};

/**
 * Circular alpana / lotus union motif (~80px).
 * Paths use pathLength=1 for GSAP stroke-draw animation.
 */
export function UnionOrnament({ className = "" }: UnionOrnamentProps) {
  return (
    <motion.div
      className={`identity-ornament relative flex h-20 w-20 items-center justify-center text-antique-gold ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
      style={{ width: 80, height: 80 }}
    >
      <svg
        viewBox="0 0 80 80"
        className="h-full w-full overflow-visible"
        aria-hidden
        fill="none"
      >
        <circle
          className="union-path union-ring-outer"
          cx="40"
          cy="40"
          r="36"
          stroke="currentColor"
          strokeWidth="1.2"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset="1"
        />
        <circle
          className="union-path union-ring-inner"
          cx="40"
          cy="40"
          r="28"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity="0.7"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset="1"
        />
        <path
          className="union-path union-lotus"
          d="M40 18 C44 26 48 30 40 40 C32 30 36 26 40 18 Z
             M40 62 C36 54 32 50 40 40 C48 50 44 54 40 62 Z
             M18 40 C26 36 30 32 40 40 C30 48 26 44 18 40 Z
             M62 40 C54 44 50 48 40 40 C50 32 54 36 62 40 Z
             M24 24 C32 28 34 34 40 40 C34 34 28 32 24 24 Z
             M56 56 C48 52 46 46 40 40 C46 46 52 48 56 56 Z
             M56 24 C48 28 46 34 40 40 C46 34 52 32 56 24 Z
             M24 56 C32 52 34 46 40 40 C34 46 28 48 24 56 Z"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinejoin="round"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset="1"
        />
        <circle
          className="union-center"
          cx="40"
          cy="40"
          r="3.2"
          fill="currentColor"
          opacity="0"
        />
      </svg>
      <span className="pointer-events-none absolute inset-0 rounded-full bg-antique-gold/15 blur-md" />
    </motion.div>
  );
}
