import { Link } from "react-router-dom";
import type { Product } from "../types";
import { availabilityLabel, formatPrice } from "../lib/format";
import { useCart } from "../store/cart";
import { SpotlightCard } from "./reactbits/SpotlightCard";
import { WhatsAppLink } from "./WhatsAppButton";

export function ProductImage({ product, className = "" }: { product: Product; className?: string }) {
  if (product.images[0]) {
    return <img src={product.images[0]} alt={product.name} loading="lazy" className={`object-cover ${className}`} />;
  }
  return (
    <div role="img" aria-label={`Image placeholder for ${product.name}`} className={`flex items-center justify-center bg-sand text-muted ${className}`}>
      Image placeholder
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const unavailable = product.availability === "out_of_stock";
  return (
    <SpotlightCard>
      <article className="flex h-full flex-col">
        <Link to={`/catalog/${product.id}`} aria-label={`View ${product.name}`}>
          <ProductImage product={product} className="h-48 w-full" />
        </Link>
        <div className="flex flex-1 flex-col gap-2 p-5">
          <p className="text-sm text-muted">{product.category} · {availabilityLabel[product.availability]}</p>
          <h3 className="text-xl font-semibold">
            <Link to={`/catalog/${product.id}`}>{product.name}</Link>
          </h3>
          <p className="font-semibold">{product.price === null ? "Price on request" : formatPrice(product.price)}</p>
          <div className="mt-auto pt-3">
            {product.price === null ? (
              <WhatsAppLink intent={{ type: "product", productName: product.name }}>Request quote</WhatsAppLink>
            ) : (
              <button className="btn btn-primary" disabled={unavailable} onClick={() => add(product.id)}>
                {unavailable ? "Out of stock" : "Add to cart"}
              </button>
            )}
          </div>
        </div>
      </article>
    </SpotlightCard>
  );
}
