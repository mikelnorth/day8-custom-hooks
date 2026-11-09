// I DO solution: the course page's useLocalStorage, with a "day8-" key.
//
//   Why a function in useState(() => ...)? So localStorage is read once, on the first render,
//   not on every render.
//   Why JSON? localStorage only stores strings. JSON.stringify("Ada") is "\"Ada\"", and the same
//   hook can save numbers, true/false, arrays, and objects.
//   Why save in updateValue? The value changes because the user typed. Event, not effect.

import useLocalStorage from "./hooks/useLocalStorage";

function SavedName() {
  const [name, setName] = useLocalStorage("day8-name", "");

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
