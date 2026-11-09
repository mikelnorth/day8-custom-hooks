// I DO solution: when two components need the same value, lift it up.
//
//   The panels are left alone. Opening one panel shouldn't open the other, so separate state is
//   exactly right there.
//   The notes should match, so App calls useLocalStorage ONCE and passes note and setNote down.
//   Now there is one piece of state, and both boxes show it. That's lifting state up (Day 3/4).
//   The hook didn't change at all. Where you call it decides who owns the state.

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

function NoteBox({ title, note, onNoteChange }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <textarea value={note} onChange={(e) => onNoteChange(e.target.value)} />
      <p className="muted">Saved text: {note}</p>
    </div>
  );
}

export default function App() {
  const [note, setNote] = useLocalStorage("day8-shared-note", "");

  return (
    <div>
      <h1>Share logic, not state</h1>
      <div className="grid">
        <TogglePanel title="Panel A" />
        <TogglePanel title="Panel B" />
      </div>
      <div className="grid">
        <NoteBox title="Note A" note={note} onNoteChange={setNote} />
        <NoteBox title="Note B" note={note} onNoteChange={setNote} />
      </div>
    </div>
  );
}
