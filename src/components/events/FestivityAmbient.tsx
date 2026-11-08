"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, registerGsap } from "@/lib/gsap";

type FestivityAmbientProps = {
  enabled?: boolean;
  className?: string;
};

function ShiuliPetal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 20" className={className} aria-hidden fill="none">
      <path
        d="M8 1.5 C11.5 4 13.5 8 13 12.5 C12.5 16 10 18.5 8 19 C6 18.5 3.5 16 3 12.5 C2.5 8 4.5 4 8 1.5 Z"
        fill="#fff8ea"
        opacity="0.92"
      />
      <ellipse cx="8" cy="11" rx="2.2" ry="2.8" fill="#e8a04a" opacity="0.55" />
    </svg>
  );
}

function FloatingFlower({ className = "" }: { className?: string }) {
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
        opacity="0.7"
      />
      <circle cx="14" cy="14" r="1.6" fill="#B99A58" opacity="0.55" />
    </svg>
  );
}

function GoldenLeaf({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 14" className={className} aria-hidden fill="none">
      <path
        d="M2 7 C8 2 14 2 22 7 C14 12 8 12 2 7 Z"
        stroke="#B99A58"
        strokeWidth="1"
        fill="#B99A58"
        fillOpacity="0.18"
      />
      <path d="M4 7 H18" stroke="#B99A58" strokeWidth="0.7" opacity="0.65" />
    </svg>
  );
}

const PETALS = [
  { left: "8%", size: 11, duration: 18, delay: 0, drift: 18 },
  { left: "28%", size: 9, duration: 22, delay: 2.4, drift: -14 },
  { left: "48%", size: 12, duration: 20, delay: 1.1, drift: 10 },
  { left: "66%", size: 8, duration: 24, delay: 3.8, drift: -16 },
  { left: "82%", size: 10, duration: 19, delay: 5.2, drift: 12 },
  { left: "18%", size: 7, duration: 26, delay: 7, drift: -8 },
];

const FLOWERS = [
  { left: "4%", top: "22%", size: 22, duration: 14, delay: 0.4 },
  { left: "88%", top: "38%", size: 18, duration: 16, delay: 1.8 },
  { left: "6%", top: "62%", size: 20, duration: 15, delay: 3.2 },
  { left: "90%", top: "72%", size: 16, duration: 17, delay: 2.1 },
];

const LEAVES = [
  { left: "12%", top: "18%", size: 20, duration: 22, delay: 0.6 },
  { left: "78%", top: "48%", size: 18, duration: 26, delay: 2.5 },
  { left: "30%", top: "78%", size: 16, duration: 24, delay: 4 },
];

const PARTICLES = [
  { left: "16%", top: "24%", size: 3, delay: 0 },
  { left: "42%", top: "16%", size: 2, delay: 0.8 },
  { left: "58%", top: "34%", size: 2.5, delay: 1.4 },
  { left: "74%", top: "22%", size: 2, delay: 2.1 },
  { left: "22%", top: "58%", size: 2.5, delay: 0.5 },
  { left: "68%", top: "64%", size: 3, delay: 1.7 },
  { left: "86%", top: "52%", size: 2, delay: 2.8 },
  { left: "36%", top: "76%", size: 2.5, delay: 3.4 },
];

/**
 * Subtle ambient florals for Scene 05 — transform/opacity only, capped DOM count.
 */
export function FestivityAmbient({
  enabled = true,
  className = "",
}: FestivityAmbientProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!enabled || reducedMotion || !rootRef.current) return;
      registerGsap();

      /* Keep dedicated tweens so visibility pause never stops scene scrub. */
      const loops: gsap.core.Tween[] = [];

      PETALS.forEach((_, index) => {
        const el = rootRef.current?.querySelector(
          `.festivity-petal-${index}`,
        ) as HTMLElement | null;
        const config = PETALS[index];
        if (!el || !config) return;
        loops.push(
          gsap.fromTo(
            el,
            { y: "-6vh", x: 0, rotate: -8, opacity: 0 },
            {
              y: "108vh",
              x: config.drift,
              rotate: index % 2 === 0 ? 55 : -42,
              opacity: 0.7,
              duration: config.duration,
              delay: config.delay,
              repeat: -1,
              ease: "none",
              onUpdate() {
                const p = this.progress();
                const fade =
                  p < 0.12 ? p / 0.12 : p > 0.82 ? (1 - p) / 0.18 : 1;
                el.style.opacity = String(0.7 * fade);
              },
            },
          ),
        );
      });

      FLOWERS.forEach((_, index) => {
        const el = rootRef.current?.querySelector(
          `.festivity-flower-${index}`,
        ) as HTMLElement | null;
        const config = FLOWERS[index];
        if (!el || !config) return;
        loops.push(
          gsap.to(el, {
            y: index % 2 === 0 ? 10 : -12,
            x: index % 2 === 0 ? 8 : -6,
            rotate: index % 2 === 0 ? 8 : -10,
            duration: config.duration,
            delay: config.delay,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          }),
        );
      });

      LEAVES.forEach((_, index) => {
        const el = rootRef.current?.querySelector(
          `.festivity-leaf-${index}`,
        ) as HTMLElement | null;
        const config = LEAVES[index];
        if (!el || !config) return;
        loops.push(
          gsap.to(el, {
            x: index % 2 === 0 ? 28 : -22,
            y: index % 2 === 0 ? 18 : 26,
            rotate: index % 2 === 0 ? 12 : -14,
            duration: config.duration,
            delay: config.delay,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          }),
        );
      });

      PARTICLES.forEach((_, index) => {
        const el = rootRef.current?.querySelector(
          `.festivity-particle-${index}`,
        ) as HTMLElement | null;
        const config = PARTICLES[index];
        if (!el || !config) return;
        loops.push(
          gsap.to(el, {
            autoAlpha: 0.85,
            y: index % 2 === 0 ? -8 : -5,
            duration: 3.6 + index * 0.25,
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
          key={`petal-${index}`}
          className={`festivity-petal festivity-petal-${index} absolute top-0 will-change-transform`}
          style={{ left: petal.left, width: petal.size, height: petal.size * 1.25 }}
        >
          <ShiuliPetal className="h-full w-full" />
        </span>
      ))}

      {FLOWERS.map((flower, index) => (
        <span
          key={`flower-${index}`}
          className={`festivity-flower festivity-flower-${index} absolute opacity-35 will-change-transform`}
          style={{
            left: flower.left,
            top: flower.top,
            width: flower.size,
            height: flower.size,
          }}
        >
          <FloatingFlower className="h-full w-full" />
        </span>
      ))}

      {LEAVES.map((leaf, index) => (
        <span
          key={`leaf-${index}`}
          className={`festivity-leaf festivity-leaf-${index} absolute opacity-40 will-change-transform`}
          style={{
            left: leaf.left,
            top: leaf.top,
            width: leaf.size,
            height: leaf.size * 0.6,
          }}
        >
          <GoldenLeaf className="h-full w-full" />
        </span>
      ))}

      {PARTICLES.map((particle, index) => (
        <span
          key={`particle-${index}`}
          className={`festivity-particle festivity-particle-${index} absolute rounded-full bg-antique-gold/70 opacity-25 will-change-transform`}
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
        />
      ))}
    </div>
  );
}
