type AlpanaBackgroundProps = {
  className?: string;
  opacity?: number;
};

export function AlpanaBackground({
  className = "",
  opacity = 0.22,
}: AlpanaBackgroundProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 400"
      className={`decoration-layer absolute left-1/2 top-1/2 h-[min(90vw,28rem)] w-[min(90vw,28rem)] -translate-x-1/2 -translate-y-1/2 text-antique-gold ${className}`}
      style={{ opacity }}
      fill="none"
    >
      <circle cx="200" cy="200" r="170" stroke="currentColor" strokeWidth="1" />
      <circle cx="200" cy="200" r="140" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="200" cy="200" r="90" stroke="currentColor" strokeWidth="1" />
      {Array.from({ length: 12 }).map((_, index) => {
        const angle = (index * 30 * Math.PI) / 180;
        const x1 = 200 + Math.cos(angle) * 95;
        const y1 = 200 + Math.sin(angle) * 95;
        const x2 = 200 + Math.cos(angle) * 155;
        const y2 = 200 + Math.sin(angle) * 155;
        return (
          <g key={index}>
            <path
              d={`M${x1} ${y1} Q${200 + Math.cos(angle + 0.2) * 130} ${200 + Math.sin(angle + 0.2) * 130} ${x2} ${y2}`}
              stroke="currentColor"
              strokeWidth="0.9"
            />
            <circle
              cx={200 + Math.cos(angle) * 168}
              cy={200 + Math.sin(angle) * 168}
              r="3"
              stroke="currentColor"
              strokeWidth="0.8"
            />
          </g>
        );
      })}
      <path
        d="M200 150c-18 18-30 30-30 50 0-20-12-32-30-50 18 6 30 6 60 0Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M200 250c18-18 30-30 30-50 0 20 12 32 30 50-18-6-30-6-60 0Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
    </svg>
  );
}
