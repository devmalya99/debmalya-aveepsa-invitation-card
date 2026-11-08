"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * True while `ref` intersects the viewport (with a small margin).
 * Used to pause infinite ambient loops when a scene is offscreen.
 */
export function useInViewActive(
  ref: RefObject<Element | null>,
  enabled = true,
) {
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (!enabled) {
      setActive(false);
      return;
    }

    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(Boolean(entry?.isIntersecting));
      },
      { root: null, rootMargin: "12% 0px", threshold: 0.02 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, enabled]);

  return active;
}
