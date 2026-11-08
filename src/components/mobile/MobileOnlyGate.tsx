"use client";

import { useEffect, useState, type ReactNode } from "react";

/** Phone + smaller tablets; desktop / large tablet blocked. */
const TABLET_MAX_PX = 1024;

type MobileOnlyGateProps = {
  children: ReactNode;
};

/**
 * Blocks desktop / large screens. Copy is always bilingual so we never guess language.
 * Ivory surface + deep burgundy type for reliable contrast (no light-on-light).
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
      <div
        className="flex min-h-dvh items-center justify-center"
        style={{ backgroundColor: "#F8F0E0", color: "#6B1D2A" }}
      >
        <span className="font-display text-xs tracking-[0.25em] uppercase opacity-50">
          …
        </span>
      </div>
    );
  }

  if (!allowed) {
    return (
      <main
        className="flex min-h-dvh flex-col items-center justify-center px-8 text-center"
        style={{ backgroundColor: "#F8F0E0" }}
      >
        <p
          className="font-display text-[0.7rem] tracking-[0.3em] uppercase"
          style={{ color: "#A67C3D" }}
        >
          Debmalya &amp; Aveepsa
        </p>

        <h1
          className="mt-8 max-w-md font-bn-display text-[1.85rem] leading-snug font-semibold"
          style={{ color: "#6B1D2A" }}
        >
          এই আমন্ত্রণটি মোবাইলে খুলুন
        </h1>
        <h2
          className="mt-3 max-w-md font-display text-[1.35rem] leading-snug tracking-[0.02em]"
          style={{ color: "#5c1824" }}
        >
          Please open this invitation on your phone
        </h2>

        <p
          className="mt-6 max-w-sm font-bn-body text-[1rem] leading-relaxed"
          style={{ color: "#5c4030" }}
        >
          সেরা অভিজ্ঞতার জন্য মোবাইল বা ছোট ট্যাবলেটে এই লিঙ্কটি খুলুন।
        </p>
        <p
          className="mt-2 max-w-sm font-body text-[1rem] leading-relaxed"
          style={{ color: "#5c4030" }}
        >
          For the best experience, open this link on a phone or small tablet.
        </p>

        <div
          className="mt-10 h-px w-24"
          style={{
            background:
              "linear-gradient(to right, transparent, #A67C3D, transparent)",
          }}
        />
        <p
          className="mt-6 font-display text-xs tracking-[0.22em] uppercase"
          style={{ color: "#A67C3D" }}
        >
          25–27 Nov 2026
        </p>
      </main>
    );
  }

  return <>{children}</>;
}
