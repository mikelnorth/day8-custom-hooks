// YOU DO (stretch): add incrementBy(amount) to useCounter.
//
//   1. In hooks/useCounter.js, add incrementBy(amount). Use the updater form:
//        setCount((prevCount) => prevCount + amount)
//   2. Return it in the object, next to increment.
//   3. In ScoreTracker, add Home +2, Home +3, Away +2, and Away +3.
//      The handler needs an argument, so wrap it: onClick={() => home.incrementBy(3)}
//   Check: the +1 buttons still work, and every other component using useCounter is unchanged.

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
