"use client";

import { forwardRef, type ReactNode } from "react";

type SceneWrapperProps = {
  id: string;
  tone?: "ivory" | "burgundy" | "parchment";
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  /** `pin` = fixed viewport scene; `flow` = natural document height. */
  layout?: "pin" | "flow";
};

const toneClass = {
  ivory: "surface-ivory",
  burgundy: "surface-burgundy",
  parchment: "surface-parchment",
} as const;

const toneSolid = {
  ivory: "#f6ebd6",
  burgundy: "#4b151f",
  parchment: "#e5d1ae",
} as const;

/**
 * Outer root stays React-stable (never pinned) and owns document flow height.
 * Inner section is the pin target — it MUST carry an opaque fill, otherwise the
 * next scene (e.g. venue) scrolls through behind family cards while pinned.
 */
export const SceneWrapper = forwardRef<HTMLElement, SceneWrapperProps>(
  function SceneWrapper(
    {
      id,
      tone = "ivory",
      children,
      className = "",
      innerClassName = "",
      layout = "pin",
    },
    ref,
  ) {
    const isFlow = layout === "flow";

    return (
      <div
        id={id}
        data-scene={id}
        className={`relative z-0 w-full ${toneClass[tone]}`}
        style={{ colorScheme: "only light", backgroundColor: toneSolid[tone] }}
      >
        <section
          ref={ref}
          className={`relative isolate z-10 w-full ${toneClass[tone]} ${className} ${
            isFlow
              ? "min-h-0 overflow-visible"
              : "h-svh min-h-svh overflow-hidden"
          }`}
          style={{
            colorScheme: "only light",
            backgroundColor: toneSolid[tone],
          }}
        >
          <div
            className={`scene-inner relative mx-auto flex w-full touch-pan-y flex-col ${
              isFlow
                ? "min-h-0 max-w-lg px-5 pt-[max(4.5rem,calc(env(safe-area-inset-top)+3.5rem))] pb-14 sm:max-w-xl"
                : "h-full min-h-0 max-w-md px-5 pt-[max(4.25rem,calc(env(safe-area-inset-top)+3.25rem))] pb-6 sm:max-w-lg"
            } ${innerClassName}`}
          >
            {children}
          </div>
        </section>
      </div>
    );
  },
);
