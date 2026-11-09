export default function CodeBlock({ children, label }) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 overflow-hidden">
      {label && (
        <div className="px-4 py-1.5 text-[11px] uppercase tracking-widest text-slate-400 border-b border-slate-800 bg-slate-950/40">
          {label}
        </div>
      )}
      <pre className="text-sm text-slate-100 leading-relaxed p-4 overflow-x-auto">
        <code>{children}</code>
      </pre>
    </div>
  )
}
