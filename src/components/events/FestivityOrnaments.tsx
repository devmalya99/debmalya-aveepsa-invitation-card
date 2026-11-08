type OrnamentProps = {
  className?: string;
};

export function FestivityHeaderOrnament({ className = "" }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 120 48"
      className={className}
      aria-hidden
      fill="none"
    >
      <path
        className="events-draw-path"
        d="M12 24 H42"
        stroke="currentColor"
        strokeWidth="1"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
      />
      <path
        className="events-draw-path"
        d="M78 24 H108"
        stroke="currentColor"
        strokeWidth="1"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
      />
      <path
        className="events-draw-path"
        d="M60 8 C66 12 68 18 60 24 C52 18 54 12 60 8 Z
           M44 24 C52 20 54 22 60 24 C54 28 50 30 44 24 Z
           M76 24 C68 20 66 22 60 24 C66 28 70 30 76 24 Z
           M48 14 C54 16 56 20 60 24 C54 20 50 18 48 14 Z
           M72 14 C66 16 64 20 60 24 C66 20 70 18 72 14 Z"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinejoin="round"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
      />
      <circle
        className="events-draw-fill"
        cx="60"
        cy="24"
        r="2.4"
        fill="currentColor"
        opacity="0"
      />
    </svg>
  );
}

export function FestivityLotusNode({ className = "" }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden
      fill="none"
    >
      <circle
        className="events-draw-path"
        cx="20"
        cy="20"
        r="15"
        stroke="currentColor"
        strokeWidth="1"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
      />
      <path
        className="events-draw-path"
        d="M20 8 C23 12 24 15 20 20 C16 15 17 12 20 8 Z
           M20 32 C17 28 16 25 20 20 C24 25 23 28 20 32 Z
           M8 20 C12 17 15 16 20 20 C15 24 12 23 8 20 Z
           M32 20 C28 23 25 24 20 20 C25 16 28 17 32 20 Z"
        stroke="currentColor"
        strokeWidth="1.05"
        strokeLinejoin="round"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
      />
      <circle
        className="events-draw-fill"
        cx="20"
        cy="20"
        r="2"
        fill="currentColor"
        opacity="0"
      />
    </svg>
  );
}

export function FestivityDateMedallion({
  className = "",
  tone = "gold",
}: OrnamentProps & { tone?: "gold" | "burgundy" }) {
  const stroke = tone === "burgundy" ? "#741E26" : "#B99A58";

  return (
    <svg viewBox="0 0 56 56" className={className} aria-hidden fill="none">
      <circle
        className="events-draw-path"
        cx="28"
        cy="28"
        r="24"
        stroke={stroke}
        strokeWidth="1.2"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
      />
      <circle
        className="events-draw-path"
        cx="28"
        cy="28"
        r="18"
        stroke={stroke}
        strokeWidth="0.8"
        opacity="0.65"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
      />
      <path
        className="events-draw-path"
        d="M28 14 C31 18 32 21 28 28 C24 21 25 18 28 14 Z
           M28 42 C25 38 24 35 28 28 C32 35 31 38 28 42 Z"
        stroke={stroke}
        strokeWidth="1"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
      />
    </svg>
  );
}

/** Vertical timeline stroke — animated via strokeDashoffset on `.events-rail-line`. */
export function FestivityTimelineRail({ className = "" }: OrnamentProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 4 400"
      preserveAspectRatio="none"
      aria-hidden
      fill="none"
    >
      <defs>
        <linearGradient id="festivity-rail-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b99a58" />
          <stop offset="55%" stopColor="#B99A58" stopOpacity="0.72" />
          <stop offset="100%" stopColor="#741E26" stopOpacity="0.78" />
        </linearGradient>
      </defs>
      <line
        className="events-rail-line"
        x1="2"
        y1="8"
        x2="2"
        y2="392"
        stroke="url(#festivity-rail-grad)"
        strokeWidth="1.35"
        strokeLinecap="round"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
      />
    </svg>
  );
}
