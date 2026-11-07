type PhotoPlaceholderProps = {
  label: string;
  caption?: string;
  aspect?: string;
  className?: string;
};

export function PhotoPlaceholder({
  label,
  caption,
  aspect = "aspect-[4/5]",
  className = "",
}: PhotoPlaceholderProps) {
  return (
    <figure className={`relative overflow-hidden ${aspect} ${className}`}>
      <div className="absolute inset-0 bg-[linear-gradient(145deg,#491923_0%,#25171A_45%,#3a2428_100%)]" />
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_30%_20%,rgba(177,138,82,0.45),transparent_45%),radial-gradient(circle_at_70%_80%,rgba(217,191,192,0.25),transparent_40%)]" />
      <div className="absolute inset-4 border border-antique-gold/35" />
      <figcaption className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center">
        <span className="font-label text-[0.65rem] uppercase tracking-[0.22em] text-antique-gold">
          {label}
        </span>
        {caption ? (
          <span className="font-display text-lg text-soft-white/90 sm:text-xl">
            {caption}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}
