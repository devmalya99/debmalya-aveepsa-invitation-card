import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/types";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: async () => (await import("./dictionaries/en")).default,
  bn: async () => (await import("./dictionaries/bn")).default,
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
