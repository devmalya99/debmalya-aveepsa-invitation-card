"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { InviteDeckCard } from "@/config/invite-deck";

type VerticalInviteSceneProps = {
  card: InviteDeckCard;
  children?: (active: boolean) => ReactNode;
  footer?: (active: boolean) => ReactNode;
};

const washes: Record<InviteDeckCard["wash"], string | null> = {
  none: null,
  warm: "bg-gradient-to-b from-[#25171a]/20 via-transparent to-[#25171a]/5",
  night: "bg-gradient-to-b from-[#0b1220]/3 via-transparent to-[#0b1220]/55",
  center:
    "bg-[radial-gradient(ellipse_at_center,rgba(37,23,26,0.55)_0%,rgba(37,23,26,0.18)_42%,transparent_70%)]",
};

/**
 * One full-height vertical snap scene.
 * Image zooms / fades into light when it enters the viewport.
 */
export function VerticalInviteScene({
  card,
  children,
  footer,
}: VerticalInviteSceneProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  const wash = washes[card.wash];
  const isContain = card.fit === "contain";
  const isLcp = card.id === "cover" || card.id === "formal";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting && entry.intersectionRatio >= 0.55);
      },
      { threshold: [0.35, 0.55, 0.75] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={card.id}
      className="relative flex h-dvh w-full snap-start snap-always flex-col items-center justify-center overflow-hidden bg-[#1a0f12] px-3 pt-[max(3.5rem,env(safe-area-inset-top))] pb-[max(1.25rem,env(safe-area-inset-bottom))]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_28%,rgba(177,138,82,0.16),transparent_55%)]" />

      <motion.div
        className={`relative z-10 w-full max-w-[22rem] overflow-hidden rounded-[1.35rem] border border-antique-gold/30 bg-[#f0e2c4] shadow-[0_22px_60px_rgba(0,0,0,0.42)] ${
          footer ? "h-[min(58dvh,26rem)]" : "h-[min(70dvh,32rem)]"
        }`}
        initial={false}
        animate={
          reduceMotion
            ? { opacity: 1, scale: 1, filter: "brightness(1)" }
            : active
              ? {
                  opacity: 1,
                  scale: 1,
                  filter: [
                    "brightness(0.4)",
                    "brightness(1.1)",
                    "brightness(1)",
                  ],
                }
              : {
                  opacity: 0.55,
                  scale: 0.92,
                  filter: "brightness(0.6)",
                }
        }
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="absolute inset-0"
          animate={
            reduceMotion || !active ? { scale: 1 } : { scale: [1.1, 1] }
          }
          transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={card.src}
            alt=""
            fill
            sizes="92vw"
            loading={isLcp ? "eager" : "lazy"}
            fetchPriority={card.id === "cover" ? "high" : "auto"}
            className={
              isContain
                ? "object-contain object-center p-1.5"
                : "object-cover object-center"
            }
          />
        </motion.div>

        {wash ? (
          <div className={`pointer-events-none absolute inset-0 ${wash}`} />
        ) : null}

        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={false}
          animate={
            active && !reduceMotion
              ? {
                  opacity: [0, 0.5, 0.12],
                  background: [
                    "radial-gradient(circle at 50% 40%, rgba(255,220,150,0) 0%, transparent 60%)",
                    "radial-gradient(circle at 50% 40%, rgba(255,220,150,0.4) 0%, transparent 55%)",
                    "radial-gradient(circle at 50% 40%, rgba(255,220,150,0.1) 0%, transparent 60%)",
                  ],
                }
              : { opacity: 0 }
          }
          transition={{ duration: 1.3, ease: "easeOut" }}
        />

        {children ? (
          <div className="absolute inset-0 z-10 flex flex-col">
            {children(active)}
          </div>
        ) : null}
      </motion.div>

      {footer ? (
        <div className="relative z-10 mt-3 w-full max-w-[22rem]">
          {footer(active)}
        </div>
      ) : null}
    </section>
  );
}
