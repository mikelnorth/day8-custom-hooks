import { useState } from 'react'
import useToggle from '../../../demos/hooks/useToggle.js'
import useLocalStorage from '../../../demos/hooks/useLocalStorage.js'

const buttonClass = 'rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm hover:bg-slate-100'
const inputClass = 'w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm'

function readSaved() {
  try {
    return Object.keys(localStorage)
      .filter((key) => key.startsWith('day8-'))
      .sort()
      .map((key) => [key, localStorage.getItem(key)])
  } catch {
    return []
  }
}

// Shows the raw strings in localStorage, so students see the JSON quotes.
export function StoragePeek() {
  const [rows, setRows] = useState(null)

  function clearAll() {
    readSaved().forEach(([key]) => localStorage.removeItem(key))
    window.location.reload()
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <button className={buttonClass} onClick={() => setRows(readSaved())}>Read localStorage</button>
        <button className={buttonClass} onClick={clearAll}>Clear saved values (day8-*) and reload</button>
      </div>
      {rows && (
        <table className="w-full text-sm font-mono">
          <thead>
            <tr className="text-left text-slate-500">
              <th className="py-1 pr-4 font-normal">key</th>
              <th className="py-1 font-normal">stored string</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan="2" className="py-1 text-slate-400">Nothing saved yet.</td></tr>
            )}
            {rows.map(([key, value]) => (
              <tr key={key} className="border-t border-slate-100">
                <td className="py-1 pr-4 text-slate-700">{key}</td>
                <td className="py-1 text-slate-900 break-all">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export function SavedName() {
  const [name, setName] = useLocalStorage('day8-app-name', '')

  return (
    <div className="space-y-2">
      <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} placeholder="Type a name, then refresh" />
      <p className="text-sm text-slate-800">Name: {name}</p>
    </div>
  )
}

function TogglePanel({ title }) {
  const [isOpen, toggle] = useToggle(false)

  return (
    <div className="rounded-md border border-slate-200 p-3 space-y-2">
      <p className="font-semibold text-slate-900">{title}</p>
      <button className={buttonClass} onClick={toggle}>{isOpen ? 'Hide' : 'Show'} Panel</button>
      {isOpen && <p className="text-sm text-slate-700">This panel is now visible.</p>}
    </div>
  )
}

function NoteBox({ title }) {
  const [note, setNote] = useLocalStorage('day8-app-shared-note', '')

  return (
    <div className="rounded-md border border-slate-200 p-3 space-y-2">
      <p className="font-semibold text-slate-900">{title}</p>
      <textarea className={inputClass} rows="2" value={note} onChange={(e) => setNote(e.target.value)} />
      <p className="text-sm text-slate-700">Saved text: {note}</p>
    </div>
  )
}

// Two calls to the same hook, side by side. Same logic, separate state.
export function ShareLogicDemo() {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <TogglePanel title="Panel A: useToggle()" />
        <TogglePanel title="Panel B: useToggle()" />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <NoteBox title={'Note A: useLocalStorage("day8-app-shared-note")'} />
        <NoteBox title={'Note B: useLocalStorage("day8-app-shared-note")'} />
      </div>
    </div>
  )
}
