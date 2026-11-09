"use client";

import { motion } from "motion/react";
import {
  FAMILY_HERITAGE_MOTION,
  type FamilyMemberRow,
} from "@/config/familyHeritage";

type FamilyHeritageRowProps = {
  row: FamilyMemberRow;
  go: boolean;
  instant: boolean;
  delay: number;
  isBengali: boolean;
  showDivider?: boolean;
};

export function FamilyHeritageRow({
  row,
  go,
  instant,
  delay,
  isBengali,
  showDivider = true,
}: FamilyHeritageRowProps) {
  return (
    <motion.div
      className="w-full"
      initial={false}
      animate={go ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
      transition={{
        duration: instant ? 0 : FAMILY_HERITAGE_MOTION.rowDuration,
        delay: instant ? 0 : delay,
        ease: FAMILY_HERITAGE_MOTION.ease,
      }}
    >
      <div className="flex flex-col items-center gap-0.5 text-center sm:gap-1">
        <p
          className="font-semibold uppercase"
          style={{
            fontFamily: "var(--fh-font-en)",
            fontSize: "var(--fh-label-size)",
            letterSpacing: "0.14em",
            color: "var(--fh-muted-gold)",
            lineHeight: 1.2,
          }}
        >
          {row.label}
        </p>
        <p
          className="max-w-full text-balance font-semibold"
          style={{
            fontFamily: isBengali ? "var(--fh-font-bn)" : "var(--fh-font-en)",
            fontSize: "var(--fh-value-size)",
            lineHeight: 1.4,
            color: "var(--fh-primary)",
          }}
        >
          {row.value}
        </p>
      </div>
      {showDivider ? (
        <div
          className="mx-auto mt-2.5 h-px w-10"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--fh-muted-gold), transparent)",
          }}
          aria-hidden
        />
      ) : null}
    </motion.div>
  );
}
