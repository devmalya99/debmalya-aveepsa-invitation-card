"use client";

import { motion, useReducedMotion } from "motion/react";

const PARTICLES = [
  { left: "10%", top: "22%", size: 2, delay: 0 },
  { left: "28%", top: "74%", size: 2.5, delay: 0.6 },
  { left: "48%", top: "16%", size: 2, delay: 1.1 },
  { left: "70%", top: "68%", size: 2.5, delay: 0.3 },
  { left: "86%", top: "30%", size: 2, delay: 0.9 },
  { left: "18%", top: "48%", size: 2, delay: 1.4 },
  { left: "78%", top: "48%", size: 2, delay: 0.45 },
  { left: "56%", top: "84%", size: 2.5, delay: 1.7 },
];

type GoldenParticlesProps = {
  burst?: boolean;
};

export function GoldenParticles({ burst = false }: GoldenParticlesProps) {
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {PARTICLES.map((particle, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-antique-gold"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            boxShadow: "0 0 8px rgba(185,154,88,0.45)",
          }}
          animate={
            reduced
              ? { opacity: 0.25 }
              : {
                  opacity: [0.12, 0.65, 0.15],
                  y: [0, -10, 0],
                }
          }
          transition={{
            duration: 4.2,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {burst
        ? Array.from({ length: 10 }).map((_, index) => {
            const angle = (index / 10) * Math.PI * 2;
            return (
              <motion.span
                key={`burst-${index}`}
                className="absolute top-[48%] left-1/2 h-1.5 w-1.5 rounded-full bg-antique-gold"
                initial={{ opacity: 0.9, x: 0, y: 0, scale: 1 }}
                animate={{
                  opacity: 0,
                  x: Math.cos(angle) * 56,
                  y: Math.sin(angle) * 42,
                  scale: 0.4,
                }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
            );
          })
        : null}
    </div>
  );
}
