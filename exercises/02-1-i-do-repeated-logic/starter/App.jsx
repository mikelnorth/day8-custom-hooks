// I DO: the same logic in two components. Read it, then ask: what is repeated?
//
//   1. Point at the repeated lines. Is it UI (what it looks like) or logic (state + functions)?
//   2. Pull the repeated button into a ToggleButton component. That's reusing UI.
//   3. Are isOpen and toggle still written twice? Yes. A component returns UI, so it can't hand
//      isOpen and toggle back to Modal. That's what a custom hook is for (next page).

import { useState } from "react";

function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="card">
      <button onClick={toggle}>Toggle Modal</button>
      {isOpen && <p className="muted">Modal is open</p>}
    </div>
  );
}

function HelpMessage() {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="card">
      <button onClick={toggle}>Toggle Help</button>
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
