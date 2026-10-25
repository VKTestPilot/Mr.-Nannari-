import type { ButtonHTMLAttributes } from "react";

/** ReactBits-style shiny CTA button. Local, swappable wrapper around a native <button>. */
export function ShinyButton({ className = "", children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...rest} className={`btn btn-primary relative overflow-hidden ${className}`}>
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 hover:translate-x-full"
      />
    </button>
  );
}
