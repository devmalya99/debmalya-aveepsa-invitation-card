"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

const IDLE_MS = 4000;
/** Ignore synthetic scroll/pointer noise from our own auto actions. */
const PROGRAMMATIC_GUARD_MS = 120;

type AutoPlayContextValue = {
  /** True while idle auto-open / auto-scroll is engaged. */
  isAutoPlaying: boolean;
  /** Call when the guest intentionally interacts — stops auto and restarts the idle clock. */
  notifyUserActivity: () => void;
  /** Mark upcoming scroll/DOM work as programmatic so it does not cancel auto-play. */
  markProgrammatic: (ms?: number) => void;
};

const AutoPlayContext = createContext<AutoPlayContextValue | null>(null);

export function AutoPlayProvider({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const idleTimerRef = useRef<number | null>(null);
  const programmaticUntilRef = useRef(0);
  const isAutoPlayingRef = useRef(false);

  const clearIdleTimer = useCallback(() => {
    if (idleTimerRef.current != null) {
      window.clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
  }, []);

  const markProgrammatic = useCallback((ms = PROGRAMMATIC_GUARD_MS) => {
    programmaticUntilRef.current = Date.now() + ms;
  }, []);

  const armIdleTimer = useCallback(() => {
    clearIdleTimer();
    if (reducedMotion) return;
    idleTimerRef.current = window.setTimeout(() => {
      isAutoPlayingRef.current = true;
      setIsAutoPlaying(true);
    }, IDLE_MS);
  }, [clearIdleTimer, reducedMotion]);

  const notifyUserActivity = useCallback(() => {
    if (Date.now() < programmaticUntilRef.current) return;
    if (isAutoPlayingRef.current) {
      isAutoPlayingRef.current = false;
      setIsAutoPlaying(false);
    }
    armIdleTimer();
  }, [armIdleTimer]);

  useEffect(() => {
    if (reducedMotion) {
      clearIdleTimer();
      isAutoPlayingRef.current = false;
      setIsAutoPlaying(false);
      return;
    }

    armIdleTimer();

    const onActivity = () => notifyUserActivity();

    window.addEventListener("pointerdown", onActivity, { passive: true });
    window.addEventListener("touchstart", onActivity, { passive: true });
    window.addEventListener("wheel", onActivity, { passive: true });
    window.addEventListener("keydown", onActivity);

    return () => {
      clearIdleTimer();
      window.removeEventListener("pointerdown", onActivity);
      window.removeEventListener("touchstart", onActivity);
      window.removeEventListener("wheel", onActivity);
      window.removeEventListener("keydown", onActivity);
    };
  }, [armIdleTimer, clearIdleTimer, notifyUserActivity, reducedMotion]);

  const value = useMemo(
    () => ({
      isAutoPlaying,
      notifyUserActivity,
      markProgrammatic,
    }),
    [isAutoPlaying, notifyUserActivity, markProgrammatic],
  );

  return (
    <AutoPlayContext.Provider value={value}>{children}</AutoPlayContext.Provider>
  );
}

export function useAutoPlay() {
  const ctx = useContext(AutoPlayContext);
  if (!ctx) {
    throw new Error("useAutoPlay must be used within AutoPlayProvider");
  }
  return ctx;
}
