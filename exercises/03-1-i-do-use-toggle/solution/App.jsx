// I DO solution: the logic lives in hooks/useToggle.js. The component keeps only its UI.
//
//   The course page imports from "./useToggle". Here the hook is in a hooks/ folder, like the
//   course's starter project, so the path is "./hooks/useToggle".
//   Why prevValue? It always flips the latest value, even if toggle runs twice in a row.

import useToggle from "./hooks/useToggle";

function Modal() {
  const [isOpen, toggle] = useToggle(false);

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
