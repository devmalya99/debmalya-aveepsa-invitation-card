"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { CoverSplash } from "@/components/envelope/CoverSplash";
import { LanguagePreference } from "@/components/envelope/LanguagePreference";
import { Envelope } from "@/components/envelope/Envelope";
import { EnvelopeAtmosphere } from "@/components/envelope/EnvelopeAtmosphere";
import { EnvelopeFlap } from "@/components/envelope/EnvelopeFlap";
import { GoldenParticles } from "@/components/envelope/GoldenParticles";
import { InvitationPaper } from "@/components/envelope/InvitationPaper";
import { WaxSeal } from "@/components/envelope/WaxSeal";
import { InvitationHeader } from "@/components/navigation/InvitationHeader";
import { useAutoPlay } from "@/hooks/useAutoPlay";
import { useLanguage } from "@/hooks/useLanguage";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, registerGsap } from "@/lib/gsap";

type EnvelopeIntroProps = {
  onOpen: () => void;
};

const INTRO_TARGETS =
  ".env-intro-heading, .env-intro-names, .env-intro-date, .env-intro-rule, .env-intro-instruction, .env-intro-skip, .env-scene, .env-seal";

/**
 * Cover illustration → envelope homepage composition.
 */
export function EnvelopeIntro({ onOpen }: EnvelopeIntroProps) {
  const { content, locale, hasChosenLocale } = useLanguage();
  const { isAutoPlaying, markProgrammatic } = useAutoPlay();
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const openingRef = useRef(false);
  const enteredRef = useRef(false);
  const enterTlRef = useRef<gsap.core.Timeline | null>(null);
  const openTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const [coverDone, setCoverDone] = useState(false);
  const [opening, setOpening] = useState(false);
  const [entered, setEntered] = useState(false);

  const finish = useCallback(() => {
    openTimelineRef.current?.kill();
    openTimelineRef.current = null;
    openingRef.current = false;
    onOpen();
  }, [onOpen]);

  /* Keep the envelope composition invisible under Language/Cover overlays.
     Otherwise the cover lift reveals a fully painted page, then GSAP fromTo
     hides it and fades it in again — which reads as the page "loading twice". */
  useLayoutEffect(() => {
    if (!sectionRef.current || enteredRef.current) return;
    registerGsap();
    gsap.set(INTRO_TARGETS, { autoAlpha: 0 });
    gsap.set(".env-flap-top", { rotateX: 0, transformOrigin: "50% 0%" });
    gsap.set(".env-paper", { y: 52, scale: 0.94, autoAlpha: 0 });
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current || !coverDone) return;
      registerGsap();

      gsap.set(".env-flap-top", { rotateX: 0, transformOrigin: "50% 0%" });
      gsap.set(".env-paper", { y: 52, scale: 0.94, autoAlpha: 0 });

      if (enteredRef.current) {
        gsap.set(INTRO_TARGETS, { autoAlpha: 1, y: 0, scale: 1 });
        gsap.set(".env-intro-skip", { autoAlpha: 0.7 });
        setEntered(true);
        return;
      }

      enteredRef.current = true;
      enterTlRef.current?.kill();

      if (reducedMotion) {
        gsap.set(INTRO_TARGETS, { autoAlpha: 1, y: 0, scale: 1 });
        gsap.set(".env-intro-skip", { autoAlpha: 0.7 });
        setEntered(true);
        return;
      }

      gsap.set(".env-intro-heading", { y: 10 });
      gsap.set(".env-intro-names", { y: 8 });
      gsap.set(".env-intro-date", { y: 6 });
      gsap.set(".env-scene", { y: 20 });
      gsap.set(".env-seal", { scale: 0.92 });
      gsap.set(".env-intro-rule", { scaleX: 0, autoAlpha: 1 });

      const enter = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => setEntered(true),
      });
      enterTlRef.current = enter;

      enter
        .to(".env-intro-heading", { autoAlpha: 1, y: 0, duration: 0.7 }, 0.05)
        .to(".env-intro-rule", { scaleX: 1, duration: 0.45 }, 0.18)
        .to(".env-intro-names", { autoAlpha: 1, y: 0, duration: 0.6 }, 0.22)
        .to(".env-intro-date", { autoAlpha: 1, y: 0, duration: 0.5 }, 0.34)
        .to(".env-scene", { autoAlpha: 1, y: 0, duration: 0.85 }, 0.24)
        .to(".env-seal", { autoAlpha: 1, scale: 1, duration: 0.55 }, 0.55)
        .to(".env-intro-instruction", { autoAlpha: 1, duration: 0.45 }, 0.7)
        .to(".env-intro-skip", { autoAlpha: 0.7, duration: 0.35 }, 0.78);
    },
    {
      scope: sectionRef,
      dependencies: [reducedMotion, coverDone],
      revertOnUpdate: false,
    },
  );

  const runOpenSequence = useCallback(() => {
    if (openingRef.current) return;
    openingRef.current = true;
    setOpening(true);
    markProgrammatic(4200);

    if (reducedMotion) {
      finish();
      return;
    }

    registerGsap();
    openTimelineRef.current?.kill();

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: finish,
    });
    openTimelineRef.current = tl;

    // Ceremonial page open — top flap only, then zoom into the letter.
    tl.to(".env-seal", { scale: 0.94, duration: 0.2, ease: "power2.out" }, 0)
      .to(".env-seal", { scale: 1, duration: 0.28, ease: "power2.out" }, 0.2)
      .to(
        ".env-flap-top",
        {
          rotateX: -158,
          duration: 1.15,
          ease: "power3.inOut",
          transformOrigin: "50% 0%",
        },
        0.28,
      )
      .to(".env-seal", { autoAlpha: 0, duration: 0.35 }, 0.55)
      .to(".env-pocket", { autoAlpha: 0.55, duration: 0.55 }, 0.85)
      .set(".env-letter-layer", { zIndex: 22 }, 0.9)
      .to(
        ".env-paper",
        {
          y: -8,
          scale: 1,
          autoAlpha: 1,
          duration: 1.05,
          ease: "power3.out",
        },
        0.95,
      )
      .to(
        ".env-intro-heading, .env-intro-names, .env-intro-date, .env-intro-instruction, .env-intro-rule, .env-intro-skip",
        { autoAlpha: 0, y: -8, duration: 0.45, stagger: 0.02 },
        1.55,
      )
      .to(
        ".env-paper",
        {
          y: -36,
          scale: 1.18,
          duration: 0.85,
          ease: "power2.inOut",
        },
        1.85,
      )
      .to(
        ".env-back, .env-lining, .env-pocket, .env-flap-top",
        { autoAlpha: 0, duration: 0.7, ease: "power2.inOut" },
        2.05,
      )
      .to(
        ".env-paper",
        {
          scale: 2.35,
          y: 12,
          duration: 0.95,
          ease: "power2.inOut",
        },
        2.35,
      )
      .to(
        ".env-scene",
        {
          scale: 1.08,
          autoAlpha: 0,
          duration: 0.7,
          ease: "power2.inOut",
        },
        2.75,
      );
  }, [finish, markProgrammatic, reducedMotion]);

  /* Idle auto-play: open the seal once the envelope entrance has settled. */
  useEffect(() => {
    if (!isAutoPlaying || !coverDone || !entered || opening) return;
    runOpenSequence();
  }, [coverDone, entered, isAutoPlaying, opening, runOpenSequence]);

  return (
    <>
      {!hasChosenLocale ? <LanguagePreference /> : null}

      {hasChosenLocale && !coverDone ? (
        <CoverSplash onComplete={() => setCoverDone(true)} />
      ) : null}

      <section
        ref={sectionRef}
        id="envelope"
        className="relative flex h-svh min-h-svh flex-col overflow-hidden px-5 pt-[max(0.35rem,env(safe-area-inset-top))] pb-[max(0.5rem,env(safe-area-inset-bottom))]"
      >
        <EnvelopeAtmosphere />
        <GoldenParticles />

        <InvitationHeader
          showProgress={false}
          staticProgress={{ current: 1, total: 7 }}
        />

        <div className="relative z-10 mx-auto flex w-full max-w-[24rem] flex-1 flex-col justify-center gap-0">
          <header className="relative z-20 flex shrink-0 flex-col items-center pt-[3.4rem] text-center">
            <button
              type="button"
              onClick={finish}
              className={`env-intro-skip absolute top-1 right-0 text-[0.62rem] text-[#79504A]/7 underline-offset-2 hover:underline ${
                locale === "bn" ? "font-bn-body" : "font-body"
              }`}
            >
              {content.common.skipIntro}
            </button>

            <h1
              className={`env-intro-heading relative text-[2rem] leading-[1.3] font-bold text-[#6B1D2A] sm:text-[2.25rem] ${
                locale === "bn"
                  ? "font-bn-display"
                  : "font-display tracking-[0.03em]"
              }`}
            >
              {content.common.wedding}
            </h1>

            <div className="env-intro-rule mx-auto mt-2.5 h-px w-16 origin-center bg-gradient-to-r from-transparent via-[#E8CD96] to-transparent" />

            <p
              className={`env-intro-names mt-2.5 font-semibold text-[#5c1824] ${
                locale === "bn"
                  ? "font-bn-display text-[1.2rem] leading-snug tracking-normal"
                  : "font-display text-[1.05rem] tracking-[0.08em] uppercase sm:text-[1.15rem]"
              }`}
            >
              {locale === "bn"
                ? content.grandReveal.namesBn
                : content.grandReveal.namesEn}
            </p>

            <p
              className={`env-intro-date mt-1.5 text-[0.92rem] leading-relaxed font-medium text-[#A67C3D] sm:text-[1rem] ${
                locale === "bn" ? "font-bn-body" : "font-body"
              }`}
            >
              {locale === "bn"
                ? content.grandReveal.date
                : content.grandReveal.dateEn}
            </p>
          </header>

          <div className="relative z-10 mt-5 flex shrink-0 items-center justify-center pb-6">
            <Envelope>
              <InvitationPaper
                title={content.grandReveal.kicker}
                subtitle={
                  locale === "bn"
                    ? content.grandReveal.namesBn
                    : content.grandReveal.namesEn
                }
              />
              <EnvelopeFlap>
                <WaxSeal
                  onPress={runOpenSequence}
                  label={content.envelope.sealLabel}
                  disabled={opening || !coverDone}
                  idle={entered && !opening}
                />
              </EnvelopeFlap>
            </Envelope>
          </div>

          <p
            className={`env-intro-instruction relative z-10 mx-auto -mt-0.5 max-w-[15rem] shrink-0 text-center text-[0.76rem] leading-relaxed text-[#79504A] ${
              locale === "bn" ? "font-bn-body" : "font-body"
            }`}
          >
            <button
              type="button"
              onClick={runOpenSequence}
              disabled={opening || !coverDone}
              className="border-0 bg-transparent p-0 text-inherit disabled:opacity-50"
            >
              {content.envelope.instruction}
            </button>
          </p>
        </div>
      </section>
    </>
  );
}
