"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type GlowRevealTextProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  active: boolean;
};

/**
 * Hidden → soft light bloom → crisp fade-in.
 * Feels like candlelight writing itself onto the invitation.
 */
export function GlowRevealText({
  children,
  className = "",
  delay = 0,
  active,
}: GlowRevealTextProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className={`${className} ${active ? "opacity-100" : "opacity-0"}`}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14, filter: "blur(8px)", scale: 0.96 }}
      animate={
        active
          ? {
              opacity: [0, 0.45, 1],
              y: [14, 4, 0],
              filter: ["blur(8px)", "blur(2px)", "blur(0px)"],
              scale: [0.96, 1.02, 1],
              textShadow: [
                "0 0 0px rgba(216,195,156,0)",
                "0 0 28px rgba(216,195,156,0.85)",
                "0 0 12px rgba(177,138,82,0.35)",
              ],
            }
          : {
              opacity: 0,
              y: 14,
              filter: "blur(8px)",
              scale: 0.96,
              textShadow: "0 0 0px rgba(216,195,156,0)",
            }
      }
      transition={{
        duration: 1.15,
        delay,
        ease: [0.22, 1, 0.36, 1],
        times: [0, 0.45, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
