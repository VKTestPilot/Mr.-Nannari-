import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { site } from "../config/site";
import { useCart } from "../store/cart";
import { formatPrice } from "../lib/format";
import { checkoutSchema, validate, type FieldErrors } from "../lib/schemas";
import { submitOrder } from "../lib/api";
import { FormField } from "../components/FormField";
import { WhatsAppLink } from "../components/WhatsAppButton";

type Status = "idle" | "loading" | "error" | "success";

export default function Checkout() {
  const { lines, total, clear } = useCart();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [orderId, setOrderId] = useState("");

  if (status === "success") {
    return (
      <div className="mx-auto max-w-2xl px-5 py-16" role="status">
        <h1 className="text-4xl font-bold">Order received</h1>
        <p className="mt-4">Thank you! Your order reference is <strong>{orderId}</strong>. We will contact you to confirm.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/catalog" className="btn btn-primary">Continue shopping</Link>
          <WhatsAppLink intent={{ type: "order_status", orderId }}>Check order status</WhatsAppLink>
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-16">
        <h1 className="text-4xl font-bold">Checkout</h1>
        <p className="mt-4 text-muted">Your cart is empty.</p>
        <Link to="/catalog" className="btn btn-primary mt-6">Browse catalog</Link>
      </div>
    );
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const result = validate(checkoutSchema, data);
    if (!result.ok) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    setStatus("loading");
    try {
      const res = await submitOrder({
        customer: result.data,
        items: lines.map((l) => ({ id: l.product.id, name: l.product.name, qty: l.qty, price: l.product.price })),
        total,
      });
      setOrderId(res.id);
      clear();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-[1fr_22rem]">
      <form onSubmit={onSubmit} noValidate className="space-y-5" aria-labelledby="checkout-title">
        <h1 id="checkout-title" className="text-4xl font-bold">Checkout</h1>
        <FormField label="Full name" name="name" error={errors.name} autoComplete="name" />
        <FormField label="Phone" name="phone" type="tel" error={errors.phone} autoComplete="tel" />
        <FormField label="Email (optional)" name="email" type="email" error={errors.email} autoComplete="email" />
        <FormField label="Delivery address" name="address" as="textarea" error={errors.address} autoComplete="street-address" />
        <FormField label="Payment option" name="payment" as="select" options={site.paymentOptions} error={errors.payment} />
        <FormField label="Order notes (optional)" name="notes" as="textarea" error={errors.notes} />

        {status === "error" && (
          <p role="alert" className="rounded-lg bg-red-50 p-3 text-red-800">
            Something went wrong sending your order. Please try again or message us on WhatsApp.
          </p>
        )}
        <button className="btn btn-primary" disabled={status === "loading"}>
          {status === "loading" ? "Placing order…" : "Place order"}
        </button>
      </form>

      <aside aria-labelledby="summary" className="h-fit rounded-2xl bg-white p-5 ring-1 ring-black/5">
        <h2 id="summary" className="text-2xl font-bold">Order summary</h2>
        <ul className="mt-4 space-y-2">
          {lines.map(({ product, qty }) => (
            <li key={product.id} className="flex justify-between gap-3">
              <span>{product.name} × {qty}</span>
              <span>{product.price === null ? "—" : formatPrice(product.price * qty)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 flex justify-between border-t border-sand pt-3 text-lg font-semibold">
          <span>Total</span><span>{formatPrice(total)}</span>
        </p>
      </aside>
    </div>
  );
}
