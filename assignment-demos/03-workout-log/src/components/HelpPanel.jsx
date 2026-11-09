// The help panel is plain UI. Whether it is open lives in App (useToggle).
const HOOK_ROWS = [
  { hook: "useToggle", kind: "Event", why: "Flips only when you click help, kg/lb, or auto-rest." },
  { hook: "useCounter", kind: "Event", why: "Sets and reps change only when you press + or -." },
  { hook: "useLocalStorage", kind: "Event", why: "Saves at the moment you log or remove a workout." },
  { hook: "useRestTimer", kind: "Effect", why: "While running, React stays synced with a setInterval." },
  { hook: "useOnlineStatus", kind: "Effect", why: "Listens to the browser's online/offline events." },
]

function HelpPanel({ onClose }) {
  return (
    <section id="help-panel" className="help" aria-labelledby="help-title">
      <div className="help__head">
        <h2 id="help-title" className="section-title">Event or effect?</h2>
        <button type="button" className="btn btn--ghost btn--small" onClick={onClose}>
          Close
        </button>
      </div>

      <ol className="help__steps">
        <li>Type the exercise and weight, then set sets and reps with + and -.</li>
        <li>Press <strong>Log workout</strong>. It is saved to this browser right away.</li>
        <li>The rest timer starts on its own (turn that off with the checkbox).</li>
        <li>Switch kg/lb any time. Saved workouts are stored in kg and converted for display.</li>
      </ol>

      <p className="help__rule">
        The question for every hook: <em>why does this code need to run?</em> Because
        the user did something, it is an event. Because React must stay in sync with
        something outside it, it is an effect.
      </p>

      <table className="help__table">
        <thead>
          <tr>
            <th scope="col">Hook</th>
            <th scope="col">Runs because of</th>
            <th scope="col">Why</th>
          </tr>
        </thead>
        <tbody>
          {HOOK_ROWS.map((row) => (
            <tr key={row.hook}>
              <th scope="row"><code>{row.hook}</code></th>
              <td>
                <span className={row.kind === "Effect" ? "tag tag--effect" : "tag tag--event"}>
                  {row.kind}
                </span>
              </td>
              <td>{row.why}</td>
            </tr>
          ))}
          <tr>
            <th scope="row">Total volume</th>
            <td><span className="tag tag--derived">Neither</span></td>
            <td>Calculated from the saved workouts during render.</td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}

export default HelpPanel
