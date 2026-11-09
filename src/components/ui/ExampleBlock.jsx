import LiveCodeBar from './LiveCodeBar.jsx'

const variants = {
  ido: {
    label: 'I do',
    accent: 'bg-sky-600',
    border: 'border-sky-200',
    tint: 'bg-sky-50',
    badgeText: 'Demo (instructor)',
  },
  wedo: {
    label: 'We do',
    accent: 'bg-amber-600',
    border: 'border-amber-200',
    tint: 'bg-amber-50',
    badgeText: 'Together (class)',
  },
  youdo: {
    label: 'You do',
    accent: 'bg-emerald-600',
    border: 'border-emerald-200',
    tint: 'bg-emerald-50',
    badgeText: 'Practice (students)',
  },
}

export default function ExampleBlock({ variant = 'ido', title, description, minutes, exercise, children }) {
  const v = variants[variant] ?? variants.ido
  return (
    <section className={`rounded-xl border ${v.border} bg-white shadow-sm overflow-hidden`}>
      <div className={`px-5 py-3 ${v.accent} text-white flex items-center gap-3`}>
        <span className="inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider">
          {v.label}
        </span>
        <span className="text-sm opacity-90">{v.badgeText}</span>
        {minutes && (
          <span className="ml-auto text-xs font-medium opacity-90">~{minutes} min</span>
        )}
      </div>
      <div className={`${v.tint} border-b ${v.border} px-5 py-4`}>
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-slate-700 leading-relaxed">{description}</p>
        )}
      </div>
      {exercise && <LiveCodeBar id={exercise} />}
      <div className="p-5 bg-white space-y-4">{children}</div>
    </section>
  )
}
