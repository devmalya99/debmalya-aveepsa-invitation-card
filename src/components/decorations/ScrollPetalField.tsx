"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useMemo } from "react";

type PetalConfig = {
  id: number;
  startX: number;
  drift: number;
  size: number;
  rotateFrom: number;
  rotateTo: number;
  top: number;
  opacity: number;
  delaySpan: [number, number];
};

function PetalShape({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 32"
      className={className}
      fill="currentColor"
    >
      <path d="M12 1C8 7 4 12 4 18c0 5 3.5 9 8 12 4.5-3 8-7 8-12 0-6-4-11-8-17Z" />
      <path
        d="M12 6c-1.5 4-3 7-3 11"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="1"
      />
    </svg>
  );
}

function ScrollPetal({
  petal,
  progress,
}: {
  petal: PetalConfig;
  progress: MotionValue<number>;
}) {
  const y = useTransform(
    progress,
    [0, petal.delaySpan[0], petal.delaySpan[1], 1],
    ["-15vh", "-5vh", "95vh", "120vh"],
  );
  const x = useTransform(
    progress,
    [0, 0.5, 1],
    [
      `${petal.startX}vw`,
      `${petal.startX + petal.drift * 0.55}vw`,
      `${petal.startX + petal.drift}vw`,
    ],
  );
  const rotate = useTransform(
    progress,
    [0, 1],
    [petal.rotateFrom, petal.rotateTo],
  );
  const opacity = useTransform(
    progress,
    [0, 0.08, 0.75, 1],
    [0, petal.opacity, petal.opacity * 0.85, 0.15],
  );

  return (
    <motion.div
      aria-hidden
      className="decoration-layer absolute left-0 top-0 text-dusty-rose"
      style={{
        x,
        y,
        rotate,
        opacity,
        width: petal.size,
        height: petal.size * 1.35,
        top: `${petal.top}%`,
      }}
    >
      <PetalShape className="h-full w-full drop-shadow-[0_2px_6px_rgba(37,23,26,0.25)]" />
    </motion.div>
  );
}

export function ScrollPetalField() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const petals = useMemo<PetalConfig[]>(
    () =>
      Array.from({ length: 18 }, (_, id) => {
        const lane = id % 6;
        const startX = 4 + lane * 16 + (id % 2) * 3;
        return {
          id,
          startX,
          drift: id % 2 === 0 ? 18 + (id % 5) * 4 : -(14 + (id % 4) * 5),
          size: 10 + (id % 5) * 3,
          rotateFrom: -40 - id * 3,
          rotateTo: 120 + id * 8,
          top: (id * 7) % 40,
          opacity: 0.35 + (id % 4) * 0.1,
          delaySpan: [0.02 + (id % 8) * 0.03, 0.55 + (id % 7) * 0.05] as [
            number,
            number,
          ],
        };
      }),
    [],
  );

  if (reduceMotion) {
    return null;
  }

  return (
    <div
      aria-hidden
      className="decoration-layer pointer-events-none fixed inset-0 z-[5] overflow-hidden"
    >
      {petals.map((petal) => (
        <ScrollPetal key={petal.id} petal={petal} progress={scrollYProgress} />
      ))}
    </div>
  );
}
