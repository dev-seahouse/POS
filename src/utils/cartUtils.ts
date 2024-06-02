import type { Product } from "../components/product/product.types";

export const addToCart = (
  cart: Map<number, Product>,
  product: Product,
): Map<number, Product> => {
  const updatedCart = new Map(cart);
  if (updatedCart.has(product.id)) {
    const existingProduct = updatedCart.get(product.id)!;
    updatedCart.set(product.id, {
      ...existingProduct,
      quantity: existingProduct.quantity + 1,
    });
  } else {
    updatedCart.set(product.id, { ...product, quantity: 1 });
  }
  return updatedCart;
};

export const removeFromCart = (
  cart: Map<number, Product>,
  product: Product,
): Map<number, Product> => {
  const updatedCart = new Map(cart);
  if (updatedCart.has(product.id)) {
    const existingProduct = updatedCart.get(product.id)!;
    if (existingProduct.quantity > 1) {
      updatedCart.set(product.id, {
        ...existingProduct,
        quantity: existingProduct.quantity - 1,
      });
    } else {
      updatedCart.delete(product.id);
    }
  }
  return updatedCart;
};
