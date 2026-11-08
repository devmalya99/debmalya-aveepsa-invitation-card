"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { SceneWrapper } from "@/components/experience/SceneWrapper";
import { assets } from "@/data/assets";
import { useLanguage } from "@/hooks/useLanguage";
import { usePinnedScene } from "@/hooks/usePinnedScene";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollModeContext } from "@/hooks/useScrollModeContext";
import { MOTION } from "@/lib/animation-config";
import { gsap, registerGsap } from "@/lib/gsap";

/**
 * Scene 04 — Destination folio.
 * River hero starts fully veiled and unveils top → bottom on scrub.
 */
export function VenueReveal() {
  const { content, locale } = useLanguage();
  const { cinematic } = useScrollModeContext();
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const venue = content.venue;
  const isBengali = locale === "bn";

  useGSAP(
    () => {
      if (!cinematic || !sectionRef.current) return;
      registerGsap();

      const blur = reducedMotion ? "none" : "blur(4px)";

      /* River starts fully clipped — no peeking before scrub. */
      gsap.set(".venue-hero-frame", { autoAlpha: 1 });
      gsap.set(".venue-hero-mask", {
        clipPath: reducedMotion
          ? "inset(0% 0% 0% 0%)"
          : "inset(0% 0% 100% 0%)",
      });
      gsap.set(".venue-hero-image", {
        scale: reducedMotion ? 1 : 1.08,
        yPercent: reducedMotion ? 0 : -6,
      });

      gsap.set(".venue-greeting", { autoAlpha: 0, y: 14, filter: blur });
      gsap.set(".venue-cordially", { autoAlpha: 0, y: 10 });
      gsap.set(".venue-rule", { scaleX: 0, autoAlpha: 0 });
      gsap.set(".venue-lodge", { autoAlpha: 0, y: 16, filter: blur });
      gsap.set(".venue-city", { autoAlpha: 0, y: 12 });
      gsap.set(".venue-tag", { autoAlpha: 0, y: 10 });
      gsap.set(".venue-address", { autoAlpha: 0, y: 10 });
      gsap.set(".venue-blessing", { autoAlpha: 0, y: 12, filter: blur });
      gsap.set(".venue-maps", { autoAlpha: 0, y: 10 });
    },
    {
      scope: sectionRef,
      dependencies: [cinematic, reducedMotion],
      revertOnUpdate: true,
    },
  );

  usePinnedScene({
    sectionRef,
    sceneId: "venue-reveal",
    enabled: cinematic,
    build: (timeline) => {
      const clearBlur = reducedMotion ? {} : { filter: "blur(0px)" };

      timeline
        /* Soft greeting before the river opens */
        .to(
          ".venue-greeting",
          {
            autoAlpha: 1,
            y: 0,
            ...clearBlur,
            duration: 0.35,
            ease: MOTION.easeScrub,
          },
          0,
        )
        .to(
          ".venue-cordially",
          { autoAlpha: 1, y: 0, duration: 0.28, ease: MOTION.easeScrub },
          0.15,
        )

        /* Primary beat — river reveals top → bottom */
        .to(
          ".venue-hero-mask",
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.85,
            ease: MOTION.easeScrub,
          },
          0.28,
        )
        .to(
          ".venue-hero-image",
          {
            scale: 1,
            yPercent: 0,
            duration: 0.85,
            ease: MOTION.easeScrub,
          },
          0.28,
        )

        .to(
          ".venue-rule",
          {
            scaleX: 1,
            autoAlpha: 1,
            duration: 0.3,
            ease: MOTION.easeScrub,
          },
          0.95,
        )

        .to(
          ".venue-lodge",
          {
            autoAlpha: 1,
            y: 0,
            ...clearBlur,
            duration: 0.38,
            ease: MOTION.easeScrub,
          },
          1.05,
        )
        .to(
          ".venue-city",
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.3,
            ease: MOTION.easeScrub,
          },
          1.25,
        )
        .to(
          ".venue-tag",
          { autoAlpha: 1, y: 0, duration: 0.26, ease: MOTION.easeScrub },
          1.4,
        )
        .to(
          ".venue-address",
          { autoAlpha: 1, y: 0, duration: 0.26, ease: MOTION.easeScrub },
          1.52,
        )
        .to(
          ".venue-blessing",
          {
            autoAlpha: 1,
            y: 0,
            ...clearBlur,
            duration: 0.34,
            ease: MOTION.easeScrub,
          },
          1.68,
        )
        .to(
          ".venue-maps",
          { autoAlpha: 1, y: 0, duration: 0.28, ease: MOTION.easeScrub },
          1.9,
        );
    },
  });

  const greeting = isBengali ? venue.greetingBn : venue.greetingEn;
  const lodgeName = isBengali ? venue.lodgeBn : venue.lodgeEn;
  const cityPrimary = isBengali ? venue.cityBn : venue.cityEn;
  const citySecondary = isBengali ? venue.cityEn : venue.cityBn;
  const address = isBengali ? venue.addressBn : venue.addressEn;

  return (
    <SceneWrapper
      ref={sectionRef}
      id="venue-reveal"
      tone="ivory"
      innerClassName="max-w-[26rem] justify-center touch-pan-y sm:max-w-lg"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_12%,rgba(185,154,88,0.1),transparent_55%)]" />
      {/* Soft top veil so the letter→venue handoff doesn’t flash raw photo */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-24 bg-gradient-to-b from-[#F8F0E0] to-transparent" />

      <div className="relative z-10 mx-auto flex w-full max-w-[22rem] flex-col items-center px-1 text-center">
        <p
          className={`venue-greeting text-[clamp(1.15rem,4.5vw,1.35rem)] leading-snug text-sindoor-red ${
            isBengali ? "font-bn-display" : "font-display"
          }`}
        >
          {greeting}
        </p>
        <p
          className={`venue-cordially mt-1 text-[0.78rem] text-deep-burgundy/85 ${
            isBengali ? "font-bn-body" : "font-letter italic"
          }`}
        >
          {venue.cordially}
        </p>

        <div className="venue-hero-frame relative mt-4 w-full overflow-hidden rounded-[0.4rem] border border-[#E8CD96]/35 bg-[#E5D1AE]/35 p-[3px] shadow-[0_14px_32px_rgba(64,21,29,0.12)]">
          <div
            className="venue-hero-mask relative aspect-[16/10] w-full overflow-hidden rounded-[0.28rem] will-change-[clip-path]"
            style={{ clipPath: "inset(0% 0% 100% 0%)" }}
          >
            <Image
              src={assets.decorations.bhagirathiRiver}
              alt={cityPrimary}
              fill
              priority
              className="venue-hero-image object-cover object-[center_45%] will-change-transform"
              sizes="(max-width: 430px) 90vw, 400px"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-deep-burgundy/30 via-transparent to-antique-ivory/10" />
          </div>
        </div>

        <div className="venue-rule mt-4 h-px w-12 origin-center bg-gradient-to-r from-transparent via-antique-gold to-transparent" />

        <h2
          className={`venue-lodge mt-4 text-[clamp(1.35rem,5.5vw,1.6rem)] leading-snug text-sindoor-red ${
            isBengali ? "font-bn-display" : "font-display"
          }`}
        >
          {lodgeName}
        </h2>

        <p
          className={`venue-city mt-1.5 text-[clamp(1rem,4vw,1.15rem)] leading-snug text-deep-burgundy ${
            isBengali ? "font-bn-display" : "font-display"
          }`}
        >
          {cityPrimary}
        </p>
        <p
          className={`venue-city mt-0.5 text-[0.78rem] text-deep-burgundy/80 ${
            isBengali ? "font-display" : "font-bn-display"
          }`}
        >
          {citySecondary}
        </p>

        <p
          className={`venue-tag mt-1.5 text-[0.68rem] text-deep-burgundy/80 ${
            isBengali
              ? "font-bn-body"
              : "font-display tracking-[0.14em] uppercase"
          }`}
        >
          {venue.heritageTagline}
        </p>

        <p
          className={`venue-address mt-2.5 max-w-[18rem] text-[0.8rem] leading-relaxed text-deep-burgundy/90 ${
            isBengali ? "font-bn-body" : "font-letter"
          }`}
        >
          {address}
        </p>

        <p
          className={`venue-blessing mt-4 max-w-[19rem] text-[0.82rem] leading-relaxed text-deep-burgundy ${
            isBengali ? "font-bn-body" : "font-letter italic"
          }`}
        >
          {venue.blessing}
        </p>

        <a
          href={venue.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="venue-maps mt-4 inline-flex min-h-11 items-center border-b border-antique-gold/70 pb-0.5 font-display text-[0.78rem] tracking-[0.08em] text-deep-burgundy transition-colors hover:border-antique-gold hover:text-sindoor-red"
        >
          {venue.mapsLabel}
        </a>
      </div>
    </SceneWrapper>
  );
}
