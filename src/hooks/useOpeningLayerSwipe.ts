"use client";

import { useEffect, type RefObject } from "react";
import { useAutoPlay } from "@/hooks/useAutoPlay";

type UseOpeningLayerSwipeOptions = {
  enabled?: boolean;
  onNext: () => void;
  onPrev: () => void;
};

const MIN_DISTANCE = 36;
const AXIS_LOCK_DISTANCE = 18;
const MAX_DURATION_MS = 1000;

/**
 * Mobile swipe / flick:
 * up or left → next, down or right → previous.
 * Once a swipe axis is clear, native scroll is blocked so the pin doesn't feel stuck.
 */
export function useOpeningLayerSwipe(
  ref: RefObject<HTMLElement | null>,
  { enabled = true, onNext, onPrev }: UseOpeningLayerSwipeOptions,
) {
  const { notifyUserActivity, markProgrammatic } = useAutoPlay();

  useEffect(() => {
    const node = ref.current;
    if (!enabled || !node) return;

    let startX = 0;
    let startY = 0;
    let startTime = 0;
    let tracking = false;
    let locked: "x" | "y" | null = null;
    let fired = false;

    const reset = () => {
      tracking = false;
      locked = null;
      fired = false;
    };

    const onStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      const touch = event.touches[0];
      tracking = true;
      fired = false;
      locked = null;
      startX = touch.clientX;
      startY = touch.clientY;
      startTime = Date.now();
    };

    const onMove = (event: TouchEvent) => {
      if (!tracking || event.touches.length !== 1) return;
      const touch = event.touches[0];
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);

      if (!locked) {
        if (absX < AXIS_LOCK_DISTANCE && absY < AXIS_LOCK_DISTANCE) return;
        locked = absX > absY ? "x" : "y";
      }

      /* Claim the gesture so the long pin scroll doesn't swallow the swipe. */
      if (locked) {
        event.preventDefault();
      }
    };

    const finish = (dx: number, dy: number) => {
      if (fired) return;
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);
      const elapsed = Date.now() - startTime;
      if (elapsed > MAX_DURATION_MS) return;
      if (absX < MIN_DISTANCE && absY < MIN_DISTANCE) return;

      const horizontal = locked === "x" || (locked == null && absX > absY);
      fired = true;
      notifyUserActivity();
      markProgrammatic(900);

      if (horizontal) {
        if (dx < 0) onNext();
        else onPrev();
        return;
      }
      if (dy < 0) onNext();
      else onPrev();
    };

    const onEnd = (event: TouchEvent) => {
      if (!tracking) return;
      const touch = event.changedTouches[0];
      if (touch) {
        finish(touch.clientX - startX, touch.clientY - startY);
      }
      reset();
    };

    node.addEventListener("touchstart", onStart, { passive: true });
    node.addEventListener("touchmove", onMove, { passive: false });
    node.addEventListener("touchend", onEnd, { passive: true });
    node.addEventListener("touchcancel", reset, { passive: true });

    return () => {
      node.removeEventListener("touchstart", onStart);
      node.removeEventListener("touchmove", onMove);
      node.removeEventListener("touchend", onEnd);
      node.removeEventListener("touchcancel", reset);
    };
  }, [enabled, markProgrammatic, notifyUserActivity, onNext, onPrev, ref]);
}
