"use client";

import { AnimatePresence, motion } from "motion/react";
import { useLanguage } from "@/hooks/useLanguage";
import { useSceneProgress } from "@/hooks/useSceneProgress";

type SectionIndicatorProps = {
  enabled: boolean;
  className?: string;
};

export function SectionIndicator({
  enabled,
  className = "",
}: SectionIndicatorProps) {
  const { content } = useLanguage();
  const { index, total, progress } = useSceneProgress(enabled);

  if (!enabled) return null;

  const current = String(index + 1).padStart(2, "0");
  const totalLabel = String(total).padStart(2, "0");
  const fill = Math.min(1, Math.max(0, (index + progress) / total));

  return (
    <div className={`min-w-0 ${className}`}>
      <p className="font-bn-display text-[0.68rem] leading-none tracking-normal text-antique-gold">
        {content.common.wedding}
      </p>

      <div className="mt-1.5 flex items-center gap-2.5">
        <p className="flex items-baseline gap-1 font-display text-[0.82rem] leading-none tracking-[0.04em] text-deep-burgundy">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={current}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.22 }}
              className="inline-block font-medium text-deep-burgundy"
            >
              {current}
            </motion.span>
          </AnimatePresence>
          <span className="text-antique-gold/80">/ {totalLabel}</span>
        </p>

        <div
          className="h-[2px] w-10 overflow-hidden rounded-full bg-antique-gold/25 sm:w-14"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(fill * 100)}
          aria-label={content.common.wedding}
        >
          <motion.div
            className="h-full origin-left rounded-full bg-deep-burgundy"
            initial={false}
            animate={{ scaleX: fill }}
            transition={{ type: "spring", stiffness: 180, damping: 28 }}
          />
        </div>
      </div>
    </div>
  );
}
