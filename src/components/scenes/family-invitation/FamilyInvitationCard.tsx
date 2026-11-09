"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { FAMILY_HERITAGE_MOTION } from "@/config/familyHeritage";
import { assets } from "@/data/assets";
import { useLanguage } from "@/hooks/useLanguage";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

type FamilyInvitationCardProps = {
  className?: string;
};

/**
 * Mobile royal family invitation — full-bleed artwork per locale (no HTML text).
 * Covers the opening canvas like the couple cover so no ivory letterbox remains.
 */
export function FamilyInvitationCard({
  className = "",
}: FamilyInvitationCardProps) {
  const { locale } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();
  const isBengali = locale === "bn";
  const src = isBengali
    ? assets.invitation.familyBn
    : assets.invitation.familyEn;

  return (
    <motion.article
      key={locale}
      className={`relative h-full min-h-0 w-full overflow-hidden ${className}`}
      style={{ colorScheme: "only light" }}
      aria-label={
        isBengali
          ? "দুই পরিবারের শুভ মিলনের আমন্ত্রণপত্র"
          : "Union of two families invitation"
      }
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: reducedMotion ? 0 : 0.55,
        ease: FAMILY_HERITAGE_MOTION.ease,
      }}
    >
      <Image
        src={src}
        alt={
          isBengali
            ? "দেবমাল্য ও অভীপ্সার পরিবারের আমন্ত্রণপত্র"
            : "Debmalya and Aveepsa family wedding invitation"
        }
        fill
        priority
        sizes="100vw"
        className="pointer-events-none object-cover object-center select-none"
        draggable={false}
      />
    </motion.article>
  );
}
