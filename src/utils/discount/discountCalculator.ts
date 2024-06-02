import type { Product } from "../../components/product/product.types";
import type { Discount } from "./discount.types";
import { getDiscountStrategy } from "./discountStrategies";

interface Totals {
  total: number;
  discountAmount: number;
  finalTotal: number;
}

const calculateTotal = (cart: Product[]): number =>
  cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

const calculateDiscount = (cart: Product[], discount: Discount): Totals => {
  const total = calculateTotal(cart);
  const discountStrategy = getDiscountStrategy(discount);
  const discountAmount = discountStrategy(cart, discount.value, discount);

  return {
    total,
    discountAmount,
    finalTotal: total - discountAmount,
  };
};

export default calculateDiscount;
