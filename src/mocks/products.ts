import type { Product } from "src/components/product/product.types";

export const products = [
  { id: 1, name: "Apple", price: 1.0, quantity: 1, productId: "apple" },
  { id: 2, name: "Orange", price: 1.2, quantity: 1, productId: "orange" },
  { id: 3, name: "Banana", price: 0.8, quantity: 1, productId: "banana" },
] satisfies Product[];
