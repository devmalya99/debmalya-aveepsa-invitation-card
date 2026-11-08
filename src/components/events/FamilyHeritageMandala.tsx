"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { FAMILY_HERITAGE_MOTION } from "@/config/familyHeritage";
import { assets } from "@/data/assets";

type FamilyHeritageMandalaProps = {
  go: boolean;
  instant: boolean;
};

/**
 * Reduced family emblem — no solid white disc, antique-gold treatment,
 * soft settle from −8° (no aggressive continuous spin).
 */
export function FamilyHeritageMandala({
  go,
  instant,
}: FamilyHeritageMandalaProps) {
  return (
    <motion.div
      className="relative mx-auto"
      style={{
        width: "var(--fh-mandala-size)",
        maxHeight: "var(--fh-mandala-max-h)",
        aspectRatio: "1 / 1",
      }}
      initial={false}
      animate={
        go
          ? { opacity: 1, scale: 1, rotate: 0 }
          : { opacity: 0, scale: 0.9, rotate: -8 }
      }
      transition={{
        duration: instant ? 0 : FAMILY_HERITAGE_MOTION.mandalaDuration,
        ease: FAMILY_HERITAGE_MOTION.ease,
      }}
    >
      <div
        className={`relative h-full w-full ${instant ? "" : "family-heritage-mandala-drift"}`}
      >
        <Image
          src={assets.decorations.unionMandala}
          alt=""
          fill
          className="object-contain opacity-[0.92] [filter:sepia(0.35)_saturate(0.75)_brightness(1.05)]"
          sizes="(max-width: 430px) 42vw, 156px"
        />
      </div>
    </motion.div>
  );
}
