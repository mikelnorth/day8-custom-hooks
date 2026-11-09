import useLocalStorage from "../hooks/useLocalStorage";

function SavedNote() {
  const [note, setNote] = useLocalStorage("day8-mini-note", "");

  return (
    <div className="card">
      <h3>Saved Note</h3>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Your name, or a note for later"
      />
      <p className="muted">Saved text: {note}</p>
    </div>
  );
}

export default SavedNote;
