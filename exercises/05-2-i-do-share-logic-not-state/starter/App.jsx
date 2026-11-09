// I DO: custom hooks share logic, not state.
//
//   1. Open the first panel. Does the second one open? No. Each useToggle() call runs its own
//      useState. Same code, separate state.
//   2. Type in the first note. The second note doesn't change, even though both use the key
//      "day8-shared-note". Each call read localStorage once, when it first rendered. After that,
//      each one has its own state.
//   3. Refresh. Now both notes show what you typed last. They only match because both read the
//      same saved value on load.
//
//   Need two components to show the SAME value? That's lifting state up (Day 3/4), not a hook:
//   call the hook once in the parent and pass the value down as props. See the solution.

import useToggle from "./hooks/useToggle";
import useLocalStorage from "./hooks/useLocalStorage";

function TogglePanel({ title }) {
  const [isOpen, toggle] = useToggle(false);

  return (
    <div className="card">
      <h3>{title}</h3>
      <button onClick={toggle}>{isOpen ? "Hide" : "Show"} Panel</button>
      {isOpen && <p className="muted">This panel is now visible.</p>}
    </div>
  );
}

function NoteBox({ title }) {
  const [note, setNote] = useLocalStorage("day8-shared-note", "");

  return (
    <div className="card">
      <h3>{title}</h3>
      <textarea value={note} onChange={(e) => setNote(e.target.value)} />
      <p className="muted">Saved text: {note}</p>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>Share logic, not state</h1>
      <div className="grid">
        <TogglePanel title="Panel A" />
        <TogglePanel title="Panel B" />
      </div>
      <div className="grid">
        <NoteBox title="Note A" />
        <NoteBox title="Note B" />
      </div>
    </div>
  );
}
