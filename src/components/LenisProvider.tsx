import { useEffect, useState, type ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { useCart } from "../store/cart";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/** Stops smooth scroll while an overlay (cart drawer, mobile menu) is open. */
function ScrollLock({ locked }: { locked: boolean }) {
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    if (locked) lenis.stop();
    else lenis.start();
  }, [lenis, locked]);
  return null;
}

export function LenisProvider({ children, menuOpen }: { children: ReactNode; menuOpen: boolean }) {
  const reduced = usePrefersReducedMotion();
  const { open: cartOpen } = useCart();

  // Reduced motion: no smoothing, native scrolling.
  if (reduced) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1, anchors: true }}>
      <ScrollLock locked={cartOpen || menuOpen} />
      {children}
    </ReactLenis>
  );
}
