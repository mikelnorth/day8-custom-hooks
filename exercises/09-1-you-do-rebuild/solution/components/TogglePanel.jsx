import useToggle from "../hooks/useToggle";

function TogglePanel() {
  const [isOpen, toggle] = useToggle(false);

  return (
    <div>
      <h2>Toggle Panel</h2>
      <button onClick={toggle}>
        {isOpen ? "Hide" : "Show"} Panel
      </button>

      {isOpen && <p>This panel is now visible.</p>}
    </div>
  );
}

export default TogglePanel;
