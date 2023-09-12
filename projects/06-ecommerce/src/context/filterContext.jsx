import { createContext, useState } from "react";
import { MAX_PRICE } from "../constants/constants";

export const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [filter, setFilter] = useState({
    category: "all",
    maxPrice: MAX_PRICE,
  });

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
}
