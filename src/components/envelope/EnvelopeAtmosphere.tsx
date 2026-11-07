"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { assets } from "@/data/assets";

function CornerFlower({
  src,
  className,
  size,
  delay,
}: {
  src: string;
  className: string;
  size: number;
  delay: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={{ width: size, height: size }}
      animate={reduced ? undefined : { y: [0, -6, 0], rotate: [-2, 3, -2] }}
      transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <Image
        src={src}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        className="rounded-full object-cover opacity-50"
        style={{ width: size, height: size }}
      />
    </motion.div>
  );
}

export function EnvelopeAtmosphere() {
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-antique-ivory" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_18%,rgba(255,248,236,0.95)_0%,rgba(246,235,215,0.55)_42%,rgba(232,217,189,0.35)_70%,transparent_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(0deg,rgba(64,21,29,0.1),transparent)]" />

      <motion.div
        className="absolute top-[6%] left-1/2 h-[18rem] w-[18rem] -translate-x-1/2 opacity-[0.12] sm:h-[20rem] sm:w-[20rem]"
        animate={reduced ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src={assets.decorations.alpana}
          alt=""
          width={320}
          height={320}
          sizes="320px"
          loading="lazy"
          fetchPriority="low"
          className="object-contain"
          style={{ width: "100%", height: "auto" }}
        />
      </motion.div>

      <CornerFlower
        src={assets.decorations.shiuli}
        size={84}
        delay={0}
        className="absolute top-[58%] -left-3 sm:top-[56%] sm:left-2"
      />
      <CornerFlower
        src={assets.decorations.shiuli}
        size={72}
        delay={1.2}
        className="absolute top-[62%] -right-2 sm:top-[60%] sm:right-3"
      />
      <CornerFlower
        src={assets.decorations.shankha}
        size={64}
        delay={0.6}
        className="absolute bottom-[7%] left-2 opacity-80 sm:left-5"
      />
      <CornerFlower
        src={assets.decorations.topor}
        size={68}
        delay={1.8}
        className="absolute right-2 bottom-[8%] opacity-70 sm:right-5"
      />
    </div>
  );
}
