"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect } from "react";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";

type GalleryLightboxProps = {
  open: boolean;
  title: string;
  placeholderLabel: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function GalleryLightbox({
  open,
  title,
  placeholderLabel,
  onClose,
  onPrev,
  onNext,
}: GalleryLightboxProps) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev();
      if (event.key === "ArrowRight") onNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-dark-burgundy/92 p-4"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full border border-antique-gold/40 p-2 text-soft-white"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="w-full max-w-3xl"
            onClick={(event) => event.stopPropagation()}
            onKeyDown={() => undefined}
          >
            <PhotoPlaceholder
              label={placeholderLabel}
              caption={title}
              aspect="aspect-[4/5] sm:aspect-[16/10]"
            />
            <div className="mt-4 flex justify-between gap-3">
              <button
                type="button"
                onClick={onPrev}
                className="font-label text-xs uppercase tracking-[0.18em] text-antique-gold"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={onNext}
                className="font-label text-xs uppercase tracking-[0.18em] text-antique-gold"
              >
                Next
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
