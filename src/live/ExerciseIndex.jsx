import { exercises, exerciseUrl, openInEditor } from '../data/exercises.js'

const pageNumbers = [...new Set(exercises.map((exercise) => exercise.page))]

export default function ExerciseIndex() {
  return (
    <div className="live-index">
      {pageNumbers.map((page) => {
        const onPage = exercises.filter((exercise) => exercise.page === page)
        return (
          <section key={page}>
            <h2>{page}. {onPage[0].pageTitle}</h2>
            <ul>
              {onPage.map((exercise) => (
                <li key={exercise.id}>
                  <span>
                    <span className="live-kind">{exercise.kind}</span> {exercise.title}
                  </span>
                  <span className="live-index-links">
                    <a href={exerciseUrl(exercise.id, 'starter')}>Starter</a>
                    <a href={exerciseUrl(exercise.id, 'solution')}>Solution</a>
                    {import.meta.env.DEV && (
                      <button type="button" onClick={() => openInEditor(exercise.id, 'starter')}>Open in editor</button>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
