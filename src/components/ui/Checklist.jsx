import { useState } from 'react'

// Interactive checklist for exercises. State is local; refresh resets it.
export default function Checklist({ title = 'Success checklist', items }) {
  const [done, setDone] = useState(() => items.map(() => false))
  const count = done.filter(Boolean).length

  function toggle(i) {
    setDone((prev) => prev.map((d, j) => (j === i ? !d : d)))
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white">
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200">
        <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">{title}</p>
        <span className="text-xs text-slate-500 tabular-nums">
          {count}/{items.length}
        </span>
      </div>
      <ul className="divide-y divide-slate-100">
        {items.map((item, i) => (
          <li key={i}>
            <label className="flex items-start gap-3 px-4 py-2.5 text-sm cursor-pointer hover:bg-slate-50">
              <input
                type="checkbox"
                checked={done[i]}
                onChange={() => toggle(i)}
                className="mt-1 accent-emerald-600"
              />
              <span className={done[i] ? 'line-through text-slate-400' : 'text-slate-700'}>
                {item}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}
