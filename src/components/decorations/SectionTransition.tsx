type SectionTransitionProps = {
  variant?: "wine-to-ivory" | "ivory-to-wine";
};

export function SectionTransition({
  variant = "wine-to-ivory",
}: SectionTransitionProps) {
  const gradient =
    variant === "wine-to-ivory"
      ? "from-[#25171A] via-[#491923]/40 to-transparent"
      : "from-[#F6EFE3] via-[#F6EFE3]/70 to-transparent";

  return (
    <div
      aria-hidden
      className={`decoration-layer pointer-events-none relative z-10 -mb-16 h-24 bg-gradient-to-b ${gradient}`}
    />
  );
}
