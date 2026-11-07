import { CalendarDays, MapPin } from "lucide-react";
import { FloralFrame } from "@/components/decorations";
import { MotionCard } from "@/components/animations/MotionCard";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WEDDING } from "@/config/wedding";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";

type EventsSectionProps = {
  locale: Locale;
  dictionary: Dictionary;
};

function formatDate(date: string, locale: Locale) {
  const value = new Date(`${date}T12:00:00+05:30`);
  return new Intl.DateTimeFormat(locale === "bn" ? "bn-IN" : "en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: WEDDING.timezone,
  }).format(value);
}

export function EventsSection({ locale, dictionary }: EventsSectionProps) {
  const d = dictionary.events;
  const mapsUrl = WEDDING.venue.mapsUrl;

  return (
    <section id="events" className="section-shell relative px-4 py-14 sm:px-5 sm:py-16">
      <div className="relative z-10 mx-auto max-w-4xl">
        <Reveal from="top">
          <div className="rounded-sm bg-warm-ivory/88 px-4 py-8 backdrop-blur-sm sm:px-8">
            <SectionHeading
              locale={locale}
              eyebrow={d.eyebrow}
              title={d.title}
              body={d.body}
            />
          </div>
        </Reveal>

        <ol className="mt-14 space-y-8">
          {WEDDING.events.map((event, index) => (
            <MotionCard
              key={event.id}
              from={index % 2 === 0 ? "left" : "right"}
              delay={index * 0.08}
            >
              <li>
                <FloralFrame className="border border-antique-gold/25 bg-soft-white/88 backdrop-blur-sm">
                  <article className="grid gap-4 px-6 py-8 sm:grid-cols-[auto_1fr] sm:gap-8 sm:px-10">
                    <div className="font-label text-sm tracking-[0.18em] text-antique-gold uppercase">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h3
                        className={`text-2xl text-dark-burgundy sm:text-3xl ${
                          locale === "bn"
                            ? "font-bengali-display"
                            : "font-display"
                        }`}
                      >
                        {event.name[locale]}
                      </h3>
                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-dark-burgundy/75">
                        <span className="inline-flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-antique-gold" />
                          {formatDate(event.date, locale)}
                        </span>
                        <span className="font-label text-xs tracking-wide text-antique-gold">
                          {event.startTime ?? d.timeTbd}
                        </span>
                      </div>
                      <p
                        className={`mt-4 max-w-2xl leading-relaxed text-dark-burgundy/80 ${
                          locale === "bn" ? "font-bengali-body" : "font-body"
                        }`}
                      >
                        {event.description[locale]}
                      </p>
                      <p className="mt-3 inline-flex items-center gap-2 font-body text-sm text-dark-burgundy/70">
                        <MapPin className="h-4 w-4 text-antique-gold" />
                        {WEDDING.venue.name[locale]}
                      </p>
                      <a
                        href={event.mapsUrl ?? mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-block font-label text-xs uppercase tracking-[0.18em] text-antique-gold underline-offset-4 hover:underline"
                      >
                        {d.directions}
                      </a>
                    </div>
                  </article>
                </FloralFrame>
              </li>
            </MotionCard>
          ))}
        </ol>
      </div>
    </section>
  );
}
