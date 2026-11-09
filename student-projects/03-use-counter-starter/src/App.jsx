// YOU DO: Exercise 2, build useCounter.
//
//   Students build:
//     - a hook (hooks/useCounter.js)
//     - a counter component
//     - a score tracker or likes counter using the same hook
//
//   1. Write the hook.
//   2. CounterCard: Increase, Decrease, and Reset work.
//   3. ScoreTracker: call useCounter twice, once per team. Two calls, two separate counts.
//      Hint: you can't destructure { count } twice in one component. Keep the objects instead:
//        const home = useCounter(0);   then use home.count and home.increment
//   4. New game resets both.
//   Stretch: the next exercise adds incrementBy(amount).

function CounterCard() {
  // TODO: const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div className="card">
      <h3>Counter Card</h3>
      <p>0</p>
      <button>Increase</button>
      <button>Decrease</button>
      <button>Reset</button>
    </div>
  );
}

function ScoreTracker() {
  // TODO: one useCounter call for home, one for away

  return (
    <div className="card">
      <h3>Score Tracker</h3>
      <p>Home 0 : 0 Away</p>
      <button>Home +1</button>
      <button>Away +1</button>
      <button>New game</button>
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
