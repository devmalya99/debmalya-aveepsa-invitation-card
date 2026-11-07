"use client";

import { forwardRef, type ReactNode } from "react";

type SceneWrapperProps = {
  id: string;
  tone?: "ivory" | "burgundy" | "parchment";
  children: ReactNode;
  className?: string;
  innerClassName?: string;
};

const toneClass = {
  ivory: "surface-ivory",
  burgundy: "surface-burgundy",
  parchment: "surface-parchment",
} as const;

/**
 * Outer root stays React-stable (never pinned) and owns the opaque scene background.
 * Inner section is the pin target and locks to the viewport for cinematic scrubbing.
 */
export const SceneWrapper = forwardRef<HTMLElement, SceneWrapperProps>(
  function SceneWrapper(
    { id, tone = "ivory", children, className = "", innerClassName = "" },
    ref,
  ) {
    return (
      <div
        id={id}
        data-scene={id}
        className={`relative z-0 w-full ${toneClass[tone]}`}
      >
        <section
          ref={ref}
          className={`relative h-svh min-h-svh w-full overflow-hidden ${className}`}
        >
          <div
            className={`scene-inner relative mx-auto flex h-full min-h-0 w-full max-w-md flex-col px-5 pt-[max(4.25rem,calc(env(safe-area-inset-top)+3.25rem))] pb-6 sm:max-w-lg ${innerClassName}`}
          >
            {children}
          </div>
        </section>
      </div>
    );
  },
);
