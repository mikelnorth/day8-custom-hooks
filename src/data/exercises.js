// One entry per I do / We do / You do block in the lesson.
// Each id is a folder: exercises/<id>/starter/App.jsx and exercises/<id>/solution/App.jsx
// `files` lists the other files beside App.jsx (hooks, components). "Open in editor" opens them too.
// Use an array when starter and solution have the same files, or { starter, solution } when not.
const pages = {
  1: { title: 'Recap & the Big Idea', route: '/recap' },
  2: { title: 'What Is a Custom Hook?', route: '/what-is-a-hook' },
  3: { title: 'useToggle & Exercise 1', route: '/use-toggle' },
  4: { title: 'useCounter & Exercise 2', route: '/use-counter' },
  5: { title: 'useLocalStorage & Exercise 3', route: '/use-local-storage' },
  6: { title: 'Event vs Effect & Exercise 4', route: '/event-vs-effect' },
  7: { title: 'useFetch', route: '/use-fetch' },
  8: { title: 'Mini Project: Productivity Panel', route: '/mini-project' },
  9: { title: 'Wrap-up', route: '/wrap-up' },
}

const toggle = 'hooks/useToggle.js'
const counter = 'hooks/useCounter.js'
const storage = 'hooks/useLocalStorage.js'
const fetchHook = 'hooks/useFetch.js'

const list = [
  [1, 'we do', '01-1-we-do-recap', 'Day 7 recap', ['movies.js']],
  [2, 'i do', '02-1-i-do-repeated-logic', 'Same logic, two components'],
  [2, 'i do', '02-2-i-do-rules-of-hooks', 'The Rules of Hooks'],
  [3, 'i do', '03-1-i-do-use-toggle', 'First custom hook: useToggle', [toggle]],
  [3, 'you do', '03-2-you-do-exercise-1', 'Exercise 1: build useToggle', [toggle]],
  [4, 'i do', '04-1-i-do-use-counter', 'useCounter', [counter]],
  [4, 'we do', '04-2-we-do-return-shapes', 'Arrays or objects?', [toggle, counter]],
  [4, 'we do', '04-3-we-do-hook-or-not', 'Hook or not? Extracting too early', {
    starter: ['hooks/useName.js', 'hooks/useFormatPrice.js'],
    solution: [],
  }],
  [4, 'you do', '04-4-you-do-exercise-2', 'Exercise 2: build useCounter', [counter]],
  [4, 'you do', '04-5-you-do-exercise-2-stretch', 'Exercise 2 stretch: incrementBy(amount)', [counter]],
  [5, 'i do', '05-1-i-do-use-local-storage', 'useLocalStorage', [storage]],
  [5, 'i do', '05-2-i-do-share-logic-not-state', 'Share logic, not state', [toggle, storage]],
  [5, 'you do', '05-3-you-do-exercise-3', 'Exercise 3: build useLocalStorage', [storage]],
  [5, 'we do', '05-4-we-do-full-local-storage', 'A full-featured useLocalStorage', [storage]],
  [6, 'we do', '06-1-we-do-event-or-effect', 'Exercise 4: Event or Effect?'],
  [7, 'we do', '07-1-we-do-use-fetch', 'Build useFetch, one edge case at a time', [fetchHook]],
  [7, 'i do', '07-2-i-do-fetch-race', 'The race, and AbortController', [fetchHook]],
  [8, 'we do', '08-1-we-do-plan', 'Plan the Productivity Panel'],
  [8, 'you do', '08-2-you-do-productivity-panel', 'Mini project: Productivity Panel', [
    'components/Header.jsx', 'components/TogglePanel.jsx', 'components/CounterCard.jsx', 'components/SavedNote.jsx',
    toggle, counter, storage,
  ]],
  [8, 'you do', '08-3-you-do-find-the-mistakes', 'Finish early: find the five mistakes', {
    starter: [
      'components/HelpPanel.jsx', 'components/CounterCard.jsx', 'components/SavedNote.jsx',
      'hooks/useToggle.jsx', 'hooks/counter.js', 'hooks/usePanelTitle.js', storage,
    ],
    solution: [
      'components/HelpPanel.jsx', 'components/DoneCard.jsx', 'components/BreaksCard.jsx', 'components/SavedNote.jsx',
      toggle, counter, storage,
    ],
  }],
  [9, 'you do', '09-1-you-do-rebuild', 'Rebuild challenge', {
    starter: [],
    solution: ['components/TogglePanel.jsx', 'components/CounterCard.jsx', 'components/SavedNote.jsx', toggle, counter, storage],
  }],
]

export const exercises = list.map(([page, kind, id, title, files = []]) => ({
  page,
  pageTitle: pages[page].title,
  route: pages[page].route,
  kind,
  id,
  title,
  files: Array.isArray(files) ? { starter: files, solution: files } : files,
}))

export function findExercise(id) {
  return exercises.find((exercise) => exercise.id === id)
}

export function exerciseFile(id, version) {
  return `exercises/${id}/${version}/App.jsx`
}

// App.jsx first, then the hook and component files beside it.
export function exerciseFiles(id, version) {
  const exercise = findExercise(id)
  const extra = exercise ? exercise.files[version] : []
  return [exerciseFile(id, version), ...extra.map((file) => `exercises/${id}/${version}/${file}`)]
}

export function exerciseUrl(id, version) {
  return `/live.html?ex=${id}&v=${version}`
}

// Vite's dev server opens files in your editor through this endpoint.
// Opens every file beside App.jsx, one at a time, then App.jsx last so it's the tab in front.
export async function openInEditor(id, version) {
  for (const file of exerciseFiles(id, version).reverse()) {
    await fetch(`/__open-in-editor?file=${encodeURIComponent(file)}`)
  }
}

// Every saved value in the Day 8 exercises and demos uses a key that starts with "day8-".
export function clearSavedValues() {
  try {
    Object.keys(localStorage)
      .filter((key) => key.startsWith('day8-'))
      .forEach((key) => localStorage.removeItem(key))
  } catch {
    // Storage blocked (private window). Nothing to clear.
  }
  window.location.reload()
}
