// I DO solution: hooks/useFetch.js cancels the old request in the effect's cleanup.
//
//   The cleanup runs before the effect runs again (url changed) and when the component goes away
//   (unmount). Either way, the old request is aborted, so its answer never arrives to overwrite
//   anything. Same rule as Day 6: if setup starts it, cleanup stops it.
//   In development, StrictMode's setup, cleanup, setup shows the first request as (canceled).

import { useState } from "react";
import useFetch from "./hooks/useFetch";

const urls = {
  fantasy: "/api/books/fantasy.json?delay=3000",
  mystery: "/api/books/mystery.json?delay=300",
};

function BookResults({ url }) {
  const { data, error, isLoading } = useFetch(url);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="warning">{error}</p>;
  if (!data) return null;

  return (
    <ul>
      {data.map((book) => (
        <li key={book.id}>
          <span>{book.title}</span>
          <span className="tag">{book.author}</span>
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  const [genre, setGenre] = useState("mystery");
  const [showResults, setShowResults] = useState(true);

  function race() {
    setGenre("fantasy");
    setTimeout(() => setGenre("mystery"), 200);
  }

  return (
    <div>
      <h1>The race</h1>
      <div className="row">
        <button className={genre === "fantasy" ? "active" : ""} onClick={() => setGenre("fantasy")}>Fantasy (3 s)</button>
        <button className={genre === "mystery" ? "active" : ""} onClick={() => setGenre("mystery")}>Mystery (0.3 s)</button>
        <button onClick={race}>Race</button>
        <label>
          <input type="checkbox" checked={showResults} onChange={(e) => setShowResults(e.target.checked)} /> Show results
        </label>
      </div>
      <h2>Selected: {genre}</h2>
      {showResults && <BookResults url={urls[genre]} />}
    </div>
  );
}
