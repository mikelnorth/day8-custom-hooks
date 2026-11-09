// WE DO solution: hooks/useLocalStorage.js has all five features. App.jsx didn't change.
//
//   Event or effect? Saving, the updater, and remove() all run because the user did something:
//   events, in the setter. Listening for other tabs runs because the component is on screen and
//   must stay in sync with an outside system: an effect, with cleanup.
//   The storage event only fires in OTHER tabs. Two hooks in this same tab still don't sync:
//   share logic, not state.

import useLocalStorage from "./hooks/useLocalStorage";

const KEY = "day8-full-note";

function SavedNote() {
  const [note, setNote, removeNote] = useLocalStorage(KEY, "");

  function simulateBadValue() {
    localStorage.setItem(KEY, "hello");
    window.location.reload();
  }

  return (
    <div className="card">
      <h3>Saved Note</h3>
      <textarea value={note} onChange={(e) => setNote(e.target.value)} />
      <p className="muted">Saved text: {note}</p>
      <button onClick={() => setNote((prevNote) => prevNote + "!")}>Add !</button>
      <button onClick={removeNote}>Remove</button>
      <button onClick={simulateBadValue}>Simulate a hand-edited value</button>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>A full-featured useLocalStorage</h1>
      <SavedNote />
    </div>
  );
}
