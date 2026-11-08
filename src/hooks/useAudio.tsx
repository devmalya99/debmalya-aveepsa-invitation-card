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
import { assets } from "@/data/assets";

const MUTE_KEY = "wedding-invite-audio-muted";

type AudioContextValue = {
  enabled: boolean;
  isPlaying: boolean;
  ready: boolean;
  toggle: () => void;
  /** Start playback after a user gesture (language pick / cover). */
  start: () => void;
  pause: () => void;
};

const AudioContext = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [ready, setReady] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(assets.audio.ambient);
    audio.loop = true;
    /* Ready by language tap — metadata-only often delayed first play on mobile. */
    audio.preload = "auto";
    audio.volume = 0;
    void audio.load();
    audioRef.current = audio;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    const muted = window.localStorage.getItem(MUTE_KEY) === "1";
    setEnabled(!muted);
    setReady(true);

    return () => {
      audio.pause();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) {
        audioRef.current?.pause();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const fadeTo = useCallback(async (target: number, playing: boolean) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing && audio.paused) {
      try {
        await audio.play();
      } catch {
        setIsPlaying(false);
        return;
      }
    }

    const start = audio.volume;
    const steps = 12;
    for (let i = 1; i <= steps; i += 1) {
      audio.volume = start + ((target - start) * i) / steps;
      await new Promise((resolve) => window.setTimeout(resolve, 40));
    }

    if (!playing) {
      audio.pause();
      audio.volume = 0;
    }
  }, []);

  const toggle = useCallback(() => {
    setEnabled((current) => {
      const next = !current;
      window.localStorage.setItem(MUTE_KEY, next ? "0" : "1");

      if (next) {
        void fadeTo(0.35, true);
      } else {
        void fadeTo(0, false);
      }

      return next;
    });
  }, [fadeTo]);

  const start = useCallback(() => {
    window.localStorage.setItem(MUTE_KEY, "0");
    setEnabled(true);
    void fadeTo(0.35, true);
  }, [fadeTo]);

  const pause = useCallback(() => {
    void fadeTo(0, false);
  }, [fadeTo]);

  const value = useMemo(
    () => ({
      enabled,
      isPlaying: enabled && isPlaying,
      ready,
      toggle,
      start,
      pause,
    }),
    [enabled, isPlaying, ready, toggle, start, pause],
  );

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return ctx;
}
