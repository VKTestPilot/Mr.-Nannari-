import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../store/cart";
import { formatPrice } from "../lib/format";

export function CartDrawer() {
  const { open, setOpen, lines, total, setQty, remove } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream p-5 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Your cart</h2>
          <button ref={closeRef} className="btn btn-ghost" onClick={() => setOpen(false)}>Close</button>
        </div>

        {lines.length === 0 ? (
          <p className="mt-8 text-muted">Your cart is empty. Browse the catalog to add items.</p>
        ) : (
          <ul className="mt-6 flex-1 space-y-4 overflow-y-auto">
            {lines.map(({ product, qty }) => (
              <li key={product.id} className="rounded-xl bg-white p-4">
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-muted">{product.price === null ? "Price on request" : formatPrice(product.price)}</p>
                <div className="mt-2 flex items-center gap-2">
                  <button className="btn btn-ghost !min-w-[44px] !px-0" aria-label={`Decrease quantity of ${product.name}`} onClick={() => setQty(product.id, qty - 1)}>−</button>
                  <span aria-live="polite" className="w-8 text-center">{qty}</span>
                  <button className="btn btn-ghost !min-w-[44px] !px-0" aria-label={`Increase quantity of ${product.name}`} onClick={() => setQty(product.id, qty + 1)}>+</button>
                  <button className="ml-auto underline" onClick={() => remove(product.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 border-t border-sand pt-4">
          <p className="flex justify-between text-lg font-semibold"><span>Total</span><span>{formatPrice(total)}</span></p>
          <Link
            to="/checkout"
            onClick={() => setOpen(false)}
            className={`btn btn-primary mt-4 w-full ${lines.length === 0 ? "pointer-events-none opacity-50" : ""}`}
            aria-disabled={lines.length === 0}
          >
            Checkout
          </Link>
        </div>
      </aside>
    </div>
  );
}
