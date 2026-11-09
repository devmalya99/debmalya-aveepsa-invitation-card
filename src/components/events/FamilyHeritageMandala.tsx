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
 * Circular family emblem watermark — clipped round so the JPG’s white square
 * reads as a disc, and sits behind card copy.
 */
export function FamilyHeritageMandala({
  go,
  instant,
}: FamilyHeritageMandalaProps) {
  return (
    <motion.div
      className="pointer-events-none absolute top-[42%] left-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
      style={{
        width: "var(--fh-mandala-size)",
        maxWidth: "88%",
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
      aria-hidden
    >
      {/* Round clip — hides the square white JPG edges. */}
      <div
        className={`relative h-full w-full overflow-hidden rounded-full ${
          instant ? "" : "family-heritage-mandala-drift"
        }`}
        style={{
          backgroundColor: "#F7EEDC",
          boxShadow: "0 0 0 1px color-mix(in srgb, var(--fh-accent) 22%, transparent)",
        }}
      >
        <Image
          src={assets.decorations.unionMandala}
          alt=""
          fill
          className="object-cover object-center opacity-[0.38] mix-blend-multiply [filter:sepia(0.4)_saturate(0.7)_brightness(1.08)]"
          sizes="(max-width: 430px) 70vw, 260px"
        />
      </div>
    </motion.div>
  );
}
