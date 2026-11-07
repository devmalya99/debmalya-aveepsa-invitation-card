"use client";

import { motion, useReducedMotion } from "motion/react";
import { FormalInviteText } from "@/components/pocket/FormalInviteText";
import { GlowRevealText } from "@/components/pocket/GlowRevealText";
import { VerticalInviteScene } from "@/components/pocket/VerticalInviteScene";
import { ClosingSection } from "@/components/sections/ClosingSection";
import { CountdownSection } from "@/components/sections/CountdownSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { RsvpSection } from "@/components/sections/RsvpSection";
import { VenueSection } from "@/components/sections/VenueSection";
import { inviteDeckCards } from "@/config/invite-deck";
import { WEDDING } from "@/config/wedding";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";

type PocketInviteProps = {
  locale: Locale;
  dictionary: Dictionary;
};

/**
 * Vertical snap invitation — page scrolls down one scene at a time.
 * No horizontal carousels.
 */
export function PocketInvite({ locale, dictionary }: PocketInviteProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="h-dvh snap-y snap-mandatory overflow-y-auto overscroll-y-contain">
      {inviteDeckCards.map((card) => {
        if (card.id === "cover") {
          return (
            <VerticalInviteScene
              key={card.id}
              card={card}
              footer={(active) => (
                <CoverFooter
                  locale={locale}
                  dictionary={dictionary}
                  active={active}
                  reduceMotion={!!reduceMotion}
                />
              )}
            >
              {(active) => (
                <div className="flex flex-1 items-center justify-center px-6 pb-[30%] pt-[8%]">
                  <GlowRevealText
                    active={active}
                    delay={0.15}
                    className="font-bengali-display text-2xl text-[#ffd98a]"
                  >
                    {dictionary.hero.shubhoBibaho}
                  </GlowRevealText>
                </div>
              )}
            </VerticalInviteScene>
          );
        }

        if (card.id === "formal") {
          return (
            <VerticalInviteScene key={card.id} card={card}>
              {(active) => (
                <div className="flex flex-1 items-center justify-center px-4 pb-[18%] pt-[10%]">
                  <FormalInviteText
                    locale={locale}
                    dictionary={dictionary}
                    active={active}
                  />
                </div>
              )}
            </VerticalInviteScene>
          );
        }

        const story = card.storyKey
          ? dictionary.loveStory.chapters[card.storyKey]
          : null;

        return (
          <VerticalInviteScene key={card.id} card={card}>
            {(active) =>
              story ? (
                <div className="mt-auto flex flex-col items-center px-5 pb-7 pt-16 text-center">
                  <GlowRevealText
                    active={active}
                    delay={0.1}
                    className="font-label text-[0.58rem] uppercase tracking-[0.28em] text-[#ffd98a]"
                  >
                    {story.kicker}
                  </GlowRevealText>
                  <GlowRevealText
                    active={active}
                    delay={0.28}
                    className="mt-2 max-w-[16rem] font-display text-[1.35rem] leading-snug text-[#fff8e8]"
                  >
                    {story.title}
                  </GlowRevealText>
                  {story.lines.map((line, lineIndex) => (
                    <GlowRevealText
                      key={line}
                      active={active}
                      delay={0.42 + lineIndex * 0.12}
                      className="mt-1.5 max-w-[15rem] font-body text-[0.8rem] leading-relaxed text-[#f0d9a8]/95"
                    >
                      {line}
                    </GlowRevealText>
                  ))}
                </div>
              ) : null
            }
          </VerticalInviteScene>
        );
      })}

      <div className="min-h-dvh snap-start snap-always bg-[#f6efe3]">
        <EventsSection locale={locale} dictionary={dictionary} />
      </div>
      <div className="min-h-dvh snap-start snap-always bg-deep-wine">
        <CountdownSection locale={locale} dictionary={dictionary} />
      </div>
      <div className="min-h-dvh snap-start snap-always bg-[#f6efe3]">
        <VenueSection locale={locale} dictionary={dictionary} />
      </div>
      <div className="min-h-dvh snap-start snap-always bg-deep-wine">
        <RsvpSection locale={locale} dictionary={dictionary} />
      </div>
      <div className="min-h-dvh snap-start snap-always bg-dark-burgundy">
        <ClosingSection locale={locale} dictionary={dictionary} />
      </div>
    </div>
  );
}

function CoverFooter({
  locale,
  dictionary,
  active,
  reduceMotion,
}: {
  locale: Locale;
  dictionary: Dictionary;
  active: boolean;
  reduceMotion: boolean;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <GlowRevealText
        active={active}
        delay={0.25}
        className="font-display text-[clamp(1.55rem,6.5vw,2.1rem)] leading-none text-soft-white"
      >
        {WEDDING.couple.shortNames[locale]}
      </GlowRevealText>
      <GlowRevealText
        active={active}
        delay={0.4}
        className="mt-1.5 font-label text-[0.6rem] uppercase tracking-[0.24em] text-antique-gold"
      >
        {dictionary.hero.date}
      </GlowRevealText>
      <GlowRevealText
        active={active}
        delay={0.55}
        className="mt-3 font-label text-[0.55rem] uppercase tracking-[0.2em] text-soft-white/70"
      >
        {dictionary.hero.scrollHint}
      </GlowRevealText>
      <motion.span
        className="mt-2 block h-1.5 w-1.5 rounded-full bg-antique-gold"
        animate={
          reduceMotion || !active
            ? undefined
            : { y: [0, 6, 0], opacity: [0.4, 1, 0.4] }
        }
        transition={{ duration: 1.6, repeat: Infinity }}
      />
    </div>
  );
}
