import { exerciseFiles, exerciseUrl, findExercise, openInEditor } from '../../data/exercises.js'

const linkClass = 'rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100'

export default function LiveCodeBar({ id }) {
  const exercise = findExercise(id)
  if (!exercise) throw new Error(`Unknown exercise: ${id}`)
  const [appFile, ...otherFiles] = exerciseFiles(id, 'starter')
  const folder = `exercises/${id}/starter/`

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 bg-slate-50 px-5 py-2.5">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Live code</span>
      <code className="text-xs text-slate-700">{appFile}</code>
      {otherFiles.length > 0 && (
        <code className="text-xs text-slate-500">+ {otherFiles.map((file) => file.replace(folder, '')).join(', ')}</code>
      )}
      <span className="ml-auto flex flex-wrap gap-2">
        {import.meta.env.DEV && (
          <button type="button" className={linkClass} onClick={() => openInEditor(id, 'starter')}>
            Open in editor
          </button>
        )}
        <a className={linkClass} href={exerciseUrl(id, 'starter')} target="_blank" rel="noreferrer">Run starter</a>
        <a className={linkClass} href={exerciseUrl(id, 'solution')} target="_blank" rel="noreferrer">Run solution</a>
      </span>
    </div>
  )
}
