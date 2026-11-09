import counter from "../hooks/counter";

// One component, two different cards, so both can share the counting code.
function CounterCard({ variant }) {
  const { count, increment, reset } = counter(0);

  if (variant === "breaks") {
    return (
      <div className="card">
        <h3>Coffee breaks</h3>
        <p>{count} ☕</p>
        <button onClick={increment}>Take a break</button>
      </div>
    );
  }

  return (
    <div className="card">
      <h3>Completed actions</h3>
      <p>{count}</p>
      <button onClick={increment}>Done</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default CounterCard;
