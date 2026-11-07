"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { isLocale, type Locale } from "@/i18n/config";
import { buildLocaleCookie } from "@/lib/locale-cookie";

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
  englishLabel: string;
  bengaliLabel: string;
};

export function LanguageSwitcher({
  locale,
  label,
  englishLabel,
  bengaliLabel,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    setHash(window.location.hash);
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const segments = pathname.split("/");
  const maybeLocale = segments[1];
  const rest = isLocale(maybeLocale)
    ? segments.slice(2).join("/")
    : segments.filter(Boolean).join("/");

  function hrefFor(next: Locale) {
    const base = rest ? `/${next}/${rest}` : `/${next}`;
    return `${base}${hash}`;
  }

  return (
    <div
      className="inline-flex items-center gap-2 rounded-sm border border-antique-gold/35 bg-dark-burgundy/50 px-2 py-1 backdrop-blur-sm"
      role="group"
      aria-label={label}
    >
      {(["en", "bn"] as const).map((next) => {
        const active = locale === next;
        return (
          <Link
            key={next}
            href={hrefFor(next)}
            hrefLang={next}
            onClick={() => {
              document.cookie = buildLocaleCookie(next);
            }}
            className={`font-label px-2 py-1 text-[0.7rem] tracking-[0.14em] uppercase transition ${
              active
                ? "text-antique-gold"
                : "text-soft-white/70 hover:text-soft-white"
            }`}
            aria-current={active ? "true" : undefined}
          >
            {next === "en" ? englishLabel : bengaliLabel}
          </Link>
        );
      })}
    </div>
  );
}
