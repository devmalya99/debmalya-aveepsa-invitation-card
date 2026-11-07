type CinematicOverlayProps = {
  className?: string;
};

export function CinematicOverlay({ className = "" }: CinematicOverlayProps) {
  return (
    <div
      aria-hidden
      className={`decoration-layer absolute inset-0 ${className}`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(37,23,26,0.35)_0%,rgba(37,23,26,0.15)_35%,rgba(37,23,26,0.55)_100%)]" />
      <div className="absolute inset-0 opacity-[0.08] mix-blend-soft-light [background-image:radial-gradient(circle_at_20%_20%,#fff_0.5px,transparent_0.6px),radial-gradient(circle_at_80%_40%,#fff_0.5px,transparent_0.6px)] [background-size:18px_18px]" />
    </div>
  );
}
