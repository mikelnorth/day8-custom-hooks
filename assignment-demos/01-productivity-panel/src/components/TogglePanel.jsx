import useToggle from "../hooks/useToggle";

function TogglePanel() {
  const [isOpen, toggle] = useToggle(false);

  return (
    <section className="card">
      <h2>Help</h2>
      <button className="button" onClick={toggle} aria-expanded={isOpen}>
        {isOpen ? "Hide help" : "Show help"}
      </button>

      {isOpen && (
        <ul className="help-list">
          <li>Press "+1" each time you finish a task.</li>
          <li>Use "-1" if you counted by mistake.</li>
          <li>Your note saves as you type, even after a refresh.</li>
        </ul>
      )}
    </section>
  );
}

export default TogglePanel;
