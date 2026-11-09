// WE DO: Day 7 recap. Read this app together and answer out loud, pointing at the code.
//
//   1. Why is data fetching an effect?
//   2. What does the dependency array do? Type in the box and watch "Loading...".
//   3. What is loading state? Where does it turn on, and where does it turn off?
//   4. Why should state stay minimal? Find the one value here that is NOT state, and say why.
//
//   Then: "Yesterday we built logic directly inside components. Today we learn how to extract
//   repeated logic into reusable hooks." Imagine three pages that all need this search logic.

import { useEffect, useState } from "react";
import { fetchMovies } from "./movies.js";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function loadMovies() {
      try {
        const data = await fetchMovies(searchTerm);
        if (!ignore) {
          setMovies(data);
          setError(null);
        }
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadMovies();

    return () => {
      ignore = true;
    };
  }, [searchTerm]);

  function handleChange(event) {
    setSearchTerm(event.target.value);
    setIsLoading(true);
  }

  const resultCount = movies.length;

  return (
    <div>
      <h1>Movie search</h1>
      <input value={searchTerm} onChange={handleChange} placeholder="Search movies..." />
      {isLoading && <p className="muted">Loading...</p>}
      {error && <p className="warning">{error}</p>}
      {!isLoading && !error && <p className="muted">{resultCount} results</p>}
      {!error && (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <span>{movie.title}</span>
              <span className="tag">{movie.year}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
