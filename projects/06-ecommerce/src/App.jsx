import { Products } from "./components/Products";
import { products as initialProducts } from "./mock/products.json";
import { Filters } from "./components/Filters";
import { useFilter } from "./hooks/useFilter";
import { Footer } from "./components/Footer";
import { Cart } from "./components/Cart";
import { CartProvider } from "./context/cartContext";

function App() {
  const title = "Shopping Cart 🛒";
  const { filterProducts } = useFilter();

  const filteredProducts = filterProducts(initialProducts);

  return (
    <CartProvider>
      <h1>{title}</h1>
      <Cart />
      <Filters />
      <Products products={filteredProducts} />
      <Footer />
    </CartProvider>
  );
}

export default App;
