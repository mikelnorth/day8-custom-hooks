// The timer state and the interval live in useRestTimer (called in App so
// logging a workout can start it). This component only shows it.
function RestTimer({ timer }) {
  const { secondsLeft, isRunning, isFinished, totalSeconds, start, stop, reset } = timer

  // Derived during render: no state needed for the clock text or the bar.
  const minutes = Math.floor(secondsLeft / 60)
  const seconds = String(secondsLeft % 60).padStart(2, "0")
  const percentLeft = (secondsLeft / totalSeconds) * 100

  let statusText = "Ready"
  if (isRunning) statusText = "Resting"
  else if (isFinished) statusText = "Rest over. Next set!"
  else if (secondsLeft < totalSeconds) statusText = "Paused"

  return (
    <section
      className={isFinished ? "card timer timer--done" : "card timer"}
      aria-labelledby="timer-title"
    >
      <div className="timer__head">
        <h2 id="timer-title" className="section-title">Rest timer</h2>
        <p className="timer__status" role="status">{statusText}</p>
      </div>

      <p className="timer__clock" aria-label={`${minutes} minutes ${seconds} seconds left`}>
        {minutes}:{seconds}
      </p>

      <div className="timer__track" aria-hidden="true">
        <div className="timer__bar" style={{ width: `${percentLeft}%` }} />
      </div>

      <div className="timer__buttons">
        {isRunning ? (
          <button type="button" className="btn btn--primary" onClick={stop}>
            Pause
          </button>
        ) : (
          <button type="button" className="btn btn--primary" onClick={start}>
            {isFinished ? "Restart" : "Start"}
          </button>
        )}
        <button type="button" className="btn btn--ghost" onClick={reset}>
          Reset
        </button>
      </div>
    </section>
  )
}

export default RestTimer
