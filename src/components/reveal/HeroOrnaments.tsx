"use client";

import { motion } from "motion/react";

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
        className="reveal-draw-path"
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
        className="reveal-draw-path"
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
        className="reveal-draw-path"
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
            className="reveal-draw-path"
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
        className="reveal-draw-path"
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
      <circle cx="160" cy="160" r="4" className="reveal-mandala-center" fill="currentColor" opacity="0" />
    </svg>
  );
}

/** Double circular portrait frame with lotus accents — stroke-drawable. */
export function PortraitArchFrame({ className = "" }: ClassProps) {
  return (
    <svg
      viewBox="0 0 280 280"
      className={`reveal-arch-frame pointer-events-none absolute inset-0 h-full w-full overflow-visible text-antique-gold ${className}`}
      aria-hidden
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Outer ring */}
      <circle
        className="reveal-draw-path reveal-arch-outer"
        cx="140"
        cy="140"
        r="128"
        stroke="currentColor"
        strokeWidth="1.6"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
      />
      {/* Inner ring */}
      <circle
        className="reveal-draw-path reveal-arch-inner"
        cx="140"
        cy="140"
        r="116"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.75"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
      />
      {/* Lotus crest at top */}
      <path
        className="reveal-draw-path"
        d="M140 8 C146 18 154 24 140 36 C126 24 134 18 140 8 Z
           M124 20 C130 24 134 30 140 36 C134 30 128 26 124 20 Z
           M156 20 C150 24 146 30 140 36 C146 30 152 26 156 20 Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
      />
    </svg>
  );
}

export function GoldParticles({ className = "" }: ClassProps) {
  const dots = [
    { left: "12%", top: "22%", size: 2, delay: 0 },
    { left: "78%", top: "18%", size: 2.5, delay: 0.4 },
    { left: "88%", top: "48%", size: 1.5, delay: 0.8 },
    { left: "8%", top: "56%", size: 2, delay: 1.1 },
    { left: "70%", top: "72%", size: 1.8, delay: 0.2 },
    { left: "22%", top: "78%", size: 2.2, delay: 0.6 },
    { left: "48%", top: "12%", size: 1.6, delay: 1.3 },
    { left: "92%", top: "34%", size: 1.4, delay: 0.9 },
  ];

  return (
    <div className={`reveal-particles pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      {dots.map((dot, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-antique-gold/70"
          style={{
            left: dot.left,
            top: dot.top,
            width: dot.size,
            height: dot.size,
          }}
          animate={{ opacity: [0.15, 0.7, 0.2], y: [0, -6, 0] }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            delay: dot.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function FloatingPetals({ className = "" }: ClassProps) {
  const petals = [
    { left: "14%", delay: 0, duration: 11, x: 18 },
    { left: "42%", delay: 2.2, duration: 13, x: -12 },
    { left: "68%", delay: 1.1, duration: 12, x: 10 },
    { left: "84%", delay: 3.4, duration: 14, x: -16 },
  ];

  return (
    <div className={`reveal-petals pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {petals.map((petal, index) => (
        <motion.span
          key={index}
          className="absolute top-[-8%] h-2.5 w-2 rounded-full bg-[radial-gradient(circle_at_30%_30%,#fff8ea_0%,#f0e2c4_45%,#c4a35a_100%)] opacity-70 shadow-[0_0_6px_rgba(185,154,88,0.35)]"
          style={{ left: petal.left }}
          animate={{
            y: ["0vh", "95vh"],
            x: [0, petal.x, 0],
            rotate: [0, 40, -20, 60],
            opacity: [0, 0.75, 0.75, 0],
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

export function CornerLotus({ className = "" }: ClassProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={`text-antique-gold/55 ${className}`}
      aria-hidden
      fill="none"
    >
      <path
        d="M8 56 C16 44 24 36 32 32 C24 28 16 20 8 8 C20 16 28 24 32 32 C36 24 44 16 56 8 C48 20 40 28 32 32 C40 36 48 44 56 56 C44 48 36 40 32 32 C28 40 20 48 8 56 Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="32" r="2.5" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

export function DateMedallion({
  dateBn,
  dateEn,
  className = "",
}: {
  dateBn: string;
  dateEn: string;
  className?: string;
}) {
  return (
    <div
      className={`reveal-medallion relative mx-auto flex max-w-[16rem] flex-col items-center px-5 py-3 ${className}`}
    >
      <svg
        viewBox="0 0 220 72"
        className="pointer-events-none absolute inset-0 h-full w-full text-antique-gold"
        aria-hidden
        fill="none"
        preserveAspectRatio="none"
      >
        <rect
          className="reveal-draw-path"
          x="4"
          y="4"
          width="212"
          height="64"
          rx="32"
          stroke="currentColor"
          strokeWidth="1.1"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset="1"
        />
        <rect
          x="10"
          y="10"
          width="200"
          height="52"
          rx="26"
          stroke="currentColor"
          strokeWidth="0.6"
          opacity="0.45"
        />
      </svg>
      <p className="relative z-10 font-bn-display text-[1rem] leading-snug text-sindoor-red">
        {dateBn}
      </p>
      <p className="relative z-10 mt-0.5 font-display text-[0.8rem] tracking-[0.06em] text-deep-burgundy">
        {dateEn}
      </p>
    </div>
  );
}
