import useToggle from "../hooks/useToggle";

function HelpPanel() {
  const [isOpen, toggle] = useToggle(false);

  return (
    <div className="card">
      <h3>Help</h3>
      <button onClick={toggle}>{isOpen ? "Hide" : "Show"} help</button>
      {isOpen && <p className="muted">Click Done each time you finish a task.</p>}
    </div>
  );
}

export default HelpPanel;
