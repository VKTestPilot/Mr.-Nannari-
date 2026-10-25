import { useEffect, useRef, useState } from "react";

/**
 * ReactBits-style "Split Text" reveal (see https://reactbits.dev/get-started/index).
 * Implemented locally with no external dependency so it is swappable.
 * Respects prefers-reduced-motion via the global CSS rule.
 */
export function SplitText({ text, className = "", delay = 40 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setShown(true), io.disconnect()), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(" ");
  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            display: "inline-block",
            marginRight: "0.25em",
            opacity: shown ? 1 : 0,
            transform: shown ? "none" : "translateY(0.6em)",
            transition: `opacity .6s ease ${i * delay}ms, transform .6s ease ${i * delay}ms`,
          }}
        >
          {w}
        </span>
      ))}
    </span>
  );
}
