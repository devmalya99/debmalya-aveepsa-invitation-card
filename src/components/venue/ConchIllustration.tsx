"use client";

type ConchIllustrationProps = {
  className?: string;
};

/** Illustrated shankha with stroke-draw friendly paths. */
export function ConchIllustration({ className = "" }: ConchIllustrationProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      aria-hidden
      fill="none"
    >
      <circle
        className="venue-draw-path venue-conch-ring"
        cx="60"
        cy="60"
        r="52"
        stroke="currentColor"
        strokeWidth="1.2"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
      />
      <circle
        className="venue-draw-path"
        cx="60"
        cy="60"
        r="44"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.55"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
      />
      <path
        className="venue-draw-path venue-conch-shell"
        d="M38 72
           C34 58 38 42 52 34
           C62 28 74 30 82 40
           C90 50 90 64 80 74
           C72 82 58 84 48 78
           C42 74 40 72 38 72 Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
      />
      <path
        className="venue-draw-path"
        d="M52 40 C58 36 66 36 72 42 C76 48 76 56 70 62"
        stroke="currentColor"
        strokeWidth="1"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
      />
      <path
        className="venue-draw-path"
        d="M46 54 C52 50 60 50 66 56"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.8"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
      />
      <path
        className="venue-draw-path"
        d="M78 48 C84 52 86 60 82 68 C78 74 70 78 62 76"
        stroke="currentColor"
        strokeWidth="1"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
      />
      <circle
        className="venue-draw-fill"
        cx="60"
        cy="60"
        r="2.5"
        fill="currentColor"
        opacity="0"
      />
    </svg>
  );
}

export function RiverLines({ className = "" }: ConchIllustrationProps) {
  return (
    <svg
      viewBox="0 0 320 80"
      className={className}
      aria-hidden
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        className="venue-draw-path venue-river-line"
        d="M0 40 C40 28 80 52 120 40 C160 28 200 52 240 40 C280 28 300 44 320 38"
        stroke="currentColor"
        strokeWidth="1.1"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
      />
      <path
        className="venue-draw-path venue-river-line"
        d="M0 52 C50 40 90 62 140 50 C190 38 230 60 280 48 C300 44 310 50 320 52"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.55"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
      />
    </svg>
  );
}
