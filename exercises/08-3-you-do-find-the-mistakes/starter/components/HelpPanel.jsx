import useToggle from "../hooks/useToggle";

function HelpPanel() {
  const [isOpen, , toggleButton] = useToggle(false);

  return (
    <div className="card">
      <h3>Help</h3>
      {toggleButton}
      {isOpen && <p className="muted">Click Done each time you finish a task.</p>}
    </div>
  );
}

export default HelpPanel;
