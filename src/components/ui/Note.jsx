const tones = {
  sky: 'bg-sky-50 border-sky-200 text-sky-900',
  amber: 'bg-amber-50 border-amber-200 text-amber-900',
  emerald: 'bg-emerald-50 border-emerald-200 text-emerald-900',
  rose: 'bg-rose-50 border-rose-200 text-rose-900',
  slate: 'bg-slate-50 border-slate-200 text-slate-800',
}

// Small tinted box used for talking points / instructions inside an ExampleBlock.
export default function Note({ tone = 'sky', title, children }) {
  return (
    <div className={`rounded-md border px-4 py-3 text-sm ${tones[tone] ?? tones.sky}`}>
      {title && <p className="font-semibold mb-1">{title}</p>}
      {children}
    </div>
  )
}
