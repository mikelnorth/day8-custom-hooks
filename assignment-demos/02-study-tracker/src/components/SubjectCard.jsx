import useCounter from "../hooks/useCounter";

// `counter` comes from App (App needs it for the total).
// `minutes` is a separate useCounter that only this card needs,
// so it lives here.
function SubjectCard({ name, goal, accent, counter }) {
  const minutes = useCounter(0);

  const isComplete = counter.count >= goal;
  const percent = Math.min(100, Math.round((counter.count / goal) * 100));

  function handleReset() {
    counter.reset();
    minutes.reset();
  }

  return (
    <article className="flex flex-col rounded-xl bg-white p-5 shadow-sm ring-1 ring-stone-200">
      <div className="flex items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-stone-900">
          <span className={`h-3 w-3 rounded-full ${accent}`} aria-hidden="true" />
          {name}
        </h3>
        {isComplete && (
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">
            Goal reached
          </span>
        )}
      </div>

      <p className="mt-3 text-sm text-stone-500">Pomodoros</p>
      <p className="text-2xl font-bold text-stone-900" aria-live="polite">
        {counter.count} <span className="text-base font-normal text-stone-500">of {goal}</span>
      </p>

      <div className="mt-2 h-2 rounded-full bg-stone-100" aria-hidden="true">
        <div
          className={`h-2 rounded-full ${accent}`}
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={counter.decrement}
          disabled={counter.count === 0}
          aria-label={`Remove one ${name} Pomodoro`}
          className="rounded-lg border border-stone-300 px-3 py-2 font-medium text-stone-700 hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          &minus;
        </button>
        <button
          type="button"
          onClick={counter.increment}
          aria-label={`Add one ${name} Pomodoro`}
          className="flex-1 rounded-lg bg-indigo-600 px-3 py-2 font-medium text-white hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          +1 Pomodoro
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 border-t border-stone-100 pt-4">
        <p className="text-sm text-stone-600">
          Extra practice:{" "}
          <span className="font-semibold text-stone-900" aria-live="polite">
            {minutes.count} min
          </span>
        </p>
        <button
          type="button"
          onClick={() => minutes.incrementBy(5)}
          aria-label={`Add 5 practice minutes to ${name}`}
          className="rounded-lg border border-stone-300 px-3 py-1.5 text-sm font-medium text-stone-700 hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          +5 min
        </button>
      </div>

      <button
        type="button"
        onClick={handleReset}
        aria-label={`Reset ${name}`}
        className="mt-4 self-start text-sm text-stone-500 underline hover:text-stone-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Reset
      </button>
    </article>
  );
}

export default SubjectCard;
