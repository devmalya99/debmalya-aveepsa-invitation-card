"use client";

import Image from "next/image";
import { useRef } from "react";
import { SceneWrapper } from "@/components/experience/SceneWrapper";
import { LetterCorner } from "@/components/letter/LetterOrnaments";
import { ConchIllustration } from "@/components/venue/ConchIllustration";
import { assets } from "@/data/assets";
import { useLanguage } from "@/hooks/useLanguage";
import { usePinnedScene } from "@/hooks/usePinnedScene";
import { useScrollModeContext } from "@/hooks/useScrollModeContext";

/**
 * Single stacked destination card — no absolute panels, no overlapping layers.
 */
export function VenueReveal() {
  const { content, locale } = useLanguage();
  const { cinematic } = useScrollModeContext();
  const sectionRef = useRef<HTMLElement>(null);
  const venue = content.venue;
  const isBengali = locale === "bn";

  usePinnedScene({
    sectionRef,
    sceneId: "venue-reveal",
    enabled: cinematic,
    build: (timeline) => {
      timeline
        .fromTo(
          ".venue-draw-path",
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, stagger: 0.03, duration: 0.4 },
          0,
        )
        .fromTo(
          ".venue-block-invite",
          { y: 10, opacity: 1 },
          { y: 0, opacity: 1, duration: 0.35 },
          0,
        )
        .fromTo(
          ".venue-block-photo",
          { y: 16, opacity: 0.85 },
          { y: 0, opacity: 1, duration: 0.45 },
          0.2,
        )
        .fromTo(
          ".venue-heritage-image",
          { scale: 1.06 },
          { scale: 1, duration: 0.7 },
          0.2,
        )
        .fromTo(
          ".venue-block-place",
          { y: 12, opacity: 0.85 },
          { y: 0, opacity: 1, duration: 0.4 },
          0.45,
        )
        .fromTo(
          ".venue-block-blessing",
          { y: 12, opacity: 0.85 },
          { y: 0, opacity: 1, duration: 0.4 },
          0.65,
        );
    },
  });

  return (
    <SceneWrapper
      ref={sectionRef}
      id="venue-reveal"
      tone="ivory"
      innerClassName="max-w-[26rem] justify-center sm:max-w-lg"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(64,21,29,0.1),transparent_55%)]" />
      </div>

      <div className="relative z-10 flex h-full min-h-0 w-full flex-col items-center justify-center gap-2.5">
        <div className="venue-block-invite flex w-full shrink-0 flex-col items-center text-center">
          <ConchIllustration className="h-12 w-12 text-antique-gold" />
          <h2 className="mt-1.5 font-bn-display text-[1.3rem] leading-snug text-sindoor-red">
            {venue.greetingBn}
          </h2>
          <p className="mt-0.5 font-display text-[0.8rem] italic text-deep-burgundy/85">
            {venue.greetingEn}
          </p>
        </div>

        <div className="venue-block-photo venue-heritage-mask relative w-full shrink-0 overflow-hidden rounded-[0.75rem] border border-antique-gold/40 shadow-[0_10px_24px_rgba(64,21,29,0.12)]">
          <div className="relative h-[26svh] w-full overflow-hidden">
            <Image
              src={assets.decorations.bhagirathiBoat}
              alt="Bhagirathi river, Raghunathganj, Murshidabad"
              fill
              className="venue-heritage-image object-cover object-[center_40%]"
              sizes="(max-width: 430px) 90vw, 400px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-burgundy/35 via-transparent to-transparent" />
            <LetterCorner className="absolute top-1.5 left-1.5 h-5 w-5 text-antique-gold/80" />
            <LetterCorner className="absolute top-1.5 right-1.5 h-5 w-5 rotate-90 text-antique-gold/80" />
          </div>
        </div>

        <div className="venue-block-place w-full shrink-0 text-center">
          <p className="font-body text-[0.55rem] tracking-[0.2em] text-[#6b5224] uppercase">
            Location
          </p>
          <p className="mt-0.5 font-bn-display text-[1.15rem] leading-snug text-deep-burgundy">
            {venue.cityBn}
          </p>
          <p className="mt-0.5 font-display text-[0.8rem] text-deep-burgundy/90">
            {venue.cityEn}
          </p>
          <p
            className={`mt-0.5 text-[0.62rem] tracking-[0.12em] text-deep-burgundy/80 uppercase ${
              isBengali ? "font-bn-body tracking-normal normal-case" : "font-body"
            }`}
          >
            {venue.heritageTagline}
          </p>
        </div>

        <div className="venue-block-blessing w-full shrink-0 rounded-[0.75rem] bg-[linear-gradient(165deg,#40151d_0%,#741e26_55%,#2a0e14_100%)] px-4 py-3 text-center">
          <p className="font-bn-display text-[0.85rem] leading-relaxed text-antique-ivory">
            {venue.blessing}
          </p>
          <p className="mt-1.5 font-display text-[0.65rem] tracking-[0.14em] text-antique-gold uppercase">
            {venue.coupleNames}
          </p>
        </div>
      </div>
    </SceneWrapper>
  );
}
