export interface DiscountBase {
  value: number;
  applicableToAll: boolean;
}

export interface OverallDiscount extends DiscountBase {
  type: "overall";
}

export interface ThresholdDiscount extends DiscountBase {
  type: "threshold";
  threshold: number;
}

export interface BogofDiscount extends DiscountBase {
  type: "bogof";
  applicableProductIds: string[];
}

export type Discount = OverallDiscount | ThresholdDiscount | BogofDiscount;
