// YOU DO (finish early) solution: the five fixes.
//
//   1. JSX inside a custom hook: useToggle returned a <button>. It's back to [value, toggle], and
//      the button is in HelpPanel. useToggle.jsx is useToggle.js again: no JSX, no .jsx.
//   2. Forgetting the use prefix: counter() calls useState, so it's a hook. Now useCounter, and
//      the linter checks it. (Run npx eslint --no-ignore on the starter to see the error it hid.)
//   3. Extracting logic too early: usePanelTitle wrapped a state that never changed. It isn't
//      state at all. Now it's a plain string.
//   4. Confusing reusable UI with reusable logic: CounterCard was two different UIs in one
//      component, just to share counting. The logic is in the hook now, so each card is its
//      own small component: DoneCard and BreaksCard.
//   5. useEffect without asking why: charCount was calculated in an effect. Now it's
//      note.length, during render. Nothing outside React is involved.

import HelpPanel from "./components/HelpPanel";
import DoneCard from "./components/DoneCard";
import BreaksCard from "./components/BreaksCard";
import SavedNote from "./components/SavedNote";

const title = "Productivity Panel";

export default function App() {
  return (
    <div>
      <h1>{title}</h1>
      <div className="grid">
        <HelpPanel />
        <DoneCard />
        <BreaksCard />
        <SavedNote />
      </div>
    </div>
  );
}
