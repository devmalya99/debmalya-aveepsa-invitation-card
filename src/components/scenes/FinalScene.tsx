"use client";

import Image from "next/image";
import { useRef } from "react";
import { SceneWrapper } from "@/components/experience/SceneWrapper";
import { assets } from "@/data/assets";
import { useLanguage } from "@/hooks/useLanguage";
import { usePinnedScene } from "@/hooks/usePinnedScene";
import { useScrollModeContext } from "@/hooks/useScrollModeContext";

type FinalSceneProps = {
  onReplay: () => void;
};

export function FinalScene({ onReplay }: FinalSceneProps) {
  const { content, locale } = useLanguage();
  const { cinematic } = useScrollModeContext();
  const sectionRef = useRef<HTMLElement>(null);
  const copy = content.final;

  usePinnedScene({
    sectionRef,
    sceneId: "final-scene",
    enabled: cinematic,
    build: (timeline) => {
      timeline
        /* Content stays readable from the first pin frame — no blank burgundy. */
        .fromTo(
          ".final-frame",
          { opacity: 1, scale: 1.04 },
          { opacity: 1, scale: 1, duration: 0.7 },
          0,
        )
        .fromTo(
          ".final-image",
          { scale: 1.06 },
          { scale: 1, duration: 0.9, ease: "none" },
          0,
        )
        .fromTo(
          ".final-family",
          { y: 8, opacity: 0.9 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.3 },
          0.15,
        )
        .fromTo(
          ".final-blessing",
          { y: 10, opacity: 0.9 },
          { y: 0, opacity: 1, duration: 0.35 },
          0.3,
        )
        .fromTo(
          ".final-closing",
          { y: 8, opacity: 0.9 },
          { y: 0, opacity: 1, duration: 0.3 },
          0.45,
        )
        .fromTo(
          ".final-replay",
          { y: 6, opacity: 0.85 },
          { y: 0, opacity: 1, duration: 0.28 },
          0.6,
        );
    },
  });

  return (
    <SceneWrapper
      ref={sectionRef}
      id="final-scene"
      tone="burgundy"
      innerClassName="max-w-[26rem] justify-center sm:max-w-lg"
    >
      <div className="flex h-full min-h-0 w-full flex-col items-center justify-center gap-4 text-center">
        <div className="final-frame relative w-[min(58vw,14rem)]">
          <div className="pointer-events-none absolute -inset-2 rounded-[1.6rem] border border-antique-gold/55" />
          <div className="relative aspect-[3/4] overflow-hidden rounded-[1.35rem] border border-antique-gold/40">
            <Image
              src={assets.couple.finalBlessing}
              alt={copy.names}
              fill
              className="final-image object-cover object-[50%_18%]"
              sizes="(max-width: 480px) 58vw, 224px"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          {copy.familyLines.map((line) => (
            <p
              key={line}
              className={`final-family text-sm text-antique-ivory/80 ${
                locale === "bn" ? "font-bn-body" : "font-body"
              }`}
            >
              {line}
            </p>
          ))}
        </div>

        <p
          className={`final-blessing max-w-sm text-[0.95rem] leading-relaxed text-antique-ivory ${
            locale === "bn" ? "font-bn-display" : "font-display"
          }`}
        >
          {copy.blessing}
        </p>

        <div className="final-closing space-y-1">
          <p
            className={`text-xl text-antique-gold ${
              locale === "bn" ? "font-bn-display" : "font-display"
            }`}
          >
            {copy.closingTitle}
          </p>
          <p
            className={`text-lg text-antique-ivory ${
              locale === "bn" ? "font-bn-body" : "font-display"
            }`}
          >
            {copy.names}
          </p>
        </div>

        <button
          type="button"
          onClick={onReplay}
          className={`final-replay mt-1 rounded-full border border-antique-gold/60 px-5 py-2 text-sm text-antique-ivory transition hover:bg-antique-gold/15 ${
            locale === "bn" ? "font-bn-body" : "font-body"
          }`}
        >
          {content.common.replay}
        </button>
      </div>
    </SceneWrapper>
  );
}
