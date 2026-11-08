"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/hooks/useLanguage";

type LanguageSelectorProps = {
  className?: string;
};

export function LanguageSelector({ className = "" }: LanguageSelectorProps) {
  const { locale, setLocale, content } = useLanguage();

  return (
    <div
      className={`relative inline-grid h-11 min-h-11 grid-cols-2 items-center rounded-full border border-antique-gold/45 bg-antique-ivory p-[3px] ${className}`}
      role="group"
      aria-label={content.common.languageLabel}
    >
      <motion.span
        aria-hidden
        className="absolute top-[3px] bottom-[3px] w-[calc(50%-3px)] rounded-full bg-deep-burgundy"
        initial={false}
        animate={{ left: locale === "bn" ? 3 : "calc(50%)" }}
        transition={{ type: "spring", stiffness: 420, damping: 34 }}
      />

      {(["bn", "en"] as const).map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            className={`relative z-10 flex h-full min-h-[2.5rem] min-w-[2.75rem] items-center justify-center px-2.5 text-[0.7rem] leading-none transition-colors ${
              code === "bn" ? "font-bn-body" : "font-body tracking-[0.04em]"
            } ${active ? "text-antique-ivory" : "text-deep-burgundy/70"}`}
          >
            {code === "bn" ? "বাংলা" : "EN"}
          </button>
        );
      })}
    </div>
  );
}
