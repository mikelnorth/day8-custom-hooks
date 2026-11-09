import { formatWeight } from "../utils/units"

// Every number here is DERIVED during render from the saved entries.
// None of it is state and none of it is an effect (Example E from class).
function StatsBar({ entries, isPounds }) {
  const totalSets = entries.reduce((sum, entry) => sum + entry.sets, 0)
  const totalReps = entries.reduce((sum, entry) => sum + entry.sets * entry.reps, 0)
  const totalVolumeKg = entries.reduce(
    (sum, entry) => sum + entry.weightKg * entry.sets * entry.reps,
    0
  )
  const heaviestKg = entries.reduce((max, entry) => Math.max(max, entry.weightKg), 0)

  const stats = [
    { label: "Workouts", value: entries.length.toLocaleString() },
    { label: "Sets", value: totalSets.toLocaleString() },
    { label: "Reps", value: totalReps.toLocaleString() },
    { label: "Heaviest", value: entries.length ? formatWeight(heaviestKg, isPounds) : "-" },
    { label: "Total volume", value: formatWeight(totalVolumeKg, isPounds), wide: true },
  ]

  return (
    <section aria-label="Totals">
      <dl className="stats">
        {stats.map((stat) => (
          <div key={stat.label} className={stat.wide ? "stat stat--wide" : "stat"}>
            <dt className="stat__label">{stat.label}</dt>
            <dd className="stat__value">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export default StatsBar
