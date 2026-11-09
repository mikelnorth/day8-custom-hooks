import { Component, StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import '/exercises/styles.css'
import './live.css'
import LiveBar from './LiveBar.jsx'
import ExerciseIndex from './ExerciseIndex.jsx'
import { exerciseFile, findExercise } from '../data/exercises.js'

// Every exercise is loaded on demand, so one npm install and one dev server cover all of them.
const entries = import.meta.glob('/exercises/*/*/App.jsx')

const params = new URLSearchParams(window.location.search)
const id = params.get('ex')
const version = params.get('v') === 'solution' ? 'solution' : 'starter'
const exercise = findExercise(id)
const load = exercise ? entries[`/${exerciseFile(id, version)}`] : null
const Exercise = load ? lazy(load) : null

// While live coding, a runtime error should show a message rather than a blank page.
// Fast Refresh retries this boundary when you save a fix.
class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (!this.state.error) return this.props.children
    return (
      <div className="live-error">
        <strong>{this.state.error.message}</strong>
        <p>Fix the file and save. This page recovers on its own.</p>
      </div>
    )
  }
}

if (exercise) document.title = `${exercise.title} (${version})`

// A form submit without preventDefault would replace this page's ?ex= query and land on the
// exercise list. Keep the browser's real lesson, a full page reload, on the same exercise.
// This runs after React's handlers, so a preventDefault in an exercise still wins.
window.addEventListener('submit', (event) => {
  if (event.defaultPrevented) return
  event.preventDefault()
  window.location.reload()
})

createRoot(document.getElementById('live-bar')).render(
  <LiveBar exercise={exercise} version={version} />,
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {Exercise ? (
      <ErrorBoundary>
        <Suspense fallback={null}>
          <Exercise />
        </Suspense>
      </ErrorBoundary>
    ) : (
      <ExerciseIndex />
    )}
  </StrictMode>,
)
