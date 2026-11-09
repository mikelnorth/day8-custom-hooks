import { useState } from "react";

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  function increment() {
    setCount((prevCount) => prevCount + 1);
  }

  function incrementBy(amount) {
    setCount((prevCount) => prevCount + amount);
  }

  function decrement() {
    setCount((prevCount) => prevCount - 1);
  }

  function reset() {
    setCount(initialValue);
  }

  return {
    count,
    increment,
    incrementBy,
    decrement,
    reset,
  };
}

export default useCounter;
