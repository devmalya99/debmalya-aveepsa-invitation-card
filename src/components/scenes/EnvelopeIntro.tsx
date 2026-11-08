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
  const [burst, setBurst] = useState(false);

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
    gsap.set(".env-flap-left", {
      rotateY: 0,
      autoAlpha: 0,
      transformOrigin: "0% 50%",
    });
    gsap.set(".env-flap-right", {
      rotateY: 0,
      autoAlpha: 0,
      transformOrigin: "100% 50%",
    });
    gsap.set(".env-flap-bottom", { rotateX: 0, autoAlpha: 0 });
    gsap.set(".env-paper", { y: 40, scale: 0.96, autoAlpha: 0 });
    gsap.set(".env-inner-glow", { autoAlpha: 0, scale: 0.72 });
    gsap.set(".env-rim-glow", { autoAlpha: 0, scale: 0.92 });
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current || !coverDone) return;
      registerGsap();

      // Closed envelope — side/bottom flaps + letter stay hidden until open.
      gsap.set(".env-flap-top", { rotateX: 0, transformOrigin: "50% 0%" });
      gsap.set(".env-flap-left", {
        rotateY: 0,
        autoAlpha: 0,
        transformOrigin: "0% 50%",
      });
      gsap.set(".env-flap-right", {
        rotateY: 0,
        autoAlpha: 0,
        transformOrigin: "100% 50%",
      });
      gsap.set(".env-flap-bottom", { rotateX: 0, autoAlpha: 0 });
      gsap.set(".env-paper", { y: 40, scale: 0.96, autoAlpha: 0 });
      gsap.set(".env-inner-glow", { autoAlpha: 0, scale: 0.72 });
      gsap.set(".env-rim-glow", { autoAlpha: 0, scale: 0.92 });

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

      // Offset while still hidden, then fade/slide in — never flash full opacity first.
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
    markProgrammatic(5000);

    if (reducedMotion) {
      finish();
      return;
    }

    registerGsap();
    openTimelineRef.current?.kill();
    setBurst(true);

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        setBurst(false);
        finish();
      },
    });
    openTimelineRef.current = tl;

    // Slow, ceremonial open — ~4.2s total
    tl.to(".env-seal", { scale: 0.92, duration: 0.22, ease: "power2.out" }, 0)
      .fromTo(
        ".env-seal-ripple",
        { scale: 0.65, autoAlpha: 0.85 },
        { scale: 2.15, autoAlpha: 0, duration: 0.85, ease: "power1.out" },
        0,
      )
      .to(".env-seal-glow", { autoAlpha: 1, duration: 0.4 }, 0)
      .to(".env-scene", { y: -3, duration: 0.55, ease: "sine.out" }, 0.06)
      .to(".env-seal", { scale: 1.04, duration: 0.4, ease: "power2.out" }, 0.24)
      .fromTo(
        ".env-rim-glow",
        { autoAlpha: 0, scale: 0.92 },
        { autoAlpha: 1, scale: 1.04, duration: 1.15, ease: "power2.out" },
        0.28,
      )
      .fromTo(
        ".env-inner-glow",
        { autoAlpha: 0, scale: 0.72 },
        { autoAlpha: 1, scale: 1, duration: 1.1, ease: "power2.out" },
        0.35,
      )
      .fromTo(
        ".env-glow-rays",
        { rotate: 0, scale: 0.85 },
        { rotate: 56, scale: 1.2, duration: 2.2, ease: "sine.out" },
        0.4,
      )
      .fromTo(
        ".env-glow-core",
        { scale: 0.55, autoAlpha: 0.4 },
        { scale: 1.25, autoAlpha: 1, duration: 1.35, ease: "power2.out" },
        0.38,
      )
      .to(
        ".env-glow-edge",
        {
          boxShadow:
            "inset 0 0 34px rgba(255,220,120,0.8), inset 0 0 72px rgba(197,163,101,0.55), 0 0 32px rgba(255,220,120,0.4)",
          duration: 1.2,
        },
        0.45,
      )
      .to(
        ".env-flap-top",
        {
          rotateX: -148,
          duration: 1.45,
          ease: "power3.inOut",
          transformOrigin: "50% 0%",
        },
        0.55,
      )
      .to(
        ".env-flap-left",
        {
          autoAlpha: 1,
          rotateY: 100,
          duration: 1.1,
          ease: "power2.inOut",
          transformOrigin: "0% 50%",
        },
        0.95,
      )
      .to(
        ".env-flap-right",
        {
          autoAlpha: 1,
          rotateY: -100,
          duration: 1.1,
          ease: "power2.inOut",
          transformOrigin: "100% 50%",
        },
        0.95,
      )
      .to(
        ".env-flap-bottom",
        {
          autoAlpha: 1,
          rotateX: 28,
          duration: 0.95,
          ease: "power2.inOut",
          transformOrigin: "50% 100%",
        },
        1.05,
      )
      .to(".env-pocket", { autoAlpha: 0.35, duration: 0.65 }, 1.25)
      .to(".env-inner-glow", { autoAlpha: 0.85, duration: 0.65 }, 1.35)
      .to(
        ".env-paper",
        {
          y: -18,
          scale: 1.02,
          autoAlpha: 1,
          duration: 1.2,
          ease: "power3.out",
        },
        1.55,
      )
      .to(
        ".env-paper",
        { y: -52, scale: 1.05, duration: 1.05, ease: "power2.inOut" },
        2.55,
      )
      .to(
        ".env-scene",
        {
          y: -16,
          scale: 1.08,
          autoAlpha: 0,
          duration: 0.95,
          ease: "power2.inOut",
        },
        3.25,
      )
      .to(
        ".env-intro-heading, .env-intro-names, .env-intro-date, .env-intro-instruction, .env-intro-rule, .env-intro-skip",
        { autoAlpha: 0, y: -6, duration: 0.55, stagger: 0.03 },
        3.3,
      )
      .fromTo(
        ".env-reveal-flash",
        { autoAlpha: 0 },
        { autoAlpha: 0.55, duration: 0.35, yoyo: true, repeat: 1 },
        3.55,
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
        <GoldenParticles burst={burst} />

        <InvitationHeader
          showProgress={false}
          staticProgress={{ current: 1, total: 6 }}
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

        <div
          className="env-reveal-flash pointer-events-none absolute inset-0 z-30 bg-[radial-gradient(circle_at_center,rgba(232,205,150,0.4),transparent_55%)] opacity-0"
          aria-hidden
        />
      </section>
    </>
  );
}
