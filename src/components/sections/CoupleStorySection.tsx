import { BotanicalBorder } from "@/components/decorations";
import { MotionCard } from "@/components/animations/MotionCard";
import { Reveal } from "@/components/animations/Reveal";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";

type CoupleStorySectionProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function CoupleStorySection({
  locale,
  dictionary,
}: CoupleStorySectionProps) {
  const d = dictionary.story;
  const placeholder = dictionary.common.placeholderPhoto;

  return (
    <section id="story" className="section-shell relative px-5 py-24 sm:py-32">
      <BotanicalBorder side="left" />
      <BotanicalBorder side="right" />

      <div className="relative z-10 mx-auto max-w-6xl">
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

        <div className="mt-16 space-y-16 md:space-y-24">
          <div className="grid items-center gap-8 md:grid-cols-[1.2fr_0.8fr]">
            <MotionCard from="left">
              <PhotoPlaceholder
                label={placeholder}
                caption={d.captions.cinematic}
                aspect="aspect-[16/10]"
              />
            </MotionCard>
            <MotionCard from="right" delay={0.12}>
              <p
                className={`max-w-sm rounded-sm bg-warm-ivory/80 px-4 py-5 backdrop-blur-sm md:pl-4 ${
                  locale === "bn"
                    ? "font-bengali-body text-dark-burgundy/80"
                    : "font-display text-2xl italic text-dark-burgundy/85"
                }`}
              >
                {d.captions.cinematic}
              </p>
            </MotionCard>
          </div>

          <div className="grid items-end gap-6 md:grid-cols-[0.7fr_1fr]">
            <MotionCard from="left" delay={0.05} className="md:translate-y-6">
              <PhotoPlaceholder
                label={placeholder}
                caption={d.captions.playful}
                aspect="aspect-[4/5]"
              />
            </MotionCard>
            <MotionCard from="right" delay={0.1}>
              <div className="relative">
                <PhotoPlaceholder
                  label={placeholder}
                  caption={d.captions.editorial}
                  aspect="aspect-[3/2]"
                />
                <p
                  className={`mt-4 rounded-sm bg-warm-ivory/80 px-3 py-2 backdrop-blur-sm ${
                    locale === "bn"
                      ? "font-bengali-body text-dark-burgundy/80"
                      : "font-body text-dark-burgundy/75"
                  }`}
                >
                  {d.captions.playful} · {d.captions.editorial}
                </p>
              </div>
            </MotionCard>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <MotionCard from="bottom" delay={0.05}>
              <PhotoPlaceholder
                label={placeholder}
                caption={d.captions.traditional}
                aspect="aspect-[4/5]"
              />
            </MotionCard>
            <MotionCard from="top" delay={0.12} className="md:mt-16">
              <PhotoPlaceholder
                label={placeholder}
                caption={d.captions.cultural}
                aspect="aspect-[16/10]"
              />
            </MotionCard>
          </div>
        </div>
      </div>
    </section>
  );
}
