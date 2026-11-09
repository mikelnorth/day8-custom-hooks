// I DO: see the race, then fix it with AbortController in hooks/useFetch.js.
//
//   Fantasy answers in 3 seconds. Mystery answers in 0.3 seconds.
//   1. Open the console. Click "Race": it picks Fantasy, then Mystery 0.2 s later.
//      Mystery's books appear... then at 3 s they vanish, and it says "Loading..." again.
//      Fantasy's late answer overwrote Mystery's result. The console shows the order.
//      (A hook that kept data in its own state would show Fantasy's books under "Mystery".)
//   2. Fix it in the hook: an AbortController per request, its signal passed to fetch, and
//      controller.abort() in the effect's cleanup. Ignore the AbortError in .catch.
//   3. Click "Race" again. Mystery stays. Network tab: the Fantasy request says (canceled).
//   4. Uncheck "Show results" while Fantasy is loading: the request is canceled on unmount too.
//   5. Refresh with the Network tab open. In development, StrictMode runs the effect, its cleanup,
//      then the effect again, so the first request shows (canceled). That's the cleanup working.

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
