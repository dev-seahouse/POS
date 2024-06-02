import { expect, test, vi } from "vitest";

import { fireEvent, render, screen } from "@testing-library/react";

import type { Product } from "../product/product.types";
import ProductList from "./product-list";

const products: Product[] = [
  { id: 1, name: "Apple", price: 1.0, quantity: 1, productId: "apple" },
  { id: 2, name: "Orange", price: 1.2, quantity: 1, productId: "orange" },
  { id: 3, name: "Banana", price: 0.8, quantity: 1, productId: "banana" },
];

test("renders product list and adds a product to cart", () => {
  const handleAddToCart = vi.fn();
  render(<ProductList products={products} onAddToCart={handleAddToCart} />);

  products.forEach((product) => {
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(
      screen.getByText(`$${product.price.toFixed(2)}`),
    ).toBeInTheDocument();
  });

  fireEvent.click(screen.getAllByText("Add to Cart")[0]);
  expect(handleAddToCart).toHaveBeenCalledWith(products[0]);
});
