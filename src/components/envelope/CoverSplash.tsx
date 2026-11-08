"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { assets } from "@/data/assets";
import { useAudio } from "@/hooks/useAudio";
import { useLanguage } from "@/hooks/useLanguage";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, registerGsap } from "@/lib/gsap";

type CoverSplashProps = {
  onComplete: () => void;
};

const READY_MS = 900;

/**
 * Full-bleed Kolkata wedding illustration — lifts upward on tap/scroll to reveal the envelope.
 */
export function CoverSplash({ onComplete }: CoverSplashProps) {
  const { content, locale } = useLanguage();
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

  const dismiss = useCallback(() => {
    if (!readyRef.current || leavingRef.current) return;
    leavingRef.current = true;
    startMusic();

    if (reducedMotion || !rootRef.current) {
      onComplete();
      return;
    }

    registerGsap();
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
      .to(
        rootRef.current,
        { yPercent: -108, autoAlpha: 0, duration: 1.05 },
        0.35,
      );
  }, [onComplete, reducedMotion, startMusic]);

  useGSAP(
    () => {
      if (!rootRef.current || reducedMotion) return;
      registerGsap();
      // Keep image CSS-visible — only gently settle scale (no autoAlpha hide).
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
    },
    { scope: rootRef, dependencies: [reducedMotion] },
  );

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (!readyRef.current) {
        event.preventDefault();
        return;
      }
      if (Math.abs(event.deltaY) < 40) return;
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
      if (startY - currentY > 40) {
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

  return (
    <div
      ref={rootRef}
      className={`cover-splash fixed inset-0 z-[200] flex flex-col bg-[#1a0c10] ${
        ready ? "cursor-pointer" : "cursor-wait"
      }`}
      role="button"
      tabIndex={0}
      aria-label={
        locale === "bn" ? "স্পর্শ করুন বা স্ক্রল করুন" : "Tap or scroll to open"
      }
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
      <div className="cover-splash-image absolute inset-0 will-change-transform">
        <Image
          src={assets.decorations.kolkataCover}
          alt={content.common.wedding}
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-[center_18%]"
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
          {locale === "bn" ? "স্পর্শ করুন বা স্ক্রল করুন" : "Tap or scroll to open"}
        </p>
      </div>
    </div>
  );
}
