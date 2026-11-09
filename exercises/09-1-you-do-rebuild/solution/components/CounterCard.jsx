import useCounter from "../hooks/useCounter";

function CounterCard() {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div>
      <h2>Counter Card</h2>
      <p>{count}</p>
      <button onClick={increment}>Increase</button>
      <button onClick={decrement}>Decrease</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default CounterCard;
