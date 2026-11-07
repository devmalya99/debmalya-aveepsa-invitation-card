"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { assets } from "@/data/assets";

type EnvelopeProps = {
  children: ReactNode;
  expand?: boolean;
};

export function Envelope({ children, expand }: EnvelopeProps) {
  return (
    <motion.div
      className="relative mx-auto w-full max-w-[370px]"
      style={{ perspective: 1200 }}
      initial={{ opacity: 0, scale: 0.9, y: 28, rotate: -1.5 }}
      animate={
        expand
          ? { opacity: 0, scale: 1.28, y: -16, rotate: 0 }
          : { opacity: 1, scale: 1, y: 0, rotate: 0 }
      }
      transition={
        expand
          ? { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
          : { duration: 0.85, ease: [0.22, 1, 0.36, 1] }
      }
    >
      <div className="absolute -inset-[3px] rounded-[1.35rem] border border-antique-gold/40" />

      <div
        className="relative w-full overflow-hidden rounded-[1.25rem] border border-antique-gold/65 shadow-[0_22px_48px_rgba(64,21,29,0.28)]"
        style={{
          height: "min(56svh, 450px)",
          minHeight: 420,
          background:
            "linear-gradient(165deg, #8f333c 0%, #741e26 40%, #4a141c 100%)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Back envelope lining */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(180deg, #5f1a22 0%, #40151d 55%, #2c0f14 100%)",
          }}
        />
        <div className="absolute inset-0 z-[2]">
          <Image
            src={assets.decorations.envelope}
            alt=""
            fill
            priority
            className="object-cover opacity-[0.14] mix-blend-soft-light"
            sizes="370px"
          />
        </div>

        {/* Visible paper + flap + body + seal are passed as children in z-order */}
        {children}

        {/* Front pocket / envelope body */}
        <div
          className="absolute inset-x-0 bottom-0 z-[18] h-[54%] rounded-b-[1.2rem]"
          style={{
            background:
              "linear-gradient(180deg, #7d232d 0%, #5c1821 42%, #311016 100%)",
            clipPath: "polygon(0 18%, 50% 0, 100% 18%, 100% 100%, 0 100%)",
            boxShadow: "inset 0 12px 24px rgba(0,0,0,0.18)",
          }}
        >
          <div className="absolute inset-x-8 top-10 h-px bg-gradient-to-r from-transparent via-antique-gold/35 to-transparent" />
          <div className="pointer-events-none absolute inset-[10px] rounded-b-[0.95rem] border border-antique-gold/20 border-t-0" />
        </div>
      </div>
    </motion.div>
  );
}
