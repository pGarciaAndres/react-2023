import { useId } from "react";
import "./Filters.css";
import { MIN_PRICE, MAX_PRICE } from "../constants/constants.js";
import { useFilter } from "../hooks/useFilter";

export function Filters() {
  const priceFilterId = useId();
  const categoryFilterId = useId();

  const { filter, setFilter } = useFilter();

  const handleChangePrice = (event) => {
    setFilter((prevState) => ({
      ...prevState,
      maxPrice: event.target.value,
    }));
  };

  const handleChangeCategory = (event) => {
    setFilter((prevState) => ({
      ...prevState,
      category: event.target.value,
    }));
  };

  return (
    <section className="filter">
      <div>
        <label htmlFor={priceFilterId}>Price</label>
        <input
          id={priceFilterId}
          type="range"
          min={MIN_PRICE}
          max={MAX_PRICE}
          value={filter.maxPrice}
          onChange={handleChangePrice}
        />
        <span>{filter.maxPrice}</span>
      </div>

      <div>
        <label htmlFor={categoryFilterId}>Category</label>
        <select
          name="category"
          id={categoryFilterId}
          onChange={handleChangeCategory}
        >
          <option value="all">All</option>
          <option value="home-decoration">Decoration</option>
          <option value="laptops">Laptops</option>
        </select>
      </div>
    </section>
  );
}
