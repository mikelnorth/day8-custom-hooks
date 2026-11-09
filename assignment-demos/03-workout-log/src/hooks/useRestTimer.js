import { useEffect, useState } from "react"

// EFFECT hook. Clicking Start is an event, and it only flips isRunning.
// But the ticking itself is not caused by any single click: while the timer
// is running, React has to stay in sync with a browser timer (setInterval),
// which lives outside React. "Start a timer" is one of the effect examples
// from class, so the interval goes in useEffect, with a cleanup that clears it.
function useRestTimer(seconds = 90) {
  const [secondsLeft, setSecondsLeft] = useState(seconds)
  const [isRunning, setIsRunning] = useState(false)

  // Derived during render, not stored in state. When the count reaches 0,
  // isTicking turns false on its own, the effect cleans up, and the interval
  // stops. No extra "stop at zero" state update needed.
  const isFinished = secondsLeft === 0
  const isTicking = isRunning && !isFinished

  useEffect(() => {
    if (!isTicking) {
      return
    }

    // The state update lives inside the interval callback, not in the effect
    // body. The updater form means each tick uses the latest secondsLeft, so
    // secondsLeft does not need to be a dependency (and the interval is not
    // torn down and rebuilt every second).
    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => Math.max(prev - 1, 0))
    }, 1000)

    // Cleanup: runs when isTicking changes (stop, reset, or hitting 0) and
    // when the component leaves the screen. Without it, intervals would pile up.
    return () => clearInterval(intervalId)
  }, [isTicking])

  // The functions below are EVENT functions: they run because the user
  // clicked something (or logged a set), and they just update state.
  function start() {
    if (isFinished) {
      setSecondsLeft(seconds)
    }
    setIsRunning(true)
  }

  function stop() {
    setIsRunning(false)
  }

  function reset() {
    setIsRunning(false)
    setSecondsLeft(seconds)
  }

  return {
    secondsLeft,
    isRunning: isTicking,
    isFinished,
    totalSeconds: seconds,
    start,
    stop,
    reset,
  }
}

export default useRestTimer
