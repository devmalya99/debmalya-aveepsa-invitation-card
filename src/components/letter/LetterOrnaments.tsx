type CornerProps = {
  className?: string;
};

export function LetterCorner({ className = "" }: CornerProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden
      fill="none"
    >
      <path
        d="M8 56 V18 C8 10 10 8 18 8 H56"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M14 56 V24 C14 16 16 14 24 14 H56"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.55"
        strokeLinecap="round"
      />
      <circle cx="18" cy="18" r="2.2" fill="currentColor" opacity="0.85" />
      <path
        d="M26 14 C30 10 36 10 40 14"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.7"
      />
    </svg>
  );
}

export function LetterHeaderMotif({ className = "" }: CornerProps) {
  return (
    <svg
      viewBox="0 0 180 36"
      className={className}
      aria-hidden
      fill="none"
    >
      <path
        d="M10 18 H68"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.55"
      />
      <path
        d="M112 18 H170"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.55"
      />
      <circle cx="90" cy="18" r="7" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="90" cy="18" r="2.4" fill="currentColor" />
      <path
        d="M78 18 C82 10 98 10 102 18 C98 26 82 26 78 18 Z"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.8"
      />
    </svg>
  );
}

export function LetterFooterMotif({ className = "" }: CornerProps) {
  return (
    <svg
      viewBox="0 0 120 28"
      className={className}
      aria-hidden
      fill="none"
    >
      <path
        d="M8 14 H42"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
      <path
        d="M78 14 H112"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
      <path
        d="M60 5 C66 5 70 9 70 14 C70 20 66 23 60 23 C54 23 50 20 50 14 C50 9 54 5 60 5 Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <circle cx="60" cy="14" r="2" fill="currentColor" />
    </svg>
  );
}
