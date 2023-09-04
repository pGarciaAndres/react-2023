import PropTypes from "prop-types";

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0;

  return hasMovies ? (
    <ul className="movies">
      {movies.map((movie) => (
        <li className="movie" key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <img src={movie.image} alt={movie.title} />
        </li>
      ))}
    </ul>
  ) : (
    <p>No movies found.</p>
  );
}

Movies.propTypes = {
  movies: PropTypes.array,
};
