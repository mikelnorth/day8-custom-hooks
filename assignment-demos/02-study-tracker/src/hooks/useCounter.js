import { useState } from "react";

// Reusable counting logic. Each call keeps its own count,
// so three subject cards can use it without sharing a number.
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  function increment() {
    setCount((prevCount) => prevCount + 1);
  }

  function decrement() {
    setCount((prevCount) => prevCount - 1);
  }

  // Stretch goal: add any amount, like 5 practice minutes.
  function incrementBy(amount) {
    setCount((prevCount) => prevCount + amount);
  }

  function reset() {
    setCount(initialValue);
  }

  return {
    count,
    increment,
    decrement,
    incrementBy,
    reset,
  };
}

export default useCounter;
