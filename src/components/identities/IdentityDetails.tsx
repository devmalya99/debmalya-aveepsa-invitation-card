"use client";

import { useLanguage } from "@/hooks/useLanguage";

type IdentityDetailsProps = {
  rows: Array<{ label: string; value: string }>;
  className?: string;
};

export function IdentityDetails({ rows, className = "" }: IdentityDetailsProps) {
  const { locale } = useLanguage();
  const isBengali = locale === "bn";

  return (
    <dl className={`space-y-2.5 ${className}`}>
      {rows.map((row) => (
        <div
          key={`${row.label}-${row.value}`}
          className="identity-detail-row grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 text-left"
        >
          <dt
            className={`text-[0.7rem] text-antique-gold ${
              isBengali
                ? "font-bn-display"
                : "font-body tracking-[0.14em] uppercase"
            }`}
          >
            {row.label}
          </dt>
          <dd className="font-bn-display text-[0.95rem] leading-snug text-deep-burgundy/90">
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
