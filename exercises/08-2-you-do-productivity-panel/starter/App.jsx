// YOU DO: Day 8 Mini Project, Hook-Powered Utility App: Productivity Panel.
// The static page is done. Nothing responds yet.
//
//   Required features:
//     - one toggle behavior        TogglePanel: show and hide the help panel   (useToggle)
//     - one counter behavior       CounterCard: completed actions               (useCounter)
//     - one persisted value        SavedNote: a username or note               (useLocalStorage)
//     - clean components using custom hooks
//
//   1. Write the three hooks in hooks/. Each file: one hook, export default.
//   2. Wire each component in components/ to its hook. Each component calls its own hook.
//   3. Use the key "day8-mini-note" (or "day8-mini-username").
//   Check: toggle, count, type, then REFRESH. Only the note should survive.
//   Then: README reflection (5 questions, in the handout), and push to GitHub.

import Header from "./components/Header";
import TogglePanel from "./components/TogglePanel";
import CounterCard from "./components/CounterCard";
import SavedNote from "./components/SavedNote";

function App() {
  return (
    <div>
      <Header />
      <div className="grid">
        <TogglePanel />
        <CounterCard />
        <SavedNote />
      </div>
    </div>
  );
}

export default App;
