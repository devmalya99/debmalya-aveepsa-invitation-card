"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { assets } from "@/data/assets";
import { useAudio } from "@/hooks/useAudio";
import { useLanguage } from "@/hooks/useLanguage";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, registerGsap } from "@/lib/gsap";

type CoverSplashProps = {
  onComplete: () => void;
};

/**
 * Full-bleed Kolkata wedding illustration — lifts upward on touch/scroll to reveal the envelope.
 */
export function CoverSplash({ onComplete }: CoverSplashProps) {
  const { content, locale } = useLanguage();
  const { start: startMusic } = useAudio();
  const reducedMotion = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const leavingRef = useRef(false);
  const touchYRef = useRef<number | null>(null);

  const dismiss = useCallback(() => {
    if (leavingRef.current) return;
    leavingRef.current = true;
    // Start ambient music on the same user gesture that dismisses the cover.
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
      .to(
        ".cover-splash-veil",
        { autoAlpha: 1, duration: 0.85 },
        0.15,
      )
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
      gsap.fromTo(
        ".cover-splash-image",
        { scale: 1.06, autoAlpha: 0.85 },
        { scale: 1, autoAlpha: 1, duration: 1.1, ease: "power2.out" },
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
      if (Math.abs(event.deltaY) < 6) return;
      event.preventDefault();
      dismiss();
    };

    const onTouchStart = (event: TouchEvent) => {
      touchYRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      const startY = touchYRef.current;
      const currentY = event.touches[0]?.clientY;
      if (startY == null || currentY == null) return;
      if (startY - currentY > 28) {
        event.preventDefault();
        dismiss();
      }
    };

    const onKey = (event: KeyboardEvent) => {
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
      className="cover-splash fixed inset-0 z-[60] flex cursor-pointer flex-col bg-[#1a0c10]"
      role="button"
      tabIndex={0}
      aria-label={content.envelope.instruction}
      onClick={dismiss}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          dismiss();
        }
      }}
    >
      <div className="cover-splash-image absolute inset-0 will-change-transform">
        <Image
          src={assets.decorations.kolkataCover}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_20%]"
        />
      </div>

      <div
        className="cover-splash-veil pointer-events-none absolute inset-0 bg-[#F6EBD6] opacity-0"
        aria-hidden
      />

      <div className="cover-splash-hint relative z-10 mt-auto flex flex-col items-center gap-2 px-6 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-8">
        <div className="h-8 w-px bg-gradient-to-b from-transparent via-[#C5A365] to-[#C5A365]/40" />
        <p
          className={`text-center text-[0.78rem] tracking-[0.04em] text-[#FFF8EA]/92 ${
            locale === "bn" ? "font-bn-body" : "font-body"
          }`}
          style={{ textShadow: "0 1px 8px rgba(26,12,16,0.55)" }}
        >
          {locale === "bn" ? "স্পর্শ করুন বা স্ক্রল করুন" : "Tap or scroll to open"}
        </p>
      </div>
    </div>
  );
}
