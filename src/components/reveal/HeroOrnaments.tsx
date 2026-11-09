"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { useInViewActive } from "@/hooks/useInViewActive";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";
import { getAmbientDensity } from "@/lib/performance";

type ClassProps = { className?: string };

/** Large alpana mandala — stroke paths use pathLength for GSAP draw. */
export function AlpanaMandala({ className = "" }: ClassProps) {
  return (
    <svg
      viewBox="0 0 320 320"
      className={`reveal-mandala text-antique-gold ${className}`}
      aria-hidden
      fill="none"
    >
      <circle
        className="reveal-draw-path reveal-mandala-path"
        cx="160"
        cy="160"
        r="148"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.45"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
      />
      <circle
        className="reveal-draw-path reveal-mandala-path"
        cx="160"
        cy="160"
        r="118"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.55"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
      />
      <circle
        className="reveal-draw-path reveal-mandala-path"
        cx="160"
        cy="160"
        r="72"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.5"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
      />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x = 160 + Math.cos(rad) * 96;
        const y = 160 + Math.sin(rad) * 96;
        return (
          <path
            key={angle}
            className="reveal-draw-path reveal-mandala-path"
            d={`M160 160 Q${160 + Math.cos(rad) * 48} ${160 + Math.sin(rad) * 48} ${x} ${y}`}
            stroke="currentColor"
            strokeWidth="0.7"
            opacity="0.4"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset="1"
          />
        );
      })}
      <path
        className="reveal-draw-path reveal-mandala-path"
        d="M160 98 C168 112 176 122 160 148 C144 122 152 112 160 98 Z
           M160 222 C152 208 144 198 160 172 C176 198 168 208 160 222 Z
           M98 160 C112 152 122 144 148 160 C122 176 112 168 98 160 Z
           M222 160 C208 168 198 176 172 160 C198 144 208 152 222 160 Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
        opacity="0.65"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
      />
      <circle
        cx="160"
        cy="160"
        r="4"
        className="reveal-mandala-center"
        fill="currentColor"
        opacity="0"
      />
    </svg>
  );
}

/** Circular champagne-gold portrait frame — stroke-drawable rings. */
export function PortraitArchFrame({ className = "" }: ClassProps) {
  return (
    <svg
      viewBox="0 0 280 280"
      className={`reveal-arch-frame pointer-events-none absolute inset-0 h-full w-full overflow-visible text-antique-gold ${className}`}
      aria-hidden
      fill="none"
    >
      {/* Outer ring */}
      <circle
        className="reveal-draw-path reveal-arch-outer"
        cx="140"
        cy="140"
        r="132"
        stroke="currentColor"
        strokeWidth="1.85"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
      />
      {/* Inner ring */}
      <circle
        className="reveal-draw-path reveal-arch-inner"
        cx="140"
        cy="140"
        r="122"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.78"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
      />
      {/* Soft accent ring */}
      <circle
        className="reveal-draw-path reveal-arch-base"
        cx="140"
        cy="140"
        r="127"
        stroke="currentColor"
        strokeWidth="0.55"
        opacity="0.4"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
      />
      {/* Lotus crest at top */}
      <path
        className="reveal-draw-path reveal-frame-lotus"
        d="M140 4
           C145 10 150 15 140 26
           C130 15 135 10 140 4 Z
           M128 12 C133 16 136 20 140 26 C136 20 131 16 128 12 Z
           M152 12 C147 16 144 20 140 26 C144 20 149 16 152 12 Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
        strokeLinecap="round"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
      />
      {/* Gold sweep around the circle */}
      <circle
        className="reveal-frame-sweep"
        cx="140"
        cy="140"
        r="132"
        stroke="url(#reveal-frame-sweep-grad)"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
      />
      <defs>
        <linearGradient
          id="reveal-frame-sweep-grad"
          x1="8"
          y1="40"
          x2="272"
          y2="200"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="rgba(232,205,150,0)" />
          <stop offset="45%" stopColor="rgba(255,248,234,0.95)" />
          <stop offset="100%" stopColor="rgba(232,205,150,0)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const GOLD_DOTS = [
  { left: "10%", top: "20%", size: 2, delay: 0 },
  { left: "82%", top: "16%", size: 2.2, delay: 0.5 },
  { left: "90%", top: "46%", size: 1.5, delay: 0.9 },
  { left: "7%", top: "58%", size: 1.8, delay: 1.2 },
  { left: "74%", top: "74%", size: 1.6, delay: 0.3 },
  { left: "20%", top: "80%", size: 2, delay: 0.7 },
] as const;

export function GoldParticles({ className = "" }: ClassProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const inView = useInViewActive(rootRef, !reducedMotion);
  const dots = GOLD_DOTS.slice(0, getAmbientDensity().gold);
  const live = inView && !reducedMotion;

  return (
    <div
      ref={rootRef}
      className={`reveal-particles pointer-events-none absolute inset-0 ${className}`}
      aria-hidden
    >
      {dots.map((dot, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-antique-gold/65"
          style={{
            left: dot.left,
            top: dot.top,
            width: dot.size,
            height: dot.size,
            willChange: live ? "transform, opacity" : "auto",
          }}
          animate={
            live
              ? { opacity: [0.12, 0.55, 0.18], y: [0, -5, 0] }
              : { opacity: 0.28, y: 0 }
          }
          transition={
            live
              ? {
                  duration: 5.2,
                  repeat: Infinity,
                  delay: dot.delay,
                  ease: "easeInOut",
                }
              : { duration: 0.2 }
          }
        />
      ))}
    </div>
  );
}

type PetalTone = "red" | "orange" | "white";
type LeafTone = "green" | "yellow";

const PETAL_TONES: Record<
  PetalTone,
  { fill: string; center: string }
> = {
  red: { fill: "#C43B2E", center: "#8B1E18" },
  orange: { fill: "#E07A2F", center: "#C45A18" },
  white: { fill: "#FFF8F0", center: "#E8D4C4" },
};

const LEAF_TONES: Record<
  LeafTone,
  { fill: string; stroke: string; vein: string }
> = {
  green: { fill: "#5F8F3C", stroke: "#3F6B28", vein: "#2F5220" },
  yellow: { fill: "#D4B84A", stroke: "#B89A2E", vein: "#8F7520" },
};

function ShiuliPetalMark({
  size,
  tone = "white",
}: {
  size: number;
  tone?: PetalTone;
}) {
  const colors = PETAL_TONES[tone];
  return (
    <svg
      width={size}
      height={size * 1.3}
      viewBox="0 0 16 20"
      aria-hidden
      fill="none"
    >
      <path
        d="M8 1.5 C11.5 4 13.5 8 13 12.5 C12.5 16 10 18.5 8 19 C6 18.5 3.5 16 3 12.5 C2.5 8 4.5 4 8 1.5 Z"
        fill={colors.fill}
        opacity="0.95"
      />
      <ellipse
        cx="8"
        cy="11"
        rx="2.2"
        ry="2.8"
        fill={colors.center}
        opacity="0.55"
      />
    </svg>
  );
}

function LeafMark({
  size,
  tone = "green",
}: {
  size: number;
  tone?: LeafTone;
}) {
  const colors = LEAF_TONES[tone];
  return (
    <svg
      width={size}
      height={size * 0.58}
      viewBox="0 0 24 14"
      aria-hidden
      fill="none"
    >
      <path
        d="M2 7 C8 2 14 2 22 7 C14 12 8 12 2 7 Z"
        fill={colors.fill}
        fillOpacity="0.88"
        stroke={colors.stroke}
        strokeWidth="1"
      />
      <path
        d="M4 7 H18"
        stroke={colors.vein}
        strokeWidth="0.75"
        opacity="0.8"
      />
    </svg>
  );
}

type FallItem = {
  left: string;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  rotate: number;
};

type PetalItem = FallItem & { tone: PetalTone };
type LeafItem = FallItem & { tone: LeafTone };

const REVEAL_PETALS: PetalItem[] = [
  { left: "6%", size: 18, delay: 0, duration: 15, drift: 18, rotate: 48, tone: "red" },
  { left: "18%", size: 15, delay: 1.8, duration: 17, drift: -14, rotate: -36, tone: "orange" },
  { left: "32%", size: 20, delay: 0.6, duration: 14, drift: 10, rotate: 55, tone: "white" },
  { left: "46%", size: 14, delay: 3.2, duration: 18, drift: -18, rotate: -42, tone: "red" },
  { left: "58%", size: 17, delay: 1.1, duration: 16, drift: 12, rotate: 30, tone: "orange" },
  { left: "70%", size: 15, delay: 4.0, duration: 15, drift: -10, rotate: -50, tone: "white" },
  { left: "82%", size: 19, delay: 2.4, duration: 17, drift: 16, rotate: 40, tone: "red" },
  { left: "90%", size: 14, delay: 5.1, duration: 19, drift: -8, rotate: -28, tone: "orange" },
  { left: "24%", size: 13, delay: 6.2, duration: 20, drift: 14, rotate: 60, tone: "white" },
  { left: "64%", size: 16, delay: 3.8, duration: 16, drift: -12, rotate: -35, tone: "red" },
];

const REVEAL_LEAVES: LeafItem[] = [
  { left: "10%", size: 28, delay: 0.8, duration: 18, drift: -16, rotate: -40, tone: "green" },
  { left: "28%", size: 26, delay: 2.6, duration: 20, drift: 12, rotate: 28, tone: "yellow" },
  { left: "52%", size: 32, delay: 1.4, duration: 17, drift: -10, rotate: -55, tone: "green" },
  { left: "74%", size: 24, delay: 4.2, duration: 19, drift: 14, rotate: 36, tone: "yellow" },
  { left: "88%", size: 27, delay: 3.0, duration: 21, drift: -12, rotate: -24, tone: "green" },
  { left: "40%", size: 22, delay: 5.5, duration: 22, drift: 8, rotate: 45, tone: "yellow" },
];

/**
 * Petal + leaf shower for Scene 01 — larger, colored, continuous fall.
 * Respects prefers-reduced-motion (static soft scatter).
 */
export function FloatingPetals({ className = "" }: ClassProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const inView = useInViewActive(rootRef, !reducedMotion);
  const density = getAmbientDensity();
  const petals = REVEAL_PETALS.slice(0, density.petals);
  const leaves = REVEAL_LEAVES.slice(0, density.leaves);
  const live = inView && !reducedMotion;

  if (reducedMotion) {
    return (
      <div
        className={`reveal-petals pointer-events-none absolute inset-0 overflow-hidden ${className}`}
        aria-hidden
      >
        {petals.slice(0, 4).map((petal, index) => (
          <span
            key={`p-static-${index}`}
            className="absolute opacity-70"
            style={{
              left: petal.left,
              top: `${18 + index * 16}%`,
            }}
          >
            <ShiuliPetalMark size={petal.size} tone={petal.tone} />
          </span>
        ))}
        {leaves.slice(0, 3).map((leaf, index) => (
          <span
            key={`l-static-${index}`}
            className="absolute opacity-65"
            style={{
              left: leaf.left,
              top: `${28 + index * 18}%`,
            }}
          >
            <LeafMark size={leaf.size} tone={leaf.tone} />
          </span>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className={`reveal-petals pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {petals.map((petal, index) => (
        <motion.span
          key={`petal-${index}`}
          className="absolute top-[-8%]"
          style={{
            left: petal.left,
            willChange: live ? "transform, opacity" : "auto",
          }}
          animate={
            live
              ? {
                  y: ["0vh", "108vh"],
                  x: [0, petal.drift * 0.55, petal.drift],
                  rotate: [0, petal.rotate * 0.5, petal.rotate],
                  opacity: [0, 0.92, 0.85, 0],
                }
              : { y: "40vh", opacity: 0 }
          }
          transition={
            live
              ? {
                  duration: petal.duration,
                  repeat: Infinity,
                  delay: petal.delay,
                  ease: "linear",
                  times: [0, 0.12, 0.82, 1],
                }
              : { duration: 0.25 }
          }
        >
          <ShiuliPetalMark size={petal.size} tone={petal.tone} />
        </motion.span>
      ))}

      {leaves.map((leaf, index) => (
        <motion.span
          key={`leaf-${index}`}
          className="absolute top-[-6%]"
          style={{
            left: leaf.left,
            willChange: live ? "transform, opacity" : "auto",
          }}
          animate={
            live
              ? {
                  y: ["0vh", "108vh"],
                  x: [0, leaf.drift * 0.4, leaf.drift],
                  rotate: [leaf.rotate * -0.2, leaf.rotate],
                  opacity: [0, 0.88, 0.8, 0],
                }
              : { y: "45vh", opacity: 0 }
          }
          transition={
            live
              ? {
                  duration: leaf.duration,
                  repeat: Infinity,
                  delay: leaf.delay,
                  ease: "linear",
                  times: [0, 0.1, 0.85, 1],
                }
              : { duration: 0.25 }
          }
        >
          <LeafMark size={leaf.size} tone={leaf.tone} />
        </motion.span>
      ))}
    </div>
  );
}

function FlappingBird({
  flap = 0.5,
  delay = 0,
  live = true,
}: {
  flap?: number;
  delay?: number;
  live?: boolean;
}) {
  /* Transform-only wing flap — path morphing is far more expensive on mobile. */
  return (
    <svg
      viewBox="0 0 120 60"
      className="h-full w-full fill-current text-[#141414]"
      aria-hidden
    >
      <ellipse cx="58" cy="32" rx="15" ry="6" />
      <path d="M72 30c8-1 15-3.5 20-1.5l2 1-3.5 1.8c-5.5 1-12 1-18.5 0z" />
      <path d="M44 32c-8 1-14 3.5-18.5 7 5.5-1 11-2 16.5-2.8z" />
      <motion.g
        style={{ transformOrigin: "52px 30px" }}
        animate={live ? { rotate: [-18, 22, -18] } : { rotate: 0 }}
        transition={
          live
            ? { duration: flap, delay, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.2 }
        }
      >
        <path d="M52 28 C40 10, 28 8, 18 14 C32 16, 42 22, 50 30 Z" />
      </motion.g>
      <motion.g
        style={{ transformOrigin: "62px 30px" }}
        animate={live ? { rotate: [18, -22, 18] } : { rotate: 0 }}
        transition={
          live
            ? { duration: flap, delay, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.2 }
        }
      >
        <path d="M62 28 C74 10, 88 8, 100 14 C86 16, 74 22, 64 30 Z" />
      </motion.g>
    </svg>
  );
}

type BirdSpec = {
  top: string;
  size: number;
  duration: number;
  delay: number;
  flap: number;
  yNudge: number;
};

const REVEAL_FLOCK: BirdSpec[] = [
  { top: "14%", size: 48, duration: 22, delay: 0.4, flap: 0.48, yNudge: 14 },
  { top: "20%", size: 38, duration: 26, delay: 1.8, flap: 0.42, yNudge: -10 },
  { top: "26%", size: 44, duration: 24, delay: 3.2, flap: 0.5, yNudge: 8 },
  { top: "12%", size: 34, duration: 28, delay: 5.0, flap: 0.4, yNudge: -16 },
  { top: "32%", size: 42, duration: 23, delay: 2.4, flap: 0.46, yNudge: 12 },
  { top: "18%", size: 32, duration: 30, delay: 6.5, flap: 0.38, yNudge: -6 },
];

/** Black bird flock drifting across the opening canvas. */
export function FlightOfBirds({ className = "" }: ClassProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const inView = useInViewActive(rootRef, !reducedMotion);
  const flock = REVEAL_FLOCK.slice(0, getAmbientDensity().birds);
  const live = inView && !reducedMotion;

  if (reducedMotion) {
    return (
      <div
        className={`reveal-birds pointer-events-none absolute inset-0 overflow-hidden ${className}`}
        aria-hidden
      >
        {flock.slice(0, 3).map((bird, index) => (
          <span
            key={`bird-static-${index}`}
            className="absolute opacity-75"
            style={{
              top: bird.top,
              left: `${18 + index * 22}%`,
              width: bird.size,
              height: bird.size * 0.5,
            }}
          >
            <FlappingBird flap={bird.flap} delay={index * 0.08} live={false} />
          </span>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className={`reveal-birds pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {flock.map((bird, index) => (
        <motion.div
          key={`bird-${index}`}
          className="absolute"
          style={{
            top: bird.top,
            width: bird.size,
            height: bird.size * 0.5,
            willChange: live ? "transform, opacity" : "auto",
          }}
          initial={{ x: "-16vw", opacity: 0 }}
          animate={
            live
              ? {
                  x: ["-16vw", "112vw"],
                  y: [0, bird.yNudge, 0],
                  opacity: [0, 0.92, 0.9, 0],
                }
              : { x: "40vw", opacity: 0 }
          }
          transition={
            live
              ? {
                  duration: bird.duration,
                  delay: bird.delay,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.1, 0.88, 1],
                }
              : { duration: 0.25 }
          }
        >
          <FlappingBird
            flap={bird.flap}
            delay={index * 0.06}
            live={live}
          />
        </motion.div>
      ))}
    </div>
  );
}

/** Faint alpana corner — L-shaped floral bracket, never an X. */
export function CornerLotus({ className = "" }: ClassProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={`text-antique-gold/45 ${className}`}
      aria-hidden
      fill="none"
    >
      <path
        d="M8 8 H36 M8 8 V36"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M8 8 C16 14 20 20 22 28"
        stroke="currentColor"
        strokeWidth="0.85"
        opacity="0.75"
      />
      <path
        d="M14 6 C18 10 22 12 28 14 M6 14 C10 18 12 22 14 28"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.55"
      />
      <circle cx="8" cy="8" r="1.6" fill="currentColor" opacity="0.65" />
      <path
        d="M30 10 C34 14 36 18 34 22 C30 18 28 14 30 10 Z"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinejoin="round"
        opacity="0.7"
      />
    </svg>
  );
}

/** Engraved stationery date plaque — double gold border, not a pill/button. */
export function DateMedallion({
  dateBn,
  dateEn,
  showBengali = true,
  className = "",
}: {
  dateBn: string;
  dateEn: string;
  /** When false (English locale), only the English date is shown. */
  showBengali?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`reveal-date-plaque relative mx-auto w-full max-w-[17.5rem] bg-[rgba(255,248,236,0.55)] px-5 py-3.5 ${className}`}
    >
      <svg
        viewBox="0 0 260 88"
        className="pointer-events-none absolute inset-0 h-full w-full text-antique-gold"
        aria-hidden
        fill="none"
        preserveAspectRatio="none"
      >
        <rect
          className="reveal-draw-path reveal-plaque-border"
          x="3"
          y="3"
          width="254"
          height="82"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.15"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset="1"
        />
        <rect
          className="reveal-draw-path reveal-plaque-border-inner"
          x="9"
          y="9"
          width="242"
          height="70"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="0.65"
          opacity="0.55"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset="1"
        />
      </svg>

      <svg
        viewBox="0 0 48 18"
        className="reveal-plaque-lotus absolute top-1 left-1/2 h-3.5 w-10 -translate-x-1/2 text-antique-gold"
        aria-hidden
        fill="none"
      >
        <path
          d="M24 16 C20 10 16 6 12 4 C16 7 20 10 24 14 C28 10 32 7 36 4 C32 6 28 10 24 16 Z"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <path
          d="M18 8 C21 10 22 12 24 14 C26 12 27 10 30 8"
          stroke="currentColor"
          strokeWidth="0.65"
          opacity="0.55"
        />
        <circle cx="24" cy="3.5" r="1.1" fill="currentColor" opacity="0.55" />
      </svg>

      {showBengali ? (
        <p className="reveal-date-bn relative z-10 mt-1.5 text-center font-bn-display text-[1.05rem] leading-snug text-sindoor-red">
          {dateBn}
        </p>
      ) : null}
      <p
        className={`reveal-date-en relative z-10 text-center font-display tracking-[0.08em] text-deep-burgundy/90 ${
          showBengali
            ? "mt-1 text-[0.78rem]"
            : "mt-1.5 text-[1.02rem] leading-snug text-sindoor-red"
        }`}
      >
        {dateEn}
      </p>
    </div>
  );
}
