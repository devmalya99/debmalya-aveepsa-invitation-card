type LotusDividerProps = {
  className?: string;
};

export function LotusDivider({ className = "" }: LotusDividerProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 320 48"
      className={`decoration-layer mx-auto h-8 w-56 text-antique-gold sm:h-10 sm:w-72 ${className}`}
      fill="none"
    >
      <path
        d="M8 24h96M216 24h96"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.7"
      />
      <path
        d="M160 8c-10 10-18 18-18 28 0-10-8-18-18-28 10 4 18 4 36 0Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M142 18c6 4 12 6 18 6s12-2 18-6"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="160" cy="28" r="2.5" fill="currentColor" />
      <circle cx="112" cy="24" r="1.5" fill="currentColor" opacity="0.8" />
      <circle cx="208" cy="24" r="1.5" fill="currentColor" opacity="0.8" />
    </svg>
  );
}
