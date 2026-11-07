"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { FloralFrame, LotusDivider } from "@/components/decorations";
import { localeLabels, type Locale } from "@/i18n/config";
import { buildLocaleCookie } from "@/lib/locale-cookie";

type LanguageGateProps = {
  eyebrow: string;
  titleEn: string;
  titleBn: string;
  subtitle: string;
};

export function LanguageGate({
  eyebrow,
  titleEn,
  titleBn,
  subtitle,
}: LanguageGateProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [selected, setSelected] = useState<Locale | null>(null);
  const reduceMotion = useReducedMotion();

  function choose(locale: Locale) {
    setSelected(locale);
    document.cookie = buildLocaleCookie(locale);
    startTransition(() => {
      router.replace(`/${locale}`);
    });
  }

  return (
    <main className="surface-cinematic relative flex min-h-dvh items-center justify-center overflow-hidden px-5 py-16">
      <FloralFrame className="relative z-10 w-full max-w-xl">
        <motion.div
          className="mx-auto flex flex-col items-center gap-6 px-6 py-14 text-center sm:px-10"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="font-label text-[0.7rem] uppercase tracking-[0.28em] text-muted-champagne">
            {eyebrow}
          </p>
          <h1 className="font-display text-balance text-3xl leading-tight text-soft-white sm:text-4xl">
            {titleEn}
          </h1>
          <p className="font-bengali-display text-balance text-2xl leading-snug text-dusty-rose sm:text-3xl">
            {titleBn}
          </p>
          <LotusDivider />
          <p className="max-w-md font-body text-base leading-relaxed text-dusty-rose/95 sm:text-lg">
            {subtitle}
          </p>

          <div className="mt-4 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
            {(["en", "bn"] as const).map((locale) => (
              <button
                key={locale}
                type="button"
                disabled={pending}
                onClick={() => choose(locale)}
                className="group relative min-h-14 flex-1 overflow-hidden rounded-sm border border-antique-gold/45 bg-dark-burgundy/40 px-5 py-4 transition hover:border-antique-gold hover:bg-deep-wine/70 disabled:opacity-60"
              >
                <span
                  className={`block text-2xl text-soft-white ${
                    locale === "bn" ? "font-bengali-display" : "font-display"
                  }`}
                >
                  {localeLabels[locale].native}
                </span>
                <span className="mt-1 block font-label text-xs tracking-wide text-muted-champagne">
                  {localeLabels[locale].continue}
                </span>
                {selected === locale && pending ? (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 animate-pulse bg-antique-gold" />
                ) : null}
              </button>
            ))}
          </div>
        </motion.div>
      </FloralFrame>
    </main>
  );
}
