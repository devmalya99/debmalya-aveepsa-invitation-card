"use client";

import { useEffect, type RefObject } from "react";
import { useAutoPlay } from "@/hooks/useAutoPlay";

type UseOpeningLayerSwipeOptions = {
  enabled?: boolean;
  onNext: () => void;
  onPrev: () => void;
};

const MIN_DISTANCE = 48;
const MIN_VELOCITY = 0.35; /* px per ms — clear flick, not a slow drag */
const MAX_DURATION_MS = 700;

/**
 * Optional card snap on a clear flick.
 * Never blocks vertical page scroll — that was freezing the couple screen.
 * Horizontal flicks may preventDefault; vertical always uses native scroll + optional snap.
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
    let horizontalIntent = false;
    let fired = false;

    const reset = () => {
      tracking = false;
      horizontalIntent = false;
      fired = false;
    };

    const onStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      const touch = event.touches[0];
      tracking = true;
      fired = false;
      horizontalIntent = false;
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

      /* Only claim horizontal swipes — never lock the vertical pin scroll. */
      if (!horizontalIntent && absX > 24 && absX > absY * 1.25) {
        horizontalIntent = true;
      }
      if (horizontalIntent) {
        event.preventDefault();
      }
    };

    const finish = (dx: number, dy: number) => {
      if (fired) return;
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);
      const elapsed = Math.max(1, Date.now() - startTime);
      if (elapsed > MAX_DURATION_MS) return;

      const velocityX = absX / elapsed;
      const velocityY = absY / elapsed;
      const horizontal = horizontalIntent || (absX > absY && absX >= MIN_DISTANCE);
      const verticalFlick =
        !horizontal &&
        absY >= MIN_DISTANCE &&
        velocityY >= MIN_VELOCITY;

      if (horizontal) {
        if (absX < MIN_DISTANCE && velocityX < MIN_VELOCITY) return;
        fired = true;
        notifyUserActivity();
        markProgrammatic(900);
        if (dx < 0) onNext();
        else onPrev();
        return;
      }

      if (!verticalFlick) return;

      fired = true;
      notifyUserActivity();
      markProgrammatic(900);
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
