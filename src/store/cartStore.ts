import { create } from "zustand";

import type { Product } from "../components/product/product.types";
import { addToCart, removeFromCart } from "../utils/cartUtils";

interface CartState {
  cart: Map<number, Product>;
  cartOpen: boolean;
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
  updateProductQuantity: (productId: number, quantity: number) => void;
  toggleCart: () => void;
}

const useCartStore = create<CartState>((set) => ({
  cart: new Map(),
  cartOpen: false,
  addProduct: (product: Product) =>
    set((state) => ({
      cart: addToCart(state.cart, product),
    })),
  removeProduct: (product: Product) =>
    set((state) => ({
      cart: removeFromCart(state.cart, product),
    })),
  updateProductQuantity: (productId: number, quantity: number) =>
    set((state) => {
      const cart = new Map(state.cart);
      const product = cart.get(productId);
      if (product) {
        product.quantity = quantity;
        if (product.quantity <= 0) {
          cart.delete(productId);
        } else {
          cart.set(productId, product);
        }
      }
      return { cart };
    }),
  toggleCart: () => set((state) => ({ cartOpen: !state.cartOpen })),
}));

export default useCartStore;
