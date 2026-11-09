// YOU DO solution: the suggested structure exactly. Graded answer: don't project it during work time.
//
//   App stays simple: it only arranges components. Each component calls its own hook.
//   The note is the only value that survives a refresh, because it's the only one in localStorage.

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
