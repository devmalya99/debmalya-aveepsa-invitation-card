"use client";

import { GlowRevealText } from "@/components/pocket/GlowRevealText";
import { WEDDING } from "@/config/wedding";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";

type FormalInviteTextProps = {
  locale: Locale;
  dictionary: Dictionary;
  active: boolean;
};

const fullNames = {
  partnerOne: {
    en: WEDDING.couple.partnerOne,
    bn: "দেবমল্য মজুমদার",
  },
  partnerTwo: {
    en: WEDDING.couple.partnerTwo,
    bn: "অভীপ্সা চক্রবর্তী",
  },
} as const;

export function FormalInviteText({
  locale,
  dictionary,
  active,
}: FormalInviteTextProps) {
  const groomParents = WEDDING.couple.parents.partnerOne[locale];
  const brideParents = WEDDING.couple.parents.partnerTwo[locale];
  const nameClass =
    locale === "bn"
      ? "mt-3 font-bengali-display text-[clamp(1.25rem,5.2vw,1.75rem)] leading-tight text-[#fff8e8]"
      : "mt-3 font-display text-[clamp(1.35rem,5.5vw,1.85rem)] leading-tight text-[#fff8e8]";
  const parentClass =
    locale === "bn"
      ? "mt-1.5 font-bengali-body text-[0.78rem] leading-snug text-[#f0d9a8]/92"
      : "mt-1.5 font-body text-[0.72rem] leading-snug text-[#f0d9a8]/92";

  return (
    <div className="mx-auto flex w-[min(72%,18rem)] flex-col items-center text-center">
      <GlowRevealText
        active={active}
        delay={0.08}
        className="font-label text-[0.58rem] uppercase tracking-[0.28em] text-[#f3e0b0]"
      >
        {dictionary.hero.shubhoBibaho}
      </GlowRevealText>

      <GlowRevealText active={active} delay={0.22} className={nameClass}>
        {fullNames.partnerOne[locale]}
      </GlowRevealText>

      <GlowRevealText active={active} delay={0.34} className={parentClass}>
        {groomParents.line1}
        <br />
        {groomParents.line2}
      </GlowRevealText>

      <GlowRevealText
        active={active}
        delay={0.48}
        className="mt-3 font-label text-[0.7rem] uppercase tracking-[0.35em] text-[#ffd98a]"
      >
        {dictionary.formalInvite.weds}
      </GlowRevealText>

      <GlowRevealText active={active} delay={0.58} className={nameClass}>
        {fullNames.partnerTwo[locale]}
      </GlowRevealText>

      <GlowRevealText active={active} delay={0.7} className={parentClass}>
        {brideParents.line1}
        <br />
        {brideParents.line2}
      </GlowRevealText>

      <GlowRevealText
        active={active}
        delay={0.88}
        className="mt-4 font-label text-[0.58rem] uppercase tracking-[0.22em] text-[#e8c97a]"
      >
        {dictionary.formalInvite.dateLine}
      </GlowRevealText>
    </div>
  );
}
