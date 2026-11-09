import Header from "./components/Header";
import TogglePanel from "./components/TogglePanel";
import CounterCard from "./components/CounterCard";
import SavedNote from "./components/SavedNote";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="panel-grid">
        <TogglePanel />
        <CounterCard />
        <SavedNote />
      </main>
    </div>
  );
}

export default App;
