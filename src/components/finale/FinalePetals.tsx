"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, registerGsap } from "@/lib/gsap";

type FinalePetalsProps = {
  enabled?: boolean;
  className?: string;
};

/** Soft pink petal — echoes the bougainvillea in the finale portrait. */
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

/** Champagne-gold petal for contrast on deep burgundy. */
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

const PETALS = [
  { left: "6%", size: 11, duration: 17, delay: 0, drift: 16, tone: "pink" as const },
  { left: "22%", size: 9, duration: 21, delay: 2.1, drift: -12, tone: "gold" as const },
  { left: "40%", size: 12, duration: 19, delay: 1.0, drift: 10, tone: "pink" as const },
  { left: "58%", size: 8, duration: 23, delay: 3.6, drift: -14, tone: "gold" as const },
  { left: "74%", size: 10, duration: 18, delay: 4.8, drift: 12, tone: "pink" as const },
  { left: "88%", size: 7, duration: 25, delay: 6.2, drift: -8, tone: "gold" as const },
  { left: "14%", size: 9, duration: 20, delay: 7.5, drift: 9, tone: "pink" as const },
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
 * Scene 06 ambient petals — light density, transform/opacity only.
 * Tuned for burgundy: soft pink + champagne gold.
 */
export function FinalePetals({
  enabled = true,
  className = "",
}: FinalePetalsProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!enabled || reducedMotion || !rootRef.current) return;
      registerGsap();

      const loops: gsap.core.Tween[] = [];

      PETALS.forEach((_, index) => {
        const el = rootRef.current?.querySelector(
          `.finale-petal-${index}`,
        ) as HTMLElement | null;
        const config = PETALS[index];
        if (!el || !config) return;

        loops.push(
          gsap.fromTo(
            el,
            { y: "-8vh", x: 0, rotate: -10, opacity: 0 },
            {
              y: "110vh",
              x: config.drift,
              rotate: index % 2 === 0 ? 58 : -46,
              opacity: 0.75,
              duration: config.duration,
              delay: config.delay,
              repeat: -1,
              ease: "none",
              onUpdate() {
                const p = this.progress();
                const fade =
                  p < 0.1 ? p / 0.1 : p > 0.82 ? (1 - p) / 0.18 : 1;
                el.style.opacity = String(0.75 * fade);
              },
            },
          ),
        );
      });

      SPARKS.forEach((_, index) => {
        const el = rootRef.current?.querySelector(
          `.finale-spark-${index}`,
        ) as HTMLElement | null;
        const config = SPARKS[index];
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

      const onVisibility = () => {
        loops.forEach((tween) => {
          if (document.hidden) tween.pause();
          else tween.resume();
        });
      };
      document.addEventListener("visibilitychange", onVisibility);

      return () => {
        document.removeEventListener("visibilitychange", onVisibility);
        loops.forEach((tween) => tween.kill());
      };
    },
    {
      scope: rootRef,
      dependencies: [enabled, reducedMotion],
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
      {PETALS.map((petal, index) => (
        <span
          key={`finale-petal-${index}`}
          className={`finale-petal finale-petal-${index} absolute top-0 will-change-transform`}
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

      {SPARKS.map((spark, index) => (
        <span
          key={`finale-spark-${index}`}
          className={`finale-spark finale-spark-${index} absolute rounded-full bg-antique-gold/70 opacity-25 will-change-transform`}
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
