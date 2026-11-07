import { localeCookieName, type Locale } from "@/i18n/config";

export function buildLocaleCookie(locale: Locale): string {
  const maxAge = 60 * 60 * 24 * 365;
  return `${localeCookieName}=${locale}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}
