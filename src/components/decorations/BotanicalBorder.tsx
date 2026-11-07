type BotanicalBorderProps = {
  side?: "left" | "right";
  className?: string;
};

export function BotanicalBorder({
  side = "left",
  className = "",
}: BotanicalBorderProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 80 320"
      className={`decoration-layer absolute top-8 hidden h-72 w-16 text-antique-gold md:block ${
        side === "left" ? "left-2" : "right-2 scale-x-[-1]"
      } ${className}`}
      fill="none"
    >
      <path
        d="M40 8c-4 40-18 70-18 110s16 72 18 120"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      {[40, 90, 140, 190, 240].map((y, index) => (
        <path
          key={y}
          d={`M40 ${y}c${index % 2 === 0 ? "-22,-8 -28,10 -18,22" : "22,-8 28,10 18,22"}`}
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
