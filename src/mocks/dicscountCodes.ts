import type { Discount } from "../utils/discount/discount.types";

export const discountCodes: { [code: string]: Discount } = {
  OVERALL10: { type: "overall", value: 0.1, applicableToAll: true },
  BOGOFAPPLE: {
    type: "bogof",
    value: 0,
    applicableToAll: false,
    applicableProductIds: ["apple"],
  },
  THRESHOLD50: {
    type: "threshold",
    value: 50,
    threshold: 200,
    applicableToAll: true,
  },
};
