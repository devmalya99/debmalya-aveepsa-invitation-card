"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Envelope } from "@/components/envelope/Envelope";
import { EnvelopeAtmosphere } from "@/components/envelope/EnvelopeAtmosphere";
import { EnvelopeFlap } from "@/components/envelope/EnvelopeFlap";
import { GoldenParticles } from "@/components/envelope/GoldenParticles";
import { InvitationPaper } from "@/components/envelope/InvitationPaper";
import { WaxSeal } from "@/components/envelope/WaxSeal";
import { InvitationHeader } from "@/components/navigation/InvitationHeader";
import { useLanguage } from "@/hooks/useLanguage";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

type EnvelopeIntroProps = {
  onOpen: () => void;
};

type Stage = "enter" | "ready" | "seal" | "flap" | "paper" | "reveal" | "exit";

export function EnvelopeIntro({ onOpen }: EnvelopeIntroProps) {
  const { content, locale } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();
  const [stage, setStage] = useState<Stage>("enter");
  const timersRef = useRef<number[]>([]);
  const opening = stage !== "enter" && stage !== "ready";

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setStage("ready"), reducedMotion ? 0 : 650);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const finish = useCallback(() => {
    clearTimers();
    onOpen();
  }, [clearTimers, onOpen]);

  const runOpenSequence = useCallback(() => {
    if (opening) return;

    if (reducedMotion) {
      finish();
      return;
    }

    clearTimers();
    setStage("seal");
    timersRef.current = [
      window.setTimeout(() => setStage("flap"), 420),
      window.setTimeout(() => setStage("paper"), 1050),
      window.setTimeout(() => setStage("reveal"), 1750),
      window.setTimeout(() => setStage("exit"), 2300),
      window.setTimeout(() => finish(), 2850),
    ];
  }, [clearTimers, finish, opening, reducedMotion]);

  const flapOpen =
    stage === "flap" || stage === "paper" || stage === "reveal" || stage === "exit";
  const paperStage =
    stage === "paper" || stage === "reveal" || stage === "exit"
      ? stage === "exit" || stage === "reveal"
        ? "revealed"
        : "emerging"
      : "idle";

  return (
    <section
      id="envelope"
      className="relative flex min-h-svh flex-col overflow-hidden px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1.25rem,env(safe-area-inset-bottom))]"
    >
      <EnvelopeAtmosphere />
      <GoldenParticles burst={stage === "seal"} />

      <InvitationHeader showProgress={false} />

      <div className="relative z-10 mx-auto flex w-full max-w-[430px] flex-1 flex-col">
        {/* Zone A — Header / identity */}
        <header className="relative z-20 flex flex-col items-center pt-[4.75rem]">
          <div className="flex w-full justify-end px-1">
            <button
              type="button"
              onClick={finish}
              className={`text-[0.7rem] text-deep-burgundy/55 underline-offset-2 hover:underline ${
                locale === "bn" ? "font-bn-body" : "font-body"
              }`}
            >
              {content.common.skipIntro}
            </button>
          </div>

          <div className="relative mt-4 w-full px-6 text-center">
            <div className="pointer-events-none absolute inset-x-8 -top-4 h-28 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,248,236,0.95),transparent_70%)]" />

            <motion.h1
              className="relative font-bn-display text-[1.85rem] leading-[1.35] text-sindoor-red sm:text-[2.1rem]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.55 }}
            >
              <span className="relative inline-block">
                {content.common.wedding}
                <motion.span
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[#f0d9a0]/35 to-transparent"
                  initial={{ x: "-120%", opacity: 0 }}
                  animate={{ x: "120%", opacity: [0, 0.7, 0] }}
                  transition={{ delay: 0.8, duration: 1.4, ease: "easeInOut" }}
                />
              </span>
            </motion.h1>

            <motion.div
              className="relative mx-auto mt-2.5 h-px w-16 bg-gradient-to-r from-transparent via-antique-gold to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.45 }}
            />

            <motion.p
              className="relative mt-2.5 font-display text-[1.05rem] tracking-[0.06em] text-deep-burgundy uppercase sm:text-[1.15rem]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              {content.grandReveal.namesEn}
            </motion.p>

            <motion.p
              className={`relative mt-1 text-[0.9rem] leading-relaxed text-antique-gold ${
                locale === "bn" ? "font-bn-body" : "font-body"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.48, duration: 0.45 }}
            >
              {content.grandReveal.date}
            </motion.p>
          </div>
        </header>

        {/* Zone B — Envelope */}
        <div className="relative z-10 mt-5 flex flex-1 items-center justify-center">
          <Envelope expand={stage === "exit"}>
            <InvitationPaper
              stage={paperStage}
              title={content.grandReveal.kicker}
              subtitle={content.grandReveal.namesEn}
            />

            <EnvelopeFlap open={flapOpen}>
              <WaxSeal
                pressed={stage === "seal"}
                onPress={runOpenSequence}
                label={content.envelope.sealLabel}
                disabled={opening}
              />
            </EnvelopeFlap>
          </Envelope>
        </div>

        {/* Zone C — Single opening instruction */}
        <motion.p
          className={`relative z-10 mx-auto mt-4 mb-2 max-w-[16rem] text-center text-[0.9rem] leading-relaxed text-deep-burgundy/75 ${
            locale === "bn" ? "font-bn-body" : "font-body"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: opening ? 0.45 : 1 }}
          transition={{ delay: 0.55, duration: 0.4 }}
        >
          {content.envelope.instruction}
        </motion.p>
      </div>

      {stage === "reveal" || stage === "exit" ? (
        <motion.div
          className="pointer-events-none absolute inset-0 z-30 bg-[radial-gradient(circle_at_center,rgba(185,154,88,0.42),transparent_55%)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.85, 0] }}
          transition={{ duration: 1.05, ease: "easeOut" }}
        />
      ) : null}
    </section>
  );
}
