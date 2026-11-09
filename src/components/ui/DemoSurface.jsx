export default function DemoSurface({ title, children, actions }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      {(title || actions) && (
        <div className="flex items-center justify-between gap-4 mb-3">
          {title && (
            <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
              {title}
            </p>
          )}
          {actions}
        </div>
      )}
      <div className="rounded-md bg-white border border-slate-200 p-4">
        {children}
      </div>
    </div>
  )
}
