// "Follow along in the docs" card. Day 8 follows react.dev's Reusing Logic with Custom Hooks.
export default function DocsLink({ title, href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-start gap-3 rounded-xl border border-cyan-200 bg-cyan-50/60 px-5 py-4 hover:border-cyan-400 hover:shadow-sm transition"
    >
      <span className="shrink-0 mt-0.5 rounded-md bg-cyan-600 text-white text-[10px] font-bold px-1.5 py-0.5 uppercase tracking-wider">
        react.dev
      </span>
      <span className="min-w-0">
        <span className="block text-xs uppercase tracking-widest text-cyan-700 font-semibold">
          Follow along in the docs
        </span>
        <span className="block font-semibold text-slate-900 group-hover:text-cyan-800 mt-0.5">
          {title}
        </span>
        {children && (
          <span className="block text-sm text-slate-700 mt-1 leading-relaxed">{children}</span>
        )}
        <span className="block text-xs text-cyan-700 mt-1 truncate">{href}</span>
      </span>
    </a>
  )
}
