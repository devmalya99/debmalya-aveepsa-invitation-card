"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";

const SECTION_IDS = [
  "cover",
  "kolkata",
  "winds",
  "taxi",
  "ceremony",
  "moonlit",
  "invite",
  "events",
  "countdown",
  "venue",
  "rsvp",
  "closing",
] as const;

type SectionId = (typeof SECTION_IDS)[number];

type SectionProgressProps = {
  locale: Locale;
  dictionary: Dictionary;
};

function labelFor(id: SectionId, dictionary: Dictionary) {
  const map: Record<SectionId, string> = {
    cover: dictionary.nav.cover,
    kolkata: dictionary.nav.kolkata,
    winds: dictionary.nav.winds,
    taxi: dictionary.nav.taxi,
    ceremony: dictionary.nav.ceremony,
    moonlit: dictionary.nav.moonlit,
    invite: dictionary.nav.invite,
    events: dictionary.nav.events,
    countdown: dictionary.nav.countdown,
    venue: dictionary.nav.venue,
    rsvp: dictionary.nav.rsvp,
    closing: dictionary.nav.closing,
  };
  return map[id];
}

export function SectionProgress({ locale, dictionary }: SectionProgressProps) {
  const [active, setActive] = useState<SectionId>("cover");

  useEffect(() => {
    const nodes = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (node): node is HTMLElement => Boolean(node),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActive(visible.target.id as SectionId);
        }
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.15, 0.35, 0.6] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Story chapters"
      className="pointer-events-none fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 lg:flex"
    >
      {SECTION_IDS.map((id) => {
        const isActive = active === id;
        return (
          <a
            key={id}
            href={`/${locale}#${id}`}
            title={labelFor(id, dictionary)}
            className="pointer-events-auto group flex items-center justify-end gap-2"
          >
            <span
              className={`font-label text-[0.6rem] uppercase tracking-[0.16em] transition ${
                isActive
                  ? "text-antique-gold opacity-100"
                  : "text-soft-white/0 group-hover:text-soft-white/70 group-hover:opacity-100"
              }`}
            >
              {labelFor(id, dictionary)}
            </span>
            <span
              className={`h-2 w-2 rounded-full border transition ${
                isActive
                  ? "scale-125 border-antique-gold bg-antique-gold"
                  : "border-antique-gold/50 bg-transparent"
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
}
