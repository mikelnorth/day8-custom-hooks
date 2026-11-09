// I DO: a second hook. This time there are four things to hand back, not two.
//
//   Move the state and the three functions into hooks/useCounter.js, then call it:
//     const { count, increment, decrement, reset } = useCounter(5);
//   Ask: why might an object be easier here than an array of four things?

import { useState } from "react";

function CounterCard() {
  const [count, setCount] = useState(5);

  function increment() {
    setCount((prevCount) => prevCount + 1);
  }

  function decrement() {
    setCount((prevCount) => prevCount - 1);
  }

  function reset() {
    setCount(5);
  }

  return (
    <div>
      <h2>{count}</h2>
      <button onClick={increment}>Increase</button>
      <button onClick={decrement}>Decrease</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>useCounter</h1>
      <CounterCard />
    </div>
  );
}
