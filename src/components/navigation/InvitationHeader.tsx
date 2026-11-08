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
      <p className="font-display text-[0.72rem] leading-none tracking-[0.06em] text-deep-burgundy">
        <span className="font-medium">{currentLabel}</span>
        <span className="text-antique-gold/80"> / {totalLabel}</span>
      </p>
      <div
        className="mt-1.5 h-[2px] w-12 overflow-hidden rounded-full bg-antique-gold/25 sm:w-14"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(fill * 100)}
        aria-label={content.common.wedding}
      >
        <div
          className="h-full origin-left rounded-full bg-deep-burgundy"
          style={{ transform: `scaleX(${fill})` }}
        />
      </div>
    </div>
  );
}

/**
 * Stable global header for the cinematic invitation.
 * Position stays fixed across scenes — only the section number/progress update.
 */
export function InvitationHeader({
  showProgress = true,
  staticProgress,
}: InvitationHeaderProps) {
  const showLeft = showProgress || Boolean(staticProgress);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40">
      <div className="mx-auto w-full max-w-lg px-3 pt-[max(0.4rem,env(safe-area-inset-top))] sm:px-4">
        <div
          className={`pointer-events-auto flex min-h-[2.85rem] items-center gap-2 rounded-[0.9rem] border border-antique-gold/40 bg-antique-ivory/94 px-2 py-1 shadow-[0_1px_2px_rgba(64,21,29,0.05)] backdrop-blur-md ${
            showLeft ? "justify-between" : "justify-end"
          }`}
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
