// useFetch solution: the Book Browser with the finished hook in hooks/useFetch.js.
//
//   Try every switch: each genre, None, Poetry (empty), Slow, Fail (500), Bad JSON, Reload.
//   Then click a slow genre and quickly another: the Network tab shows the old request (canceled).
//   Try it live (needs internet): useFetch("https://jsonplaceholder.typicode.com/users")

import { useState } from "react";
import useFetch from "./hooks/useFetch";

const genres = ["fantasy", "mystery", "science", "poetry"];

function buildUrl(genre, { slow, fail, broken }) {
  if (!genre) return null;

  const params = new URLSearchParams({ delay: slow ? "3000" : "600" });
  if (fail) params.set("status", "500");
  if (broken) params.set("broken", "");

  return `/api/books/${genre}.json?${params}`;
}

export default function App() {
  const [genre, setGenre] = useState(null);
  const [slow, setSlow] = useState(false);
  const [fail, setFail] = useState(false);
  const [broken, setBroken] = useState(false);

  const url = buildUrl(genre, { slow, fail, broken });
  const { data, error, isLoading, refetch } = useFetch(url);

  return (
    <div>
      <h1>Book Browser</h1>
      <div className="row">
        {genres.map((name) => (
          <button key={name} className={genre === name ? "active" : ""} onClick={() => setGenre(name)}>
            {name}
          </button>
        ))}
        <button className={genre === null ? "active" : ""} onClick={() => setGenre(null)}>None</button>
      </div>
      <div className="row">
        <label><input type="checkbox" checked={slow} onChange={(e) => setSlow(e.target.checked)} /> Slow (3 s)</label>
        <label><input type="checkbox" checked={fail} onChange={(e) => setFail(e.target.checked)} /> Fail (500)</label>
        <label><input type="checkbox" checked={broken} onChange={(e) => setBroken(e.target.checked)} /> Bad JSON</label>
        <button onClick={refetch} disabled={!url}>Reload</button>
      </div>
      <p className="muted">URL: {url ?? "(none)"}</p>

      {!url && <p>Pick a genre to load books.</p>}
      {isLoading && <p>Loading...</p>}
      {error && (
        <p className="warning">
          {error} <button onClick={refetch}>Try again</button>
        </p>
      )}
      {data && data.length === 0 && <p>No books in this genre yet.</p>}
      {data && data.length > 0 && (
        <ul>
          {data.map((book) => (
            <li key={book.id}>
              <span>{book.title} <span className="muted">by {book.author}</span></span>
              <span className="tag">{book.year}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
