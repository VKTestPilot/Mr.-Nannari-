import { useRef, type ReactNode } from "react";

/** ReactBits-style "Spotlight Card": a soft glow follows the pointer. Local, swappable wrapper. */
export function SpotlightCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    ref.current!.style.setProperty("--x", `${e.clientX - r.left}px`);
    ref.current!.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={`relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 ${className}`}
      style={{ backgroundImage: "radial-gradient(240px circle at var(--x,-999px) var(--y,-999px), rgba(200,100,27,.14), transparent 70%)" }}
    >
      {children}
    </div>
  );
}
