"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { assets } from "@/data/assets";

type WaxSealProps = {
  pressed: boolean;
  onPress: () => void;
  label: string;
  disabled?: boolean;
};

export function WaxSeal({ pressed, onPress, label, disabled }: WaxSealProps) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onPress}
      className="absolute top-[78%] left-1/2 z-[30] flex h-[4.75rem] w-[4.75rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full disabled:cursor-default"
      animate={
        pressed
          ? { scale: [1, 0.84, 1.08, 1] }
          : { scale: [1, 1.035, 1] }
      }
      transition={
        pressed
          ? { duration: 0.42, ease: "easeOut" }
          : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
      }
      whileTap={disabled ? undefined : { scale: 0.9 }}
    >
      <span className="absolute inset-0 rounded-full bg-antique-gold/30 blur-[6px]" />
      <span className="absolute inset-[1px] rounded-full border-[2.5px] border-antique-gold shadow-[0_0_22px_rgba(185,154,88,0.55)]" />
      <span className="absolute inset-[7px] flex items-center justify-center overflow-hidden rounded-full border border-[#efd7a0] bg-sindoor-red">
        <Image
          src={assets.decorations.alpana}
          alt=""
          width={62}
          height={62}
          sizes="62px"
          priority
          className="object-cover"
          style={{ width: 62, height: 62 }}
        />
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_22%,rgba(255,255,255,0.22),transparent_42%)]" />
      </span>
    </motion.button>
  );
}
