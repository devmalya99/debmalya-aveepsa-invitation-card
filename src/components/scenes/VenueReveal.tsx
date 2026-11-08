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
 * Hero shell always present (no blank ivory). Greeting + place copy load on scrub.
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

      /* Page shell: hero visible immediately so the scene never opens blank. */
      gsap.set(".venue-hero", { autoAlpha: 1, y: 0 });
      gsap.set(".venue-hero-image", { scale: 1.06 });

      /* Text loads in — same idea as the living letter. */
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
        /* Greeting opens the page */
        .to(
          ".venue-greeting",
          {
            autoAlpha: 1,
            y: 0,
            ...clearBlur,
            duration: 0.4,
            ease: MOTION.easeScrub,
          },
          0,
        )
        .to(
          ".venue-cordially",
          { autoAlpha: 1, y: 0, duration: 0.3, ease: MOTION.easeScrub },
          0.2,
        )

        /* Hero settles while copy continues */
        .to(
          ".venue-hero-image",
          { scale: 1, duration: 0.55, ease: MOTION.easeScrub },
          0.25,
        )
        .to(
          ".venue-rule",
          {
            scaleX: 1,
            autoAlpha: 1,
            duration: 0.32,
            ease: MOTION.easeScrub,
          },
          0.55,
        )

        /* Place facts load */
        .to(
          ".venue-lodge",
          {
            autoAlpha: 1,
            y: 0,
            ...clearBlur,
            duration: 0.4,
            ease: MOTION.easeScrub,
          },
          0.7,
        )
        .to(
          ".venue-city",
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.32,
            ease: MOTION.easeScrub,
          },
          0.95,
        )
        .to(
          ".venue-tag",
          { autoAlpha: 1, y: 0, duration: 0.28, ease: MOTION.easeScrub },
          1.15,
        )
        .to(
          ".venue-address",
          { autoAlpha: 1, y: 0, duration: 0.28, ease: MOTION.easeScrub },
          1.28,
        )
        .to(
          ".venue-blessing",
          {
            autoAlpha: 1,
            y: 0,
            ...clearBlur,
            duration: 0.36,
            ease: MOTION.easeScrub,
          },
          1.45,
        )
        .to(
          ".venue-maps",
          { autoAlpha: 1, y: 0, duration: 0.3, ease: MOTION.easeScrub },
          1.7,
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

        <div className="venue-hero relative mt-4 w-full overflow-hidden shadow-[0_14px_32px_rgba(64,21,29,0.14)]">
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <Image
              src={assets.decorations.bhagirathiBoat}
              alt={cityPrimary}
              fill
              priority
              className="venue-hero-image object-cover object-[center_42%] will-change-transform"
              sizes="(max-width: 430px) 90vw, 400px"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-deep-burgundy/25 via-transparent to-transparent" />
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
