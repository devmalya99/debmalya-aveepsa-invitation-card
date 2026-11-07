"use client";

import {
  CinematicOverlay,
  RajbariBackdrop,
  ScrollPetalField,
} from "@/components/decorations";
import type { ReactNode } from "react";

type CinematicStageProps = {
  children: ReactNode;
};

/**
 * Fixed cinematic canvas — the “film set” stays still while
 * invitation cards animate through as the guest scrolls.
 */
export function CinematicStage({ children }: CinematicStageProps) {
  return (
    <div className="relative min-h-dvh">
      <div
        aria-hidden
        className="decoration-layer pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div className="absolute inset-0 surface-cinematic" />
        <RajbariBackdrop className="opacity-80" />
        <CinematicOverlay />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(37,23,26,0.35)_100%)]" />
      </div>

      <ScrollPetalField />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
