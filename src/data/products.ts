import type { Product } from "../types";

/** PLACEHOLDER catalog — replace with the real product/service list and prices. */
export const products: Product[] = [
  {
    id: "sample-1",
    name: "Sample Product One (placeholder)",
    category: "Category A",
    description: "Placeholder description. Replace with real product details.",
    price: 499,
    images: [],
    availability: "in_stock",
    tags: ["placeholder", "featured"],
  },
  {
    id: "sample-2",
    name: "Sample Product Two (placeholder)",
    category: "Category B",
    description: "Placeholder description. Replace with real product details.",
    price: 899,
    images: [],
    availability: "made_to_order",
    tags: ["placeholder", "featured"],
  },
  {
    id: "sample-3",
    name: "Sample Service Three (placeholder)",
    category: "Category B",
    description: "Placeholder service priced on request.",
    price: null,
    images: [],
    availability: "in_stock",
    tags: ["placeholder"],
  },
];
