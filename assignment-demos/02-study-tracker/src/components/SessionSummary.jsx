function SessionSummary({ totalSessions, completedCount, subjectCount }) {
  const totalMinutes = totalSessions * 25;

  return (
    <section
      aria-label="Today's summary"
      className="grid grid-cols-1 gap-4 rounded-xl bg-white p-5 shadow-sm ring-1 ring-stone-200 sm:grid-cols-3"
    >
      <div>
        <p className="text-sm text-stone-500">Total sessions</p>
        <p className="text-3xl font-bold text-stone-900" aria-live="polite">
          {totalSessions}
        </p>
      </div>
      <div>
        <p className="text-sm text-stone-500">Focused time</p>
        <p className="text-3xl font-bold text-stone-900">{totalMinutes} min</p>
      </div>
      <div>
        <p className="text-sm text-stone-500">Goals reached</p>
        <p className="text-3xl font-bold text-stone-900">
          {completedCount} / {subjectCount}
        </p>
      </div>
    </section>
  );
}

export default SessionSummary;
