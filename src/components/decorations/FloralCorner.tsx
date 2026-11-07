type Corner = "tl" | "tr" | "bl" | "br";

type FloralCornerProps = {
  corner: Corner;
  className?: string;
};

const transforms: Record<Corner, string> = {
  tl: "",
  tr: "scale-x-[-1]",
  bl: "scale-y-[-1]",
  br: "scale-x-[-1] scale-y-[-1]",
};

export function FloralCorner({ corner, className = "" }: FloralCornerProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 160 160"
      className={`decoration-layer absolute h-24 w-24 text-antique-gold sm:h-32 sm:w-32 ${transforms[corner]} ${className}`}
      fill="none"
    >
      <path
        d="M12 12c28 6 48 22 58 48M12 12c8 30 28 52 54 62"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M28 20c10 2 18 10 20 20M42 36c8-2 16 4 18 12"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="70" cy="58" r="3.5" stroke="currentColor" strokeWidth="1" />
      <path
        d="M64 52c4-8 14-10 18-4M76 64c8 2 12 10 8 16"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M20 48c12 4 22 14 26 26M48 22c4 12 14 22 26 26"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.75"
        strokeLinecap="round"
      />
    </svg>
  );
}
