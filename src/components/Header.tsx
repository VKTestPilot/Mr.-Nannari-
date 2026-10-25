import { useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { site } from "../config/site";
import { useCart } from "../store/cart";

const nav = [
  { to: "/", label: "Home" },
  { to: "/catalog", label: "Catalog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Header({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (v: boolean) => void }) {
  const { count, setOpen } = useCart();
  const { pathname } = useLocation();

  useEffect(() => setMenuOpen(false), [pathname, setMenuOpen]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setMenuOpen]);

  const link = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-3 py-2 font-medium ${isActive ? "bg-ink text-white" : "hover:bg-sand"}`;

  return (
    <header className="sticky top-0 z-30 border-b border-sand bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link to="/" className="font-display text-2xl font-bold">
          {site.brand}
        </Link>

        <nav aria-label="Main" className="hidden gap-1 md:flex">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === "/"} className={link}>
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button className="btn btn-ghost" onClick={() => setOpen(true)}>
            Cart <span aria-hidden="true">({count})</span>
            <span className="sr-only">, {count} items</span>
          </button>
          <button
            className="btn btn-ghost md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" aria-label="Mobile" className="flex flex-col gap-1 border-t border-sand px-5 py-3 md:hidden">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === "/"} className={link}>
              {n.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
