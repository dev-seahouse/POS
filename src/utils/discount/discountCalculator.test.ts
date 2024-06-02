import {
  describe,
  expect,
  it,
} from "vitest";

import {
  Discount,
  Product,
} from "../types";
import calculateDiscount from "./discountCalculator";

const cart: Product[] = [
  { id: 1, name: "Apple", price: 1.0, quantity: 2, productId: "apple" },
  { id: 2, name: "Orange", price: 1.2, quantity: 1, productId: "orange" },
];

const overallDiscount: Discount = {
  type: "overall",
  value: 0.1,
  applicableToAll: true,
};
const thresholdDiscount: Discount = {
  type: "threshold",
  value: 1,
  threshold: 2,
  applicableToAll: true,
};
const bogofDiscount: Discount = {
  type: "bogof",
  value: 0,
  applicableToAll: false,
  applicableProductIds: ["apple"],
};

describe("calculateDiscount", () => {
  it("calculates overall discount: 10% off", () => {
    const { discountAmount, finalTotal } = calculateDiscount(
      cart,
      overallDiscount,
    );
    expect(discountAmount).toBeCloseTo(0.32); // 10% of total
    expect(finalTotal).toBeCloseTo(2.88); // total - discount
  });

  it("calculates threshold discount: > 2 dollar get 1 dollar off", () => {
    const { discountAmount, finalTotal } = calculateDiscount(
      cart,
      thresholdDiscount,
    );
    expect(discountAmount).toBe(1);
    expect(finalTotal).toBe(2.2); // total is less than threshold
  });

  it("calculates BOGOF discount", () => {
    const { discountAmount, finalTotal } = calculateDiscount(
      cart,
      bogofDiscount,
    );
    expect(discountAmount).toBe(1.0); // buy one get one free for apple
    expect(finalTotal).toBeCloseTo(2.2); // total - discount
  });
});
