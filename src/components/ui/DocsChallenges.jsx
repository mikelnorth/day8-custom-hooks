// A list of react.dev challenges for a page, each tagged with when to use it.
const whenStyles = {
  'in class': 'bg-emerald-100 text-emerald-800',
  homework: 'bg-indigo-100 text-indigo-800',
  stretch: 'bg-amber-100 text-amber-800',
  skip: 'bg-slate-100 text-slate-500',
}

export default function DocsChallenges({ page, href, challenges }) {
  return (
    <section className="rounded-xl border border-cyan-200 bg-white overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-3 bg-cyan-50/70 border-b border-cyan-200">
        <span className="rounded-md bg-cyan-600 text-white text-[10px] font-bold px-1.5 py-0.5 uppercase tracking-wider">
          react.dev
        </span>
        <p className="text-sm text-slate-800">
          <span className="font-semibold">Docs challenges</span> from{' '}
          <a href={`${href}#challenges`} target="_blank" rel="noreferrer" className="text-cyan-800 hover:underline">
            {page}
          </a>
        </p>
      </div>
      <ul className="divide-y divide-slate-100">
        {challenges.map((c, i) => (
          <li key={c.title} className="px-5 py-3 flex items-start gap-3">
            <span className="shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold flex items-center justify-center mt-0.5">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className={`font-medium ${c.when === 'skip' ? 'text-slate-400' : 'text-slate-900'}`}>{c.title}</p>
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${whenStyles[c.when]}`}>
                  {c.when}
                </span>
              </div>
              <p className="text-sm text-slate-600 mt-0.5 leading-relaxed">{c.note}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="px-5 py-2 text-xs text-slate-500 border-t border-slate-100 bg-slate-50/60">
        Challenges are at the bottom of the docs page. Each opens a live sandbox; "Show solution" is under each one.
      </p>
    </section>
  )
}
