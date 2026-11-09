import { useState } from "react"

// EVENT hook. A count only changes when the user presses + or -, so the
// math happens inside the event functions. No outside system, no effect.
//
// I added an optional { min, max } so the same hook works for sets (1-10)
// and reps (1-30) without each component writing its own bounds checks.
function useCounter(initialValue = 0, { min = 0, max = Infinity } = {}) {
  const [count, setCount] = useState(initialValue)

  function increment() {
    setCount((prevCount) => Math.min(prevCount + 1, max))
  }

  function decrement() {
    setCount((prevCount) => Math.max(prevCount - 1, min))
  }

  function reset() {
    setCount(initialValue)
  }

  return {
    count,
    increment,
    decrement,
    reset,
    // Derived during render, so the buttons can disable themselves at the edges.
    isAtMin: count <= min,
    isAtMax: count >= max,
  }
}

export default useCounter
