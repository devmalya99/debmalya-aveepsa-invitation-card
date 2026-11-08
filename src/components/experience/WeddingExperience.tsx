"use client";

import { useCallback, useEffect, useState } from "react";
import { ScrollExperience } from "@/components/experience/ScrollExperience";
import { MobileOnlyGate } from "@/components/mobile/MobileOnlyGate";
import { LanguagePreference } from "@/components/envelope/LanguagePreference";
import { EnvelopeIntro } from "@/components/scenes/EnvelopeIntro";
import { FinalScene } from "@/components/scenes/FinalScene";
import { GrandReveal } from "@/components/scenes/GrandReveal";
import { GuestBlessingScene } from "@/components/scenes/GuestBlessingScene";
import { VenueReveal } from "@/components/scenes/VenueReveal";
import { WeddingEvents } from "@/components/scenes/WeddingEvents";
import { InvitationHeader } from "@/components/navigation/InvitationHeader";
import { AudioProvider } from "@/hooks/useAudio";
import { AutoPlayProvider } from "@/hooks/useAutoPlay";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import { LanguageProvider, useLanguage } from "@/hooks/useLanguage";
import { registerGsap, ScrollTrigger } from "@/lib/gsap";

const OPENED_KEY = "wedding-invite-opened";

function ExperienceInner() {
  const { ready, hasChosenLocale } = useLanguage();
  const [opened, setOpened] = useState(false);
  const [hydratedOpen, setHydratedOpen] = useState(false);

  useAutoScroll(opened);

  useEffect(() => {
    if (!ready) return;
    // Always land on language/cover/envelope after a full reload so the Kolkata
    // hero is never skipped. OPENED_KEY is still set when the seal opens (and
    // cleared on replay) for in-session continuity only.
    window.localStorage.removeItem(OPENED_KEY);
    setOpened(false);
    setHydratedOpen(true);
  }, [ready]);

  useEffect(() => {
    if (!opened) return;
    registerGsap();
    const frame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    /* Pins + progress trackers mount across sibling effects — refresh twice. */
    const later = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    const settled = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(later);
      window.clearTimeout(settled);
    };
  }, [opened]);

  const openInvitation = useCallback(() => {
    setOpened(true);
    window.localStorage.setItem(OPENED_KEY, "1");
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
      ScrollTrigger.refresh();
    });
  }, []);

  const replay = useCallback(() => {
    window.localStorage.removeItem(OPENED_KEY);
    setOpened(false);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  if (!ready || !hydratedOpen) {
    return (
      <div className="scene-shell surface-ivory flex items-center justify-center">
        <div className="h-10 w-10 animate-pulse rounded-full border border-antique-gold/50" />
      </div>
    );
  }

  if (!opened) {
    return <EnvelopeIntro onOpen={openInvitation} />;
  }

  return (
    <>
      {!hasChosenLocale ? <LanguagePreference /> : null}
      <ScrollExperience>
        <main className="relative bg-antique-ivory">
          <InvitationHeader showProgress />

          <GrandReveal />
          <WeddingEvents />
          <VenueReveal />
          <FinalScene />
          <GuestBlessingScene onReplay={replay} />
        </main>
      </ScrollExperience>
    </>
  );
}

export function WeddingExperience() {
  return (
    <LanguageProvider>
      <AudioProvider>
        <AutoPlayProvider>
          <MobileOnlyGate>
            <ExperienceInner />
          </MobileOnlyGate>
        </AutoPlayProvider>
      </AudioProvider>
    </LanguageProvider>
  );
}
