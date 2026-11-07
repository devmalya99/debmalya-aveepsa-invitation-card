"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

function FlappingBird({
  className,
  duration = 0.55,
  delay = 0,
}: {
  className?: string;
  duration?: number;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`relative text-[#1a1214] ${className}`}>
      <svg
        aria-hidden
        viewBox="0 0 120 60"
        className="h-full w-full fill-current"
      >
        <ellipse cx="58" cy="32" rx="16" ry="6.5" />
        <path d="M72 30c9-1 16-4 22-2l2 1-4 2c-6 1-13 1-20 0z" />
        <path d="M44 32c-9 1-15 4-20 8 6-1 12-2 18-3z" />
        <motion.path
          d="M52 28 C40 10, 28 8, 18 14 C32 16, 42 22, 50 30 Z"
          animate={
            reduceMotion
              ? undefined
              : {
                  d: [
                    "M52 28 C40 10, 28 8, 18 14 C32 16, 42 22, 50 30 Z",
                    "M52 30 C42 42, 30 48, 18 44 C32 40, 44 36, 52 32 Z",
                    "M52 28 C40 10, 28 8, 18 14 C32 16, 42 22, 50 30 Z",
                  ],
                }
          }
          transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M62 28 C74 10, 88 8, 100 14 C86 16, 74 22, 64 30 Z"
          animate={
            reduceMotion
              ? undefined
              : {
                  d: [
                    "M62 28 C74 10, 88 8, 100 14 C86 16, 74 22, 64 30 Z",
                    "M62 30 C74 42, 88 48, 100 44 C86 40, 74 36, 64 32 Z",
                    "M62 28 C74 10, 88 8, 100 14 C86 16, 74 22, 64 30 Z",
                  ],
                }
          }
          transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

type FlockBird = {
  id: number;
  top: string;
  size: number;
  duration: number;
  delay: number;
  flap: number;
  yNudge: number;
};

const flock: FlockBird[] = [
  { id: 1, top: "16%", size: 56, duration: 18, delay: 0, flap: 0.5, yNudge: 18 },
  { id: 2, top: "22%", size: 42, duration: 22, delay: 1.2, flap: 0.45, yNudge: -12 },
  { id: 3, top: "28%", size: 48, duration: 20, delay: 2.4, flap: 0.55, yNudge: 10 },
  { id: 4, top: "14%", size: 34, duration: 24, delay: 0.8, flap: 0.4, yNudge: -20 },
  { id: 5, top: "34%", size: 40, duration: 19, delay: 3.1, flap: 0.48, yNudge: 14 },
  { id: 6, top: "20%", size: 30, duration: 26, delay: 4.5, flap: 0.42, yNudge: -8 },
  { id: 7, top: "40%", size: 46, duration: 21, delay: 1.8, flap: 0.52, yNudge: 22 },
  { id: 8, top: "12%", size: 28, duration: 28, delay: 5.2, flap: 0.38, yNudge: -16 },
];

export function StoryBirds() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const flockY = useTransform(scrollYProgress, [0, 1], [30, -40]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[14] overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        style={{ y: reduceMotion ? 0 : flockY }}
      >
        {flock.map((bird) => (
          <motion.div
            key={bird.id}
            className="absolute"
            style={{
              top: bird.top,
              width: bird.size,
              height: bird.size * 0.5,
            }}
            initial={
              reduceMotion
                ? { x: `${12 + bird.id * 9}vw`, opacity: 0.75 }
                : { x: "-18vw", opacity: 0 }
            }
            animate={
              reduceMotion
                ? undefined
                : {
                    x: ["-18vw", "112vw"],
                    y: [0, bird.yNudge, 0],
                    opacity: [0, 0.95, 0.95, 0],
                  }
            }
            transition={{
              duration: bird.duration,
              delay: bird.delay,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.12, 0.86, 1],
            }}
          >
            <FlappingBird
              duration={bird.flap}
              delay={bird.id * 0.07}
              className="h-full w-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)]"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
