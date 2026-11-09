import useToggle from '../../../demos/hooks/useToggle.js'
import useCounter from '../../../demos/hooks/useCounter.js'
import useLocalStorage from '../../../demos/hooks/useLocalStorage.js'

const buttonClass = 'rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed'
const cardClass = 'rounded-lg border border-slate-200 bg-white p-4 space-y-2'

function TogglePanel() {
  const [isOpen, toggle] = useToggle(false)

  return (
    <div className={cardClass}>
      <p className="font-semibold text-slate-900">Help</p>
      <button className={buttonClass} onClick={toggle}>{isOpen ? 'Hide' : 'Show'} help</button>
      {isOpen && (
        <ul className="list-disc list-inside text-sm text-slate-700">
          <li>Click "Done" each time you finish a task.</li>
          <li>Your note is saved in this browser.</li>
        </ul>
      )}
    </div>
  )
}

function CounterCard() {
  const { count, increment, decrement, reset } = useCounter(0)

  return (
    <div className={cardClass}>
      <p className="font-semibold text-slate-900">Completed actions</p>
      <p className="text-3xl font-bold tabular-nums">{count}</p>
      <div className="flex flex-wrap gap-2">
        <button className={buttonClass} onClick={increment}>Done</button>
        <button className={buttonClass} onClick={decrement} disabled={count === 0}>Undo</button>
        <button className={buttonClass} onClick={reset}>Reset</button>
      </div>
    </div>
  )
}

function SavedNote() {
  const [note, setNote] = useLocalStorage('day8-app-mini-note', '')

  return (
    <div className={cardClass}>
      <p className="font-semibold text-slate-900">Saved Note</p>
      <textarea
        className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm"
        rows="3"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Your name, or a note for later"
      />
      <p className="text-sm text-slate-700">Saved text: {note}</p>
    </div>
  )
}

export default function ProductivityPanelDemo() {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-xl font-bold text-slate-900">Productivity Panel</p>
        <p className="text-sm text-slate-500">Three small tools, three custom hooks.</p>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <TogglePanel />
        <CounterCard />
        <SavedNote />
      </div>
    </div>
  )
}
