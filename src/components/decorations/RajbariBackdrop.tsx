type RajbariBackdropProps = {
  className?: string;
};

/** CSS atmospheric Rajbari silhouette — replaced by uploaded hero art when available. */
export function RajbariBackdrop({ className = "" }: RajbariBackdropProps) {
  return (
    <div
      aria-hidden
      className={`decoration-layer absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(177,138,82,0.18),transparent_55%)]" />
      <svg
        viewBox="0 0 1200 700"
        className="absolute bottom-0 left-1/2 h-[55%] w-[140%] max-w-none -translate-x-1/2 text-black/35"
        fill="currentColor"
      >
        <path d="M0 700V420h80v-80h40v80h60V300h50v120h70V260h40v-40h30v40h40v160h90V340h60v80h100V280h45v-50h35v50h45v140h80V360h55v60h70v280z" />
        <path
          d="M180 420v-40M250 420v-60M470 420v-90M690 420v-70M900 420v-50"
          stroke="currentColor"
          strokeWidth="8"
          opacity="0.35"
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#25171A] to-transparent" />
    </div>
  );
}
