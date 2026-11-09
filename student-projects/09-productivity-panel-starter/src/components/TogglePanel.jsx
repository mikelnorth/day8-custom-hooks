// TODO: const [isOpen, toggle] = useToggle(false);
// The button shows and hides the help list, and its label says Show or Hide.

function TogglePanel() {
  return (
    <div className="card">
      <h3>Help</h3>
      <button>Show help</button>
      <ul>
        <li>Click "Done" each time you finish a task.</li>
        <li>Your note is saved in this browser.</li>
      </ul>
    </div>
  );
}

export default TogglePanel;
