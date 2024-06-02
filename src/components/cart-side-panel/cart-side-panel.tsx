import React, { useState } from "react";

import useCartStore from "../../store/cartStore";
import type { Discount } from "../../utils/discount/discount.types";
import calculateDiscount from "../../utils/discount/discountCalculator";

interface CartSidePanelProps {
  discountCodes: { [code: string]: Discount };
}

const CartSidePanel: React.FC<CartSidePanelProps> = ({ discountCodes }) => {
  const { cart, removeProduct, cartOpen, toggleCart, updateProductQuantity } =
    useCartStore();
  const cartItems = Array.from(cart.values());

  const [discount, setDiscount] = useState<Discount | null>(null);
  const [discountCode, setDiscountCode] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleApplyDiscountCode = () => {
    const discount = discountCodes[discountCode.toUpperCase()];
    if (discount) {
      setDiscount(discount);
      setError(null); // Clear any previous error messages
    } else {
      setError("Error applying discount: Invalid discount code");
    }
  };

  const { total, discountAmount, finalTotal } = discount
    ? calculateDiscount(cartItems, discount)
    : {
        total: cartItems.reduce(
          (sum, product) => sum + product.price * product.quantity,
          0,
        ),
        discountAmount: 0,
        finalTotal: cartItems.reduce(
          (sum, product) => sum + product.price * product.quantity,
          0,
        ),
      };

  return (
    <div
      className={`fixed right-0 top-0 h-full w-80 transform bg-background shadow-lg transition-transform ${cartOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="font-heading text-2xl font-bold text-primary">
          Shopping Cart
        </h2>
        <button onClick={toggleCart} className="text-2xl text-gray-700">
          &times;
        </button>
      </div>
      <div className="p-4">
        {cartItems.length === 0 ? (
          <p className="text-text">Your cart is empty</p>
        ) : (
          <div>
            {cartItems.map((product) => (
              <div
                key={product.id}
                className="mb-4 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-heading text-lg font-semibold text-primary">
                    {product.name}
                  </h3>
                  <p className="text-text">
                    ${product.price.toFixed(2)} x {product.quantity}
                  </p>
                  <div className="mt-2 flex items-center">
                    <button
                      className="rounded-l bg-gray-300 px-2 py-1 font-bold text-gray-800 hover:bg-gray-400"
                      onClick={() =>
                        updateProductQuantity(product.id, product.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={product.quantity}
                      onChange={(e) =>
                        updateProductQuantity(
                          product.id,
                          parseInt(e.target.value, 10),
                        )
                      }
                      className="w-12 border-b border-t border-gray-300 text-center"
                    />
                    <button
                      className="rounded-r bg-gray-300 px-1 py-1 font-bold text-gray-800 hover:bg-gray-400"
                      onClick={() =>
                        updateProductQuantity(product.id, product.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="rounded bg-red-500 px-2 py-1 font-bold text-white hover:bg-red-700"
                  onClick={() => removeProduct(product)}
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="mt-6 rounded-lg border bg-background p-4 shadow-lg">
              <h2 className="mb-4 font-heading text-sm font-bold text-primary">
                Apply Discount Code
              </h2>
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Enter discount code"
                className="mb-4 mt-1 block w-full rounded-sm border-gray-300 p-1"
              />
              <button
                onClick={handleApplyDiscountCode}
                className="rounded bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary-dark"
              >
                Apply Discount
              </button>
              {error && <p className="mt-4 text-red-500">{error}</p>}
            </div>
            <div className="mt-4 border-t pt-4">
              <h3 className="font-heading text-lg font-semibold">
                Total: ${total.toFixed(2)}
              </h3>
              {discount && (
                <h3 className="font-heading text-lg font-semibold">
                  Discount: ${discountAmount.toFixed(2)}
                </h3>
              )}
              <h3 className="font-heading text-xl font-bold text-primary">
                Final Total: ${finalTotal.toFixed(2)}
              </h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidePanel;
