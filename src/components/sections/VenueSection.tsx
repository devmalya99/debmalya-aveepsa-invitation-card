import { ExternalLink, MapPinned } from "lucide-react";
import { MotionCard } from "@/components/animations/MotionCard";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WEDDING } from "@/config/wedding";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";

type VenueSectionProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function VenueSection({ locale, dictionary }: VenueSectionProps) {
  const d = dictionary.venue;
  const venue = WEDDING.venue;
  const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(venue.mapsQuery)}&output=embed`;

  return (
    <section id="venue" className="section-shell relative px-4 py-14 sm:px-5 sm:py-16">
      <div className="relative z-10 mx-auto max-w-5xl">
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

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <MotionCard from="left">
            <div className="border border-antique-gold/25 bg-soft-white/88 px-6 py-8 backdrop-blur-sm">
              <p className="inline-flex items-center gap-2 font-label text-xs uppercase tracking-[0.2em] text-antique-gold">
                <MapPinned className="h-4 w-4" />
                {venue.city}
              </p>
              <h3
                className={`mt-3 text-2xl text-dark-burgundy ${
                  locale === "bn" ? "font-bengali-display" : "font-display"
                }`}
              >
                {venue.name[locale]}
              </h3>
              <p
                className={`mt-4 leading-relaxed text-dark-burgundy/80 ${
                  locale === "bn" ? "font-bengali-body" : "font-body"
                }`}
              >
                {venue.address[locale]}
              </p>

              <dl className="mt-6 space-y-3 text-sm text-dark-burgundy/75">
                <div>
                  <dt className="font-label text-[0.65rem] uppercase tracking-[0.18em] text-antique-gold">
                    {d.parking}
                  </dt>
                  <dd className="mt-1 font-body">
                    {venue.parking ?? d.detailsSoon}
                  </dd>
                </div>
                <div>
                  <dt className="font-label text-[0.65rem] uppercase tracking-[0.18em] text-antique-gold">
                    {d.landmarks}
                  </dt>
                  <dd className="mt-1 font-body">
                    {venue.landmarks ?? d.detailsSoon}
                  </dd>
                </div>
                <div>
                  <dt className="font-label text-[0.65rem] uppercase tracking-[0.18em] text-antique-gold">
                    {d.contact}
                  </dt>
                  <dd className="mt-1 font-body">
                    {venue.contact ?? d.detailsSoon}
                  </dd>
                </div>
              </dl>

              <a
                href={venue.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 border border-antique-gold/50 px-4 py-3 font-label text-xs uppercase tracking-[0.18em] text-dark-burgundy transition hover:bg-antique-gold/15"
              >
                {d.openMaps}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </MotionCard>

          <MotionCard from="right" delay={0.1}>
            <div className="overflow-hidden border border-antique-gold/25 bg-dark-burgundy/10 shadow-[var(--shadow-soft-gold)] backdrop-blur-sm">
              <iframe
                title={venue.name[locale]}
                src={mapEmbed}
                className="h-[320px] w-full grayscale-[20%] contrast-[1.05] sm:h-[420px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </MotionCard>
        </div>
      </div>
    </section>
  );
}
