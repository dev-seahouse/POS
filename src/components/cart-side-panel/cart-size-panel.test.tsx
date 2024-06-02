import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";

import type { Discount } from "../../utils/discount/discount.types";
import type { Product } from "../product/product.types";
import CartSidePanel from "./cart-side-panel";

const products: Product[] = [
  { id: 1, name: "Apple", price: 1.0, quantity: 2, productId: "apple" },
  { id: 2, name: "Orange", price: 1.2, quantity: 3, productId: "orange" },
];

const discountCodes: { [code: string]: Discount } = {
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

vi.mock("../../store/cartStore", () => {
  const originalModule = vi.importActual("../../store/cartStore");
  return {
    __esModule: true,
    ...originalModule,
    default: vi.fn(() => ({
      cart: new Map(products.map((p) => [p.id, p])),
      removeProduct: vi.fn(),
      updateProductQuantity: vi.fn(),
      cartOpen: true,
      toggleCart: vi.fn(),
    })),
  };
});

describe("CartSidePanel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders cart items and applies discount code", () => {
    render(<CartSidePanel discountCodes={discountCodes} />);

    products.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(
        screen.getByText(`$${product.price.toFixed(2)} x ${product.quantity}`),
      ).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText("Enter discount code"), {
      target: { value: "OVERALL10" },
    });
    fireEvent.click(screen.getByText("Apply Discount"));

    expect(screen.getByText("Discount: $0.56")).toBeInTheDocument();
    expect(screen.getByText("Final Total: $5.04")).toBeInTheDocument();
  });
});
