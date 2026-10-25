import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CartItem, Product } from "../types";
import { products } from "../data/products";

type CartCtx = {
  items: CartItem[];
  lines: { product: Product; qty: number }[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const KEY = "nannari-cart-v1";
const Ctx = createContext<CartCtx | null>(null);

function load(): CartItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(load);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable — cart stays in memory */
    }
  }, [items]);

  const add = useCallback((id: string) => {
    setItems((cur) => {
      const found = cur.find((i) => i.productId === id);
      return found
        ? cur.map((i) => (i.productId === id ? { ...i, qty: i.qty + 1 } : i))
        : [...cur, { productId: id, qty: 1 }];
    });
    setOpen(true);
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((cur) =>
      qty <= 0 ? cur.filter((i) => i.productId !== id) : cur.map((i) => (i.productId === id ? { ...i, qty } : i)),
    );
  }, []);

  const remove = useCallback((id: string) => setItems((cur) => cur.filter((i) => i.productId !== id)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartCtx>(() => {
    const lines = items
      .map((i) => ({ product: products.find((p) => p.id === i.productId)!, qty: i.qty }))
      .filter((l) => l.product);
    return {
      items,
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      total: lines.reduce((n, l) => n + (l.product.price ?? 0) * l.qty, 0),
      open,
      setOpen,
      add,
      setQty,
      remove,
      clear,
    };
  }, [items, open, add, setQty, remove, clear]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
