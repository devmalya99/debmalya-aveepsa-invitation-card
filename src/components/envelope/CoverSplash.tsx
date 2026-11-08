"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { assets } from "@/data/assets";
import { useAudio } from "@/hooks/useAudio";
import { useLanguage } from "@/hooks/useLanguage";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, registerGsap } from "@/lib/gsap";

type CoverSplashProps = {
  onComplete: () => void;
};

const READY_MS = 1100;
const COVER_SRC = assets.decorations.kolkataCover;

/**
 * Full-bleed Kolkata wedding illustration — lifts upward on tap/scroll to reveal the envelope.
 * Uses CSS background + <img> so the hero cannot fail silently via Next/Image layout.
 */
export function CoverSplash({ onComplete }: CoverSplashProps) {
  const { locale } = useLanguage();
  const { start: startMusic } = useAudio();
  const reducedMotion = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const leavingRef = useRef(false);
  const readyRef = useRef(false);
  const touchYRef = useRef<number | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => {
      readyRef.current = true;
      setReady(true);
    }, READY_MS);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (!rootRef.current || reducedMotion) return;
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cover-splash-image",
        { scale: 1.04 },
        { scale: 1, duration: 1.1, ease: "power2.out" },
      );
      gsap.fromTo(
        ".cover-splash-hint",
        { autoAlpha: 0, y: 8 },
        { autoAlpha: 1, y: 0, duration: 0.6, delay: 0.55, ease: "power2.out" },
      );
    }, rootRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  const dismiss = useCallback(() => {
    if (!readyRef.current || leavingRef.current) return;
    leavingRef.current = true;
    startMusic();

    if (reducedMotion || !rootRef.current) {
      onComplete();
      return;
    }

    registerGsap();
    const root = rootRef.current;
    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete,
    });

    tl.to(".cover-splash-hint", { autoAlpha: 0, duration: 0.25 }, 0)
      .to(
        ".cover-splash-image",
        { yPercent: -18, scale: 1.04, duration: 1.15 },
        0,
      )
      .to(".cover-splash-veil", { autoAlpha: 1, duration: 0.85 }, 0.15)
      .to(root, { yPercent: -108, autoAlpha: 0, duration: 1.05 }, 0.35);
  }, [onComplete, reducedMotion, startMusic]);

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (!readyRef.current) {
        event.preventDefault();
        return;
      }
      if (Math.abs(event.deltaY) < 48) return;
      event.preventDefault();
      dismiss();
    };

    const onTouchStart = (event: TouchEvent) => {
      touchYRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!readyRef.current) {
        event.preventDefault();
        return;
      }
      const startY = touchYRef.current;
      const currentY = event.touches[0]?.clientY;
      if (startY == null || currentY == null) return;
      if (startY - currentY > 48) {
        event.preventDefault();
        dismiss();
      }
    };

    const onKey = (event: KeyboardEvent) => {
      if (!readyRef.current) return;
      if (
        event.key === "Enter" ||
        event.key === " " ||
        event.key === "ArrowDown" ||
        event.key === "ArrowUp"
      ) {
        event.preventDefault();
        dismiss();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
    };
  }, [dismiss]);

  const hint =
    locale === "bn" ? "স্পর্শ করুন বা স্ক্রল করুন" : "Tap or scroll to open";

  return (
    <div
      ref={rootRef}
      className={`cover-splash fixed inset-0 z-[220] flex flex-col ${
        ready ? "cursor-pointer" : "cursor-wait"
      }`}
      style={{ backgroundColor: "#1a0c10" }}
      role="button"
      tabIndex={0}
      aria-label={hint}
      onClick={() => {
        if (!readyRef.current) return;
        dismiss();
      }}
      onKeyDown={(event) => {
        if (!readyRef.current) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          dismiss();
        }
      }}
    >
      {/* Belt-and-suspenders: CSS background always paints the hero */}
      <div
        className="cover-splash-image absolute inset-0 will-change-transform"
        style={{
          backgroundColor: "#1a0c10",
          backgroundImage: `url(${COVER_SRC})`,
          backgroundSize: "cover",
          backgroundPosition: "center 18%",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={COVER_SRC}
          alt=""
          className="h-full w-full object-cover object-[center_18%]"
          draggable={false}
        />
      </div>

      <div
        className="cover-splash-veil pointer-events-none absolute inset-0 bg-[#F8F0E0] opacity-0"
        aria-hidden
      />

      <div className="cover-splash-hint relative z-10 mt-auto flex flex-col items-center gap-2.5 px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-10">
        <div className="h-9 w-px bg-gradient-to-b from-transparent via-[#C5A365] to-[#C5A365]/45" />
        <p
          className={`text-center text-[1.05rem] font-semibold tracking-[0.03em] text-[#FFF8EA] transition-opacity duration-300 sm:text-[1.12rem] ${
            locale === "bn" ? "font-bn-display" : "font-display"
          } ${ready ? "opacity-100" : "opacity-55"}`}
          style={{
            textShadow:
              "0 2px 4px rgba(0,0,0,0.85), 0 4px 18px rgba(0,0,0,0.65), 0 0 1px rgba(0,0,0,0.9)",
          }}
        >
          {hint}
        </p>
      </div>
    </div>
  );
}
