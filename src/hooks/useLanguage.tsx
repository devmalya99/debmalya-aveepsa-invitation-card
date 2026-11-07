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
  ready: boolean;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return "bn";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "en" || stored === "bn" ? stored : "bn";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("bn");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLocaleState(readStoredLocale());
    setReady(true);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next === "bn" ? "bn" : "en";
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = locale === "bn" ? "bn" : "en";
  }, [locale, ready]);

  const value = useMemo(
    () => ({
      locale,
      content: getInvitation(locale),
      setLocale,
      ready,
    }),
    [locale, setLocale, ready],
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
