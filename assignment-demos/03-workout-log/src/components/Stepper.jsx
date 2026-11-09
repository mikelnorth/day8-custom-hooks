// Reusable UI (a component), not reusable logic. The counting logic comes
// from useCounter in the parent; this just draws the - value + controls.
function Stepper({ id, label, counter }) {
  const { count, increment, decrement, isAtMin, isAtMax } = counter

  return (
    <div className="stepper" role="group" aria-labelledby={`${id}-label`}>
      <span id={`${id}-label`} className="field__label">{label}</span>
      <div className="stepper__row">
        <button
          type="button"
          className="stepper__btn"
          onClick={decrement}
          disabled={isAtMin}
          aria-label={`Fewer ${label.toLowerCase()}`}
        >
          -
        </button>
        <output className="stepper__value" aria-live="polite">{count}</output>
        <button
          type="button"
          className="stepper__btn"
          onClick={increment}
          disabled={isAtMax}
          aria-label={`More ${label.toLowerCase()}`}
        >
          +
        </button>
      </div>
    </div>
  )
}

export default Stepper
