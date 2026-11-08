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

function isScrollableY(el: HTMLElement) {
  return el.scrollHeight > el.clientHeight + 4;
}

function findScrollParent(target: EventTarget | null, root: HTMLElement) {
  let el: Element | null = target instanceof Element ? target : null;
  while (el && el !== root) {
    if (el instanceof HTMLElement && isScrollableY(el)) return el;
    el = el.parentElement;
  }
  if (isScrollableY(root)) return root;
  const card = root.querySelector(".wedding-card");
  if (card instanceof HTMLElement && isScrollableY(card)) return card;
  return null;
}

/**
 * Mobile swipe / flick:
 * up or left → next, down or right → previous.
 * Does not steal gestures from an inner scrollable list until it hits an edge.
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
    let scrollParent: HTMLElement | null = null;

    const reset = () => {
      tracking = false;
      locked = null;
      fired = false;
      scrollParent = null;
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
      scrollParent = findScrollParent(event.target, node);
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

      if (locked === "y" && scrollParent) {
        const atTop = scrollParent.scrollTop <= 0;
        const atBottom =
          scrollParent.scrollTop + scrollParent.clientHeight >=
          scrollParent.scrollHeight - 2;
        /* Let the festivities list scroll until an edge. */
        if ((dy < 0 && !atBottom) || (dy > 0 && !atTop)) {
          return;
        }
      }

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

      if (!horizontal && scrollParent) {
        const atTop = scrollParent.scrollTop <= 0;
        const atBottom =
          scrollParent.scrollTop + scrollParent.clientHeight >=
          scrollParent.scrollHeight - 2;
        if ((dy < 0 && !atBottom) || (dy > 0 && !atTop)) {
          return;
        }
      }

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
