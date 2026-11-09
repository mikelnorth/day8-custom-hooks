// I DO: first custom hook. This is the "without a hook" version from the course page.
//
//   The state and the toggle function are logic. The button and the <p> are UI.
//   Move the logic into hooks/useToggle.js, then call it here:
//     const [isOpen, toggle] = useToggle(false);
//   The JSX stays in the component. A hook returns logic and data, never JSX.

import { useState } from "react";

function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <button onClick={toggle}>Toggle Modal</button>
      {isOpen && <p>Modal is open</p>}
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>useToggle</h1>
      <Modal />
    </div>
  );
}
