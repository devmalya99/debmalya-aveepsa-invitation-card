import type { Locale } from "@/i18n/config";
import { LotusDivider } from "@/components/decorations";

type SectionHeadingProps = {
  locale: Locale;
  eyebrow: string;
  title: string;
  body?: string;
  tone?: "light" | "dark";
};

export function SectionHeading({
  locale,
  eyebrow,
  title,
  body,
  tone = "dark",
}: SectionHeadingProps) {
  const eyebrowColor =
    tone === "light" ? "text-muted-champagne" : "text-antique-gold";
  const titleColor = tone === "light" ? "text-soft-white" : "text-dark-burgundy";
  const bodyColor =
    tone === "light" ? "text-dusty-rose/95" : "text-dark-burgundy/80";

  return (
    <div className="mx-auto max-w-2xl text-center">
      <p
        className={`font-label text-[0.7rem] uppercase tracking-[0.28em] ${eyebrowColor}`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-3 text-3xl sm:text-4xl md:text-5xl ${titleColor} ${
          locale === "bn" ? "font-bengali-display" : "font-display"
        }`}
      >
        {title}
      </h2>
      <div className="mt-5">
        <LotusDivider />
      </div>
      {body ? (
        <p
          className={`mx-auto mt-6 max-w-xl text-base leading-relaxed sm:text-lg ${bodyColor} ${
            locale === "bn" ? "font-bengali-body" : "font-body"
          }`}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}
