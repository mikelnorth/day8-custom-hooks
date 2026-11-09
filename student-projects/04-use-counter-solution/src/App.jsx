// YOU DO (stretch) solution.
//
//   incrementBy(amount) is one more function in the hook. Every component that calls useCounter
//   can now use it, and the ones that don't need it don't change.
//   onClick={() => home.incrementBy(3)}: pass a function, don't call one. Same rule as Day 6.

import useCounter from "./hooks/useCounter";

function CounterCard() {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div className="card">
      <h3>Counter Card</h3>
      <p>{count}</p>
      <button onClick={increment}>Increase</button>
      <button onClick={decrement}>Decrease</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

function ScoreTracker() {
  const home = useCounter(0);
  const away = useCounter(0);

  function newGame() {
    home.reset();
    away.reset();
  }

  return (
    <div className="card">
      <h3>Score Tracker</h3>
      <p>
        Home {home.count} : {away.count} Away
      </p>
      <div className="row">
        <button onClick={home.increment}>Home +1</button>
        <button onClick={() => home.incrementBy(2)}>+2</button>
        <button onClick={() => home.incrementBy(3)}>+3</button>
      </div>
      <div className="row">
        <button onClick={away.increment}>Away +1</button>
        <button onClick={() => away.incrementBy(2)}>+2</button>
        <button onClick={() => away.incrementBy(3)}>+3</button>
      </div>
      <button onClick={newGame}>New game</button>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>Exercise 2: useCounter</h1>
      <div className="grid">
        <CounterCard />
        <ScoreTracker />
      </div>
    </div>
  );
}
