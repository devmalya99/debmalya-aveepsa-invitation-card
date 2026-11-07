"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { MotionCard } from "@/components/animations/MotionCard";
import { StoryBirds } from "@/components/storybook/fx/StoryBirds";
import { StoryDrapes } from "@/components/storybook/fx/StoryDrapes";
import { StoryLeaves } from "@/components/storybook/fx/StoryLeaves";
import { StoryPetals } from "@/components/storybook/fx/StoryPetals";
import { StoryStars } from "@/components/storybook/fx/StoryStars";
import type { StoryChapter } from "@/config/storybook";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";

type StorySceneProps = {
  chapter: StoryChapter;
  index: number;
  locale: Locale;
  dictionary: Dictionary;
};

const overlays: Record<StoryChapter["overlay"], string | null> = {
  none: null,
  edge: "bg-gradient-to-b from-transparent via-transparent to-dark-burgundy/30",
  night: "bg-gradient-to-b from-[#0b1220]/10 via-transparent to-[#0b1220]/35",
};

const textSlots: Record<StoryChapter["textPosition"], string> = {
  center:
    "items-center justify-end pb-[max(1rem,env(safe-area-inset-bottom))] pt-20 text-center sm:justify-center sm:pb-10 sm:pt-24",
  top: "items-start justify-start pt-[max(5.25rem,calc(env(safe-area-inset-top)+4.25rem))] text-center sm:pt-28",
  bottom:
    "items-end justify-end pb-[max(1.25rem,env(safe-area-inset-bottom))] text-center sm:pb-24",
};

export function StoryScene({
  chapter,
  index,
  locale,
  dictionary,
}: StorySceneProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : 24],
  );
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : -16],
  );
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.55, 0.9],
    [1, 1, reduceMotion ? 1 : 0.25],
  );

  const copy = dictionary.loveStory.chapters[chapter.id];
  const from =
    index % 3 === 0 ? "top" : index % 3 === 1 ? "left" : ("right" as const);
  const isOpen = chapter.textStyle === "open";
  const sceneOverlay = overlays[chapter.overlay];
  const isContain = chapter.fit === "contain";

  return (
    <section
      ref={ref}
      id={chapter.id}
      className="relative h-[132vh] sm:h-[145vh] md:h-[150vh]"
      aria-label={`${dictionary.loveStory.chapterLabel} ${index + 1}`}
    >
      <div className="sticky top-0 h-dvh overflow-hidden bg-[#f0e2c4]">
        <motion.div style={{ y: imageY }} className="absolute inset-0">
          {isContain ? (
            <div className="flex h-full w-full items-start justify-center px-[clamp(0.5rem,3vw,2rem)] pb-[clamp(6.5rem,22vh,10rem)] pt-[clamp(3.75rem,10vh,5.5rem)] sm:items-center sm:pb-[clamp(4rem,12vh,7rem)] sm:pt-[clamp(3.5rem,8vh,5rem)]">
              <div
                className="relative w-full"
                style={{
                  maxWidth: "min(92vw, 36rem)",
                  height: "min(58dvh, 34rem)",
                }}
              >
                <Image
                  src={chapter.image}
                  alt=""
                  fill
                  priority={index === 0}
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 70vw, 576px"
                  className="object-contain object-center drop-shadow-[0_14px_32px_rgba(37,23,26,0.26)] sm:drop-shadow-[0_18px_40px_rgba(37,23,26,0.28)]"
                />
              </div>
            </div>
          ) : (
            <Image
              src={chapter.image}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-[center_30%] sm:object-center"
            />
          )}
        </motion.div>

        {sceneOverlay ? (
          <div className={`absolute inset-0 z-[5] ${sceneOverlay}`} />
        ) : null}

        {chapter.effects.includes("drapes") ? <StoryDrapes /> : null}
        {chapter.effects.includes("birds") ? <StoryBirds /> : null}
        {chapter.effects.includes("stars") ? <StoryStars /> : null}
        {chapter.effects.includes("petals") ? <StoryPetals /> : null}
        {chapter.effects.includes("leaves") ? <StoryLeaves /> : null}

        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className={`relative z-20 flex h-full px-[clamp(0.75rem,4vw,2rem)] ${textSlots[chapter.textPosition]}`}
        >
          <MotionCard
            from={from}
            className={
              isOpen
                ? "mx-auto w-full max-w-[min(92vw,36rem)] px-1 py-2 sm:px-2 sm:py-3"
                : "mx-auto w-full max-w-[min(90vw,28rem)] rounded-sm border border-antique-gold/25 bg-dark-burgundy/28 px-3 py-4 backdrop-blur-[1px] sm:max-w-lg sm:px-5 sm:py-6"
            }
          >
            <p
              className={`font-label text-[clamp(0.58rem,2.4vw,0.7rem)] uppercase tracking-[0.2em] text-antique-gold sm:tracking-[0.28em] ${
                isOpen ? "drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]" : ""
              }`}
            >
              {dictionary.loveStory.chapterLabel}{" "}
              {String(index + 1).padStart(2, "0")}
              {" · "}
              {copy.kicker}
            </p>
            <h2
              className={`mt-2 text-[clamp(1.25rem,5.5vw,3rem)] leading-[1.15] sm:mt-3 ${
                locale === "bn" ? "font-bengali-display" : "font-display"
              } ${
                isOpen
                  ? "text-soft-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.85)]"
                  : "text-soft-white"
              }`}
            >
              {copy.title}
            </h2>
            <div className="mx-auto mt-3 h-px w-12 bg-gradient-to-r from-transparent via-antique-gold to-transparent sm:mt-4 sm:w-20" />
            <div className="mt-3 space-y-1.5 sm:mt-4 sm:space-y-2">
              {copy.lines.map((line) => (
                <p
                  key={line}
                  className={`text-[clamp(0.82rem,3.1vw,1.125rem)] leading-relaxed ${
                    locale === "bn" ? "font-bengali-body" : "font-body"
                  } ${
                    isOpen
                      ? "text-soft-white/95 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
                      : "text-dusty-rose"
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>
            {index === 0 ? (
              <p className="mt-4 font-label text-[clamp(0.55rem,2.2vw,0.65rem)] uppercase tracking-[0.2em] text-muted-champagne drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] sm:mt-6 sm:tracking-[0.28em]">
                {dictionary.loveStory.scrollHint}
              </p>
            ) : null}
          </MotionCard>
        </motion.div>
      </div>
    </section>
  );
}
