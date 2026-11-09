// YOU DO solution: one hook, two components, two keys.
//
//   Each component changed one line: useState("") became useLocalStorage("day8-ex3-...", "").
//   The setter has the same shape as useState's, so the inputs didn't change at all.
//   The character count is calculated from note during render. Not state, not an effect.

import useLocalStorage from "./hooks/useLocalStorage";

function NameSaver() {
  const [name, setName] = useLocalStorage("day8-ex3-name", "");

  return (
    <div className="card">
      <h3>Name saver</h3>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
      <p className="muted">Welcome back, {name || "stranger"}.</p>
    </div>
  );
}

function NotesInput() {
  const [note, setNote] = useLocalStorage("day8-ex3-note", "");

  return (
    <div className="card">
      <h3>Notes</h3>
      <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Write a note..." />
      <p className="muted">{note.length} characters</p>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>Exercise 3: useLocalStorage</h1>
      <div className="grid">
        <NameSaver />
        <NotesInput />
      </div>
    </div>
  );
}
