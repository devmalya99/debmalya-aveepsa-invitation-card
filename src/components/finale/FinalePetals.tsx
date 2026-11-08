"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useInViewActive } from "@/hooks/useInViewActive";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";
import { getAmbientDensity } from "@/lib/performance";
import { gsap, registerGsap } from "@/lib/gsap";

type FinalePetalsProps = {
  enabled?: boolean;
  className?: string;
};

function PinkPetal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 20" className={className} aria-hidden fill="none">
      <path
        d="M8 1.5 C11.5 4 13.5 8 13 12.5 C12.5 16 10 18.5 8 19 C6 18.5 3.5 16 3 12.5 C2.5 8 4.5 4 8 1.5 Z"
        fill="#f3c4c8"
        opacity="0.9"
      />
      <ellipse cx="8" cy="11" rx="2" ry="2.6" fill="#e8a0a8" opacity="0.55" />
    </svg>
  );
}

function GoldPetal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 20" className={className} aria-hidden fill="none">
      <path
        d="M8 1.5 C11.5 4 13.5 8 13 12.5 C12.5 16 10 18.5 8 19 C6 18.5 3.5 16 3 12.5 C2.5 8 4.5 4 8 1.5 Z"
        fill="#B99A58"
        opacity="0.85"
      />
      <ellipse cx="8" cy="11" rx="1.8" ry="2.4" fill="#fff2d6" opacity="0.35" />
    </svg>
  );
}

function EdgeFlower({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} aria-hidden fill="none">
      <path
        d="M14 5 C16 9 16 11 14 14 C12 11 12 9 14 5 Z
           M14 23 C12 19 12 17 14 14 C16 17 16 19 14 23 Z
           M5 14 C9 12 11 12 14 14 C11 16 9 16 5 14 Z
           M23 14 C19 16 17 16 14 14 C17 12 19 12 23 14 Z"
        stroke="#B99A58"
        strokeWidth="1"
        strokeLinejoin="round"
        opacity="0.75"
      />
      <circle cx="14" cy="14" r="1.6" fill="#f3c4c8" opacity="0.55" />
    </svg>
  );
}

function EdgeLeaf({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 14" className={className} aria-hidden fill="none">
      <path
        d="M2 7 C8 2 14 2 22 7 C14 12 8 12 2 7 Z"
        stroke="#B99A58"
        strokeWidth="1"
        fill="#B99A58"
        fillOpacity="0.2"
      />
      <path d="M4 7 H18" stroke="#B99A58" strokeWidth="0.7" opacity="0.65" />
    </svg>
  );
}

const PETALS = [
  { left: "6%", size: 11, duration: 17, delay: 0, drift: 16, tone: "pink" as const },
  { left: "22%", size: 9, duration: 21, delay: 2.1, drift: -12, tone: "gold" as const },
  { left: "40%", size: 12, duration: 19, delay: 1.0, drift: 10, tone: "pink" as const },
  { left: "58%", size: 8, duration: 23, delay: 3.6, drift: -14, tone: "gold" as const },
  { left: "74%", size: 10, duration: 18, delay: 4.8, drift: 12, tone: "pink" as const },
  { left: "88%", size: 7, duration: 25, delay: 6.2, drift: -8, tone: "gold" as const },
];

const FLOWERS = [
  { left: "3%", top: "24%", size: 18, duration: 15, delay: 0.5 },
  { left: "90%", top: "42%", size: 16, duration: 17, delay: 2.0 },
  { left: "5%", top: "68%", size: 15, duration: 16, delay: 3.4 },
];

const LEAVES = [
  { left: "10%", top: "16%", size: 18, duration: 22, delay: 0.8 },
  { left: "84%", top: "56%", size: 16, duration: 24, delay: 2.6 },
];

const SPARKS = [
  { left: "18%", top: "20%", size: 2.5, delay: 0.2 },
  { left: "46%", top: "14%", size: 2, delay: 1.1 },
  { left: "72%", top: "28%", size: 2.5, delay: 0.7 },
  { left: "30%", top: "58%", size: 2, delay: 1.8 },
  { left: "82%", top: "62%", size: 3, delay: 2.4 },
  { left: "54%", top: "78%", size: 2, delay: 3.1 },
];

/**
 * Scene 06 ambient layer — edge-biased florals on burgundy.
 * Pauses when offscreen; density capped on mobile.
 */
export function FinalePetals({
  enabled = true,
  className = "",
}: FinalePetalsProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const inView = useInViewActive(rootRef, enabled && !reducedMotion);
  const density = getAmbientDensity();
  const petals = PETALS.slice(0, density.finalePetals);
  const sparks = SPARKS.slice(0, density.finaleSparks);
  const flowers = FLOWERS.slice(0, density.finalePetals >= 6 ? 3 : 2);
  const leaves = LEAVES.slice(0, density.finalePetals >= 6 ? 2 : 1);

  useGSAP(
    () => {
      if (!enabled || reducedMotion || !rootRef.current) return;
      registerGsap();

      const loops: gsap.core.Tween[] = [];

      petals.forEach((_, index) => {
        const el = rootRef.current?.querySelector(
          `.finale-petal-${index}`,
        ) as HTMLElement | null;
        const config = petals[index];
        if (!el || !config) return;

        const spin = index % 2 === 0 ? 58 : -46;
        loops.push(
          gsap.to(el, {
            keyframes: [
              { y: "-8vh", x: 0, rotate: -10, autoAlpha: 0, duration: 0 },
              {
                y: "12vh",
                x: config.drift * 0.2,
                rotate: spin * 0.2,
                autoAlpha: 0.75,
                duration: config.duration * 0.12,
              },
              {
                y: "88vh",
                x: config.drift * 0.85,
                rotate: spin * 0.85,
                autoAlpha: 0.75,
                duration: config.duration * 0.7,
              },
              {
                y: "110vh",
                x: config.drift,
                rotate: spin,
                autoAlpha: 0,
                duration: config.duration * 0.18,
              },
            ],
            delay: config.delay,
            repeat: -1,
            ease: "none",
          }),
        );
      });

      flowers.forEach((_, index) => {
        const el = rootRef.current?.querySelector(
          `.finale-flower-${index}`,
        ) as HTMLElement | null;
        const config = flowers[index];
        if (!el || !config) return;
        loops.push(
          gsap.to(el, {
            y: index % 2 === 0 ? 9 : -11,
            x: index % 2 === 0 ? 6 : -7,
            rotate: index % 2 === 0 ? 7 : -9,
            duration: config.duration,
            delay: config.delay,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          }),
        );
      });

      leaves.forEach((_, index) => {
        const el = rootRef.current?.querySelector(
          `.finale-leaf-${index}`,
        ) as HTMLElement | null;
        const config = leaves[index];
        if (!el || !config) return;
        loops.push(
          gsap.to(el, {
            x: index % 2 === 0 ? 20 : -18,
            y: index % 2 === 0 ? 14 : 20,
            rotate: index % 2 === 0 ? 10 : -12,
            duration: config.duration,
            delay: config.delay,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          }),
        );
      });

      sparks.forEach((_, index) => {
        const el = rootRef.current?.querySelector(
          `.finale-spark-${index}`,
        ) as HTMLElement | null;
        const config = sparks[index];
        if (!el || !config) return;
        loops.push(
          gsap.to(el, {
            autoAlpha: 0.8,
            y: index % 2 === 0 ? -7 : -4,
            duration: 3.4 + index * 0.3,
            delay: config.delay,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          }),
        );
      });

      const syncPlayback = () => {
        const shouldRun = inView && !document.hidden;
        loops.forEach((tween) => {
          if (shouldRun) tween.resume();
          else tween.pause();
        });
        if (rootRef.current) {
          rootRef.current.style.willChange = shouldRun ? "transform" : "auto";
        }
      };

      syncPlayback();
      document.addEventListener("visibilitychange", syncPlayback);

      return () => {
        document.removeEventListener("visibilitychange", syncPlayback);
        loops.forEach((tween) => tween.kill());
      };
    },
    {
      scope: rootRef,
      dependencies: [enabled, reducedMotion, inView, petals.length, sparks.length],
      revertOnUpdate: true,
    },
  );

  if (!enabled || reducedMotion) return null;

  return (
    <div
      ref={rootRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {petals.map((petal, index) => (
        <span
          key={`finale-petal-${index}`}
          className={`finale-petal finale-petal-${index} absolute top-0`}
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size * 1.25,
          }}
        >
          {petal.tone === "gold" ? (
            <GoldPetal className="h-full w-full" />
          ) : (
            <PinkPetal className="h-full w-full" />
          )}
        </span>
      ))}

      {flowers.map((flower, index) => (
        <span
          key={`finale-flower-${index}`}
          className={`finale-flower finale-flower-${index} absolute opacity-30`}
          style={{
            left: flower.left,
            top: flower.top,
            width: flower.size,
            height: flower.size,
          }}
        >
          <EdgeFlower className="h-full w-full" />
        </span>
      ))}

      {leaves.map((leaf, index) => (
        <span
          key={`finale-leaf-${index}`}
          className={`finale-leaf finale-leaf-${index} absolute opacity-35`}
          style={{
            left: leaf.left,
            top: leaf.top,
            width: leaf.size,
            height: leaf.size * 0.6,
          }}
        >
          <EdgeLeaf className="h-full w-full" />
        </span>
      ))}

      {sparks.map((spark, index) => (
        <span
          key={`finale-spark-${index}`}
          className={`finale-spark finale-spark-${index} absolute rounded-full bg-antique-gold/70 opacity-25`}
          style={{
            left: spark.left,
            top: spark.top,
            width: spark.size,
            height: spark.size,
          }}
        />
      ))}
    </div>
  );
}
