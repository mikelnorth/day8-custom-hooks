import useCounter from "../hooks/useCounter";

function BreaksCard() {
  const { count, increment } = useCounter(0);

  return (
    <div className="card">
      <h3>Coffee breaks</h3>
      <p>{count} ☕</p>
      <button onClick={increment}>Take a break</button>
    </div>
  );
}

export default BreaksCard;
