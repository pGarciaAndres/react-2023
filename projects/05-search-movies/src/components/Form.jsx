import { useState } from "react";
import { placeholder, sortLabel } from "../constants/labels";
import PropTypes from "prop-types";

export function Form({ name, changeName, sortMovies }) {
  const [sort, setSort] = useState(false);

  const handleSortMovies = () => {
    setSort(!sort);
    sortMovies();
  };

  return (
    <div className="form">
      <input
        type="text"
        value={name}
        onChange={changeName}
        placeholder={placeholder}
      />
      <input
        type="button"
        value={sortLabel}
        onClick={handleSortMovies}
        className={`sort-button${sort ? "--selected" : ""}`}
      />
    </div>
  );
}

Form.propTypes = {
  name: PropTypes.string,
  changeName: PropTypes.func,
  sortMovies: PropTypes.func,
};
