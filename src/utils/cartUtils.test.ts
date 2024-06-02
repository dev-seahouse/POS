import {
  describe,
  expect,
  it,
} from "vitest";

import type { Product } from "../components/product/product.types";
import {
  addToCart,
  removeFromCart,
} from "./cartUtils";

const product1: Product = {
  id: 1,
  name: "Apple",
  price: 1.0,
  quantity: 1,
  productId: "apple",
};
const product2: Product = {
  id: 2,
  name: "Orange",
  price: 1.2,
  quantity: 1,
  productId: "orange",
};

describe("cartUtils", () => {
  it("adds product to cart", () => {
    const cart = new Map<number, Product>();
    const updatedCart = addToCart(cart, product1);
    expect(updatedCart.get(product1.id)?.quantity).toBe(1);
    const updatedCart2 = addToCart(updatedCart, product1);
    expect(updatedCart2.get(product1.id)?.quantity).toBe(2);
  });

  it("removes product from cart", () => {
    let cart = new Map<number, Product>();
    cart = addToCart(cart, product1);
    cart = addToCart(cart, product2);
    const updatedCart = removeFromCart(cart, product1);
    expect(updatedCart.has(product1.id)).toBe(false);

    const updatedCart2 = removeFromCart(updatedCart, product2);
    expect(updatedCart2.has(product2.id)).toBe(false);
  });
});
