import { useCallback, useMemo, useRef, useState } from "react";
import { API_KEY, URL_PREFIX } from "../constants/api";
import PropTypes from "prop-types";

export function useMovies({ name, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const prevName = useRef(name);

  const getMovies = useCallback(async ({ name }) => {
    if (name === prevName.current) return;

    try {
      setLoading(true);
      prevName.current = name;

      const response = await fetch(
        `${URL_PREFIX}/?apikey=${API_KEY}&s=${name}`
      );
      const json = await response.json();
      const movies = json.Search ? json.Search : [];
      const mappedMovies = movies?.map((movie) => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        image: movie.Poster,
      }));
      setMovies(mappedMovies);
      setError(false);
    } catch (error) {
      setError(true);
      throw new Error("Error searching movies");
    } finally {
      setLoading(false);
    }
  }, []);

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]);

  return { movies: sortedMovies, getMovies, loading, error };
}

useMovies.propTypes = {
  title: PropTypes.string,
};
