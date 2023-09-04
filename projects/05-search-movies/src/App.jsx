import { useCallback, useState } from "react";
import "./App.css";
import { Form } from "./components/Form";
import { title, errorText } from "./constants/labels";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import debounce from "just-debounce-it";

function App() {
  const [name, setName] = useState("");
  const [sort, setSort] = useState(false);
  const { movies, getMovies, loading, error } = useMovies({ name, sort });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGetMovies = useCallback(
    debounce((name) => {
      console.log("search", name);
      getMovies({ name });
    }, 500),
    []
  );

  const changeName = (event) => {
    const newName = event.target.value;
    setName(newName);
    debouncedGetMovies(newName);
  };

  const sortMovies = () => {
    setSort(!sort);
  };

  return (
    <>
      <header>
        <h1>{title}</h1>
        <Form name={name} changeName={changeName} sortMovies={sortMovies} />
      </header>
      <main>
        {loading ? <p>Loading...</p> : <Movies movies={movies} />}
        {error && <section className="error">{errorText}</section>}
      </main>
    </>
  );
}

export default App;
