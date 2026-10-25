import { useEffect, useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "./LenisProvider";

type Effect = { destroy: () => void };

function lowPower() {
  const nav = navigator as Navigator & { deviceMemory?: number };
  return window.innerWidth < 768 || (nav.deviceMemory !== undefined && nav.deviceMemory <= 2) || navigator.hardwareConcurrency <= 2;
}

/**
 * Hero with the Vanta "Trunk" background (https://www.vantajs.com/?effect=trunk).
 * Vanta + p5 are imported lazily, and only when motion is allowed and the
 * device is capable. Otherwise a static gradient is used. A dark overlay keeps
 * text contrast AA-compliant.
 */
export function VantaHero({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || lowPower() || !ref.current) return;
    let effect: Effect | undefined;
    let cancelled = false;

    (async () => {
      try {
        const [{ default: p5 }, { default: TRUNK }] = await Promise.all([
          import("p5"),
          import("vanta/dist/vanta.trunk.min"),
        ]);
        if (cancelled || !ref.current) return;
        effect = TRUNK({
          el: ref.current,
          p5,
          mouseControls: false,
          touchControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1,
          scaleMobile: 1,
          color: 0xc8641b,
          backgroundColor: 0x14110f,
          spacing: 0,
          chaos: 1,
        });
      } catch {
        /* fall back to the CSS gradient */
      }
    })();

    return () => {
      cancelled = true;
      effect?.destroy();
    };
  }, [reduced]);

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden text-white"
      style={{ background: "radial-gradient(circle at 70% 20%, #3a2410, #14110f 70%)" }}
    >
      <div className="absolute inset-0 -z-0 bg-black/45" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-24 md:py-36">{children}</div>
    </section>
  );
}
