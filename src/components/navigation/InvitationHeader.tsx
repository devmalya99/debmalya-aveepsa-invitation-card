"use client";

import { AudioToggle } from "@/components/ui/AudioToggle";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { SectionIndicator } from "@/components/ui/SectionIndicator";

type InvitationHeaderProps = {
  /** When true, show section progress (after envelope opens). */
  showProgress?: boolean;
};

/**
 * Stable global header for the cinematic invitation.
 * Position stays fixed across scenes — only the section number/progress update.
 */
export function InvitationHeader({ showProgress = true }: InvitationHeaderProps) {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40">
      <div className="mx-auto w-full max-w-lg px-3 pt-[max(0.55rem,env(safe-area-inset-top))] sm:px-4">
        <div
          className={`pointer-events-auto flex items-center gap-3 rounded-[1.05rem] border border-antique-gold/35 bg-antique-ivory/92 px-3 py-2 shadow-[0_1px_3px_rgba(64,21,29,0.06)] backdrop-blur-md ${
            showProgress ? "justify-between" : "justify-end"
          }`}
        >
          {showProgress ? (
            <SectionIndicator enabled className="min-w-0 shrink" />
          ) : null}

          <div className="flex shrink-0 items-center gap-2">
            <LanguageSelector />
            <AudioToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
