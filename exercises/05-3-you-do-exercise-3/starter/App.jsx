// YOU DO: Exercise 3, build useLocalStorage.
//
//   Students build: the hook file, and a name saver app or a persisted notes input.
//   This starter has both, using plain useState for now. Swap one or both to your hook.
//
//   Requirements:
//     - value loads from localStorage
//     - updates are saved
//     - refresh keeps data
//
//   Use these keys: "day8-ex3-name" and "day8-ex3-note".
//   Check: type, then REFRESH the page (saving the file isn't enough to prove it).
//   Look in DevTools > Application > Local Storage. Delete a key there to start over.

import { useState } from "react";

function NameSaver() {
  const [name, setName] = useState("");

  return (
    <div className="card">
      <h3>Name saver</h3>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
      <p className="muted">Welcome back, {name || "stranger"}.</p>
    </div>
  );
}

function NotesInput() {
  const [note, setNote] = useState("");

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
