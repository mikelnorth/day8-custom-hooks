// WE DO: build useFetch, one edge case at a time. App.jsx is done. Work in hooks/useFetch.js.
//
//   const { data, error, isLoading, refetch } = useFetch(url);
//
//   The books come from this lesson's pretend API (public/api/books/*.json), so no internet is
//   needed. The checkboxes add ?delay=3000, ?status=500, or ?broken to the URL on purpose.
//
//   After each step, try it here:
//     1. Loading, error, data    pick Fantasy: "Loading..." then three books
//     2. !response.ok, bad JSON  tick "Fail (500)", then "Bad JSON": a clear error, not a crash
//     3. No URL, empty result    click None: no request at all. Pick Poetry: "No books yet."
//     4. refetch()               click Reload: "Loading..." again, then the books

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
