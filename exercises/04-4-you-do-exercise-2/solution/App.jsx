// YOU DO solution: one hook, three counters.
//
//   CounterCard calls useCounter once. ScoreTracker calls it twice. That's three separate counts,
//   because every call gets its own state.
//   ScoreTracker keeps the objects (home, away) instead of destructuring, so the names don't clash.

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
      <button onClick={home.increment}>Home +1</button>
      <button onClick={away.increment}>Away +1</button>
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
