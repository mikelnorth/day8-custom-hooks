import WorkoutItem from "./WorkoutItem"

function WorkoutList({ entries, isPounds, onRemove }) {
  return (
    <section className="card log" aria-labelledby="list-title">
      <h2 id="list-title" className="section-title">
        Logbook <span className="log__count">({entries.length})</span>
      </h2>

      {entries.length === 0 ? (
        <p className="log__empty">
          Nothing logged yet. Your first lift will show up here and stay after a refresh.
        </p>
      ) : (
        <ul className="log__list">
          {entries.map((entry) => (
            <WorkoutItem
              key={entry.id}
              entry={entry}
              isPounds={isPounds}
              onRemove={onRemove}
            />
          ))}
        </ul>
      )}
    </section>
  )
}

export default WorkoutList
