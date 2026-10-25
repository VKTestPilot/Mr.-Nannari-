export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  /** Price in major currency units. null = "Request quote" */
  price: number | null;
  images: string[];
  availability: "in_stock" | "out_of_stock" | "made_to_order";
  tags: string[];
};

export type CartItem = { productId: string; qty: number };
