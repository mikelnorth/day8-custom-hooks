// YOU DO (finish early): this Productivity Panel works, and it has all five common mistakes.
// Find them, fix them, then look for the same ones in your own project.
//
//   - putting JSX inside a custom hook
//   - forgetting the use prefix
//   - extracting logic too early
//   - confusing reusable UI with reusable logic
//   - using useEffect automatically without asking why code needs to run
//
//   Clues: open every file in hooks/ and components/. Look for a hook file that ends in .jsx,
//   a hook that doesn't look like a hook, a hook that does almost nothing, one component that
//   is really two, and an effect that only calculates.

import usePanelTitle from "./hooks/usePanelTitle";
import HelpPanel from "./components/HelpPanel";
import CounterCard from "./components/CounterCard";
import SavedNote from "./components/SavedNote";

export default function App() {
  const [title] = usePanelTitle();

  return (
    <div>
      <h1>{title}</h1>
      <div className="grid">
        <HelpPanel />
        <CounterCard variant="done" />
        <CounterCard variant="breaks" />
        <SavedNote />
      </div>
    </div>
  );
}
