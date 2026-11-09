import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

function SavedNote() {
  const [note, setNote] = useLocalStorage("day8-mistakes-note", "");
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setCharCount(note.length);
  }, [note]);

  return (
    <div className="card">
      <h3>Saved Note</h3>
      <textarea value={note} onChange={(e) => setNote(e.target.value)} />
      <p className="muted">{charCount} characters</p>
    </div>
  );
}

export default SavedNote;
