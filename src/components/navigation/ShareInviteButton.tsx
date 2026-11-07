"use client";

import { Check, Share2 } from "lucide-react";
import { useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries/types";

type ShareInviteButtonProps = {
  dictionary: Dictionary;
};

export function ShareInviteButton({ dictionary }: ShareInviteButtonProps) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: dictionary.meta.title,
          text: dictionary.meta.description,
          url,
        });
        return;
      } catch {
        // Fall through to clipboard.
      }
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex items-center gap-2 rounded-sm border border-antique-gold/35 bg-dark-burgundy/50 px-2.5 py-1.5 font-label text-[0.65rem] uppercase tracking-[0.14em] text-soft-white/85 backdrop-blur-sm transition hover:text-antique-gold"
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
      {copied ? dictionary.share.copied : dictionary.share.invite}
    </button>
  );
}
