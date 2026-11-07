"use client";

import { useEffect, useState, type ReactNode } from "react";
import { WEDDING } from "@/config/wedding";
import type { Locale } from "@/i18n/config";

const TABLET_MAX_PX = 1024;

type MobileOnlyGateProps = {
  locale: Locale;
  children: ReactNode;
  title: string;
  body: string;
};

export function MobileOnlyGate({
  locale,
  children,
  title,
  body,
}: MobileOnlyGateProps) {
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
      <div className="flex min-h-dvh items-center justify-center bg-dark-burgundy text-soft-white">
        <span className="font-label text-xs tracking-[0.25em] uppercase">
          …
        </span>
      </div>
    );
  }

  if (!allowed) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,#491923,transparent_55%),#25171A] px-8 text-center text-soft-white">
        <p className="font-label text-[0.65rem] uppercase tracking-[0.3em] text-antique-gold">
          {WEDDING.couple.shortNames[locale]}
        </p>
        <h1 className="mt-4 max-w-md font-display text-4xl leading-tight">
          {title}
        </h1>
        <p className="mt-4 max-w-sm font-body text-base leading-relaxed text-dusty-rose">
          {body}
        </p>
        <div className="mt-10 h-px w-24 bg-gradient-to-r from-transparent via-antique-gold to-transparent" />
        <p className="mt-6 font-label text-xs tracking-[0.22em] text-muted-champagne uppercase">
          25–27 Nov 2026
        </p>
      </main>
    );
  }

  return <>{children}</>;
}
