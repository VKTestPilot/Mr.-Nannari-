import { site } from "../config/site";

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: site.currency, maximumFractionDigits: 0 }).format(n);

export const availabilityLabel = {
  in_stock: "In stock",
  out_of_stock: "Out of stock",
  made_to_order: "Made to order",
} as const;
