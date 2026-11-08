"use client";

import { useEffect, useState, type ReactNode } from "react";

/** Phone + smaller tablets; desktop / large tablet blocked. */
const TABLET_MAX_PX = 1024;

type MobileOnlyGateProps = {
  children: ReactNode;
};

/**
 * Blocks desktop / large screens. Copy is always bilingual so we never guess language.
 */
export function MobileOnlyGate({ children }: MobileOnlyGateProps) {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${TABLET_MAX_PX}px)`);
    const sync = () => setAllowed(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  if (allowed === null) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#1a0c10] text-[#FFF8EA]">
        <span className="font-display text-xs tracking-[0.25em] uppercase opacity-60">
          …
        </span>
      </div>
    );
  }

  if (!allowed) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,#491923,transparent_55%),#1a0c10] px-8 text-center text-[#FFF8EA]">
        <p className="font-display text-[0.65rem] tracking-[0.3em] text-[#C5A365] uppercase">
          Debmalya &amp; Aveepsa
        </p>

        <h1 className="mt-6 max-w-md font-bn-display text-[1.75rem] leading-snug">
          এই আমন্ত্রণটি মোবাইলে খুলুন
        </h1>
        <h2 className="mt-3 max-w-md font-display text-[1.45rem] leading-snug tracking-[0.02em]">
          Please open this invitation on your phone
        </h2>

        <p className="mt-6 max-w-sm font-bn-body text-[0.95rem] leading-relaxed text-[#E8CD96]/90">
          সেরা অভিজ্ঞতার জন্য মোবাইল বা ছোট ট্যাবলেটে এই লিঙ্কটি খুলুন।
        </p>
        <p className="mt-2 max-w-sm font-body text-[0.95rem] leading-relaxed text-[#E8CD96]/85">
          For the best experience, open this link on a phone or small tablet.
        </p>

        <div className="mt-10 h-px w-24 bg-gradient-to-r from-transparent via-[#C5A365] to-transparent" />
        <p className="mt-6 font-display text-xs tracking-[0.22em] text-[#C5A365]/80 uppercase">
          25–27 Nov 2026
        </p>
      </main>
    );
  }

  return <>{children}</>;
}
