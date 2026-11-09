import useCounter from "../hooks/useCounter";

function DoneCard() {
  const { count, increment, reset } = useCounter(0);

  return (
    <div className="card">
      <h3>Completed actions</h3>
      <p>{count}</p>
      <button onClick={increment}>Done</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default DoneCard;
