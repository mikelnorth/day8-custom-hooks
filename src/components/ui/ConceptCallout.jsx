export default function ConceptCallout({ title, eyebrow = 'Key idea', children }) {
  return (
    <div className="rounded-xl border border-indigo-200 bg-indigo-50/60 px-5 py-4">
      <p className="text-xs uppercase tracking-widest text-indigo-700 font-semibold">
        {eyebrow}
      </p>
      <h2 className="text-xl font-semibold text-slate-900 mt-1">{title}</h2>
      <div className="mt-2 text-slate-700 leading-relaxed space-y-2 text-sm">
        {children}
      </div>
    </div>
  )
}
