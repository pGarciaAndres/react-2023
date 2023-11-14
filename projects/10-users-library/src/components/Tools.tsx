import { useState } from "react";
import "./Tools.scss";
import { SortType } from "../types.d";

type Props = {
  sorted: SortType;
  onSort: (searchBy: SortType) => void;
  onReset: () => void;
  onSearch: (country: string) => void;
};

function Tools({ sorted, onSort, onReset, onSearch }: Props) {
  const [coloured, setColoured] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const sortedCountry = sorted === SortType.Country;

  const handleColorTable = () => {
    const table = document.getElementById("table-body");
    coloured
      ? table?.classList.remove("table-body--showColors")
      : table?.classList.add("table-body--showColors");
    setColoured(!coloured);
  };

  const handleSortByCountry = () => {
    debugger;
    const sortBy = sortedCountry ? SortType.None : SortType.Country;
    onSort(sortBy);
  };

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="tools">
      <button
        className={coloured ? "tools--selected" : ""}
        onClick={handleColorTable}
      >
        Colorear filas
      </button>
      <button
        className={sortedCountry ? "tools--selected" : ""}
        onClick={handleSortByCountry}
      >
        {sortedCountry ? "No ordenar por país" : "Ordenar por país"}
      </button>
      <button onClick={onReset}>Resetear estado</button>
      <input
        type="text"
        value={search}
        onChange={handleChangeSearch}
        placeholder="Search by Country..."
      />
    </div>
  );
}

export default Tools;
