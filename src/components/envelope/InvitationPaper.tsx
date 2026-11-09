"use client";

import { useLanguage } from "@/hooks/useLanguage";

type InvitationPaperProps = {
  title: string;
  subtitle: string;
};

/** Inner letter — tucked behind pocket until GSAP lifts `.env-paper`. */
export function InvitationPaper({ title, subtitle }: InvitationPaperProps) {
  const { locale } = useLanguage();
  const isBengali = locale === "bn";

  return (
    <div
      className="env-paper absolute inset-x-[9%] top-[14%] z-[11] h-[68%] origin-center overflow-hidden rounded-[0.3rem] border border-[#C5A365]/4 bg-[linear-gradient(168deg,#FBF5EA_0%,#F6EBD6_48%,#E8D4B4_100%)] shadow-[0_12px_28px_rgba(75,21,31,0.24)] opacity-0 will-change-transform"
      style={{ transform: "translateZ(3px)" }}
    >
      <div className="env-paper-border pointer-events-none absolute inset-[7px] border border-[#C5A365]/3" />
      <div className="relative flex h-full flex-col items-center justify-center gap-1.5 px-4 text-center">
        <p
          className={`text-[1.05rem] leading-snug text-[#681F2B] ${
            isBengali ? "font-bn-display" : "font-display tracking-[0.04em]"
          }`}
        >
          {title}
        </p>
        <p
          className={`text-[#C5A365] ${
            isBengali
              ? "font-bn-display text-[0.78rem]"
              : "font-display text-[0.68rem] tracking-[0.1em] uppercase"
          }`}
        >
          {subtitle}
        </p>
        <div className="mt-1 h-px w-12 bg-gradient-to-r from-transparent via-[#C5A365]/70 to-transparent" />
      </div>
    </div>
  );
}
