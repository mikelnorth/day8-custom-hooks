import { useState } from "react";

function counter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  function increment() {
    setCount((prevCount) => prevCount + 1);
  }

  function reset() {
    setCount(initialValue);
  }

  return { count, increment, reset };
}

export default counter;
