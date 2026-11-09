// I DO solution: the button is shared now, and the logic is still repeated.
//
//   ToggleButton reuses UI: one place for the button's markup.
//   The useState and toggle lines are still in both Modal and HelpMessage. A component returns
//   JSX, so it can't give isOpen and toggle back to the component that uses it.
//
//   Components reuse UI. Custom hooks reuse logic. Next page: useToggle.

import { useState } from "react";

function ToggleButton({ label, onToggle }) {
  return <button onClick={onToggle}>{label}</button>;
}

function Modal() {
  // Still repeated
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="card">
      <ToggleButton label="Toggle Modal" onToggle={toggle} />
      {isOpen && <p className="muted">Modal is open</p>}
    </div>
  );
}

function HelpMessage() {
  // Still repeated
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="card">
      <ToggleButton label="Toggle Help" onToggle={toggle} />
      {isOpen && <p className="muted">Click a button to open or close it.</p>}
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>Repeated logic</h1>
      <div className="grid">
        <Modal />
        <HelpMessage />
      </div>
    </div>
  );
}
