import type { Locale } from "@/types/invitation";

/**
 * Central copy + design tokens for the Wedding Celebrations card.
 * Edit text, colours, type scale, spacing, and motion here — not in JSX.
 */

export type WeddingCardEvent = {
  id: "wedding" | "reception";
  titleBn: string;
  titleEn: string;
  bengaliDate: string;
  englishDate: string;
  day: string;
  time: string;
  accent: "turmeric" | "burgundy";
};

export type WeddingCardCopy = {
  eyebrow: string;
  headingBn: string;
  headingEn: string;
  subtitle: string;
  closingNames: string;
  footer: string;
  items: WeddingCardEvent[];
};

export const WEDDING_CARD_COPY: Record<Locale, WeddingCardCopy> = {
  bn: {
    eyebrow: "The Wedding Festivities",
    headingBn: "শুভ অনুষ্ঠান সূচী",
    headingEn: "Wedding Celebrations",
    subtitle: "দুই বিশেষ দিন · এক সুন্দর শুরু",
    closingNames: "দেবমাল্য ও অভীপ্সা",
    footer: "With love & blessings",
    items: [
      {
        id: "wedding",
        titleBn: "গাত্রহরিদ্রা ও শুভবিবাহ",
        titleEn: "Gaye Holud & Wedding",
        bengaliDate: "৮ই অগ্রহায়ণ, ১৪৩৩",
        englishDate: "২৫ নভেম্বর ২০২৬",
        day: "বুধবার",
        time: "সন্ধ্যায়",
        accent: "turmeric",
      },
      {
        id: "reception",
        titleBn: "প্রীতিভোজ",
        titleEn: "Wedding Reception",
        bengaliDate: "১০ই অগ্রহায়ণ, ১৪৩৩",
        englishDate: "২৭ নভেম্বর ২০২৬",
        day: "শুক্রবার",
        time: "সন্ধ্যায়",
        accent: "burgundy",
      },
    ],
  },
  en: {
    eyebrow: "The Wedding Festivities",
    headingBn: "Wedding Celebrations",
    headingEn: "Wedding Celebrations",
    subtitle: "Two special days · One beautiful beginning",
    closingNames: "Debmalya & Aveepsa",
    footer: "With love & blessings",
    items: [
      {
        id: "wedding",
        titleBn: "Gaye Holud & Wedding",
        titleEn: "Gaye Holud & Wedding",
        bengaliDate: "25 November 2026",
        englishDate: "25 November 2026",
        day: "Wednesday",
        time: "Evening",
        accent: "turmeric",
      },
      {
        id: "reception",
        titleBn: "Wedding Reception",
        titleEn: "Wedding Reception",
        bengaliDate: "27 November 2026",
        englishDate: "27 November 2026",
        day: "Friday",
        time: "Evening",
        accent: "burgundy",
      },
    ],
  },
};

/** Visual tokens — mirrored as CSS variables on `.wedding-card`. */
export const WEDDING_CARD_DESIGN = {
  colors: {
    background: "#F8F0E3",
    primary: "#702632",
    secondary: "#4A2028",
    accent: "#B58A50",
    body: "#665044",
    border: "#DCC69F",
    plaqueBg: "#702632",
    plaqueText: "#F8F0E3",
    plaqueBorder: "#B58A50",
  },
  fonts: {
    bengali: "var(--font-noto-serif-bengali), serif",
    english: "var(--font-cormorant), Georgia, serif",
    meta: "var(--font-cormorant), Georgia, serif",
  },
  type: {
    eyebrowSize: "clamp(0.58rem, 1.6vw, 0.68rem)",
    eyebrowTracking: "0.22em",
    headingBnSize: "clamp(1.55rem, 5.2vw, 2.05rem)",
    headingBnLineHeight: "1.28",
    headingEnSize: "clamp(0.95rem, 2.8vw, 1.15rem)",
    headingEnTracking: "0.04em",
    subtitleSize: "clamp(0.72rem, 2.2vw, 0.85rem)",
    eventLabelSize: "clamp(0.58rem, 1.6vw, 0.68rem)",
    eventLabelTracking: "0.18em",
    eventTitleSize: "clamp(1.15rem, 3.8vw, 1.4rem)",
    eventTitleLineHeight: "1.3",
    dateBnSize: "clamp(0.82rem, 2.4vw, 0.95rem)",
    dateEnSize: "clamp(0.95rem, 2.8vw, 1.12rem)",
    metaSize: "clamp(0.72rem, 2vw, 0.82rem)",
    footerSize: "clamp(0.58rem, 1.6vw, 0.68rem)",
    footerTracking: "0.18em",
  },
  spacing: {
    sectionGap: "clamp(1.1rem, 3.2vw, 1.55rem)",
    eventGap: "clamp(1.15rem, 3.4vw, 1.65rem)",
    contentMaxWidth: "22.5rem",
  },
} as const;

export const WEDDING_CARD_MOTION = {
  ease: [0.22, 1, 0.36, 1] as const,
  sequenceStartMs: 220,
  shellDuration: 0.85,
  headingDuration: 0.7,
  ornamentDuration: 0.55,
  eventDuration: 0.55,
  eventStagger: 0.12,
  footerDuration: 0.55,
  footerDelay: 1.85,
  eventBaseDelays: [0.72, 1.28] as const,
} as const;

export function getWeddingCardCopy(locale: Locale): WeddingCardCopy {
  return WEDDING_CARD_COPY[locale];
}
