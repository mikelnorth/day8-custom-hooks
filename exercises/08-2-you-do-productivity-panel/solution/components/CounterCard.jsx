import useCounter from "../hooks/useCounter";

function CounterCard() {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div className="card">
      <h3>Completed actions</h3>
      <p>{count}</p>
      <button onClick={increment}>Done</button>
      <button onClick={decrement} disabled={count === 0}>Undo</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default CounterCard;
