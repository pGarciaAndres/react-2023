import { useCart } from "../hooks/useCart";
import { AddToCartIcon, RemoveFromCartIcon } from "./Icons";
import "./Products.css";

export function Products({ products }) {
  const { cart, addToCart, removeFromCart } = useCart();

  const checkProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };

  return (
    <ul className="products">
      {products.map((product) => {
        const isProductInCart = checkProductInCart(product);

        return (
          <li key={product.id} className="product">
            <img src={product.thumbnail} alt={product.title} />
            <div className="product-tile">
              <section>
                <strong>{product.brand}</strong>
                <h3>
                  {product.title} - {`$${product.price}`}
                </h3>
              </section>
              <button
                style={{ backgroundColor: isProductInCart ? "red" : "#09f" }}
                onClick={() => {
                  isProductInCart
                    ? removeFromCart(product)
                    : addToCart(product);
                }}
              >
                {isProductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
