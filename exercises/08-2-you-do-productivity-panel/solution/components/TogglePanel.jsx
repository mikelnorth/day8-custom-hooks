import useToggle from "../hooks/useToggle";

function TogglePanel() {
  const [isOpen, toggle] = useToggle(false);

  return (
    <div className="card">
      <h3>Help</h3>
      <button onClick={toggle}>{isOpen ? "Hide" : "Show"} help</button>
      {isOpen && (
        <ul>
          <li>Click "Done" each time you finish a task.</li>
          <li>Your note is saved in this browser.</li>
        </ul>
      )}
    </div>
  );
}

export default TogglePanel;
