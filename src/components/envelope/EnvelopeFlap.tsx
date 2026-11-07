"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type EnvelopeFlapProps = {
  open: boolean;
  children?: ReactNode;
};

export function EnvelopeFlap({ open, children }: EnvelopeFlapProps) {
  return (
    <motion.div
      className="absolute inset-x-0 top-0 z-[26] h-[46%] origin-top"
      style={{ transformStyle: "preserve-3d" }}
      initial={false}
      animate={{ rotateX: open ? -158 : 0 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="relative h-full w-full"
        style={{
          background:
            "linear-gradient(165deg, #9a3d46 0%, #741e26 48%, #5a171e 100%)",
          clipPath: "polygon(0 0, 100% 0, 100% 12%, 50% 100%, 0 12%)",
          boxShadow: "inset 0 -10px 22px rgba(0,0,0,0.2)",
          backfaceVisibility: "hidden",
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(185,154,88,0.16),transparent_50%)]" />
        <div className="absolute inset-x-[18%] top-[18%] h-px bg-antique-gold/40" />
        <div className="absolute inset-x-[28%] top-[28%] h-px bg-antique-gold/22" />
        {children}
      </div>
    </motion.div>
  );
}
