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
import { InvitationHeader } from "@/components/navigation/InvitationHeader";
import { AudioProvider } from "@/hooks/useAudio";
import { AutoPlayProvider, useAutoPlay } from "@/hooks/useAutoPlay";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import { LanguageProvider, useLanguage } from "@/hooks/useLanguage";
import { registerGsap, ScrollTrigger } from "@/lib/gsap";

const OPENED_KEY = "wedding-invite-opened";
/** Let the couple card sequence play before auto-scroll resumes. */
const INTRO_HOLD_MS = 2600;

function ExperienceInner() {
  const { ready, hasChosenLocale } = useLanguage();
  const { markProgrammatic } = useAutoPlay();
  const [opened, setOpened] = useState(false);
  const [hydratedOpen, setHydratedOpen] = useState(false);
  const [introReady, setIntroReady] = useState(false);

  useAutoScroll(opened && introReady);

  useEffect(() => {
    if (!ready) return;
    // Always land on language/cover/envelope after a full reload so the Kolkata
    // hero is never skipped. OPENED_KEY is still set when the seal opens (and
    // cleared on replay) for in-session continuity only.
    window.localStorage.removeItem(OPENED_KEY);
    setOpened(false);
    setIntroReady(false);
    setHydratedOpen(true);
  }, [ready]);

  useEffect(() => {
    if (!opened) {
      setIntroReady(false);
      return;
    }
    registerGsap();
    const frame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    /* One refresh after paint — avoid hammering refresh during the entrance. */
    const later = window.setTimeout(() => ScrollTrigger.refresh(), 180);
    const intro = window.setTimeout(() => setIntroReady(true), INTRO_HOLD_MS);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(later);
      window.clearTimeout(intro);
    };
  }, [opened]);

  const openInvitation = useCallback(() => {
    markProgrammatic(INTRO_HOLD_MS + 400);
    setOpened(true);
    setIntroReady(false);
    window.localStorage.setItem(OPENED_KEY, "1");
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
      ScrollTrigger.refresh();
    });
  }, [markProgrammatic]);

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
