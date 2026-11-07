"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { SceneWrapper } from "@/components/experience/SceneWrapper";
import {
  AlpanaMandala,
  CornerLotus,
  DateMedallion,
  FloatingPetals,
  GoldParticles,
  PortraitArchFrame,
} from "@/components/reveal/HeroOrnaments";
import { assets } from "@/data/assets";
import { useLanguage } from "@/hooks/useLanguage";
import { usePinnedScene } from "@/hooks/usePinnedScene";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollModeContext } from "@/hooks/useScrollModeContext";
import { gsap, registerGsap } from "@/lib/gsap";

/**
 * Scene 01 — Editorial wedding album cover.
 * Preserves original couple photograph (couple-01); ornamental frame only.
 */
export function GrandReveal() {
  const { content, locale } = useLanguage();
  const { cinematic } = useScrollModeContext();
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const copy = content.grandReveal;
  const isBengali = locale === "bn";

  /* Entrance plays once on mount so the cover is complete before scroll. */
  useGSAP(
    () => {
      if (!sectionRef.current) return;
      registerGsap();

      if (reducedMotion || !cinematic) {
        gsap.set(
          [
            ".reveal-atmosphere",
            ".reveal-mandala",
            ".reveal-particles",
            ".reveal-photo-mask",
            ".reveal-photo",
            ".reveal-kicker",
            ".reveal-names-bn",
            ".reveal-names-en",
            ".reveal-medallion",
            ".reveal-location",
            ".reveal-tagline",
            ".reveal-petals",
            ".reveal-draw-path",
            ".reveal-mandala-center",
          ],
          { opacity: 1, strokeDashoffset: 0 },
        );
        gsap.set(".reveal-photo", { scale: 1 });
        gsap.set(".reveal-photo-mask", {
          clipPath: "inset(0% 0% 0% 0%)",
        });
        return;
      }

      gsap.set(".reveal-atmosphere", { opacity: 0 });
      gsap.set(".reveal-mandala", { opacity: 0 });
      gsap.set(".reveal-particles", { opacity: 0 });
      gsap.set(".reveal-petals", { opacity: 0 });
      gsap.set(".reveal-photo-mask", {
        opacity: 0,
        clipPath: "inset(16% 12% 20% 12%)",
      });
      gsap.set(".reveal-photo", { scale: 1.08, opacity: 0 });
      gsap.set(
        [
          ".reveal-kicker",
          ".reveal-names-bn",
          ".reveal-names-en",
          ".reveal-medallion",
          ".reveal-location",
          ".reveal-tagline",
        ],
        { opacity: 0, y: 16 },
      );
      gsap.set(".reveal-draw-path", { strokeDashoffset: 1 });
      gsap.set(".reveal-mandala-center", { opacity: 0 });

      const entrance = gsap.timeline({ defaults: { ease: "power2.out" } });
      entrance
        .to(".reveal-atmosphere", { opacity: 1, duration: 0.55 }, 0)
        .to(
          ".reveal-draw-path",
          { strokeDashoffset: 0, stagger: 0.028, duration: 1.05 },
          0.12,
        )
        .to(".reveal-mandala", { opacity: 0.2, duration: 0.7 }, 0.15)
        .to(".reveal-mandala-center", { opacity: 0.7, duration: 0.3 }, 0.7)
        .to(".reveal-particles", { opacity: 1, duration: 0.45 }, 0.55)
        .to(
          ".reveal-photo-mask",
          {
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.05,
          },
          0.55,
        )
        .to(".reveal-photo", { scale: 1, opacity: 1, duration: 1.15 }, 0.55)
        .to(".reveal-kicker", { opacity: 1, y: 0, duration: 0.45 }, 1.15)
        .to(".reveal-names-bn", { opacity: 1, y: 0, duration: 0.55 }, 1.3)
        .to(".reveal-names-en", { opacity: 1, y: 0, duration: 0.45 }, 1.5)
        .to(".reveal-medallion", { opacity: 1, y: 0, duration: 0.45 }, 1.65)
        .to(".reveal-location", { opacity: 1, y: 0, duration: 0.4 }, 1.78)
        .to(".reveal-tagline", { opacity: 1, y: 0, duration: 0.4 }, 1.88)
        .to(".reveal-petals", { opacity: 1, duration: 0.5 }, 1.7);
    },
    { scope: sectionRef, dependencies: [cinematic, reducedMotion], revertOnUpdate: true },
  );

  /* Scroll only handles parallax / soft exit — never remounts the header cover. */
  usePinnedScene({
    sectionRef,
    sceneId: "grand-reveal",
    enabled: cinematic,
    build: (timeline) => {
      timeline
        .fromTo(
          ".reveal-parallax-bg",
          { y: 0 },
          { y: -36, duration: 1, ease: "none" },
          0,
        )
        .fromTo(
          ".reveal-parallax-photo",
          { y: 0 },
          { y: 22, duration: 1, ease: "none" },
          0,
        )
        .fromTo(
          ".reveal-copy-exit",
          { y: 0, opacity: 1 },
          { y: -20, opacity: 0.4, duration: 0.85, ease: "none" },
          0.15,
        );
    },
  });

  return (
    <SceneWrapper
      ref={sectionRef}
      id="grand-reveal"
      tone="ivory"
      className="overflow-hidden"
      innerClassName="max-w-[26rem] justify-center sm:max-w-lg"
    >
      <div className="reveal-atmosphere pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_32%,rgba(255,248,236,0.95)_0%,rgba(246,235,215,0.55)_42%,transparent_72%)]" />
        <div className="reveal-parallax-bg absolute top-[8%] left-1/2 h-[22rem] w-[22rem] -translate-x-1/2 sm:h-[24rem] sm:w-[24rem]">
          <AlpanaMandala className="h-full w-full opacity-100" />
        </div>
        <Image
          src={assets.decorations.alpana}
          alt=""
          width={300}
          height={300}
          className="reveal-parallax-bg absolute top-[10%] left-1/2 -translate-x-1/2 object-contain opacity-[0.07]"
          style={{ width: 300, height: "auto" }}
          sizes="300px"
        />
        <CornerLotus className="absolute top-[18%] left-2 h-12 w-12 opacity-70 sm:left-4" />
        <CornerLotus className="absolute top-[18%] right-2 h-12 w-12 rotate-90 opacity-70 sm:right-4" />
        <CornerLotus className="absolute bottom-[14%] left-3 h-10 w-10 -rotate-90 opacity-50" />
        <CornerLotus className="absolute right-3 bottom-[14%] h-10 w-10 rotate-180 opacity-50" />
        <GoldParticles />
        <FloatingPetals />
      </div>

      <div className="relative z-10 flex w-full flex-col items-center text-center">
        <div className="reveal-copy-exit flex w-full flex-col items-center">
          <p className="reveal-kicker font-bn-display text-[1.05rem] leading-none text-sindoor-red sm:text-[1.15rem]">
            {copy.kicker}
          </p>
          <div className="mt-2 h-px w-14 bg-gradient-to-r from-transparent via-antique-gold to-transparent" />
        </div>

        <div className="reveal-parallax-photo relative mt-4 w-[min(78vw,19.5rem)] sm:w-[20.5rem]">
          <div className="pointer-events-none absolute -inset-6 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(185,154,88,0.22)_0%,transparent_68%)]" />

          <div className="relative aspect-[7/9] w-full">
            <PortraitArchFrame />
            <div
              className="reveal-photo-mask absolute inset-[8.5%] overflow-hidden shadow-[0_18px_40px_rgba(64,21,29,0.18)]"
              style={{
                borderRadius: "50% 50% 12px 12px / 38% 38% 12px 12px",
              }}
            >
              <Image
                src={assets.couple.grandReveal}
                alt={copy.namesEn}
                fill
                priority
                className="reveal-photo object-cover object-[50%_18%]"
                sizes="(max-width: 430px) 78vw, 330px"
              />
            </div>
          </div>
        </div>

        <div className="reveal-copy-exit mt-5 w-full px-1">
          <h1 className="reveal-names-bn font-bn-display text-[1.85rem] leading-[1.2] text-balance text-deep-burgundy sm:text-[2.15rem]">
            {copy.namesBn}
          </h1>
          <p className="reveal-names-en mt-1.5 font-display text-[0.95rem] tracking-[0.12em] text-deep-burgundy/90 uppercase sm:text-base">
            {copy.namesEn}
          </p>

          <DateMedallion
            dateBn={copy.date}
            dateEn={copy.dateEn}
            className="mt-4"
          />

          <p className="reveal-location mt-3 font-display text-[0.82rem] tracking-[0.04em] text-deep-burgundy">
            {copy.location}
          </p>

          <p
            className={`reveal-tagline mx-auto mt-2 max-w-[17rem] text-[0.8rem] leading-relaxed text-deep-burgundy/80 ${
              isBengali ? "font-bn-body" : "font-display italic"
            }`}
          >
            {copy.tagline}
          </p>
        </div>
      </div>
    </SceneWrapper>
  );
}
