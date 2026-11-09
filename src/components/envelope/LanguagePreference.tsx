"use client";

import { assets } from "@/data/assets";
import { useAudio } from "@/hooks/useAudio";
import { useLanguage } from "@/hooks/useLanguage";
import type { Locale } from "@/types/invitation";

const COVER_SRC = assets.decorations.kolkataCover;

/**
 * Blurred Kolkata cover + explicit language choice (no guessing).
 * Shown on every full page reload; last choice is only a default for later toggles.
 * Idle auto-open never starts until the guest taps a language here.
 * Music starts on this tap — browsers allow playback only after a user gesture.
 */
export function LanguagePreference() {
  const { setLocale } = useLanguage();
  const { start: startMusic } = useAudio();

  const choose = (next: Locale) => {
    setLocale(next);
    startMusic();
  };

  return (
    <div
      className="fixed inset-0 z-[230] flex flex-col"
      style={{ backgroundColor: "#1a0c10" }}
    >
      <div
        className="absolute inset-0 scale-105"
        style={{
          backgroundImage: `url(${COVER_SRC})`,
          backgroundSize: "cover",
          backgroundPosition: "center 18%",
          backgroundRepeat: "no-repeat",
          filter: "blur(10px) brightness(0.55)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(26,12,16,0.25), rgba(26,12,16,0.72))",
        }}
        aria-hidden
      />

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
