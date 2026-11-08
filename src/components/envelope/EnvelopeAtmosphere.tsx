"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { assets } from "@/data/assets";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, registerGsap } from "@/lib/gsap";

type Floater = {
  left: string;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  rotate: number;
  kind: "petal" | "leaf" | "flower";
};

const FLOATERS: Floater[] = [
  { left: "5%", size: 38, duration: 16, delay: 0, drift: 22, rotate: 48, kind: "petal" },
  { left: "17%", size: 44, duration: 19, delay: 1.2, drift: -18, rotate: -36, kind: "leaf" },
  { left: "30%", size: 40, duration: 17, delay: 2.4, drift: 14, rotate: 55, kind: "flower" },
  { left: "46%", size: 34, duration: 21, delay: 0.6, drift: -12, rotate: -42, kind: "petal" },
  { left: "60%", size: 46, duration: 18, delay: 3.1, drift: 20, rotate: 30, kind: "leaf" },
  { left: "72%", size: 42, duration: 20, delay: 1.8, drift: -16, rotate: -50, kind: "flower" },
  { left: "84%", size: 32, duration: 15, delay: 4.2, drift: 10, rotate: 38, kind: "petal" },
  { left: "11%", size: 30, duration: 22, delay: 5.5, drift: -8, rotate: -28, kind: "leaf" },
  { left: "54%", size: 36, duration: 16.5, delay: 6.8, drift: 18, rotate: 44, kind: "flower" },
  { left: "38%", size: 28, duration: 23, delay: 3.8, drift: -22, rotate: -60, kind: "petal" },
];

function ShiuliPetal() {
  return (
    <svg viewBox="0 0 48 64" className="h-full w-full" aria-hidden fill="none">
      <path
        d="M24 4C34 14 40 26 38 42C36 54 30 60 24 62C18 60 12 54 10 42C8 26 14 14 24 4Z"
        fill="#F6EBD6"
        stroke="#C5A365"
        strokeWidth="0.8"
        opacity="0.95"
      />
      <path
        d="M24 14C24 28 24 44 24 56"
        stroke="#C5A365"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.55"
      />
      <ellipse cx="24" cy="36" rx="5" ry="7" fill="#C5A365" opacity="0.35" />
    </svg>
  );
}

function GoldLeaf() {
  return (
    <svg viewBox="0 0 64 36" className="h-full w-full" aria-hidden fill="none">
      <path
        d="M4 18C16 4 36 2 60 18C36 34 16 32 4 18Z"
        fill="#C5A365"
        fillOpacity="0.32"
        stroke="#C5A365"
        strokeWidth="1.1"
      />
      <path d="M10 18H52" stroke="#79504A" strokeWidth="0.8" opacity="0.45" />
      <path
        d="M22 12C26 16 30 16 34 12"
        stroke="#C5A365"
        strokeWidth="0.7"
        opacity="0.5"
      />
      <path
        d="M22 24C26 20 30 20 34 24"
        stroke="#C5A365"
        strokeWidth="0.7"
        opacity="0.5"
      />
    </svg>
  );
}

function LotusBloom() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden fill="none">
      <path
        d="M32 10C36 18 36 24 32 32C28 24 28 18 32 10Z"
        fill="#F6EBD6"
        stroke="#C5A365"
        strokeWidth="1"
      />
      <path
        d="M32 54C28 46 28 40 32 32C36 40 36 46 32 54Z"
        fill="#F6EBD6"
        stroke="#C5A365"
        strokeWidth="1"
      />
      <path
        d="M10 32C18 28 24 28 32 32C24 36 18 36 10 32Z"
        fill="#E5D1AE"
        stroke="#C5A365"
        strokeWidth="1"
      />
      <path
        d="M54 32C46 36 40 36 32 32C40 28 46 28 54 32Z"
        fill="#E5D1AE"
        stroke="#C5A365"
        strokeWidth="1"
      />
      <path
        d="M16 16C24 20 28 24 32 32C24 28 20 24 16 16Z"
        fill="#FFF8EA"
        stroke="#C5A365"
        strokeWidth="0.9"
      />
      <path
        d="M48 16C40 20 36 24 32 32C40 28 44 24 48 16Z"
        fill="#FFF8EA"
        stroke="#C5A365"
        strokeWidth="0.9"
      />
      <path
        d="M16 48C24 44 28 40 32 32C24 36 20 40 16 48Z"
        fill="#FFF8EA"
        stroke="#C5A365"
        strokeWidth="0.9"
      />
      <path
        d="M48 48C40 44 36 40 32 32C40 36 44 40 48 48Z"
        fill="#FFF8EA"
        stroke="#C5A365"
        strokeWidth="0.9"
      />
      <circle cx="32" cy="32" r="4" fill="#C5A365" opacity="0.75" />
      <circle cx="32" cy="32" r="1.8" fill="#F6EBD6" />
    </svg>
  );
}

function FloaterArt({ kind }: { kind: Floater["kind"] }) {
  if (kind === "leaf") return <GoldLeaf />;
  if (kind === "flower") return <LotusBloom />;
  return <ShiuliPetal />;
}

/**
 * Heading mandala spin + larger falling botanicals.
 */
export function EnvelopeAtmosphere() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !rootRef.current) return;
      registerGsap();

      gsap.to(".env-mandala-spin", {
        rotate: 360,
        duration: 68,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });

      gsap.to(".env-mandala-glow", {
        scale: 1.08,
        opacity: 0.7,
        duration: 4.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      FLOATERS.forEach((_, index) => {
        const el = rootRef.current?.querySelector(
          `.env-floater-${index}`,
        ) as HTMLElement | null;
        const config = FLOATERS[index];
        if (!el || !config) return;

        gsap.fromTo(
          el,
          { y: "-12vh", opacity: 0, rotate: 0, x: 0 },
          {
            y: "110vh",
            x: config.drift,
            rotate: config.rotate,
            duration: config.duration,
            delay: config.delay,
            repeat: -1,
            ease: "none",
            onUpdate() {
              const p = this.progress();
              const fade =
                p < 0.1 ? p / 0.1 : p > 0.82 ? (1 - p) / 0.18 : 1;
              el.style.opacity = String(0.82 * fade);
            },
          },
        );
      });
    },
    { scope: rootRef, dependencies: [reducedMotion], revertOnUpdate: true },
  );

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[#F8F0E0]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_14%,rgba(255,248,236,0.98)_0%,rgba(248,240,224,0.92)_38%,rgba(232,205,150,0.28)_72%,rgba(107,29,42,0.06)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(180deg,transparent,rgba(107,29,42,0.05))]" />

      <div className="absolute top-[10%] left-1/2 h-[14.5rem] w-[14.5rem] -translate-x-1/2 sm:h-[16rem] sm:w-[16rem]">
        <div className="env-mandala-glow absolute inset-[-14%] rounded-full bg-[radial-gradient(circle,rgba(232,205,150,0.18)_0%,transparent_70%)] opacity-35" />
        {/* Soft watermark mandala — low opacity so heading text stays readable */}
        <div
          className="absolute inset-0 overflow-hidden rounded-full opacity-[0.2]"
          style={{
            WebkitMaskImage: "radial-gradient(circle, #000 99%, transparent 100%)",
            maskImage: "radial-gradient(circle, #000 99%, transparent 100%)",
          }}
        >
          <div className="env-mandala-spin absolute inset-0 will-change-transform">
            <Image
              src={assets.decorations.headingMandala}
              alt=""
              width={226}
              height={226}
              sizes="226px"
              priority
              unoptimized
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>

      {!reducedMotion
        ? FLOATERS.map((item, index) => (
            <span
              key={`env-floater-${index}`}
              className={`env-floater-${index} absolute top-0 drop-shadow-[0_2px_6px_rgba(75,21,31,0.14)] will-change-transform`}
              style={{
                left: item.left,
                width: item.size,
                height: item.size,
              }}
            >
              <FloaterArt kind={item.kind} />
            </span>
          ))
        : null}
    </div>
  );
}
