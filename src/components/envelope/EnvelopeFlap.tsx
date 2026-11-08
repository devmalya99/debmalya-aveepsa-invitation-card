"use client";

import type { ReactNode } from "react";

type EnvelopeFlapProps = {
  children?: ReactNode;
};

/**
 * Symmetrical top flap for landscape envelope.
 * Seal mounts on an unclipped tip wrapper so GSAP scale never breaks centering.
 */
export function EnvelopeFlap({ children }: EnvelopeFlapProps) {
  return (
    <div
      className="env-flap-top absolute inset-x-0 top-0 z-[26] h-[54%] origin-top will-change-transform"
      style={{
        transformStyle: "preserve-3d",
        transform: "translateZ(14px)",
      }}
    >
      <div
        className="relative h-full w-full"
        style={{
          background:
            "linear-gradient(165deg, #9a3a48 0%, #7a2432 40%, #5c1824 100%)",
          clipPath: "polygon(0 0, 100% 0, 100% 6%, 50% 100%, 0 6%)",
          boxShadow: "inset 0 -10px 20px rgba(0,0,0,0.18)",
          backfaceVisibility: "hidden",
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(232,205,150,0.22),transparent_48%)]" />
        <div className="absolute inset-x-[18%] top-[12%] h-px bg-[#E8CD96]/45" />
        <div className="absolute inset-x-[28%] top-[22%] h-px bg-[#E8CD96]/25" />
      </div>

      {/* Tip mount — outside clip-path so the seal sits dead-center on the point */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 z-[32] -translate-x-1/2 translate-y-[48%]">
        <div className="pointer-events-auto">{children}</div>
      </div>
    </div>
  );
}
