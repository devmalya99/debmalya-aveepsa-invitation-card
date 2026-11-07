import { FloralCorner } from "./FloralCorner";

type FloralFrameProps = {
  className?: string;
  children?: React.ReactNode;
};

export function FloralFrame({ className = "", children }: FloralFrameProps) {
  return (
    <div className={`relative ${className}`}>
      <FloralCorner corner="tl" className="left-2 top-2 sm:left-4 sm:top-4" />
      <FloralCorner corner="tr" className="right-2 top-2 sm:right-4 sm:top-4" />
      <FloralCorner corner="bl" className="bottom-2 left-2 sm:bottom-4 sm:left-4" />
      <FloralCorner corner="br" className="bottom-2 right-2 sm:bottom-4 sm:right-4" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
