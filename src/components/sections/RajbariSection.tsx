import { FloralCorner } from "@/components/decorations";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";

type RajbariSectionProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function RajbariSection({ locale, dictionary }: RajbariSectionProps) {
  const d = dictionary.rajbari;

  return (
    <section
      id="rajbari"
      className="section-shell relative min-h-[70vh] px-5 py-24 sm:py-32"
    >
      <FloralCorner corner="bl" className="bottom-6 left-4 opacity-70" />
      <FloralCorner corner="br" className="bottom-6 right-4 opacity-70" />

      <div className="relative z-10 mx-auto flex max-w-3xl items-center">
        <Reveal from="scale" className="w-full">
          <div className="rounded-sm bg-dark-burgundy/45 px-4 py-10 backdrop-blur-sm sm:px-10">
            <SectionHeading
              locale={locale}
              eyebrow={d.eyebrow}
              title={d.title}
              body={d.body}
              tone="light"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
