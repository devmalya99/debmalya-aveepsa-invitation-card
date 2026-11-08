"use client";

import Image from "next/image";
import { assets } from "@/data/assets";
import { useLanguage } from "@/hooks/useLanguage";
import type { Locale } from "@/types/invitation";

/**
 * Blurred Kolkata cover + explicit language choice (no guessing).
 * Choice is persisted via useLanguage → localStorage.
 */
export function LanguagePreference() {
  const { setLocale } = useLanguage();

  const choose = (locale: Locale) => {
    setLocale(locale);
  };

  return (
    <div className="fixed inset-0 z-[210] flex flex-col bg-[#1a0c10]">
      <div className="absolute inset-0">
        <Image
          src={assets.decorations.kolkataCover}
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-[center_18%] scale-105 blur-[10px] brightness-[0.55]"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(26,12,16,0.25),rgba(26,12,16,0.72))]"
          aria-hidden
        />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(2rem,env(safe-area-inset-top))]">
        <p className="font-display text-[0.68rem] tracking-[0.28em] text-[#E8CD96] uppercase">
          Debmalya &amp; Aveepsa
        </p>
        <div className="mt-3 h-px w-16 bg-gradient-to-r from-transparent via-[#C5A365] to-transparent" />

        <h1 className="mt-6 text-center font-bn-display text-[1.55rem] leading-snug text-[#FFF8EA]">
          ভাষা নির্বাচন করুন
        </h1>
        <p className="mt-2 text-center font-display text-[0.95rem] tracking-[0.06em] text-[#FFF8EA]/88">
          Choose your language
        </p>

        <div className="mt-8 flex w-full max-w-[18rem] flex-col gap-3">
          <button
            type="button"
            onClick={() => choose("bn")}
            className="min-h-14 rounded-sm border border-[#C5A365]/65 bg-[#2a1016]/55 px-5 py-3.5 text-center backdrop-blur-sm transition active:scale-[0.98]"
          >
            <span className="block font-bn-display text-[1.35rem] text-[#FFF8EA]">
              বাংলা
            </span>
            <span className="mt-0.5 block font-body text-[0.68rem] tracking-[0.12em] text-[#E8CD96]/85 uppercase">
              Continue in Bengali
            </span>
          </button>

          <button
            type="button"
            onClick={() => choose("en")}
            className="min-h-14 rounded-sm border border-[#C5A365]/65 bg-[#2a1016]/55 px-5 py-3.5 text-center backdrop-blur-sm transition active:scale-[0.98]"
          >
            <span className="block font-display text-[1.25rem] tracking-[0.04em] text-[#FFF8EA]">
              English
            </span>
            <span className="mt-0.5 block font-bn-body text-[0.78rem] text-[#E8CD96]/85">
              ইংরেজিতে চালিয়ে যান
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
