import { useCart } from "../hooks/useCart";
import { useFilter } from "../hooks/useFilter";
import "./Footer.css";

export function Footer() {
  const { filter } = useFilter();
  const { cart } = useCart();

  const filterMsj = `Filter: ${
    filter.maxPrice
  } / ${filter.category.toUpperCase()}`;

  const cartMsj = `Different articles in Cart: ${cart.length}`;

  return (
    <footer className="footer">
      <h4>ECommerce Project</h4>
      <h5>{filterMsj}</h5>

      <h5>{cartMsj}</h5>
    </footer>
  );
}
