import { useContext } from "react";
import { FilterContext } from "../context/filterContext";

export function useFilter() {
  const { filter, setFilter } = useContext(FilterContext);

  const filterProducts = (productList) => {
    return productList.filter((product) => {
      return (
        (filter.maxPrice === 0 || product.price <= filter.maxPrice) &&
        (filter.category === "all" || filter.category === product.category)
      );
    });
  };

  return { filter, filterProducts, setFilter };
}
