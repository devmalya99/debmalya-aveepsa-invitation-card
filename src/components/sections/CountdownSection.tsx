import { FloralCorner } from "@/components/decorations";
import { LiveCountdown } from "@/components/countdown/LiveCountdown";
import { MotionCard } from "@/components/animations/MotionCard";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";

type CountdownSectionProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function CountdownSection({
  locale,
  dictionary,
}: CountdownSectionProps) {
  const d = dictionary.countdown;

  return (
    <section
      id="countdown"
      className="section-shell relative px-4 py-14 sm:px-5 sm:py-16"
    >
      <FloralCorner corner="tl" className="left-4 top-8 opacity-60" />
      <FloralCorner corner="tr" className="right-4 top-8 opacity-60" />
      <div className="relative z-10 mx-auto max-w-4xl">
        <Reveal from="top">
          <SectionHeading
            locale={locale}
            eyebrow={d.eyebrow}
            title={d.title}
            tone="light"
          />
        </Reveal>
        <MotionCard from="bottom" delay={0.12} className="mt-12">
          <LiveCountdown dictionary={dictionary} />
        </MotionCard>
      </div>
    </section>
  );
}
