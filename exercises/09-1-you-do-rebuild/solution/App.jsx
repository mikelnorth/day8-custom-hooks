// YOU DO solution: the course page's starter code. The only change is the key, "day8-rebuild-note"
// instead of "note", so it doesn't share a saved value with other exercises.

import TogglePanel from "./components/TogglePanel";
import CounterCard from "./components/CounterCard";
import SavedNote from "./components/SavedNote";

function App() {
  return (
    <div>
      <h1>Day 8 - Custom Hooks</h1>
      <TogglePanel />
      <CounterCard />
      <SavedNote />
    </div>
  );
}

export default App;
