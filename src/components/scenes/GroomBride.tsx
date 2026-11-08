"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { SceneWrapper } from "@/components/experience/SceneWrapper";
import { LetterCorner } from "@/components/letter/LetterOrnaments";
import { assets } from "@/data/assets";
import { useLanguage } from "@/hooks/useLanguage";
import { usePinnedScene } from "@/hooks/usePinnedScene";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollModeContext } from "@/hooks/useScrollModeContext";
import { MOTION } from "@/lib/animation-config";
import { gsap, registerGsap } from "@/lib/gsap";

function FamilyEditorial({
  side,
  label,
  name,
  members,
  isBengali,
}: {
  side: "groom" | "bride";
  label: string;
  name: string;
  members: Array<{ label: string; value: string }>;
  isBengali: boolean;
}) {
  return (
    <div
      className={`union-family union-family-${side} w-full max-w-[19rem] text-center`}
    >
      <p className="union-family-label font-body text-[0.52rem] tracking-[0.2em] text-[#6b5224] uppercase">
        {label}
      </p>
      <h3
        className={`union-family-name mt-1 text-[1.05rem] leading-snug text-sindoor-red ${
          isBengali ? "font-bn-display" : "font-display"
        }`}
      >
        {name}
      </h3>
      <div className="union-family-rule mx-auto mt-1.5 h-px w-10 origin-center bg-gradient-to-r from-transparent via-antique-gold to-transparent" />
      <dl className="mt-2 space-y-1 text-left">
        {members.map((row) => (
          <div
            key={`${side}-${row.label}`}
            className="union-family-row grid grid-cols-[auto_1fr] gap-x-2.5"
          >
            <dt className="font-body text-[0.55rem] tracking-[0.1em] text-antique-gold uppercase">
              {row.label}
            </dt>
            <dd
              className={`text-[0.8rem] leading-snug text-deep-burgundy/90 ${
                isBengali ? "font-bn-display" : "font-display"
              }`}
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/**
 * Scene 02 — The Golden Mandala Ceremony.
 * One magnificent mandala unfold, then the two families join.
 */
export function GroomBride() {
  const { content, locale } = useLanguage();
  const { cinematic } = useScrollModeContext();
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const copy = content.identities;
  const isBengali = locale === "bn";

  /* Parents + brother for groom; parents + siblings for bride (no address rows). */
  const groomMembers = copy.groomDetails.slice(0, 3);
  const brideMembers = copy.brideDetails.slice(0, 4);

  useGSAP(
    () => {
      if (!cinematic || !sectionRef.current) return;
      registerGsap();

      /* Sheet stays visible — never a blank scene while the pin catches up. */
      gsap.set(".identity-sheet", { autoAlpha: 1, y: 0, scale: 1 });
      gsap.set(".identity-corner", { autoAlpha: 1 });
      gsap.set(".identity-border", { autoAlpha: 1 });
      gsap.set(".union-glow", { autoAlpha: 0.35, scale: 0.85 });
      gsap.set(".union-mandala-mask", {
        clipPath: "circle(12% at 50% 50%)",
      });
      gsap.set(".union-mandala-art", { scale: 1.04, autoAlpha: 0.95 });
      gsap.set(".union-shimmer", { rotate: 0, autoAlpha: 0 });
      gsap.set(".union-caption", { autoAlpha: 1, y: 0, filter: "none" });
      gsap.set(".union-caption-bn", { autoAlpha: 1, y: 0 });
      gsap.set(".union-family-groom", { autoAlpha: 0, y: 18 });
      gsap.set(".union-family-bride", { autoAlpha: 0, y: 18 });
      gsap.set(".union-family-row", { autoAlpha: 0, y: 8 });
      gsap.set(".union-family-rule", { scaleX: 0 });
      gsap.set(".union-bridge", { autoAlpha: 0, scaleX: 0 });
      gsap.set(".union-finale", { autoAlpha: 0, y: 10 });
      gsap.set(".union-particle", { autoAlpha: 0.4 });

      if (!reducedMotion) {
        gsap.to(".union-mandala-spin", {
          rotate: 360,
          duration: 80,
          repeat: -1,
          ease: "none",
          transformOrigin: "50% 50%",
        });
      }
    },
    {
      scope: sectionRef,
      dependencies: [cinematic, reducedMotion],
      revertOnUpdate: true,
    },
  );

  usePinnedScene({
    sectionRef,
    sceneId: "groom-bride",
    enabled: cinematic,
    build: (timeline) => {
      timeline
        /* 0–15%: parchment + frame */
        .to(
          ".identity-sheet",
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: MOTION.easeScrub,
          },
          0,
        )
        .to(
          ".identity-border",
          { autoAlpha: 1, duration: 0.28, ease: MOTION.easeScrub },
          0.1,
        )
        .to(
          ".identity-corner",
          {
            autoAlpha: 1,
            stagger: 0.05,
            duration: 0.28,
            ease: MOTION.easeScrub,
          },
          0.15,
        )
        .to(
          ".union-particle",
          {
            autoAlpha: 0.55,
            stagger: 0.04,
            duration: 0.3,
            ease: MOTION.easeScrub,
          },
          0.2,
        )

        /* One continuous mandala bloom — same clip syntax end-to-end (no circle→inset jump) */
        .to(
          ".union-glow",
          {
            autoAlpha: 0.5,
            scale: 1,
            duration: 0.7,
            ease: MOTION.easeScrub,
          },
          0.45,
        )
        .to(
          ".union-mandala-mask",
          {
            /* 50% = inscribed circle — never open far enough to show square corners */
            clipPath: "circle(50% at 50% 50%)",
            duration: 1.35,
            ease: MOTION.easeScrub,
          },
          0.5,
        )
        .to(
          ".union-mandala-art",
          { autoAlpha: 1, scale: 1, duration: 1.2, ease: MOTION.easeScrub },
          0.55,
        )
        .fromTo(
          ".union-shimmer",
          { autoAlpha: 0.3, rotate: -12 },
          {
            autoAlpha: 0,
            rotate: 18,
            duration: 0.7,
            ease: MOTION.easeScrub,
          },
          1.4,
        )

        /* Caption only — couple names live on first & last scenes */
        .to(
          ".union-caption",
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.35,
            ease: MOTION.easeScrub,
          },
          1.95,
        )
        .to(
          ".union-caption-bn",
          { autoAlpha: 1, y: 0, duration: 0.28, ease: MOTION.easeScrub },
          2.15,
        )

        /* Soft settle for family room — not a second bloom */
        .to(
          ".union-mandala-stage",
          {
            scale: 0.72,
            y: -12,
            duration: 0.4,
            ease: MOTION.easeScrub,
          },
          2.4,
        )
        .to(
          ".union-identity-block",
          { y: -6, duration: 0.3, ease: MOTION.easeScrub },
          2.4,
        )

        /* Groom family — full panel in shared slot */
        .to(
          ".union-family-groom",
          { autoAlpha: 1, y: 0, duration: 0.35, ease: MOTION.easeScrub },
          2.7,
        )
        .to(
          ".union-family-groom .union-family-rule",
          { scaleX: 1, duration: 0.25, ease: MOTION.easeScrub },
          2.85,
        )
        .to(
          ".union-family-groom .union-family-row",
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.3,
            ease: MOTION.easeScrub,
          },
          2.95,
        )

        /* Bridge beat while groom exits */
        .to(
          ".union-family-groom",
          {
            autoAlpha: 0,
            y: -14,
            duration: 0.32,
            ease: MOTION.easeScrub,
          },
          3.45,
        )
        .to(
          ".union-bridge",
          {
            autoAlpha: 1,
            scaleX: 1,
            duration: 0.28,
            ease: MOTION.easeScrub,
          },
          3.5,
        )
        .to(
          ".union-bridge",
          { autoAlpha: 0, duration: 0.22, ease: MOTION.easeScrub },
          3.75,
        )

        /* Bride family — father, mother, brother, sister-in-law */
        .to(
          ".union-family-bride",
          { autoAlpha: 1, y: 0, duration: 0.35, ease: MOTION.easeScrub },
          3.8,
        )
        .to(
          ".union-family-bride .union-family-rule",
          { scaleX: 1, duration: 0.25, ease: MOTION.easeScrub },
          3.95,
        )
        .to(
          ".union-family-bride .union-family-row",
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.07,
            duration: 0.28,
            ease: MOTION.easeScrub,
          },
          4.05,
        )

        .to(
          ".union-finale",
          { autoAlpha: 1, y: 0, duration: 0.3, ease: MOTION.easeScrub },
          4.55,
        );
    },
  });

  if (!cinematic) {
    return (
      <SceneWrapper
        ref={sectionRef}
        id="groom-bride"
        tone="parchment"
        innerClassName="max-w-[26rem] justify-start sm:max-w-lg"
      >
        <article className="w-full space-y-5 rounded-[1rem] bg-[linear-gradient(165deg,#fff8ea_0%,#f6ebd7_55%,#ead9b8_100%)] px-5 py-6 text-center text-deep-burgundy">
          <Image
            src={assets.decorations.unionMandala}
            alt=""
            width={220}
            height={220}
            className="mx-auto mix-blend-multiply"
            style={{ width: 200, height: "auto" }}
          />
          <p className="font-display text-xs tracking-[0.16em] text-[#6b5224] uppercase">
            The union of two families
          </p>
          <div className="space-y-4 text-left">
            <div>
              <h2 className="text-center font-bn-display text-lg text-sindoor-red">
                {copy.groomName}
              </h2>
              {groomMembers.map((row) => (
                <p key={row.label} className="mt-1 font-bn-display text-sm">
                  <span className="text-antique-gold">{row.label}: </span>
                  {row.value}
                </p>
              ))}
            </div>
            <div>
              <h2 className="text-center font-bn-display text-lg text-sindoor-red">
                {copy.brideName}
              </h2>
              {brideMembers.map((row) => (
                <p key={row.label} className="mt-1 font-bn-display text-sm">
                  <span className="text-antique-gold">{row.label}: </span>
                  {row.value}
                </p>
              ))}
            </div>
          </div>
        </article>
      </SceneWrapper>
    );
  }

  return (
    <SceneWrapper
      ref={sectionRef}
      id="groom-bride"
      tone="parchment"
      innerClassName="max-w-[26rem] justify-center sm:max-w-lg"
    >
      <article className="identity-sheet relative flex max-h-[calc(100svh-6.5rem)] w-full flex-col overflow-hidden rounded-[1rem] bg-[linear-gradient(165deg,#fff8ea_0%,#f6ebd7_52%,#ead9b8_100%)] px-4 py-3 text-deep-burgundy shadow-[0_16px_36px_rgba(64,21,29,0.12)] will-change-transform">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(185,154,88,0.14),transparent_60%)]" />
        <div className="identity-border pointer-events-none absolute inset-[7px] rounded-[0.75rem] border border-antique-gold/50" />
        <div className="identity-border pointer-events-none absolute inset-[11px] rounded-[0.55rem] border border-antique-gold/25" />
        <LetterCorner className="identity-corner absolute top-3 left-3 z-20 h-7 w-7 text-antique-gold" />
        <LetterCorner className="identity-corner absolute top-3 right-3 z-20 h-7 w-7 rotate-90 text-antique-gold" />
        <LetterCorner className="identity-corner absolute bottom-3 left-3 z-20 h-7 w-7 -rotate-90 text-antique-gold" />
        <LetterCorner className="identity-corner absolute right-3 bottom-3 z-20 h-7 w-7 rotate-180 text-antique-gold" />

        {/* Soft gold dust — few only */}
        <span className="union-particle pointer-events-none absolute top-[18%] left-[14%] h-1 w-1 rounded-full bg-antique-gold/70" />
        <span className="union-particle pointer-events-none absolute top-[28%] right-[16%] h-1.5 w-1.5 rounded-full bg-antique-gold/50" />
        <span className="union-particle pointer-events-none absolute bottom-[30%] left-[20%] h-1 w-1 rounded-full bg-antique-gold/60" />
        <span className="union-particle pointer-events-none absolute right-[22%] bottom-[24%] h-1 w-1 rounded-full bg-antique-gold/45" />

        <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center">
          {/* Mandala centrepiece */}
          <div className="union-mandala-stage relative flex w-full flex-col items-center will-change-transform">
            <div className="union-glow pointer-events-none absolute top-1/2 left-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(185,154,88,0.35)_0%,transparent_68%)]" />

            <div className="union-mandala-mask relative mx-auto aspect-square w-[min(58vw,13.5rem)] max-h-[22svh] overflow-hidden rounded-full will-change-[clip-path]">
              <div className="union-mandala-spin absolute inset-0 will-change-transform">
                <Image
                  src={assets.decorations.unionMandala}
                  alt="Golden mandala — union of two families"
                  fill
                  priority
                  unoptimized
                  className="union-mandala-art object-contain will-change-transform"
                  sizes="(max-width: 430px) 78vw, 296px"
                />
              </div>
              <div className="union-shimmer pointer-events-none absolute inset-[-10%] rounded-full bg-[conic-gradient(from_180deg,transparent_0%,rgba(255,248,234,0.35)_12%,transparent_28%)] mix-blend-soft-light" />
            </div>
          </div>

          <div className="union-identity-block mt-1 w-full text-center will-change-transform">
            <p className="union-caption font-display text-[0.55rem] tracking-[0.18em] text-[#6b5224] uppercase">
              The union of two families
            </p>
            {isBengali ? (
              <p className="union-caption-bn mt-0.5 font-bn-display text-[0.78rem] text-deep-burgundy/80">
                বাংলার দুই পরিবারের এক শুভ মিলন
              </p>
            ) : null}
          </div>

          {/*
            One family at a time in a shared absolute slot.
            Bride needs room for father, mother, brother, sister-in-law.
          */}
          <div className="relative mt-2 h-[11rem] w-full shrink-0">
            <div className="absolute inset-x-0 top-0 flex justify-center">
              <FamilyEditorial
                side="groom"
                label={isBengali ? "পাত্রের পরিবার" : "Groom's family"}
                name={copy.groomName}
                members={groomMembers}
                isBengali={isBengali}
              />
            </div>

            <div className="union-bridge absolute inset-x-0 top-[42%] flex h-5 -translate-y-1/2 items-center justify-center">
              <div className="absolute inset-x-[22%] top-1/2 h-px origin-center bg-gradient-to-r from-transparent via-antique-gold to-transparent" />
              <span className="relative z-10 h-1.5 w-1.5 rounded-full bg-antique-gold" />
            </div>

            <div className="absolute inset-x-0 top-0 flex flex-col items-center">
              <FamilyEditorial
                side="bride"
                label={isBengali ? "পাত্রীর পরিবার" : "Bride's family"}
                name={copy.brideName}
                members={brideMembers}
                isBengali={isBengali}
              />
              <p className="union-finale mt-2 font-display text-[0.55rem] tracking-[0.16em] text-antique-gold uppercase">
                United in love & blessings
              </p>
            </div>
          </div>
        </div>
      </article>
    </SceneWrapper>
  );
}
