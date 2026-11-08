type WeddingCardDividerProps = {
  className?: string;
};

/** Antique-gold ornamental rule — always visible (no GSAP stroke hide). */
export function WeddingCardDivider({ className = "" }: WeddingCardDividerProps) {
  return (
    <svg
      viewBox="0 0 160 18"
      className={className}
      aria-hidden
      fill="none"
    >
      <path
        d="M8 9 H62"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M98 9 H152"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M80 2.5 C84 5.5 85.5 7.5 80 9 C74.5 7.5 76 5.5 80 2.5 Z
           M68 9 C74 6.5 76 7.5 80 9 C76 10.5 72.5 12 68 9 Z
           M92 9 C86 6.5 84 7.5 80 9 C84 10.5 87.5 12 92 9 Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <circle cx="80" cy="9" r="1.7" fill="currentColor" />
    </svg>
  );
}
