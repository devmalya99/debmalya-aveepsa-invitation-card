"use client";

import Image from "next/image";
import { LetterCorner } from "@/components/letter/LetterOrnaments";
import { assets } from "@/data/assets";
import { useLanguage } from "@/hooks/useLanguage";

function FamilyEditorial({
  side,
  label,
  name,
  members,
  isBengali,
}: {
  side: "groom" | "bride";
  label: string;
  name: string;
  members: Array<{ label: string; value: string }>;
  isBengali: boolean;
}) {
  return (
    <div
      className={`union-family union-family-${side} w-full max-w-[19rem] text-center`}
    >
      <p className="union-family-label font-body text-[0.52rem] tracking-[0.2em] text-[#6b5224] uppercase">
        {label}
      </p>
      <h3
        className={`union-family-name mt-1 text-[1.05rem] leading-snug text-sindoor-red ${
          isBengali ? "font-bn-display" : "font-display"
        }`}
      >
        {name}
      </h3>
      <div className="union-family-rule mx-auto mt-1.5 h-px w-10 origin-center bg-gradient-to-r from-transparent via-antique-gold to-transparent" />
      <dl className="mt-2 space-y-1 text-left">
        {members.map((row) => (
          <div
            key={`${side}-${row.label}`}
            className="union-family-row grid grid-cols-[auto_1fr] gap-x-2.5"
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
    </div>
  );
}

/**
 * Layer B — family union card rendered on the shared opening canvas.
 * Visibility is owned by GrandReveal's scrub timeline.
 */
export function UnionFamilyCard() {
  const { content, locale } = useLanguage();
  const copy = content.identities;
  const isBengali = locale === "bn";
  const groomMembers = copy.groomDetails.slice(0, 3);
  const brideMembers = copy.brideDetails.slice(0, 4);

  return (
    <article className="opening-union-sheet stationery-sheet relative flex max-h-[calc(100svh-6.5rem)] w-full flex-col overflow-hidden rounded-[1rem] px-4 py-3 shadow-[0_16px_36px_rgba(64,21,29,0.12)] will-change-transform">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(185,154,88,0.14),transparent_60%)]" />
      <div className="identity-border pointer-events-none absolute inset-[7px] rounded-[0.75rem] border border-antique-gold/50" />
      <div className="identity-border pointer-events-none absolute inset-[11px] rounded-[0.55rem] border border-antique-gold/25" />
      <LetterCorner className="identity-corner absolute top-3 left-3 z-20 h-7 w-7 text-antique-gold" />
      <LetterCorner className="identity-corner absolute top-3 right-3 z-20 h-7 w-7 rotate-90 text-antique-gold" />
      <LetterCorner className="identity-corner absolute bottom-3 left-3 z-20 h-7 w-7 -rotate-90 text-antique-gold" />
      <LetterCorner className="identity-corner absolute right-3 bottom-3 z-20 h-7 w-7 rotate-180 text-antique-gold" />

      <span className="union-particle pointer-events-none absolute top-[18%] left-[14%] h-1 w-1 rounded-full bg-antique-gold/70" />
      <span className="union-particle pointer-events-none absolute top-[28%] right-[16%] h-1.5 w-1.5 rounded-full bg-antique-gold/50" />
      <span className="union-particle pointer-events-none absolute bottom-[30%] left-[20%] h-1 w-1 rounded-full bg-antique-gold/60" />
      <span className="union-particle pointer-events-none absolute right-[22%] bottom-[24%] h-1 w-1 rounded-full bg-antique-gold/45" />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center">
        <div className="union-mandala-stage relative flex w-full flex-col items-center will-change-transform">
          <div className="union-glow pointer-events-none absolute top-1/2 left-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(185,154,88,0.35)_0%,transparent_68%)]" />

          <div className="union-mandala-mask relative mx-auto aspect-square w-[min(58vw,13.5rem)] max-h-[22svh] overflow-hidden rounded-full will-change-[clip-path]">
            <div className="union-mandala-spin absolute inset-0 will-change-transform">
              <Image
                src={assets.decorations.unionMandala}
                alt="Golden mandala — union of two families"
                fill
                priority
                unoptimized
                className="union-mandala-art object-contain will-change-transform"
                sizes="(max-width: 430px) 78vw, 296px"
              />
            </div>
            <div className="union-shimmer pointer-events-none absolute inset-[-10%] rounded-full bg-[conic-gradient(from_180deg,transparent_0%,rgba(255,248,234,0.35)_12%,transparent_28%)] mix-blend-soft-light" />
          </div>
        </div>

        <div className="union-identity-block mt-1 w-full text-center will-change-transform">
          <p className="union-caption font-display text-[0.55rem] tracking-[0.18em] text-[#6b5224] uppercase">
            The union of two families
          </p>
          {isBengali ? (
            <p className="union-caption-bn mt-0.5 font-bn-display text-[0.78rem] text-deep-burgundy/80">
              বাংলার দুই পরিবারের এক শুভ মিলন
            </p>
          ) : null}
        </div>

        <div className="relative mt-2 h-[11rem] w-full shrink-0">
          <div className="absolute inset-x-0 top-0 flex justify-center">
            <FamilyEditorial
              side="groom"
              label={isBengali ? "পাত্রের পরিবার" : "Groom's family"}
              name={copy.groomName}
              members={groomMembers}
              isBengali={isBengali}
            />
          </div>

          <div className="union-bridge absolute inset-x-0 top-[42%] flex h-5 -translate-y-1/2 items-center justify-center">
            <div className="absolute inset-x-[22%] top-1/2 h-px origin-center bg-gradient-to-r from-transparent via-antique-gold to-transparent" />
            <span className="relative z-10 h-1.5 w-1.5 rounded-full bg-antique-gold" />
          </div>

          <div className="absolute inset-x-0 top-0 flex flex-col items-center">
            <FamilyEditorial
              side="bride"
              label={isBengali ? "পাত্রীর পরিবার" : "Bride's family"}
              name={copy.brideName}
              members={brideMembers}
              isBengali={isBengali}
            />
            <p className="union-finale mt-2 font-display text-[0.55rem] tracking-[0.16em] text-antique-gold uppercase">
              United in love & blessings
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
