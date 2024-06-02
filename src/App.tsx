import CartSidePanel from "./components/cart-side-panel/cart-side-panel";
import ProductList from "./components/product-list/product-list";
import type { Product } from "./components/product/product.types";
import { discountCodes } from "./mocks/dicscountCodes";
import { products } from "./mocks/products";
import useCartStore from "./store/cartStore";

function App() {
  const { cart, addProduct, toggleCart } = useCartStore();

  const cartItemCount = Array.from(cart.values()).reduce(
    (sum, product) => sum + product.quantity,
    0,
  );

  function handleAddToCart(product: Product) {
    addProduct(product);
  }

  return (
    <div className="mx-auto max-w-4xl p-4">
      <header className="pb-4">
        <h1 className="mb-6 text-center font-heading text-4xl font-bold text-primary">
          Fresh Fruit Store
        </h1>
      </header>

      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-heading text-2xl font-bold text-primary">
          Products
        </h2>
        <button className="relative" onClick={toggleCart}>
          <span className="text-3xl text-primary">🛒</span>
          {cartItemCount > 0 && (
            <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>

      <section>
        <ProductList products={products} onAddToCart={handleAddToCart} />
      </section>

      <CartSidePanel discountCodes={discountCodes} />
    </div>
  );
}

export default App;
