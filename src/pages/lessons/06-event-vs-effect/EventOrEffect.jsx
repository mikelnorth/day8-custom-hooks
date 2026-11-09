import { useState } from 'react'

const examples = [
  { id: 'A', text: 'Toggle a modal', answer: 'event', why: 'Event/update logic. The user clicked, so toggle runs in the click handler.' },
  { id: 'B', text: 'Save input value to localStorage during the custom setter', answer: 'event', why: 'Event/update logic. The user changed the value, so save it right then, in updateValue.' },
  { id: 'C', text: 'Fetch movies when search term changes', answer: 'effect', why: 'Effect. Keep the results in sync with a server for whatever the search term is now.' },
  { id: 'D', text: 'Listen for window resize', answer: 'effect', why: 'Effect. Subscribe to something outside React while the component is on screen, and clean up.' },
  { id: 'E', text: 'Compute a total from cart items', answer: 'neither', why: 'Neither: derive during render. const total = cartItems.reduce(...). No state, no effect.' },
]

const bonus = [
  { id: 'F', text: 'Update the note when another browser tab saves a new one', answer: 'effect', why: 'Effect. Another tab is outside React: subscribe to the storage event while on screen, and remove the listener on cleanup. (Page 5\'s full useLocalStorage.)' },
  { id: 'G', text: 'Load the books again when the user clicks Reload', answer: 'event', why: 'The click is an event: refetch() only changes state. The fetch that follows is the effect, syncing with the new state. (Page 7.)' },
]

const choices = [
  ['event', 'Event'],
  ['effect', 'Effect'],
  ['neither', 'Neither'],
]

function Question({ example }) {
  const [choice, setChoice] = useState(null)
  const correct = choice === example.answer

  function buttonClass(value) {
    const selected = choice === value
    return `rounded-md border px-3 py-1.5 text-sm ${selected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300 bg-white hover:bg-slate-100'}`
  }

  return (
    <li className="rounded-lg border border-slate-200 bg-white px-4 py-3 space-y-2">
      <p className="text-slate-900"><strong>Example {example.id}:</strong> {example.text}</p>
      <div className="flex flex-wrap gap-2">
        {choices.map(([value, label]) => (
          <button key={value} className={buttonClass(value)} onClick={() => setChoice(value)}>{label}</button>
        ))}
      </div>
      {choice !== null && (
        <p className={`text-sm ${correct ? 'text-emerald-800' : 'text-rose-800'}`}>
          {correct ? 'Yes. ' : 'Not quite. '}{example.why}
        </p>
      )}
    </li>
  )
}

export default function EventOrEffect({ showBonus = false }) {
  const list = showBonus ? bonus : examples
  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {list.map((example) => (
        <Question key={example.id} example={example} />
      ))}
    </ul>
  )
}
