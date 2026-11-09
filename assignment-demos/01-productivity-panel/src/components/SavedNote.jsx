import useLocalStorage from "../hooks/useLocalStorage";

function SavedNote() {
  const [note, setNote] = useLocalStorage("productivity-panel:note", "");

  return (
    <section className="card">
      <h2>Saved Note</h2>
      <label htmlFor="note">Today's focus</label>
      <textarea
        id="note"
        rows="4"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="What are you working on?"
      />
      <div className="note-footer">
        <span>{note.length} characters</span>
        <button
          className="button secondary"
          onClick={() => setNote("")}
          disabled={note === ""}
        >
          Clear note
        </button>
      </div>
    </section>
  );
}

export default SavedNote;
