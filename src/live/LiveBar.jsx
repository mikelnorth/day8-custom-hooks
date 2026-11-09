import { clearSavedValues, exerciseFiles, exercises, exerciseUrl, openInEditor } from '../data/exercises.js'

export default function LiveBar({ exercise, version }) {
  if (!exercise) {
    return (
      <div className="live-bar-inner">
        <a href="/">Back to lesson</a>
        <strong>Live code: every I do, We do, and You do</strong>
        <span className="live-nav">
          <button type="button" onClick={clearSavedValues} title='Removes every localStorage key that starts with "day8-", then reloads'>
            Clear saved values
          </button>
        </span>
      </div>
    )
  }

  const index = exercises.indexOf(exercise)
  const previous = exercises[index - 1]
  const next = exercises[index + 1]
  const [appFile, ...otherFiles] = exerciseFiles(exercise.id, version)
  const folder = `exercises/${exercise.id}/${version}/`

  return (
    <div className="live-bar-inner">
      <a href={exercise.route}>Page {exercise.page}</a>
      <a href="/live.html">All</a>
      <span className="live-kind">{exercise.kind}</span>
      <strong>{exercise.title}</strong>
      <span className="live-tabs">
        <a className={version === 'starter' ? 'live-active' : ''} href={exerciseUrl(exercise.id, 'starter')}>Starter</a>
        <a className={version === 'solution' ? 'live-active' : ''} href={exerciseUrl(exercise.id, 'solution')}>Solution</a>
      </span>
      {import.meta.env.DEV && (
        <button type="button" onClick={() => openInEditor(exercise.id, version)}>Open in editor</button>
      )}
      <button type="button" onClick={clearSavedValues} title='Removes every localStorage key that starts with "day8-", then reloads'>
        Clear saved values
      </button>
      <code>{appFile}</code>
      {otherFiles.length > 0 && (
        <code className="live-files">+ {otherFiles.map((file) => file.replace(folder, '')).join(', ')}</code>
      )}
      <span className="live-nav">
        {previous && <a href={exerciseUrl(previous.id, 'starter')}>Prev</a>}
        {next && <a href={exerciseUrl(next.id, 'starter')}>Next</a>}
      </span>
    </div>
  )
}
