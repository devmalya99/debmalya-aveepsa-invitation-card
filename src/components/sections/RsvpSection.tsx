import { AlpanaBackground, FloralFrame } from "@/components/decorations";
import { MotionCard } from "@/components/animations/MotionCard";
import { Reveal } from "@/components/animations/Reveal";
import { RsvpForm } from "@/components/forms/RsvpForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";

type RsvpSectionProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function RsvpSection({ locale, dictionary }: RsvpSectionProps) {
  const d = dictionary.rsvp;

  return (
    <section id="rsvp" className="section-shell relative px-4 py-14 sm:px-5 sm:py-16">
      <AlpanaBackground opacity={0.14} />
      <div className="relative z-10 mx-auto max-w-2xl">
        <Reveal from="top">
          <SectionHeading
            locale={locale}
            eyebrow={d.eyebrow}
            title={d.title}
            body={d.body}
            tone="light"
          />
        </Reveal>
        <FloralFrame className="mt-12">
          <MotionCard from="bottom" delay={0.08}>
            <RsvpForm dictionary={dictionary} />
          </MotionCard>
        </FloralFrame>
      </div>
    </section>
  );
}
