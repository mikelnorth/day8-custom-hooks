// TODO: const [note, setNote] = useLocalStorage("day8-mini-note", "");
// Make the textarea controlled, and show the saved text below it.

function SavedNote() {
  return (
    <div className="card">
      <h3>Saved Note</h3>
      <textarea placeholder="Your name, or a note for later" />
      <p className="muted">Saved text: </p>
    </div>
  );
}

export default SavedNote;
