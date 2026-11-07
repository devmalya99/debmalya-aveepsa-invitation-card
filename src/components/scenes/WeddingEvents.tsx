"use client";

import { useRef } from "react";
import { SceneWrapper } from "@/components/experience/SceneWrapper";
import {
  FestivityDateMedallion,
  FestivityHeaderOrnament,
  FestivityLotusNode,
} from "@/components/events/FestivityOrnaments";
import { useLanguage } from "@/hooks/useLanguage";
import { usePinnedScene } from "@/hooks/usePinnedScene";
import { useScrollModeContext } from "@/hooks/useScrollModeContext";
import type { InvitationEvent } from "@/types/invitation";

function EventBlock({
  event,
  index,
  compact,
}: {
  event: InvitationEvent;
  index: number;
  compact?: boolean;
}) {
  const turmeric = event.accent === "turmeric";

  return (
    <article
      className={`event-block event-block-${index} relative w-full pl-12 text-left ${
        compact ? "py-1" : ""
      }`}
    >
      <div className="absolute top-0.5 left-0">
        <FestivityDateMedallion
          className={`event-medallion ${compact ? "h-9 w-9" : "h-11 w-11"}`}
          tone={turmeric ? "gold" : "burgundy"}
        />
      </div>

      <p
        className={`font-body text-[0.58rem] tracking-[0.18em] uppercase ${
          turmeric ? "text-[#6b5224]" : "text-sindoor-red"
        }`}
      >
        {event.titleEn}
      </p>

      <h3
        className={`mt-1 font-bn-display leading-snug text-deep-burgundy ${
          compact ? "text-[1.15rem]" : "text-[1.3rem] sm:text-[1.4rem]"
        }`}
      >
        {event.titleBn}
      </h3>

      <p
        className={`event-bn-date mt-1.5 font-bn-display leading-relaxed ${
          compact ? "text-[0.92rem]" : "text-[1rem]"
        } ${turmeric ? "text-[#5c451c]" : "text-sindoor-red"}`}
      >
        {event.bengaliDate}
      </p>

      <p className="event-en-date mt-0.5 font-display text-[1.05rem] leading-tight text-deep-burgundy sm:text-[1.15rem]">
        {event.englishDate}
      </p>

      <p className="mt-1 font-display text-[0.8rem] tracking-[0.04em] text-deep-burgundy/85">
        {event.day}
        <span className="mx-1.5 text-deep-burgundy/40">·</span>
        {event.time}
      </p>
    </article>
  );
}

/**
 * Both festivities stay on screen — 25 Nov and 27 Nov are never hidden behind a panel.
 */
export function WeddingEvents() {
  const { content } = useLanguage();
  const { cinematic } = useScrollModeContext();
  const sectionRef = useRef<HTMLElement>(null);
  const events = content.events;
  const [wedding, reception] = events.items;

  usePinnedScene({
    sectionRef,
    sceneId: "wedding-events",
    enabled: cinematic,
    build: (timeline) => {
      timeline
        .fromTo(
          ".events-header",
          { y: 8, opacity: 1 },
          { y: 0, opacity: 1, duration: 0.3 },
          0,
        )
        .fromTo(
          ".events-draw-path",
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, stagger: 0.04, duration: 0.45 },
          0.05,
        )
        .fromTo(
          ".events-draw-fill",
          { opacity: 0.35 },
          { opacity: 1, stagger: 0.04, duration: 0.25 },
          0.3,
        )
        .fromTo(
          ".event-block-0",
          { y: 14, opacity: 0.85 },
          { y: 0, opacity: 1, duration: 0.4 },
          0.15,
        )
        .fromTo(
          ".events-lotus-node",
          { scale: 0.9, opacity: 0.5 },
          { scale: 1, opacity: 1, duration: 0.3 },
          0.4,
        )
        .fromTo(
          ".event-block-1",
          { y: 14, opacity: 0.85 },
          { y: 0, opacity: 1, duration: 0.4 },
          0.5,
        )
        .fromTo(
          ".events-closing",
          { y: 10, opacity: 0.7 },
          { y: 0, opacity: 1, duration: 0.35 },
          0.75,
        );
    },
  });

  return (
    <SceneWrapper
      ref={sectionRef}
      id="wedding-events"
      tone="ivory"
      innerClassName="max-w-[26rem] justify-center sm:max-w-lg"
    >
      <div className="flex h-full min-h-0 w-full flex-col justify-center gap-3">
        <header className="events-header w-full shrink-0 text-center">
          <p className="events-eyebrow font-body text-[0.58rem] tracking-[0.22em] text-[#6b5224] uppercase">
            {events.eyebrow}
          </p>

          <FestivityHeaderOrnament className="events-ornament mx-auto mt-1.5 h-8 w-24 text-antique-gold" />

          <h2 className="events-heading-bn mt-1.5 font-bn-display text-[1.45rem] leading-snug text-sindoor-red sm:text-[1.65rem]">
            {events.headingBn}
          </h2>
          <p className="events-heading-en mt-0.5 font-display text-[0.95rem] tracking-[0.04em] text-deep-burgundy">
            {events.headingEn}
          </p>
          <p className="events-subtitle mt-1 font-display text-[0.62rem] tracking-[0.12em] text-deep-burgundy/80 uppercase">
            {events.subtitle}
          </p>
        </header>

        <div className="relative w-full shrink-0">
          <div className="absolute top-3 bottom-3 left-[17px] w-px origin-top bg-gradient-to-b from-[#b99a58] via-antique-gold/60 to-sindoor-red/70" />

          <EventBlock event={wedding} index={0} compact />

          <div className="events-lotus-node relative my-2 flex justify-start pl-1">
            <FestivityLotusNode className="ml-0.5 h-7 w-7 text-antique-gold" />
          </div>

          <EventBlock event={reception} index={1} compact />
        </div>

        <div className="events-closing w-full shrink-0 text-center">
          <div className="mx-auto h-px w-16 bg-gradient-to-r from-transparent via-antique-gold to-transparent" />
          <p className="mt-2.5 font-bn-display text-base text-sindoor-red">
            {events.closingNames}
          </p>
          <p className="mt-0.5 font-display text-[0.62rem] tracking-[0.16em] text-deep-burgundy/85 uppercase">
            শুভ বিবাহ
          </p>
        </div>
      </div>
    </SceneWrapper>
  );
}
