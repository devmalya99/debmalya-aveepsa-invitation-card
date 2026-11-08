"use client";

import { motion } from "motion/react";

type WaxSealProps = {
  onPress: () => void;
  label: string;
  disabled?: boolean;
  idle?: boolean;
};

/** Champagne-gold seal — transform-safe (no left/translate centering on this node). */
export function WaxSeal({
  onPress,
  label,
  disabled,
  idle = true,
}: WaxSealProps) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onPress}
      onKeyDown={(event) => {
        if (disabled) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onPress();
        }
      }}
      className="env-seal relative flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-full disabled:cursor-default will-change-transform"
      animate={
        idle && !disabled ? { scale: [1, 1.028, 1] } : { scale: 1 }
      }
      transition={
        idle && !disabled
          ? { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0.2 }
      }
      whileTap={disabled ? undefined : { scale: 0.93 }}
    >
      <span className="env-seal-glow absolute inset-[-6px] rounded-full bg-[#E8CD96]/35 blur-[8px]" />
      <span className="env-seal-ripple pointer-events-none absolute inset-0 rounded-full border border-[#E8CD96]/75 opacity-0" />
      <span className="absolute inset-[1px] rounded-full border-[2px] border-[#E8CD96] shadow-[0_0_16px_rgba(232,205,150,0.45),inset_0_1px_0_rgba(255,248,234,0.4)]" />
      <span className="absolute inset-[5px] rounded-full border border-[#F6EBD6]/75" />
      <span
        className="absolute inset-[7px] flex items-center justify-center overflow-hidden rounded-full border border-[#E8CD96]/6 shadow-[inset_0_2px_5px_rgba(0,0,0,0.3)]"
        style={{
          background:
            "radial-gradient(circle at 35% 28%, #8f3140 0%, #6B1D2A 55%, #3f1018 100%)",
        }}
      >
        <svg
          viewBox="0 0 48 48"
          className="h-[1.55rem] w-[1.55rem] opacity-95"
          aria-hidden
        >
          <circle
            cx="24"
            cy="24"
            r="10"
            fill="none"
            stroke="#E8CD96"
            strokeWidth="1.2"
            opacity="0.9"
          />
          <circle
            cx="24"
            cy="24"
            r="5.5"
            fill="none"
            stroke="#F6EBD6"
            strokeWidth="0.9"
            opacity="0.8"
          />
          <path
            d="M24 14.5 L25.2 18.2 L29.2 18.4 L26 21 L26.9 24.9 L24 22.9 L21.1 24.9 L22 21 L18.8 18.4 L22.8 18.2 Z"
            fill="#E8CD96"
            opacity="0.95"
          />
        </svg>
        <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_22%,rgba(255,248,234,0.28),transparent_42%)]" />
      </span>
    </motion.button>
  );
}
