import { useSyncExternalStore } from 'react'

export default function LogPanel({ log, title = 'Log', empty = 'Nothing yet.', onClear }) {
  const lines = useSyncExternalStore(log.subscribe, log.getSnapshot)

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-1.5 border-b border-slate-800 bg-slate-950/40">
        <span className="text-[11px] uppercase tracking-widest text-slate-400">{title}</span>
        {onClear && (
          <button onClick={onClear} className="text-[11px] text-slate-400 hover:text-white">Clear</button>
        )}
      </div>
      <ol className="p-4 text-sm font-mono text-slate-100 leading-relaxed min-h-20 max-h-56 overflow-y-auto">
        {lines.length === 0 && <li className="text-slate-500">{empty}</li>}
        {lines.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ol>
    </div>
  )
}
