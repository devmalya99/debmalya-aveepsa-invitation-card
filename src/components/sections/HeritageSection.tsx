import { MotionCard } from "@/components/animations/MotionCard";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";

type HeritageSectionProps = {
  locale: Locale;
  dictionary: Dictionary;
};

const icons = [
  {
    key: "alpana",
    label: { en: "Alpana", bn: "আলপনা" },
    path: "M50 10c-8 10-14 18-14 28 0-10-6-18-14-28 8 4 14 4 28 0Zm0 80c8-10 14-18 14-28 0 10 6 18 14 28-8-4-14-4-28 0ZM18 50c10-8 18-14 28-14-10 0-18-6-28-14 4 8 4 14 0 28Zm64 0c-10 8-18 14-28 14 10 0 18 6 28 14-4-8-4-14 0-28Z",
  },
  {
    key: "shankha",
    label: { en: "Shankha", bn: "শঙ্খ" },
    path: "M62 20c12 10 18 26 10 42-8 16-28 24-44 16 18-2 30-14 28-30-2-14-12-22-24-24 14-4 24 0 30-4Z",
  },
  {
    key: "lotus",
    label: { en: "Lotus", bn: "পদ্ম" },
    path: "M50 22c-10 12-18 22-18 34 0-12-8-22-18-34 12 6 24 6 36 0Zm0 56c10-12 18-22 18-34 0 12 8 22 18 34-12-6-24-6-36 0Z",
  },
  {
    key: "dhunuchi",
    label: { en: "Dhunuchi", bn: "ধুনুচি" },
    path: "M35 70h30l-4 12H39L35 70Zm8-34h14l6 34H37l6-34Zm4-12h6v8h-6v-8Z",
  },
  {
    key: "diya",
    label: { en: "Pradip", bn: "প্রদীপ" },
    path: "M28 62c8-18 22-28 22-28s14 10 22 28c-12 8-32 8-44 0Zm22-34c0 8-4 12-4 12s-4-4-4-12 4-10 4-10 4 2 4 10Z",
  },
  {
    key: "thala",
    label: { en: "Kansar Thala", bn: "কাঁসার থালা" },
    path: "M50 18a32 32 0 1 1 0 64 32 32 0 0 1 0-64Zm0 10a22 22 0 1 0 0 44 22 22 0 0 0 0-44Z",
  },
] as const;

const directions = ["left", "top", "right", "left", "bottom", "right"] as const;

export function HeritageSection({ locale, dictionary }: HeritageSectionProps) {
  const d = dictionary.heritage;

  return (
    <section
      id="heritage"
      className="section-shell relative px-5 py-24 sm:py-32"
    >
      <div className="relative z-10 mx-auto max-w-5xl">
        <Reveal from="top">
          <div className="rounded-sm bg-soft-white/85 px-4 py-8 backdrop-blur-sm sm:px-8">
            <SectionHeading
              locale={locale}
              eyebrow={d.eyebrow}
              title={d.title}
              body={d.body}
            />
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6">
          {icons.map((icon, index) => (
            <MotionCard
              key={icon.key}
              from={directions[index % directions.length]}
              delay={index * 0.06}
            >
              <article className="flex flex-col items-center gap-3 border border-antique-gold/25 bg-warm-ivory/85 px-4 py-6 text-center backdrop-blur-sm">
                <svg
                  aria-hidden
                  viewBox="0 0 100 100"
                  className="h-16 w-16 text-antique-gold"
                  fill="none"
                >
                  <path
                    d={icon.path}
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                </svg>
                <p
                  className={`text-sm text-dark-burgundy ${
                    locale === "bn"
                      ? "font-bengali-body"
                      : "font-label tracking-wide"
                  }`}
                >
                  {icon.label[locale]}
                </p>
              </article>
            </MotionCard>
          ))}
        </div>
      </div>
    </section>
  );
}
