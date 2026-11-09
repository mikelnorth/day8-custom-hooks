// I DO solution: the course page's useCounter, used with a starting value of 5.
//
//   reset() goes back to initialValue, so each caller decides where "reset" lands.
//   An object means callers use names, not positions: { count, reset } works in any order.

import useCounter from "./hooks/useCounter";

function CounterCard() {
  const { count, increment, decrement, reset } = useCounter(5);

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
