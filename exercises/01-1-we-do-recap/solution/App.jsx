// WE DO: model answers for the Day 7 recap.
//
//   1. Why is data fetching an effect? The data lives outside React, on a server. We need it
//      because the component is on screen with this search term, not because of one click.
//   2. What does the dependency array do? [searchTerm] runs the effect again only when searchTerm
//      changes. The cleanup sets ignore, so an old, slow answer can't overwrite a newer one.
//   3. What is loading state? State that says "we asked and are still waiting", so the UI can say
//      so. It turns on in the change handler and off when the answer (or an error) comes back.
//   4. Why should state stay minimal? resultCount is calculated from movies during render. Storing
//      it in state too would mean keeping two values in sync by hand.
//
//   Today's question: if three pages needed this search logic, would you copy it three times?
//   On Day 9 you can move it into a custom hook, useMovies(searchTerm). Today we learn how.

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
