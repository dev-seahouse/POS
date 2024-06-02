import type { Product } from "../../components/product/product.types";
import type { Discount } from "./discount.types";

type DiscountStrategy = (
  cart: Product[],
  discountValue: number,
  args: Discount,
) => number;

const calculateTotal = (cart: Product[]): number =>
  cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

const overallDiscount: DiscountStrategy = (cart, discountValue, args) => {
  if (args.type !== "overall")
    throw new Error("Invalid arguments for overall discount");
  const total = calculateTotal(cart);
  return total * discountValue;
};

const thresholdDiscount: DiscountStrategy = (cart, discountValue, args) => {
  if (args.type !== "threshold")
    throw new Error("Invalid arguments for threshold discount");
  const total = calculateTotal(cart);
  return total >= args.threshold ? discountValue : 0;
};

const bogofDiscount: DiscountStrategy = (cart, _discountValue, args) => {
  if (args.type !== "bogof")
    throw new Error("Invalid arguments for BOGOF discount");
  let discount = 0;
  cart.forEach((product) => {
    if (args.applicableProductIds.includes(product.productId)) {
      discount += Math.floor(product.quantity / 2) * product.price;
    }
  });
  return discount;
};

export const getDiscountStrategy = (discount: Discount): DiscountStrategy => {
  switch (discount.type) {
    case "overall":
      return overallDiscount;
    case "threshold":
      return thresholdDiscount;
    case "bogof":
      return bogofDiscount;
    default:
      throw new Error("Unsupported discount type");
  }
};
