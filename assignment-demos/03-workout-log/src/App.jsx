import Header from "./components/Header"
import HelpPanel from "./components/HelpPanel"
import LogForm from "./components/LogForm"
import RestTimer from "./components/RestTimer"
import StatsBar from "./components/StatsBar"
import WorkoutList from "./components/WorkoutList"
import useToggle from "./hooks/useToggle"
import useLocalStorage from "./hooks/useLocalStorage"
import useRestTimer from "./hooks/useRestTimer"

const REST_SECONDS = 90

function App() {
  const [isHelpOpen, toggleHelp] = useToggle(false)
  const [isPounds, toggleUnits] = useToggle(false)
  const [autoRest, toggleAutoRest] = useToggle(true)
  const [storedEntries, setEntries] = useLocalStorage("workout-log:entries", [])
  const timer = useRestTimer(REST_SECONDS)

  // useLocalStorage protects us from broken JSON, but valid JSON can still be
  // the wrong shape (like "5"). Checking during render keeps .map() safe.
  const entries = Array.isArray(storedEntries) ? storedEntries : []

  // EVENT: the user submitted the form. Save the workout right here, and if
  // auto-rest is on, kick off the timer. The timer's effect then takes over
  // because isRunning changed, not because of anything else in this function.
  function handleLog(entry) {
    setEntries((prev) => [entry, ...(Array.isArray(prev) ? prev : [])])

    if (autoRest) {
      timer.reset()
      timer.start()
    }
  }

  // EVENT: the user clicked Remove. filter() makes a new array, so nothing is mutated.
  function handleRemove(id) {
    setEntries((prev) => prev.filter((entry) => entry.id !== id))
  }

  return (
    <div className="app">
      <Header
        isHelpOpen={isHelpOpen}
        onToggleHelp={toggleHelp}
        isPounds={isPounds}
        onToggleUnits={toggleUnits}
      />

      {isHelpOpen && <HelpPanel onClose={toggleHelp} />}

      <main className="layout">
        <div className="layout__side">
          <LogForm
            isPounds={isPounds}
            onLog={handleLog}
            autoRest={autoRest}
            onToggleAutoRest={toggleAutoRest}
          />
          <RestTimer timer={timer} />
        </div>

        <div className="layout__main">
          <StatsBar entries={entries} isPounds={isPounds} />
          <WorkoutList
            entries={entries}
            isPounds={isPounds}
            onRemove={handleRemove}
          />
        </div>
      </main>

      <footer className="footer">
        Saved on this device only, under <code>workout-log:entries</code>.
      </footer>
    </div>
  )
}

export default App
