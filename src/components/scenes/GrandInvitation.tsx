"use client";

import Image from "next/image";
import { useRef } from "react";
import { SceneWrapper } from "@/components/experience/SceneWrapper";
import {
  LetterCorner,
  LetterFooterMotif,
  LetterHeaderMotif,
} from "@/components/letter/LetterOrnaments";
import { assets } from "@/data/assets";
import { useLanguage } from "@/hooks/useLanguage";
import { usePinnedScene } from "@/hooks/usePinnedScene";
import { useScrollModeContext } from "@/hooks/useScrollModeContext";

/**
 * Pinned letter — one viewport card, no inner scroll (that traps page scroll on mobile).
 */
export function GrandInvitation() {
  const { content, locale } = useLanguage();
  const { cinematic } = useScrollModeContext();
  const sectionRef = useRef<HTMLElement>(null);
  const letter = content.letter;
  const isBengali = locale === "bn";

  usePinnedScene({
    sectionRef,
    sceneId: "grand-invitation",
    enabled: cinematic,
    build: (timeline) => {
      timeline
        .fromTo(
          ".letter-sheet",
          { y: 14, opacity: 0.94 },
          { y: 0, opacity: 1, duration: 0.45 },
          0,
        )
        .fromTo(
          ".letter-corner",
          { opacity: 0.45 },
          { opacity: 1, stagger: 0.04, duration: 0.25 },
          0.15,
        )
        .fromTo(
          ".letter-salutation",
          { y: 8, opacity: 0.92 },
          { y: 0, opacity: 1, duration: 0.3 },
          0.2,
        )
        .fromTo(
          ".letter-paragraph",
          { y: 8, opacity: 0.9 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.3 },
          0.35,
        )
        .fromTo(
          ".letter-closing-block",
          { y: 6, opacity: 0.9 },
          { y: 0, opacity: 1, duration: 0.3 },
          0.55,
        );
    },
  });

  return (
    <SceneWrapper
      ref={sectionRef}
      id="grand-invitation"
      tone="burgundy"
      innerClassName="max-w-[26rem] justify-center sm:max-w-lg"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(185,154,88,0.12),transparent_55%)]" />

      <div className="relative z-10 flex h-full max-h-[calc(100svh-6.25rem)] w-full items-center justify-center overflow-hidden rounded-[1.05rem]">
        <article className="letter-sheet relative flex max-h-full w-full flex-col justify-center overflow-hidden rounded-[1.05rem] bg-[linear-gradient(165deg,#fff8ea_0%,#f6ebd7_48%,#ead9b8_100%)] px-5 py-5 text-deep-burgundy shadow-[0_20px_40px_rgba(20,6,10,0.3)] sm:px-6 sm:py-6">
          <div className="pointer-events-none absolute inset-[7px] rounded-[0.75rem] border border-antique-gold/50" />
          <LetterCorner className="letter-corner absolute top-3 left-3 z-10 h-7 w-7 text-antique-gold" />
          <LetterCorner className="letter-corner absolute top-3 right-3 z-10 h-7 w-7 rotate-90 text-antique-gold" />
          <LetterCorner className="letter-corner absolute bottom-3 left-3 z-10 h-7 w-7 -rotate-90 text-antique-gold" />
          <LetterCorner className="letter-corner absolute right-3 bottom-3 z-10 h-7 w-7 rotate-180 text-antique-gold" />

          <div className="relative z-10 flex flex-col items-center px-1 text-center">
            <div className="mb-2.5 w-full text-antique-gold">
              <Image
                src={assets.decorations.alpana}
                alt=""
                width={40}
                height={40}
                className="mx-auto rounded-full object-cover opacity-80"
                style={{ width: 40, height: 40 }}
              />
              <LetterHeaderMotif className="mx-auto mt-1.5 h-5 w-36 text-antique-gold" />
            </div>

            <p
              className={`font-body text-[0.58rem] tracking-[0.18em] text-[#6b5224] uppercase ${
                isBengali ? "font-bn-body tracking-normal normal-case" : ""
              }`}
            >
              {letter.eyebrow}
            </p>

            <h2
              className={`letter-salutation mt-1.5 max-w-[16ch] text-[1.5rem] leading-[1.2] text-sindoor-red sm:text-[1.7rem] ${
                isBengali ? "font-bn-display" : "font-display"
              }`}
            >
              {letter.salutation}
            </h2>

            <p className="mt-1.5 font-bn-display text-[1.05rem] text-deep-burgundy">
              {letter.bengaliTitle}
            </p>

            <p
              className={`mt-0.5 text-[0.62rem] tracking-[0.12em] text-deep-burgundy/80 uppercase ${
                isBengali ? "font-bn-body tracking-normal normal-case" : "font-display"
              }`}
            >
              {letter.subtitle}
            </p>

            <div className="mt-4 w-full space-y-2.5 text-left">
              {letter.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className={`letter-paragraph text-[0.88rem] leading-[1.65] text-deep-burgundy/90 ${
                    isBengali ? "font-bn-display" : "font-display"
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="letter-closing-block mt-4 flex w-full flex-col items-center">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-antique-gold to-transparent" />
              <p
                className={`mt-3 text-[0.9rem] text-sindoor-red ${
                  isBengali ? "font-bn-display" : "font-display"
                }`}
              >
                {letter.closing}
              </p>
              <p
                className={`mt-0.5 text-sm text-deep-burgundy/80 ${
                  isBengali ? "font-bn-body" : "font-display"
                }`}
              >
                {letter.families}
              </p>

              <LetterFooterMotif className="mt-3 h-4 w-24 text-antique-gold" />
              <div className="mt-1.5 flex items-center gap-2">
                <Image
                  src={assets.decorations.shankha}
                  alt=""
                  width={26}
                  height={26}
                  className="rounded-full object-cover opacity-75"
                  style={{ width: 26, height: 26 }}
                />
                <p
                  className={`text-sm text-deep-burgundy ${
                    isBengali ? "font-bn-body" : "font-display"
                  }`}
                >
                  {letter.date}
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </SceneWrapper>
  );
}
