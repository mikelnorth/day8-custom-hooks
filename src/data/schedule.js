// Minute offsets from the start of class. Total: 180 minutes.
export const schedule = [
  { start: 0,   end: 5,   title: 'Day 7 recap & the big idea',                          to: '/recap',             kind: 'wedo' },
  { start: 5,   end: 15,  title: 'What a custom hook is, component vs hook, rules',     to: '/what-is-a-hook',    kind: 'talk' },
  { start: 15,  end: 35,  title: 'useToggle & Exercise 1',                              to: '/use-toggle',        kind: 'youdo' },
  { start: 35,  end: 50,  title: 'useCounter, return shapes & Exercise 2',              to: '/use-counter',       kind: 'youdo' },
  { start: 50,  end: 60,  title: 'Break',                                               to: null,                 kind: 'break' },
  { start: 60,  end: 90,  title: 'useLocalStorage, share logic not state, Exercise 3 & the full hook', to: '/use-local-storage', kind: 'youdo' },
  { start: 90,  end: 100, title: 'Event vs effect & Exercise 4',                        to: '/event-vs-effect',   kind: 'wedo' },
  { start: 100, end: 125, title: 'useFetch: edge cases, the race & AbortController',    to: '/use-fetch',         kind: 'wedo' },
  { start: 125, end: 130, title: 'Mini project intro',                                  to: '/mini-project',      kind: 'wedo' },
  { start: 130, end: 175, title: 'Mini project work time + push to GitHub',             to: '/mini-project',      kind: 'youdo' },
  { start: 175, end: 180, title: 'Wrap-up & Day 9 preview',                             to: '/wrap-up',           kind: 'talk' },
]

export function fmt(minutes) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h}:${String(m).padStart(2, '0')}`
}

export function blockAt(elapsedMinutes) {
  return schedule.find((b) => elapsedMinutes >= b.start && elapsedMinutes < b.end) ?? null
}

export function blockAfter(block) {
  if (!block) return null
  const i = schedule.indexOf(block)
  return schedule[i + 1] ?? null
}
