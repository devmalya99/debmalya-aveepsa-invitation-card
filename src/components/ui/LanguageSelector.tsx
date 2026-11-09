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
      className={`relative inline-grid h-9 min-h-9 grid-cols-2 items-center rounded-md border border-antique-gold/40 bg-antique-ivory/80 p-[2px] ${className}`}
      role="group"
      aria-label={content.common.languageLabel}
    >
      <motion.span
        aria-hidden
        className="absolute top-[2px] bottom-[2px] w-[calc(50%-2px)] rounded-[0.3rem] bg-deep-burgundy"
        initial={false}
        animate={{ left: locale === "bn" ? 2 : "calc(50%)" }}
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
            className={`relative z-10 flex h-full min-h-[2rem] min-w-[2.4rem] items-center justify-center px-2 font-body text-[0.65rem] leading-none tracking-[0.04em] transition-colors active:scale-[0.97] ${
              active ? "text-antique-ivory" : "text-deep-burgundy/70"
            }`}
          >
            {code === "bn" ? "BN" : "EN"}
          </button>
        );
      })}
    </div>
  );
}
