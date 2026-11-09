// TODO: const { count, increment, decrement, reset } = useCounter(0);

function CounterCard() {
  return (
    <div className="card">
      <h3>Completed actions</h3>
      <p>0</p>
      <button>Done</button>
      <button>Undo</button>
      <button>Reset</button>
    </div>
  );
}

export default CounterCard;
