// Renders a component tree as monospace text, e.g. the "App ├ Header └ Footer" diagrams.
export default function Tree({ children, caption }) {
  return (
    <figure className="rounded-lg border border-slate-200 bg-white px-5 py-4">
      <pre className="font-mono text-sm text-slate-800 leading-relaxed">{children}</pre>
      {caption && <figcaption className="mt-2 text-xs text-slate-500">{caption}</figcaption>}
    </figure>
  )
}
