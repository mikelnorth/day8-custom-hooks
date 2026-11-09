import OnlineBadge from "./OnlineBadge"

function Header({ isHelpOpen, onToggleHelp, isPounds, onToggleUnits }) {
  return (
    <header className="header">
      <div className="header__brand">
        <p className="header__eyebrow">Day 8 / custom hooks</p>
        <h1 className="header__title">Workout Log</h1>
      </div>

      <div className="header__controls">
        <OnlineBadge />

        <button
          type="button"
          className="unit-switch"
          role="switch"
          aria-checked={isPounds}
          aria-label="Show weights in pounds"
          onClick={onToggleUnits}
        >
          <span className={!isPounds ? "unit-switch__opt is-active" : "unit-switch__opt"}>kg</span>
          <span className={isPounds ? "unit-switch__opt is-active" : "unit-switch__opt"}>lb</span>
        </button>

        <button
          type="button"
          className="btn btn--ghost"
          aria-expanded={isHelpOpen}
          aria-controls="help-panel"
          onClick={onToggleHelp}
        >
          {isHelpOpen ? "Hide help" : "How it works"}
        </button>
      </div>
    </header>
  )
}

export default Header
