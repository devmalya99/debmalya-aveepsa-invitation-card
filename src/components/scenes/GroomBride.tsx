"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { SceneWrapper } from "@/components/experience/SceneWrapper";
import { IdentityDetails } from "@/components/identities/IdentityDetails";
import { UnionOrnament } from "@/components/identities/UnionOrnament";
import { LetterCorner } from "@/components/letter/LetterOrnaments";
import { useLanguage } from "@/hooks/useLanguage";
import { usePinnedScene } from "@/hooks/usePinnedScene";
import { useScrollModeContext } from "@/hooks/useScrollModeContext";
import { gsap, registerGsap } from "@/lib/gsap";

/**
 * Groom then bride — one panel at a time via autoAlpha (no stacked text).
 */
export function GroomBride() {
  const { content } = useLanguage();
  const { cinematic } = useScrollModeContext();
  const sectionRef = useRef<HTMLElement>(null);
  const copy = content.identities;

  useGSAP(
    () => {
      if (!cinematic || !sectionRef.current) return;
      registerGsap();
      gsap.set(".identity-groom", { autoAlpha: 1, y: 0 });
      gsap.set(".identity-union", { autoAlpha: 0 });
      gsap.set(".identity-bride", { autoAlpha: 0, y: 16 });
      gsap.set(".identity-united", { autoAlpha: 0, y: 12 });
    },
    { scope: sectionRef, dependencies: [cinematic], revertOnUpdate: true },
  );

  usePinnedScene({
    sectionRef,
    sceneId: "groom-bride",
    enabled: cinematic,
    build: (timeline) => {
      timeline
        .fromTo(
          ".identity-sheet",
          { scale: 0.99 },
          { scale: 1, duration: 0.3 },
          0,
        )
        .to(".identity-groom", { autoAlpha: 0, y: -10, duration: 0.28 }, 0.55)
        .fromTo(
          ".identity-union",
          { autoAlpha: 0, scale: 0.92 },
          { autoAlpha: 1, scale: 1, duration: 0.32 },
          0.65,
        )
        .fromTo(
          ".union-path",
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, stagger: 0.05, duration: 0.4 },
          0.65,
        )
        .to(".identity-union", { autoAlpha: 0, duration: 0.25 }, 1.15)
        .fromTo(
          ".identity-bride",
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.35 },
          1.25,
        )
        .to(".identity-bride", { autoAlpha: 0, y: -10, duration: 0.28 }, 2.05)
        .fromTo(
          ".identity-united",
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.35 },
          2.15,
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
        <article className="w-full space-y-6 rounded-[1rem] bg-[linear-gradient(165deg,#fff8ea_0%,#f6ebd7_55%,#ead9b8_100%)] px-5 py-6 text-center text-deep-burgundy">
          <div>
            <h2 className="font-bn-display text-xl text-sindoor-red">{copy.groomName}</h2>
            <IdentityDetails rows={copy.groomDetails} className="mx-auto mt-3 max-w-[19rem] text-left" />
          </div>
          <div>
            <h2 className="font-bn-display text-xl text-sindoor-red">{copy.brideName}</h2>
            <IdentityDetails rows={copy.brideDetails} className="mx-auto mt-3 max-w-[19rem] text-left" />
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
      <article className="identity-sheet relative flex h-full max-h-[calc(100svh-6.5rem)] w-full flex-col overflow-hidden rounded-[1rem] bg-[linear-gradient(165deg,#fff8ea_0%,#f6ebd7_55%,#ead9b8_100%)] px-5 py-5 text-deep-burgundy shadow-[0_16px_36px_rgba(64,21,29,0.12)]">
        <div className="pointer-events-none absolute inset-[7px] rounded-[0.75rem] border border-antique-gold/45" />
        <LetterCorner className="absolute top-3 left-3 z-20 h-7 w-7 text-antique-gold" />
        <LetterCorner className="absolute top-3 right-3 z-20 h-7 w-7 rotate-90 text-antique-gold" />
        <LetterCorner className="absolute bottom-3 left-3 z-20 h-7 w-7 -rotate-90 text-antique-gold" />
        <LetterCorner className="absolute right-3 bottom-3 z-20 h-7 w-7 rotate-180 text-antique-gold" />

        <div className="relative z-10 min-h-0 flex-1">
          <section className="identity-groom absolute inset-0 flex flex-col items-center justify-center overflow-hidden px-1 text-center">
            <p className="font-body text-[0.58rem] tracking-[0.2em] text-[#6b5224] uppercase">
              {copy.groomLabelEn}
            </p>
            <p className="mt-0.5 font-bn-display text-sm text-[#6b5224]">{copy.groomLabelBn}</p>
            <h2 className="mt-2 font-bn-display text-[1.45rem] text-sindoor-red">{copy.groomName}</h2>
            <p className="mt-1 font-bn-display text-sm text-deep-burgundy/80">{copy.groomRelation}</p>
            <IdentityDetails rows={copy.groomDetails} className="mx-auto mt-3 max-w-[19rem]" />
          </section>

          <div className="identity-union absolute inset-0 flex flex-col items-center justify-center">
            <UnionOrnament />
            <p className="mt-3 font-bn-display text-sm text-deep-burgundy/75">দুই পরিবারের মিলন</p>
          </div>

          <section className="identity-bride absolute inset-0 flex flex-col items-center justify-center overflow-hidden px-1 text-center">
            <p className="font-body text-[0.58rem] tracking-[0.2em] text-[#6b5224] uppercase">
              {copy.brideLabelEn}
            </p>
            <p className="mt-0.5 font-bn-display text-sm text-[#6b5224]">{copy.brideLabelBn}</p>
            <h2 className="mt-2 font-bn-display text-[1.45rem] text-sindoor-red">{copy.brideName}</h2>
            <p className="mt-1 font-bn-display text-sm text-deep-burgundy/80">{copy.brideRelation}</p>
            <IdentityDetails rows={copy.brideDetails} className="mx-auto mt-3 max-w-[19rem]" />
          </section>

          <div className="identity-united absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="font-bn-display text-2xl text-sindoor-red">{copy.unitedLine}</p>
            <p className="mt-2 font-display text-xs tracking-[0.16em] text-deep-burgundy/80 uppercase">
              United in love
            </p>
          </div>
        </div>
      </article>
    </SceneWrapper>
  );
}
