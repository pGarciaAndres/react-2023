import "./Cart.css";
import { useId } from "react";
import { CartIcon, ClearCartIcon } from "./Icons";
import { useCart } from "../hooks/useCart";

function CartItem({ thumbnail, price, title, quantity, addToCart }) {
  return (
    <li>
      <img src={thumbnail} alt={title} />
      <div>
        <strong>{title}</strong> - ${price}
      </div>
      <footer>
        <small>Qty: {quantity}</small>
        <button onClick={addToCart}>+</button>
      </footer>
    </li>
  );
}

export function Cart() {
  const cartCheckboxId = useId();
  const { cart, addToCart, clearCart } = useCart();

  return (
    <>
      <label htmlFor={cartCheckboxId} className="cart-button">
        <CartIcon />
      </label>
      <input
        className="cart-checkbox"
        type="checkbox"
        id={cartCheckboxId}
        hidden
      />

      <aside className="cart">
        {cart.length === 0 && <h2>Your cart is empty</h2>}
        <ul>
          {cart.map((product) => (
            <CartItem
              key={product.id}
              addToCart={() => addToCart(product)}
              {...product}
            />
          ))}
        </ul>

        <button className="cart-clear" onClick={clearCart}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  );
}
