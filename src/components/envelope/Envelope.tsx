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
const SIDE_L =
  "linear-gradient(115deg, #8f3140 0%, #6B1D2A 100%)";
const SIDE_R =
  "linear-gradient(245deg, #8f3140 0%, #6B1D2A 100%)";
const BOTTOM =
  "linear-gradient(180deg, #8f3140 0%, #6B1D2A 55%, #45121c 100%)";

/**
 * Landscape premium sindoor-wine envelope.
 * Closed look = body + symmetrical top flap + pocket. Side flaps stay hidden until GSAP opens them.
 */
export function Envelope({ children, className = "" }: EnvelopeProps) {
  return (
    <div
      data-envelope
      className={`env-scene relative mx-auto w-[min(86vw,380px)] will-change-transform ${className}`}
      style={{ perspective: "1200px" }}
    >
      <div
        className="env-rim-glow pointer-events-none absolute -inset-[10px] rounded-[1.1rem] opacity-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,236,170,0.55), rgba(232,205,150,0.18), rgba(255,220,120,0.5))",
          filter: "blur(10px)",
        }}
        aria-hidden
      />
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
          className="pointer-events-none absolute inset-[8px] z-[2] rounded-[0.6rem]"
          style={{ background: LINING }}
        />

        <div
          className="env-inner-glow pointer-events-none absolute inset-[6%] z-[19] overflow-hidden rounded-[0.55rem] opacity-0 mix-blend-screen"
          style={{ transform: "translateZ(9px)" }}
          aria-hidden
        >
          <div
            className="env-glow-core absolute top-1/2 left-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2"
            style={{
              background:
                "radial-gradient(circle, rgba(255,236,170,0.95) 0%, rgba(232,205,150,0.55) 28%, rgba(232,205,150,0.12) 58%, transparent 72%)",
            }}
          />
          <div
            className="env-glow-rays absolute inset-[-20%]"
            style={{
              background: `
                conic-gradient(
                  from 0deg,
                  transparent 0deg,
                  rgba(255,220,120,0.55) 12deg,
                  transparent 24deg,
                  transparent 45deg,
                  rgba(255,236,170,0.7) 58deg,
                  transparent 72deg,
                  transparent 90deg,
                  rgba(232,205,150,0.5) 102deg,
                  transparent 118deg,
                  transparent 135deg,
                  rgba(255,220,120,0.6) 148deg,
                  transparent 164deg,
                  transparent 180deg,
                  rgba(255,236,170,0.65) 192deg,
                  transparent 208deg,
                  transparent 225deg,
                  rgba(232,205,150,0.55) 238deg,
                  transparent 254deg,
                  transparent 270deg,
                  rgba(255,220,120,0.6) 282deg,
                  transparent 298deg,
                  transparent 315deg,
                  rgba(255,236,170,0.55) 328deg,
                  transparent 344deg,
                  transparent 360deg
                )
              `,
              mixBlendMode: "screen",
            }}
          />
          <div className="env-glow-edge absolute inset-0 rounded-[0.45rem] shadow-[inset_0_0_28px_rgba(255,220,120,0.55),inset_0_0_56px_rgba(232,205,150,0.35)]" />
        </div>

        <div
          className="absolute inset-0 z-[10]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {children}
        </div>

        <div
          className="env-flap-left absolute top-[30%] left-0 z-[12] h-[52%] w-[46%] origin-left opacity-0 will-change-transform"
          style={{ transformStyle: "preserve-3d", transform: "translateZ(4px)" }}
        >
          <div
            className="h-full w-full"
            style={{
              background: SIDE_L,
              clipPath: "polygon(0 0, 100% 50%, 0 100%)",
              boxShadow: "inset -6px 0 14px rgba(0,0,0,0.18)",
              backfaceVisibility: "hidden",
            }}
          />
        </div>
        <div
          className="env-flap-right absolute top-[30%] right-0 z-[12] h-[52%] w-[46%] origin-right opacity-0 will-change-transform"
          style={{ transformStyle: "preserve-3d", transform: "translateZ(4px)" }}
        >
          <div
            className="h-full w-full"
            style={{
              background: SIDE_R,
              clipPath: "polygon(100% 0, 0 50%, 100% 100%)",
              boxShadow: "inset 6px 0 14px rgba(0,0,0,0.18)",
              backfaceVisibility: "hidden",
            }}
          />
        </div>

        <div
          className="env-flap-bottom absolute inset-x-0 bottom-0 z-[13] h-[44%] origin-bottom opacity-0 will-change-transform"
          style={{ transformStyle: "preserve-3d", transform: "translateZ(5px)" }}
        >
          <div
            className="h-full w-full rounded-b-[0.8rem]"
            style={{
              background: BOTTOM,
              clipPath: "polygon(0 100%, 0 32%, 50% 0, 100% 32%, 100% 100%)",
              boxShadow: "inset 0 10px 18px rgba(0,0,0,0.16)",
              backfaceVisibility: "hidden",
            }}
          />
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
