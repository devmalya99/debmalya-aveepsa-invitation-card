"use client";

import { motion, useReducedMotion } from "motion/react";

/** Small top-corner curtains only — never a full-screen wash. */
export function StoryDrapes() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-[12] h-40 overflow-hidden"
    >
      <motion.div
        className="absolute left-0 top-0 h-36 w-16 origin-top-left rounded-br-[40%] bg-gradient-to-br from-[#5c2430]/70 via-[#8a3d4d]/35 to-transparent sm:w-20"
        animate={
          reduceMotion
            ? undefined
            : { rotate: [-2, 1.5, -2], x: [0, 3, 0] }
        }
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-0 top-0 h-36 w-16 origin-top-right rounded-bl-[40%] bg-gradient-to-bl from-[#5c2430]/70 via-[#8a3d4d]/35 to-transparent sm:w-20"
        animate={
          reduceMotion
            ? undefined
            : { rotate: [2, -1.5, 2], x: [0, -3, 0] }
        }
        transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#25171A]/25 to-transparent" />
    </div>
  );
}
