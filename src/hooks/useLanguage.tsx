"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getInvitation } from "@/data/invitation";
import type { InvitationContent, Locale } from "@/types/invitation";

const STORAGE_KEY = "wedding-invite-locale";

type LanguageContextValue = {
  locale: Locale;
  content: InvitationContent;
  setLocale: (locale: Locale) => void;
  /** True after hydration. */
  ready: boolean;
  /** True only after the guest chooses a language in this page load. */
  hasChosenLocale: boolean;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("bn");
  const [hasChosenLocale, setHasChosenLocale] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    /* Remember last preference as default highlight, but always ask again
       on a full reload so the language card appears every visit. */
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "bn") {
      setLocaleState(stored);
      document.documentElement.lang = stored === "bn" ? "bn" : "en";
    }
    setHasChosenLocale(false);
    setReady(true);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    setHasChosenLocale(true);
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next === "bn" ? "bn" : "en";
  }, []);

  useEffect(() => {
    if (!ready || !hasChosenLocale) return;
    document.documentElement.lang = locale === "bn" ? "bn" : "en";
  }, [locale, ready, hasChosenLocale]);

  const value = useMemo(
    () => ({
      locale,
      content: getInvitation(locale),
      setLocale,
      ready,
      hasChosenLocale,
    }),
    [locale, setLocale, ready, hasChosenLocale],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
