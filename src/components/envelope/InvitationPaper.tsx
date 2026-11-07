"use client";

import { motion } from "motion/react";

type InvitationPaperProps = {
  stage: "idle" | "emerging" | "revealed";
  title: string;
  subtitle: string;
};

export function InvitationPaper({ stage, title, subtitle }: InvitationPaperProps) {
  const risen = stage === "emerging" || stage === "revealed";

  return (
    <motion.div
      className="absolute inset-x-[11%] top-[20%] z-[12] h-[58%] origin-bottom overflow-hidden rounded-sm border border-antique-gold/35 bg-[linear-gradient(180deg,#fff8ea_0%,#f1e3c7_100%)] shadow-[0_10px_24px_rgba(64,21,29,0.22)]"
      initial={{ y: 72, scale: 0.96, opacity: 0.55 }}
      animate={
        risen
          ? {
              y: stage === "revealed" ? -18 : 18,
              scale: 1,
              opacity: 1,
            }
          : { y: 72, scale: 0.96, opacity: 0.55 }
      }
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-[6px] border border-antique-gold/20" />
      <div className="relative flex h-full flex-col items-center justify-center gap-1.5 px-3 text-center">
        <p className="font-bn-display text-[1.05rem] leading-snug text-sindoor-red">
          {title}
        </p>
        <p className="font-display text-[0.72rem] tracking-[0.08em] text-antique-gold uppercase">
          {subtitle}
        </p>
        <div className="mt-2 h-px w-12 bg-gradient-to-r from-transparent via-antique-gold/70 to-transparent" />
      </div>
    </motion.div>
  );
}
