"use client";

import Image from "next/image";
import {
  FestivityDateMedallion,
  FestivityHeaderOrnament,
  FestivityTimelineRail,
} from "@/components/events/FestivityOrnaments";
import { assets } from "@/data/assets";
import { useLanguage } from "@/hooks/useLanguage";
import type { InvitationEvent } from "@/types/invitation";

function EventBlock({
  event,
  index,
}: {
  event: InvitationEvent;
  index: number;
}) {
  const turmeric = event.accent === "turmeric";

  return (
    <article className="grid w-full grid-cols-[2.25rem_1fr] items-start gap-x-3.5 text-left">
      <div className="relative z-10 flex justify-center pt-[1.15rem]">
        <div className="relative flex h-9 w-9 items-center justify-center rounded-full">
          <FestivityDateMedallion
            className="h-9 w-9"
            tone={turmeric ? "gold" : "burgundy"}
          />
        </div>
      </div>

      <div className="min-w-0">
        <p
          className={`font-body text-[0.58rem] leading-none tracking-[0.18em] uppercase ${
            turmeric ? "text-[#6b5224]" : "text-sindoor-red"
          }`}
        >
          {event.titleEn}
        </p>

        <h3 className="mt-1.5 font-bn-display text-[1.05rem] leading-snug text-deep-burgundy sm:text-[1.15rem]">
          {event.titleBn}
        </h3>

        <p
          className={`mt-2 font-bn-display text-[0.86rem] leading-snug sm:text-[0.92rem] ${
            turmeric ? "text-[#5c451c]" : "text-sindoor-red"
          }`}
        >
          {event.bengaliDate}
        </p>
        <div
          className={`mt-1 h-px w-14 bg-gradient-to-r ${
            turmeric
              ? "from-[#b99a58] to-transparent"
              : "from-sindoor-red/70 to-transparent"
          }`}
        />

        <p className="mt-1.5 font-display text-[0.98rem] leading-snug text-deep-burgundy sm:text-[1.15rem]">
          {event.englishDate}
        </p>

        <p className="mt-1 font-display text-[0.75rem] leading-snug tracking-[0.04em] text-deep-burgundy/85 sm:text-[0.8rem]">
          {event.day}
          <span className="mx-1.5 text-deep-burgundy/40">·</span>
          {event.time}
        </p>
      </div>
    </article>
  );
}

type FestivitiesCardProps = {
  className?: string;
};

/**
 * Festivities programme for the shared opening canvas.
 * Atmosphere (birds/petals) stays on GrandReveal — this is content only.
 */
export function FestivitiesCard({ className = "" }: FestivitiesCardProps) {
  const { content } = useLanguage();
  const events = content.events;
  const [wedding, reception] = events.items;

  return (
    <div
      className={`flex h-full min-h-0 w-full flex-col justify-center ${className}`}
    >
      <header className="w-full shrink-0 text-center">
        <p className="font-body text-[0.58rem] tracking-[0.22em] text-[#6b5224] uppercase">
          {events.eyebrow}
        </p>

        <FestivityHeaderOrnament className="mx-auto mt-2 h-7 w-20 text-antique-gold sm:h-8 sm:w-24" />

        <h2 className="mt-2 font-bn-display text-[1.3rem] leading-snug text-sindoor-red sm:text-[1.65rem]">
          {events.headingBn}
        </h2>

        <p className="mt-1.5 font-display text-[0.88rem] tracking-[0.04em] text-deep-burgundy sm:text-[0.95rem]">
          {events.headingEn}
        </p>

        <p className="mt-1 font-display text-[0.58rem] tracking-[0.12em] text-deep-burgundy/80 uppercase sm:text-[0.62rem]">
          {events.subtitle}
        </p>
      </header>

      <div className="relative my-3 w-full shrink-0 py-2 sm:my-4 sm:py-3">
        <FestivityTimelineRail className="pointer-events-none absolute top-6 bottom-6 left-[1.125rem] w-[4px] -translate-x-1/2" />

        <EventBlock event={wedding} index={0} />

        <div className="relative z-10 my-3 grid grid-cols-[2.25rem_1fr] items-center gap-x-3.5 sm:my-3.5">
          <div className="flex justify-center">
            <div className="relative flex h-7 w-7 items-center justify-center">
              <div className="absolute inset-[-2px] rounded-full border border-antique-gold/45" />
              <Image
                src={assets.decorations.festivityLotus}
                alt=""
                width={28}
                height={28}
                className="h-6 w-6 rounded-full object-cover"
                sizes="28px"
              />
            </div>
          </div>
          <div aria-hidden />
        </div>

        <EventBlock event={reception} index={1} />
      </div>

      <div className="w-full shrink-0 pb-1 text-center">
        <div className="mx-auto h-px w-20 bg-gradient-to-r from-transparent via-antique-gold to-transparent" />
        <p className="mt-2 font-display text-[0.7rem] text-antique-gold">♥</p>
        <p className="mt-1 font-display text-[0.58rem] tracking-[0.16em] text-deep-burgundy/85 uppercase">
          With love & blessings
        </p>
      </div>
    </div>
  );
}
