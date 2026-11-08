"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { ScrollExperience } from "@/components/experience/ScrollExperience";
import { MobileOnlyGate } from "@/components/mobile/MobileOnlyGate";
import { LanguagePreference } from "@/components/envelope/LanguagePreference";
import { EnvelopeIntro } from "@/components/scenes/EnvelopeIntro";
import { InvitationHeader } from "@/components/navigation/InvitationHeader";
import { AudioProvider } from "@/hooks/useAudio";
import { AutoPlayProvider, useAutoPlay } from "@/hooks/useAutoPlay";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import { LanguageProvider, useLanguage } from "@/hooks/useLanguage";
import { assets } from "@/data/assets";
import { registerGsap, ScrollTrigger } from "@/lib/gsap";

const OPENED_KEY = "wedding-invite-opened";
/** Let the couple card sequence play before auto-scroll resumes. */
const INTRO_HOLD_MS = 2200;

const sceneLoading = () => (
  <div className="scene-shell surface-ivory min-h-svh" aria-hidden />
);

const GrandReveal = dynamic(
  () =>
    import("@/components/scenes/GrandReveal").then((mod) => ({
      default: mod.GrandReveal,
    })),
  { ssr: false, loading: sceneLoading },
);

const VenueReveal = dynamic(
  () =>
    import("@/components/scenes/VenueReveal").then((mod) => ({
      default: mod.VenueReveal,
    })),
  { ssr: false, loading: sceneLoading },
);

const FinalScene = dynamic(
  () =>
    import("@/components/scenes/FinalScene").then((mod) => ({
      default: mod.FinalScene,
    })),
  { ssr: false, loading: sceneLoading },
);

const GuestBlessingScene = dynamic(
  () =>
    import("@/components/scenes/GuestBlessingScene").then((mod) => ({
      default: mod.GuestBlessingScene,
    })),
  { ssr: false, loading: sceneLoading },
);

function ExperienceInner() {
  const { ready, hasChosenLocale } = useLanguage();
  const { markProgrammatic } = useAutoPlay();
  const [opened, setOpened] = useState(false);
  const [hydratedOpen, setHydratedOpen] = useState(false);
  const [introReady, setIntroReady] = useState(false);
  const [laterScenes, setLaterScenes] = useState(false);

  useAutoScroll(opened && introReady);

  useEffect(() => {
    if (!ready) return;
    // Always land on language/cover/envelope after a full reload so the Kolkata
    // hero is never skipped. OPENED_KEY is still set when the seal opens (and
    // cleared on replay) for in-session continuity only.
    window.localStorage.removeItem(OPENED_KEY);
    setOpened(false);
    setIntroReady(false);
    setLaterScenes(false);
    setHydratedOpen(true);
  }, [ready]);

  /* Warm scene chunks + venue hero while the guest is still on the envelope. */
  useEffect(() => {
    if (opened || !hydratedOpen) return;
    const warm = window.setTimeout(() => {
      void import("@/components/scenes/GrandReveal");
      void import("@/components/scenes/VenueReveal");
      void import("@/components/scenes/FinalScene");
      void import("@/components/scenes/GuestBlessingScene");
      const warmImage = (src: string) => {
        const img = new window.Image();
        img.decoding = "async";
        img.src = src;
      };
      warmImage(assets.decorations.bhagirathiBoat);
      warmImage(assets.couple.finalBlessing);
      warmImage(assets.decorations.namasteFrame);
    }, 400);
    return () => window.clearTimeout(warm);
  }, [opened, hydratedOpen]);

  useEffect(() => {
    if (!opened) {
      setIntroReady(false);
      setLaterScenes(false);
      return;
    }

    registerGsap();
    /* Mount venue+ immediately — delayed mount left auto-scroll stranded at pin end. */
    setLaterScenes(true);
    void import("@/components/scenes/VenueReveal");
    void import("@/components/scenes/FinalScene");
    void import("@/components/scenes/GuestBlessingScene");

    const frame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    const later = window.setTimeout(() => ScrollTrigger.refresh(), 180);
    const intro = window.setTimeout(() => setIntroReady(true), INTRO_HOLD_MS);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(later);
      window.clearTimeout(intro);
    };
  }, [opened]);

  useEffect(() => {
    if (!laterScenes) return;
    registerGsap();
    const frame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    const later = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(later);
    };
  }, [laterScenes]);

  const openInvitation = useCallback(() => {
    markProgrammatic(INTRO_HOLD_MS + 400);
    /* CoverSplash locks body scroll — clear defensively so pin scrub always works. */
    document.body.style.overflow = "";
    setOpened(true);
    setIntroReady(false);
    setLaterScenes(true);
    window.localStorage.setItem(OPENED_KEY, "1");
    window.requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    });
  }, [markProgrammatic]);

  const replay = useCallback(() => {
    window.localStorage.removeItem(OPENED_KEY);
    setOpened(false);
    setLaterScenes(false);
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
        <main
          className="relative bg-antique-ivory"
          style={{ colorScheme: "only light", backgroundColor: "#f6ebd6" }}
        >
          <InvitationHeader showProgress />

          <GrandReveal />
          {laterScenes ? (
            <>
              <VenueReveal />
              <FinalScene />
              <GuestBlessingScene onReplay={replay} />
            </>
          ) : null}
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
