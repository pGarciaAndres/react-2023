import { useContext } from "react";
import { CartContext } from "../context/cartContext";

export function useCart() {
  const cartContext = useContext(CartContext);

  if (cartContext === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return cartContext;
}
