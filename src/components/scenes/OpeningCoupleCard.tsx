"use client";

import Image from "next/image";
import {
  DateMedallion,
  PortraitArchFrame,
} from "@/components/reveal/HeroOrnaments";
import { assets } from "@/data/assets";
import { useLanguage } from "@/hooks/useLanguage";

type OpeningCoupleCardProps = {
  className?: string;
};

/** Layer A — couple composition for the shared opening canvas. */
export function OpeningCoupleCard({ className = "" }: OpeningCoupleCardProps) {
  const { content, locale } = useLanguage();
  const copy = content.grandReveal;
  const isBengali = locale === "bn";

  return (
    <div
      className={`reveal-scene-fade flex w-full flex-col items-center text-center ${className}`}
    >
      <div className="reveal-heading-mask relative z-10 overflow-hidden pb-0.5">
        <p
          className={`reveal-kicker text-[1.15rem] leading-none text-sindoor-red sm:text-[1.25rem] ${
            isBengali ? "font-bn-display" : "font-display tracking-[0.06em]"
          }`}
        >
          {copy.kicker}
        </p>
      </div>
      <div className="mt-2 h-px w-11 bg-gradient-to-r from-transparent via-antique-gold/80 to-transparent" />

      <div className="reveal-parallax-photo reveal-portrait-stage relative mt-2.5 w-[min(72vw,18.5rem)]">
        <div className="pointer-events-none absolute -inset-5 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(185,154,88,0.2)_0%,transparent_68%)]" />

        <div className="relative aspect-square w-full">
          <PortraitArchFrame />

          <div className="absolute inset-[5.5%] overflow-hidden rounded-full">
            <div className="reveal-photo-reveal absolute inset-0 overflow-hidden rounded-full bg-[#2a1612] shadow-[inset_0_12px_28px_rgba(40,16,12,0.28)]">
              <Image
                src={assets.couple.grandReveal}
                alt={copy.namesEn}
                fill
                priority
                unoptimized
                className="reveal-photo object-cover object-[42%_center]"
                sizes="(max-width: 430px) 72vw, 296px"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 w-full px-1">
        <div className="reveal-names-bn-mask overflow-hidden pb-0.5">
          <h1 className="reveal-names-bn font-bn-display text-[1.65rem] leading-[1.22] text-balance text-[#5c1520] sm:text-[1.85rem]">
            {copy.namesBn}
          </h1>
        </div>
        <p className="reveal-names-en mt-1 font-display text-[0.88rem] tracking-[0.12em] text-deep-burgundy/88 uppercase sm:text-[0.94rem]">
          {copy.namesEn}
        </p>

        <DateMedallion
          dateBn={copy.date}
          dateEn={copy.dateEn}
          className="mt-3"
        />

        <p className="reveal-location mt-3 font-display text-[0.78rem] tracking-[0.05em] text-deep-burgundy/85">
          {copy.location}
        </p>

        <p
          className={`reveal-tagline mx-auto mt-1.5 max-w-[17rem] text-[0.74rem] leading-relaxed text-deep-burgundy/75 ${
            isBengali ? "font-bn-body" : "font-display italic"
          }`}
        >
          {copy.tagline}
        </p>
      </div>
    </div>
  );
}
