"use client";

import { motion, useReducedMotion } from "motion/react";

const PARTICLES = [
  { left: "14%", top: "24%", size: 2, delay: 0 },
  { left: "72%", top: "20%", size: 2, delay: 0.8 },
  { left: "22%", top: "68%", size: 2.5, delay: 1.4 },
  { left: "80%", top: "62%", size: 2, delay: 0.4 },
  { left: "48%", top: "78%", size: 2, delay: 1.1 },
];

type GoldenParticlesProps = {
  burst?: boolean;
};

/** Sparse champagne particles — edges only, low density. */
export function GoldenParticles({ burst = false }: GoldenParticlesProps) {
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {PARTICLES.map((particle, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-[#C5A365]"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
          animate={
            reduced
              ? { opacity: 0.2 }
              : { opacity: [0.1, 0.45, 0.12], y: [0, -8, 0] }
          }
          transition={{
            duration: 4.5,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {burst
        ? Array.from({ length: 8 }).map((_, index) => {
            const angle = (index / 8) * Math.PI * 2;
            return (
              <motion.span
                key={`burst-${index}`}
                className="absolute top-[52%] left-1/2 h-1.5 w-1.5 rounded-full bg-[#C5A365]"
                initial={{ opacity: 0.85, x: 0, y: 0, scale: 1 }}
                animate={{
                  opacity: 0,
                  x: Math.cos(angle) * 48,
                  y: Math.sin(angle) * 34,
                  scale: 0.35,
                }}
                transition={{ duration: 0.65, ease: "easeOut" }}
              />
            );
          })
        : null}
    </div>
  );
}
