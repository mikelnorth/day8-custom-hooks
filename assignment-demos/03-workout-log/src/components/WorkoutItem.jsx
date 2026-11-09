import { formatWeight, plateColor } from "../utils/units"

function WorkoutItem({ entry, isPounds, onRemove }) {
  // Derived during render from the saved entry.
  const volumeKg = entry.weightKg * entry.sets * entry.reps
  const when = new Date(entry.loggedAt).toLocaleString([], {
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
  })

  return (
    <li className="entry">
      <span className={`entry__plate plate--${plateColor(entry.weightKg)}`} aria-hidden="true" />
      <div className="entry__body">
        <p className="entry__name">{entry.exercise}</p>
        <p className="entry__meta">
          <span className="entry__scheme">
            {entry.sets} x {entry.reps} @ {formatWeight(entry.weightKg, isPounds)}
          </span>
          <span>Volume {formatWeight(volumeKg, isPounds)}</span>
          <time dateTime={entry.loggedAt}>{when}</time>
        </p>
      </div>
      <button
        type="button"
        className="btn btn--ghost btn--small entry__remove"
        onClick={() => onRemove(entry.id)}
        aria-label={`Remove ${entry.exercise}, ${entry.sets} by ${entry.reps}`}
      >
        Remove
      </button>
    </li>
  )
}

export default WorkoutItem
