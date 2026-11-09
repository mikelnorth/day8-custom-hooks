import useLocalStorage from "../hooks/useLocalStorage";

function SavedNote() {
  const [note, setNote] = useLocalStorage("day8-mistakes-note", "");
  const charCount = note.length;

  return (
    <div className="card">
      <h3>Saved Note</h3>
      <textarea value={note} onChange={(e) => setNote(e.target.value)} />
      <p className="muted">{charCount} characters</p>
    </div>
  );
}

export default SavedNote;
