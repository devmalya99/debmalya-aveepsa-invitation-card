"use client";

import { motion, useReducedMotion } from "motion/react";

const petals = [
  { left: "8%", delay: 0, duration: 18, size: 10 },
  { left: "22%", delay: 3, duration: 22, size: 8 },
  { left: "40%", delay: 1.5, duration: 20, size: 12 },
  { left: "63%", delay: 4, duration: 24, size: 9 },
  { left: "78%", delay: 2.2, duration: 19, size: 11 },
  { left: "90%", delay: 5, duration: 21, size: 7 },
];

export function FloatingPetals() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return null;
  }

  return (
    <div aria-hidden className="decoration-layer absolute inset-0 overflow-hidden">
      {petals.map((petal, index) => (
        <motion.span
          key={index}
          className="absolute top-[-10%] rounded-full bg-dusty-rose/40"
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size * 1.35,
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, index % 2 === 0 ? 24 : -18, 8],
            rotate: [0, 40, -20, 10],
            opacity: [0, 0.7, 0.5, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
