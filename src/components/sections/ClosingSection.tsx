import { FloralFrame, LotusDivider } from "@/components/decorations";
import { MotionCard } from "@/components/animations/MotionCard";
import { WEDDING } from "@/config/wedding";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";

type ClosingSectionProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function ClosingSection({ locale, dictionary }: ClosingSectionProps) {
  const d = dictionary.closing;

  return (
    <section
      id="closing"
      className="section-shell relative px-4 py-16 sm:px-5 sm:py-20"
    >
      <FloralFrame className="relative z-10 mx-auto max-w-3xl">
        <div className="px-6 py-16 text-center sm:px-12">
          <MotionCard from="top">
            <p className="font-label text-[0.7rem] uppercase tracking-[0.28em] text-muted-champagne">
              {d.eyebrow}
            </p>
          </MotionCard>
          <MotionCard from="left" delay={0.1} className="mt-4">
            <h2
              className={`text-3xl text-soft-white sm:text-5xl ${
                locale === "bn" ? "font-bengali-display" : "font-display"
              }`}
            >
              {WEDDING.couple.shortNames[locale]}
            </h2>
          </MotionCard>
          <MotionCard from="scale" delay={0.18} className="mt-6">
            <LotusDivider />
          </MotionCard>
          <MotionCard from="right" delay={0.22} className="mt-6">
            <p className="font-label text-xs uppercase tracking-[0.24em] text-antique-gold">
              {dictionary.hero.date}
            </p>
          </MotionCard>
          <MotionCard from="bottom" delay={0.28} className="mt-8">
            <p
              className={`mx-auto max-w-xl text-lg leading-relaxed text-dusty-rose sm:text-xl ${
                locale === "bn" ? "font-bengali-body" : "font-display italic"
              }`}
            >
              {d.blessing}
            </p>
          </MotionCard>
          <MotionCard from="bottom" delay={0.36} className="mt-6">
            <p
              className={`text-base text-soft-white/80 ${
                locale === "bn" ? "font-bengali-body" : "font-body"
              }`}
            >
              {d.thanks}
            </p>
          </MotionCard>
        </div>
      </FloralFrame>
    </section>
  );
}
