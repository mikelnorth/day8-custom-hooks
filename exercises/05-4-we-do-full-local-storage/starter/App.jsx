// WE DO: a full-featured useLocalStorage, built on Exercise 3. Work in hooks/useLocalStorage.js.
// Each button below tests one feature. Try it first, see it break, then add the fix.
//
//   1. Bad JSON. Click "Simulate a hand-edited value": it saves the text hello (not JSON) and
//      reloads. JSON.parse throws during the first render, so the app crashes.
//      Fix: JSON.parse inside try/catch, falling back to initialValue.
//   2. Updater functions. Click "Add !". It looks like it worked, but DevTools shows the saved
//      value is the text undefined: JSON.stringify(aFunction) is undefined. Refresh: crash.
//      Fix: if newValue is a function, call it with the current value to get the next value.
//      Do the localStorage write outside of setValue's updater. StrictMode calls updaters twice.
//   3. remove(). Click "Remove". Nothing happens: the hook doesn't return a third item yet.
//      Fix: remove() calls localStorage.removeItem(key) and goes back to initialValue.
//   4. Saving can fail. setItem throws when storage is full, or blocked in some private modes.
//      Fix: setItem inside try/catch. Keep the new value on screen even if it can't be saved.
//   5. Other tabs. Open this page in a second tab, type there, and come back. This tab is stale.
//      Fix: useEffect that listens for the window's "storage" event, with cleanup.
//      Typing is an event. Hearing about another tab is an effect: it's an outside system.
//
//   Clear the key between tries: "Clear saved values" above, or DevTools > Application.

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
