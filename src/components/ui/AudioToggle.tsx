"use client";

import { AnimatePresence, motion } from "motion/react";
import { VolumeX } from "lucide-react";
import { useAudio } from "@/hooks/useAudio";
import { useLanguage } from "@/hooks/useLanguage";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

type AudioToggleProps = {
  className?: string;
};

function SoundBars({ animate }: { animate: boolean }) {
  const bars = [0.45, 0.85, 0.6];

  return (
    <span className="relative z-10 flex h-3.5 items-end gap-[2px]" aria-hidden>
      {bars.map((height, index) => (
        <motion.span
          key={index}
          className="w-[2px] rounded-full bg-antique-ivory"
          style={{ height: `${height * 100}%` }}
          animate={
            animate
              ? {
                  scaleY: [0.45, 1, 0.55, 0.9, 0.45],
                }
              : { scaleY: 0.7 }
          }
          transition={
            animate
              ? {
                  duration: 0.85 + index * 0.12,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.08,
                }
              : { duration: 0.2 }
          }
        />
      ))}
    </span>
  );
}

export function AudioToggle({ className = "" }: AudioToggleProps) {
  const { content } = useLanguage();
  const { enabled, isPlaying, ready, toggle } = useAudio();
  const reducedMotion = usePrefersReducedMotion();
  const playing = enabled && isPlaying;

  if (!ready) return null;

  return (
    <motion.button
      type="button"
      onClick={toggle}
      whileTap={{ scale: 0.94 }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
      className={`relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-antique-gold/45 bg-deep-burgundy text-antique-ivory shadow-[0_1px_2px_rgba(64,21,29,0.12)] transition-colors hover:bg-[#4d1a24] ${className}`}
      aria-pressed={playing}
      aria-label={content.common.music}
    >
      {playing && !reducedMotion ? (
        <>
          <span className="audio-glow-halo" aria-hidden />
          <span className="audio-glow-ring" aria-hidden />
        </>
      ) : null}

      <AnimatePresence mode="wait" initial={false}>
        {playing ? (
          <motion.span
            key="playing"
            className="relative z-10"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.18 }}
          >
            <SoundBars animate={!reducedMotion} />
          </motion.span>
        ) : (
          <motion.span
            key="muted"
            className="relative z-10"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.18 }}
          >
            <VolumeX className="h-4 w-4 text-antique-ivory/90" aria-hidden />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
