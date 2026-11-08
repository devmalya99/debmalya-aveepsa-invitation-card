"use client";

import { AudioToggle } from "@/components/ui/AudioToggle";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { SectionIndicator } from "@/components/ui/SectionIndicator";
import { useLanguage } from "@/hooks/useLanguage";

type InvitationHeaderProps = {
  /** When true, show live scroll-scene progress. */
  showProgress?: boolean;
  /** Static intro progress (e.g. 1 of 6) before the scroll film mounts. */
  staticProgress?: { current: number; total: number };
};

function StaticProgress({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const { content } = useLanguage();
  const fill = Math.min(1, Math.max(0, current / total));
  const currentLabel = String(current).padStart(2, "0");
  const totalLabel = String(total).padStart(2, "0");

  return (
    <div className="min-w-0">
      <p className="font-bn-display text-[0.68rem] leading-none tracking-normal text-antique-gold">
        {content.common.wedding}
      </p>
      <div className="mt-1.5 flex items-center gap-2.5">
        <p className="font-display text-[0.82rem] leading-none tracking-[0.04em] text-deep-burgundy">
          <span className="font-medium">{currentLabel}</span>
          <span className="text-antique-gold/80"> / {totalLabel}</span>
        </p>
        <div
          className="h-[1.5px] w-10 overflow-hidden bg-antique-gold/25 sm:w-12"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(fill * 100)}
          aria-label={content.common.wedding}
        >
          <div
            className="h-full origin-left bg-deep-burgundy"
            style={{ transform: `scaleX(${fill})` }}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Compact royal header — ivory bar, champagne border, identity + controls.
 * Fixed across scenes; title content never overlaps this reserved band.
 */
export function InvitationHeader({
  showProgress = true,
  staticProgress,
}: InvitationHeaderProps) {
  const showLeft = showProgress || Boolean(staticProgress);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40">
      <div className="mx-auto w-full max-w-lg px-3 pt-[max(0.35rem,env(safe-area-inset-top))] sm:px-4">
        <div
          className={`pointer-events-auto flex min-h-[2.7rem] items-center gap-2 rounded-[0.65rem] border border-antique-gold/35 bg-[#f6ebd6]/95 px-2.5 py-1 text-deep-burgundy shadow-[0_1px_3px_rgba(64,21,29,0.04)] sm:bg-[#f6ebd6]/90 sm:backdrop-blur-sm ${
            showLeft ? "justify-between" : "justify-end"
          }`}
          style={{ colorScheme: "only light" }}
        >
          {staticProgress ? (
            <StaticProgress
              current={staticProgress.current}
              total={staticProgress.total}
            />
          ) : showProgress ? (
            <SectionIndicator enabled className="min-w-0 shrink" />
          ) : null}

          <div className="flex shrink-0 items-center gap-1.5">
            <LanguageSelector />
            <AudioToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
