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
      className="env-paper absolute inset-x-[10%] top-[18%] z-[11] h-[62%] origin-bottom overflow-hidden rounded-[0.25rem] border border-[#C5A365]/35 bg-[linear-gradient(168deg,#FBF5EA_0%,#F6EBD6_50%,#E5D1AE_100%)] shadow-[0_10px_22px_rgba(75,21,31,0.22)] opacity-0 will-change-transform"
      style={{ transform: "translateZ(3px)" }}
    >
      <div className="env-paper-border pointer-events-none absolute inset-[6px] border border-[#C5A365]/28" />
      <div className="relative flex h-full flex-col items-center justify-center gap-1 px-3 text-center">
        <p
          className={`text-[0.95rem] leading-snug text-[#681F2B] ${
            isBengali ? "font-bn-display" : "font-display tracking-[0.04em]"
          }`}
        >
          {title}
        </p>
        <p className="font-display text-[0.65rem] tracking-[0.1em] text-[#C5A365] uppercase">
          {subtitle}
        </p>
        <div className="mt-1.5 h-px w-10 bg-gradient-to-r from-transparent via-[#C5A365]/70 to-transparent" />
      </div>
    </div>
  );
}
