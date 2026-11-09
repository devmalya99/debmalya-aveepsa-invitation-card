"use client";

import type { ReactNode } from "react";

type EnvelopeProps = {
  children: ReactNode;
  className?: string;
};

const BODY =
  "linear-gradient(165deg, #8f3140 0%, #6B1D2A 48%, #4a1420 100%)";
const POCKET =
  "linear-gradient(180deg, #7a2834 0%, #6B1D2A 42%, #45121c 100%)";
const LINING =
  "linear-gradient(180deg, #9a3a48 0%, #5c1824 100%)";

/**
 * Landscape premium sindoor-wine envelope.
 * Closed look = body + top flap + pocket. Opening lifts the invitation paper only.
 */
export function Envelope({ children, className = "" }: EnvelopeProps) {
  return (
    <div
      data-envelope
      className={`env-scene relative mx-auto w-[min(86vw,380px)] will-change-transform ${className}`}
      style={{ perspective: "1200px" }}
    >
      <div
        className="env-root relative w-full"
        style={{
          aspectRatio: "1.35 / 1",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="env-back absolute inset-0 z-[1] overflow-hidden rounded-[0.85rem]"
          style={{
            background: BODY,
            boxShadow:
              "0 20px 40px rgba(75,21,31,0.26), inset 0 1px 0 rgba(232,205,150,0.22)",
          }}
        >
          <div className="pointer-events-none absolute inset-[7px] rounded-[0.65rem] border border-[#E8CD96]/28" />
        </div>

        <div
          className="env-lining pointer-events-none absolute inset-[8px] z-[2] rounded-[0.6rem]"
          style={{ background: LINING }}
        />

        <div
          className="env-letter-layer absolute inset-0 z-[10]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {children}
        </div>

        <div
          className="env-pocket pointer-events-none absolute inset-x-0 bottom-0 z-[18] h-[56%] rounded-b-[0.85rem]"
          style={{
            background: POCKET,
            clipPath: "polygon(0 22%, 50% 0, 100% 22%, 100% 100%, 0 100%)",
            boxShadow: "inset 0 8px 16px rgba(0,0,0,0.14)",
            transform: "translateZ(8px)",
          }}
        >
          <div className="absolute inset-x-[14%] top-[36%] h-px bg-gradient-to-r from-transparent via-[#E8CD96]/4 to-transparent" />
          <div className="pointer-events-none absolute inset-x-[9px] top-[28%] bottom-[8px] rounded-b-[0.55rem] border border-[#E8CD96]/2 border-t-0" />
        </div>
      </div>
    </div>
  );
}
