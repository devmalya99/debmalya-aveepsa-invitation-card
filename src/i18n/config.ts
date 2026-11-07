export const locales = ["en", "bn"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeCookieName = "wedding-locale";

export const localeLabels: Record<
  Locale,
  { native: string; continue: string }
> = {
  en: {
    native: "English",
    continue: "Continue in English",
  },
  bn: {
    native: "বাংলা",
    continue: "বাংলায় আমন্ত্রণটি দেখুন",
  },
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
