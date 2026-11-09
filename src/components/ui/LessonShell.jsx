export default function LessonShell({ number, title, subtitle, minutes, children }) {
  return (
    <article className="space-y-10">
      <header className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-3">
          <p className="text-xs uppercase tracking-widest text-indigo-600 font-semibold">
            Lesson {number}
          </p>
          {minutes && (
            <span className="text-[11px] rounded-full bg-slate-100 text-slate-600 px-2 py-0.5 font-medium">
              ~{minutes} min
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mt-1">{title}</h1>
        {subtitle && (
          <p className="text-slate-600 mt-2 text-base leading-relaxed">
            {subtitle}
          </p>
        )}
      </header>
      <div className="space-y-10">{children}</div>
    </article>
  )
}
