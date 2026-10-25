import { Link, useParams } from "react-router-dom";
import { products } from "../data/products";
import { availabilityLabel, formatPrice } from "../lib/format";
import { useCart } from "../store/cart";
import { ProductImage } from "../components/ProductCard";
import { WhatsAppLink } from "../components/WhatsAppButton";

export default function ProductDetail() {
  const { id } = useParams();
  const { add } = useCart();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="text-3xl font-bold">Product not found</h1>
        <Link to="/catalog" className="btn btn-primary mt-6">Back to catalog</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-2">
      <ProductImage product={product} className="h-80 w-full rounded-2xl md:h-[28rem]" />
      <div>
        <Link to="/catalog" className="underline">← Catalog</Link>
        <p className="mt-4 text-muted">{product.category} · {availabilityLabel[product.availability]}</p>
        <h1 className="mt-1 text-4xl font-bold">{product.name}</h1>
        <p className="mt-4 text-2xl font-semibold">{product.price === null ? "Price on request" : formatPrice(product.price)}</p>
        <p className="mt-4 text-muted">{product.description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {product.price === null ? (
            <WhatsAppLink intent={{ type: "product", productName: product.name }} className="btn btn-primary">Request quote</WhatsAppLink>
          ) : (
            <>
              <button className="btn btn-primary" disabled={product.availability === "out_of_stock"} onClick={() => add(product.id)}>
                Add to cart
              </button>
              <WhatsAppLink intent={{ type: "product", productName: product.name }}>Ask about this</WhatsAppLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
