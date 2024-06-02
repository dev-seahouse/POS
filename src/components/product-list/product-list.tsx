import type { Product } from "../product/product.types";

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
  return (
    <div className="-mx-2 flex flex-wrap">
      {products.map((product) => (
        <div key={product.id} className="mb-4 w-full px-2 sm:w-1/2 lg:w-1/3">
          <div className="bg-background rounded-lg border p-4 shadow-lg">
            <h3 className="font-heading text-primary mb-2 text-xl font-semibold">
              {product.name}
            </h3>
            <p className="text-text mb-4">${product.price.toFixed(2)}</p>
            <button
              className="bg-primary hover:bg-primary-dark rounded px-4 py-2 font-bold text-white"
              onClick={() => onAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
