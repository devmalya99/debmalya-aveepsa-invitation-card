"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

export type MotionDirection = "left" | "right" | "top" | "bottom" | "scale";

type MotionCardProps = {
  children: ReactNode;
  className?: string;
  from?: MotionDirection;
  delay?: number;
  amount?: number;
  once?: boolean;
};

function getOffsets(from: MotionDirection, compact: boolean) {
  const side = compact ? 36 : 88;
  const vertical = compact ? 28 : 64;
  const map: Record<
    MotionDirection,
    { x?: number; y?: number; scale?: number }
  > = {
    left: { x: -side, y: compact ? 12 : 20 },
    right: { x: side, y: compact ? 12 : 20 },
    top: { x: 0, y: -vertical },
    bottom: { x: 0, y: vertical },
    scale: { scale: compact ? 0.94 : 0.9, y: compact ? 18 : 32 },
  };
  return map[from];
}

export function MotionCard({
  children,
  className = "",
  from = "bottom",
  delay = 0,
  amount = 0.28,
  once = true,
}: MotionCardProps) {
  const reduceMotion = useReducedMotion();
  const [compact, setCompact] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    const sync = () => setCompact(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const offset = getOffsets(from, compact);

  return (
    <motion.div
      className={className}
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              x: offset.x ?? 0,
              y: offset.y ?? 0,
              scale: offset.scale ?? 1,
              filter: compact ? "blur(4px)" : "blur(6px)",
            }
      }
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      viewport={{ once, amount, margin: "0px 0px -6% 0px" }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 18,
        mass: 0.85,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
