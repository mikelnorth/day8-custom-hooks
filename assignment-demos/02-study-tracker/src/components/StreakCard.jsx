import usePersistentCounter from "../hooks/usePersistentCounter";

function StreakCard() {
  const streak = usePersistentCounter("study-tracker:streak-days", 0);

  return (
    <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-stone-200">
      <h2 className="text-lg font-semibold text-stone-900">Study streak</h2>
      <p className="mt-3 text-4xl font-bold text-indigo-600" aria-live="polite">
        {streak.count} {streak.count === 1 ? "day" : "days"}
      </p>
      <p className="mt-1 text-xs text-stone-500">
        Saved in this browser, so it survives a refresh.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={streak.increment}
          className="rounded-lg bg-indigo-600 px-3 py-2 font-medium text-white hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          I studied today
        </button>
        <button
          type="button"
          onClick={streak.decrement}
          disabled={streak.count === 0}
          className="rounded-lg border border-stone-300 px-3 py-2 font-medium text-stone-700 hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Undo
        </button>
        <button
          type="button"
          onClick={streak.reset}
          className="rounded-lg px-3 py-2 text-sm text-stone-500 underline hover:text-stone-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Reset streak
        </button>
      </div>
    </section>
  );
}

export default StreakCard;
