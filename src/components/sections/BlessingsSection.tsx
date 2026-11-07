import { AlpanaBackground, FloralFrame } from "@/components/decorations";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";

type BlessingsSectionProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function BlessingsSection({ locale, dictionary }: BlessingsSectionProps) {
  const d = dictionary.blessings;

  return (
    <section
      id="blessings"
      className="section-shell relative px-5 py-24 sm:py-32"
    >
      <AlpanaBackground />
      <FloralFrame className="relative z-10 mx-auto max-w-3xl bg-deep-wine/55 backdrop-blur-[2px]">
        <Reveal from="scale" className="px-6 py-16 sm:px-12">
          <SectionHeading
            locale={locale}
            eyebrow={d.eyebrow}
            title={d.title}
            body={d.body}
            tone="light"
          />
        </Reveal>
      </FloralFrame>
    </section>
  );
}
