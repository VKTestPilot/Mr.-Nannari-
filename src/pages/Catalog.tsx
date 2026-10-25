import { useMemo, useState } from "react";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";

export default function Catalog() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const categories = useMemo(() => ["All", ...Array.from(new Set(products.map((p) => p.category)))], []);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return products.filter(
      (p) =>
        (cat === "All" || p.category === cat) &&
        (!term || [p.name, p.description, ...p.tags].some((s) => s.toLowerCase().includes(term))),
    );
  }, [q, cat]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-4xl font-bold">Catalog</h1>

      <form role="search" className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <div className="field">
          <label htmlFor="search">Search</label>
          <input id="search" type="search" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="category">Category</label>
          <select id="category" value={cat} onChange={(e) => setCat(e.target.value)}>
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </form>

      <p className="mt-4 text-muted" role="status" aria-live="polite">{list.length} result{list.length === 1 ? "" : "s"}</p>

      {list.length === 0 ? (
        <p className="mt-8">No products match your search. Try clearing the filters.</p>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
