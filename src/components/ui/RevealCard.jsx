import { useState } from 'react'

// A question with a hidden model answer. Used for reflection / discussion prompts.
export default function RevealCard({ question, children, label = 'Reveal a model answer' }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-5 py-4">
      <p className="font-semibold text-slate-900">{question}</p>
      {open ? (
        <div className="mt-3 text-sm text-slate-700 leading-relaxed space-y-2 border-t border-slate-100 pt-3">
          {children}
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="mt-3 text-xs rounded border border-slate-300 bg-white px-3 py-1.5 hover:bg-slate-100"
        >
          {label}
        </button>
      )}
    </div>
  )
}
