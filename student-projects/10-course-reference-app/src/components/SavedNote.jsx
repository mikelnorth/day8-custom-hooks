import useLocalStorage from "../hooks/useLocalStorage";

function SavedNote() {
  const [note, setNote] = useLocalStorage("note", "");

  return (
    <div>
      <h2>Saved Note</h2>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <p>Saved text: {note}</p>
    </div>
  );
}

export default SavedNote;
