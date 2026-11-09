import { useState } from "react"
import Stepper from "./Stepper"
import useCounter from "../hooks/useCounter"
import { lbToKg } from "../utils/units"

function LogForm({ isPounds, onLog, autoRest, onToggleAutoRest }) {
  // Plain useState is enough for the two text boxes. They are only used here,
  // so there is nothing to reuse and no reason to make a hook for them.
  const [exercise, setExercise] = useState("")
  const [weight, setWeight] = useState("")
  const [error, setError] = useState("")

  // Same hook, two counters, each with its own limits.
  const sets = useCounter(3, { min: 1, max: 10 })
  const reps = useCounter(8, { min: 1, max: 30 })

  const unit = isPounds ? "lb" : "kg"

  // EVENT: everything here happens because the user submitted the form.
  function handleSubmit(event) {
    event.preventDefault()

    const name = exercise.trim()
    const amount = Number(weight)

    if (name === "") {
      setError("Give the exercise a name.")
      return
    }
    if (weight === "" || Number.isNaN(amount) || amount < 0) {
      setError("Enter a weight of 0 or more (0 for bodyweight).")
      return
    }

    onLog({
      id: crypto.randomUUID(),
      exercise: name,
      // Always save in kg so switching units never changes the saved data.
      weightKg: isPounds ? lbToKg(amount) : amount,
      sets: sets.count,
      reps: reps.count,
      loggedAt: new Date().toISOString(),
    })

    // Keep the weight and counters (next set is usually the same), clear the rest.
    setExercise("")
    setError("")
  }

  return (
    <section className="card card--form" aria-labelledby="log-title">
      <h2 id="log-title" className="section-title">Log a lift</h2>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label className="field__label" htmlFor="exercise">Exercise</label>
          <input
            id="exercise"
            className="field__input"
            type="text"
            placeholder="Back squat"
            autoComplete="off"
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
            aria-invalid={error !== "" && exercise.trim() === ""}
            aria-describedby={error ? "log-error" : undefined}
          />
        </div>

        <div className="field">
          <label className="field__label" htmlFor="weight">Weight ({unit})</label>
          <input
            id="weight"
            className="field__input field__input--mono"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.5"
            placeholder={isPounds ? "135" : "60"}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            aria-describedby={error ? "log-error" : undefined}
          />
        </div>

        <div className="form__steppers">
          <Stepper id="sets" label="Sets" counter={sets} />
          <Stepper id="reps" label="Reps" counter={reps} />
        </div>

        <div className="form__row">
          <button
            type="button"
            className="btn btn--ghost btn--small"
            onClick={() => {
              sets.reset()
              reps.reset()
            }}
          >
            Reset counters
          </button>
          <label className="check">
            <input type="checkbox" checked={autoRest} onChange={onToggleAutoRest} />
            Auto-start rest timer
          </label>
        </div>

        {error && (
          <p id="log-error" className="form__error" role="alert">{error}</p>
        )}

        <button type="submit" className="btn btn--primary btn--block">
          Log workout
        </button>
      </form>
    </section>
  )
}

export default LogForm
