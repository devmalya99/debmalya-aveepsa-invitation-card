"use client";

import Image from "next/image";
import { LetterCorner } from "@/components/letter/LetterOrnaments";
import { assets } from "@/data/assets";
import { useLanguage } from "@/hooks/useLanguage";

type FamilySide = "groom" | "bride";

type UnionFamilyCardProps = {
  side: FamilySide;
  className?: string;
};

/**
 * Single-family union card for the opening canvas.
 * GrandReveal mounts groom / bride as separate directional Motion layers.
 */
export function UnionFamilyCard({ side, className = "" }: UnionFamilyCardProps) {
  const { content, locale } = useLanguage();
  const copy = content.identities;
  const isBengali = locale === "bn";
  const isGroom = side === "groom";
  const members = isGroom
    ? copy.groomDetails.slice(0, 3)
    : copy.brideDetails.slice(0, 4);
  const name = isGroom ? copy.groomName : copy.brideName;
  const label = isGroom
    ? isBengali
      ? "পাত্রের পরিবার"
      : "Groom's family"
    : isBengali
      ? "পাত্রীর পরিবার"
      : "Bride's family";

  return (
    <article
      className={`stationery-sheet relative flex max-h-[calc(100svh-6.5rem)] w-full flex-col overflow-hidden rounded-[1rem] px-4 py-3 shadow-[0_16px_36px_rgba(64,21,29,0.12)] ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(185,154,88,0.14),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-[7px] rounded-[0.75rem] border border-antique-gold/50" />
      <div className="pointer-events-none absolute inset-[11px] rounded-[0.55rem] border border-antique-gold/25" />
      <LetterCorner className="absolute top-3 left-3 z-20 h-7 w-7 text-antique-gold" />
      <LetterCorner className="absolute top-3 right-3 z-20 h-7 w-7 rotate-90 text-antique-gold" />
      <LetterCorner className="absolute bottom-3 left-3 z-20 h-7 w-7 -rotate-90 text-antique-gold" />
      <LetterCorner className="absolute right-3 bottom-3 z-20 h-7 w-7 rotate-180 text-antique-gold" />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center">
        <div className="relative flex w-full flex-col items-center">
          <div className="pointer-events-none absolute top-1/2 left-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(185,154,88,0.35)_0%,transparent_68%)]" />

          <div className="relative mx-auto aspect-square w-[min(58vw,13.5rem)] max-h-[22svh] overflow-hidden rounded-full">
            <div className="absolute inset-0 animate-[spin_80s_linear_infinite]">
              <Image
                src={assets.decorations.unionMandala}
                alt=""
                fill
                priority
                unoptimized
                className="object-contain"
                sizes="(max-width: 430px) 78vw, 296px"
              />
            </div>
          </div>
        </div>

        <div className="mt-1 w-full text-center">
          <p className="font-display text-[0.55rem] tracking-[0.18em] text-[#6b5224] uppercase">
            The union of two families
          </p>
          {isBengali ? (
            <p className="mt-0.5 font-bn-display text-[0.78rem] text-deep-burgundy/80">
              বাংলার দুই পরিবারের এক শুভ মিলন
            </p>
          ) : null}
        </div>

        <div className="mt-3 w-full max-w-[19rem] text-center">
          <p className="font-body text-[0.52rem] tracking-[0.2em] text-[#6b5224] uppercase">
            {label}
          </p>
          <h3
            className={`mt-1 text-[1.05rem] leading-snug text-sindoor-red ${
              isBengali ? "font-bn-display" : "font-display"
            }`}
          >
            {name}
          </h3>
          <div className="mx-auto mt-1.5 h-px w-10 bg-gradient-to-r from-transparent via-antique-gold to-transparent" />
          <dl className="mt-2 space-y-1 text-left">
            {members.map((row) => (
              <div
                key={`${side}-${row.label}`}
                className="grid grid-cols-[auto_1fr] gap-x-2.5"
              >
                <dt className="font-body text-[0.55rem] tracking-[0.1em] text-antique-gold uppercase">
                  {row.label}
                </dt>
                <dd
                  className={`text-[0.8rem] leading-snug text-deep-burgundy/90 ${
                    isBengali ? "font-bn-display" : "font-display"
                  }`}
                >
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
          {!isGroom ? (
            <p className="mt-3 font-display text-[0.55rem] tracking-[0.16em] text-antique-gold uppercase">
              United in love & blessings
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
