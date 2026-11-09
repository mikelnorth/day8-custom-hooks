// I DO: make a value survive a refresh.
//
//   1. Type a name, then refresh the page. It's gone. useState starts over on every page load.
//   2. Build hooks/useLocalStorage.js, then swap one line:
//        const [name, setName] = useLocalStorage("day8-name", "");
//   3. Type, then REFRESH. Saving the file keeps state, so only a refresh proves it came back
//      from localStorage.
//   4. DevTools > Application > Local Storage > this page's address. Find "day8-name".
//      The value is a string with quotes in it: JSON. Select it and delete it (or use
//      "Clear saved values" in the bar above), then refresh.
//
//   The course page uses the key "name". These exercises all run on one address, and saved values
//   stay between exercises, so every key starts with "day8-" and is different per exercise.

import { useState } from "react";

function SavedName() {
  const [name, setName] = useState("");

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>Name: {name}</p>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>useLocalStorage</h1>
      <SavedName />
    </div>
  );
}
