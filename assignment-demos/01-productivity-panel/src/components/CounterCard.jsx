import useCounter from "../hooks/useCounter";

function CounterCard() {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <section className="card">
      <h2>Completed Actions</h2>
      <p className="count">{count}</p>
      <div className="button-row">
        <button className="button" onClick={increment}>
          +1
        </button>
        {/* Can't undo below 0, so the button turns off at 0 */}
        <button className="button" onClick={decrement} disabled={count === 0}>
          -1
        </button>
        <button className="button secondary" onClick={reset}>
          Reset
        </button>
      </div>
    </section>
  );
}

export default CounterCard;
