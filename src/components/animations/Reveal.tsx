"use client";

import {
  MotionCard,
  type MotionDirection,
} from "@/components/animations/MotionCard";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** @deprecated Prefer `from` for cinematic direction. */
  y?: number;
  from?: MotionDirection;
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  from = "bottom",
}: RevealProps) {
  return (
    <MotionCard className={className} delay={delay} from={from}>
      {children}
    </MotionCard>
  );
}
