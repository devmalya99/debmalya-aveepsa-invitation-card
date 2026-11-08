"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";
import { SceneWrapper } from "@/components/experience/SceneWrapper";
import { FestivityAmbient } from "@/components/events/FestivityAmbient";
import {
  FestivityDateMedallion,
  FestivityHeaderOrnament,
  FestivityTimelineRail,
} from "@/components/events/FestivityOrnaments";
import { assets } from "@/data/assets";
import { useLanguage } from "@/hooks/useLanguage";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollModeContext } from "@/hooks/useScrollModeContext";
import { useWeddingEventsAnimation } from "@/hooks/useWeddingEventsAnimation";
import { gsap, registerGsap } from "@/lib/gsap";
import type { InvitationEvent } from "@/types/invitation";

function splitEnglishWords(text: string) {
  return text.split(/\s+/).filter(Boolean);
}

function EventBlock({
  event,
  index,
  onMarkerActivate,
}: {
  event: InvitationEvent;
  index: number;
  onMarkerActivate: (index: number, el: HTMLElement) => void;
}) {
  const turmeric = event.accent === "turmeric";

  return (
    <article
      className={`event-block event-block-${index} grid w-full grid-cols-[2.25rem_1fr] items-start gap-x-3 text-left`}
    >
      <div
        className={`event-medallion-wrap event-medallion-wrap-${index} relative z-10 flex justify-center pt-0.5`}
      >
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-antique-gold"
          aria-label={event.titleEn}
          onClick={(e) => onMarkerActivate(index, e.currentTarget)}
        >
          <span
            className={`event-medallion-pulse event-medallion-pulse-${index} pointer-events-none absolute inset-[-4px] rounded-full border border-antique-gold/50`}
            aria-hidden
          />
          <span
            className={`event-medallion-ripple event-medallion-ripple-${index} pointer-events-none absolute inset-[-2px] rounded-full border border-antique-gold/0`}
            aria-hidden
          />
          <FestivityDateMedallion
            className={`event-medallion event-medallion-${index} h-9 w-9`}
            tone={turmeric ? "gold" : "burgundy"}
          />
        </button>
      </div>

      <div className="min-w-0 pb-0.5">
        <p
          className={`event-line event-${index}-eyebrow font-body text-[0.58rem] tracking-[0.18em] uppercase ${
            turmeric ? "text-[#6b5224]" : "text-sindoor-red"
          }`}
        >
          {event.titleEn}
        </p>

        <h3
          className={`event-line event-${index}-title mt-0.5 font-bn-display text-[1.05rem] leading-snug text-deep-burgundy sm:mt-1 sm:text-[1.15rem]`}
        >
          {event.titleBn}
        </h3>

        <p
          className={`event-line event-${index}-bn-date event-bn-date mt-1 font-bn-display text-[0.86rem] leading-relaxed sm:mt-1.5 sm:text-[0.92rem] ${
            turmeric ? "text-[#5c451c]" : "text-sindoor-red"
          }`}
        >
          {event.bengaliDate}
        </p>
        <div
          className={`event-${index}-underline mx-0 mt-0.5 h-px w-14 origin-left bg-gradient-to-r sm:mt-1 ${
            turmeric
              ? "from-[#b99a58] to-transparent"
              : "from-sindoor-red/70 to-transparent"
          }`}
        />

        <p
          className={`event-line event-${index}-en-date event-en-date mt-0.5 font-display text-[0.98rem] leading-tight text-deep-burgundy sm:text-[1.15rem]`}
        >
          {event.englishDate}
        </p>

        <p
          className={`event-line event-${index}-meta mt-0.5 font-display text-[0.75rem] tracking-[0.04em] text-deep-burgundy/85 sm:mt-1 sm:text-[0.8rem]`}
        >
          {event.day}
          <span className="mx-1.5 text-deep-burgundy/40">·</span>
          {event.time}
        </p>
      </div>
    </article>
  );
}

/**
 * Scene 05 — Living wedding programme timeline.
 * Mandala awaken → heading reveal → gold rail draw → two festivities → blessing.
 */
export function WeddingEvents() {
  const { content } = useLanguage();
  const { cinematic } = useScrollModeContext();
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const events = content.events;
  const [wedding, reception] = events.items;
  const headingWords = splitEnglishWords(events.headingEn);

  useWeddingEventsAnimation({
    sectionRef,
    enabled: cinematic,
    reducedMotion,
  });

  const onMarkerActivate = useCallback(
    (index: number, el: HTMLElement) => {
      if (reducedMotion) return;
      registerGsap();

      const wrap = el.closest(".event-medallion-wrap") as HTMLElement | null;
      const ripple = wrap?.querySelector(
        `.event-medallion-ripple-${index}`,
      ) as HTMLElement | null;
      const rail = sectionRef.current?.querySelector(
        ".events-rail-line",
      ) as SVGGeometryElement | null;

      gsap
        .timeline()
        .to(el, {
          scale: 0.9,
          duration: 0.12,
          ease: "power2.out",
        })
        .to(el, {
          scale: 1,
          duration: 0.38,
          ease: "elastic.out(1, 0.45)",
        });

      if (ripple) {
        gsap.fromTo(
          ripple,
          {
            autoAlpha: 0.7,
            scale: 0.85,
            borderColor: "rgba(185,154,88,0.55)",
          },
          {
            autoAlpha: 0,
            scale: 1.55,
            duration: 0.55,
            ease: "power1.out",
          },
        );
      }

      if (rail) {
        gsap.fromTo(
          rail,
          { strokeOpacity: 0.7 },
          {
            strokeOpacity: 1,
            duration: 0.22,
            yoyo: true,
            repeat: 1,
            ease: "sine.inOut",
          },
        );
      }
    },
    [reducedMotion],
  );

  return (
    <SceneWrapper
      ref={sectionRef}
      id="wedding-events"
      tone="ivory"
      innerClassName="max-w-[26rem] justify-center touch-pan-y sm:max-w-lg"
    >
      <div className="events-atmosphere pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="events-mandala-glow absolute top-[6%] left-1/2 h-[17rem] w-[17rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(185,154,88,0.22)_0%,rgba(185,154,88,0.06)_42%,transparent_70%)]"
          aria-hidden
        />
        <div className="events-mandala-spin absolute top-[6%] left-1/2 h-[18rem] w-[18rem] max-w-[78vw] -translate-x-1/2 will-change-transform">
          <div className="events-mandala-breathe absolute inset-0 will-change-transform">
            <Image
              src={assets.decorations.festivityMandala}
              alt=""
              width={320}
              height={320}
              className="events-bg-mandala absolute inset-0 m-auto object-contain mix-blend-multiply will-change-transform"
              style={{ width: 300, height: "auto" }}
              sizes="300px"
              priority={false}
            />
            <div
              className="events-mandala-sweep pointer-events-none absolute inset-y-[12%] left-0 w-1/3 bg-gradient-to-r from-transparent via-[rgba(255,248,234,0.35)] to-transparent mix-blend-soft-light"
              aria-hidden
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_18%,rgba(185,154,88,0.08),transparent_52%)]" />
        <FestivityAmbient enabled={cinematic && !reducedMotion} />
      </div>

      <div className="relative z-10 flex h-full min-h-0 w-full flex-col justify-center gap-1.5 sm:gap-2.5">
        <header className="events-header w-full shrink-0 text-center">
          <p className="events-eyebrow font-body text-[0.58rem] tracking-[0.22em] text-[#6b5224] uppercase">
            {events.eyebrow}
          </p>

          <FestivityHeaderOrnament className="events-ornament mx-auto mt-1 h-7 w-20 text-antique-gold sm:h-8 sm:w-24" />

          <div className="events-heading-bn-mask mt-1 overflow-hidden">
            <h2 className="events-heading-bn font-bn-display text-[1.3rem] leading-snug text-sindoor-red sm:text-[1.65rem]">
              {events.headingBn}
            </h2>
          </div>

          <p className="events-heading-en mt-0.5 font-display text-[0.88rem] tracking-[0.04em] text-deep-burgundy sm:text-[0.95rem]">
            {headingWords.map((word, index) => (
              <span
                key={`${word}-${index}`}
                className="events-heading-en-word inline-block will-change-transform"
              >
                {word}
                {index < headingWords.length - 1 ? "\u00A0" : null}
              </span>
            ))}
          </p>

          <p className="events-subtitle mt-0.5 font-display text-[0.58rem] tracking-[0.12em] text-deep-burgundy/80 uppercase sm:text-[0.62rem]">
            {events.subtitle}
          </p>
        </header>

        <div className="events-rail relative w-full shrink-0">
          <FestivityTimelineRail className="pointer-events-none absolute top-4 bottom-4 left-[1.125rem] w-[4px] -translate-x-1/2" />
          <span
            className="events-rail-traveler pointer-events-none absolute top-4 left-[1.125rem] z-20 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-antique-gold shadow-[0_0_6px_rgba(185,154,88,0.55)]"
            aria-hidden
          />

          <EventBlock
            event={wedding}
            index={0}
            onMarkerActivate={onMarkerActivate}
          />

          <div className="events-lotus-node relative z-10 my-0.5 grid grid-cols-[2.25rem_1fr] items-center gap-x-3 sm:my-1">
            <div className="events-center-bloom flex justify-center">
              <div className="relative flex h-8 w-8 items-center justify-center">
                <div className="absolute inset-[-2px] rounded-full border border-antique-gold/45" />
                <Image
                  src={assets.decorations.festivityLotus}
                  alt=""
                  width={32}
                  height={32}
                  className="h-7 w-7 rounded-full object-cover"
                  sizes="32px"
                />
              </div>
            </div>
            <div aria-hidden />
          </div>

          <EventBlock
            event={reception}
            index={1}
            onMarkerActivate={onMarkerActivate}
          />
        </div>

        <div className="events-closing relative w-full shrink-0 text-center">
          <div className="events-closing-rule mx-auto h-px w-20 origin-center bg-gradient-to-r from-transparent via-antique-gold to-transparent" />

          <p className="events-closing-heart mt-1.5 font-display text-[0.7rem] text-antique-gold sm:mt-2">
            ♥
          </p>
          <p className="events-closing-sub mt-0.5 font-display text-[0.58rem] tracking-[0.16em] text-deep-burgundy/85 uppercase">
            With love & blessings
          </p>
        </div>
      </div>
    </SceneWrapper>
  );
}
