import LessonShell from '../../../components/ui/LessonShell.jsx'
import ConceptCallout from '../../../components/ui/ConceptCallout.jsx'
import ExampleBlock from '../../../components/ui/ExampleBlock.jsx'
import Checklist from '../../../components/ui/Checklist.jsx'
import Note from '../../../components/ui/Note.jsx'

const review = [
  'what custom hooks are',
  'why they exist',
  'how to extract reusable logic',
  'how to build useToggle',
  'how to build useCounter',
  'how to build useLocalStorage',
  'how to think about event vs effect',
  'when to create custom hooks',
]

const homework = [
  { title: 'Finish the Productivity Panel and its README reflection, if it isn\'t pushed yet', href: null },
  { title: 'Rebuild challenge, from memory (above)', href: null },
  { title: 'If you didn\'t get to it: the full-featured useLocalStorage (page 5), then open two tabs and watch them sync', href: null },
  { title: 'Rebuild useFetch from memory, then use it with a real API: https://jsonplaceholder.typicode.com/users', href: null },
  { title: 'Reusing Logic with Custom Hooks: "Extract a useCounter Hook"', href: 'https://react.dev/learn/reusing-logic-with-custom-hooks#challenges' },
  { title: 'Reusing Logic with Custom Hooks: "Make the counter delay configurable"', href: 'https://react.dev/learn/reusing-logic-with-custom-hooks#challenges' },
  { title: 'Separating Events from Effects: "Fix a variable that doesn\'t update"', href: 'https://react.dev/learn/separating-events-from-effects#challenges' },
  { title: 'Read: Rules of Hooks (5 minutes)', href: 'https://react.dev/reference/rules/rules-of-hooks' },
]

const docsToday = [
  ['Reusing Logic with Custom Hooks', 'https://react.dev/learn/reusing-logic-with-custom-hooks'],
  ['Rules of Hooks', 'https://react.dev/reference/rules/rules-of-hooks'],
  ['Separating Events from Effects', 'https://react.dev/learn/separating-events-from-effects'],
  ['You Might Not Need an Effect', 'https://react.dev/learn/you-might-not-need-an-effect'],
  ['Sharing State Between Components', 'https://react.dev/learn/sharing-state-between-components'],
  ['You Might Not Need an Effect: Fetching data', 'https://react.dev/learn/you-might-not-need-an-effect#fetching-data'],
  ['Synchronizing with Effects: Fetching data', 'https://react.dev/learn/synchronizing-with-effects#fetching-data'],
  ['useState reference', 'https://react.dev/reference/react/useState'],
]

export default function WrapUp() {
  return (
    <LessonShell
      number="9"
      title="Wrap-up"
      subtitle="Components reuse UI. Custom hooks reuse logic. And they share logic, not state."
      minutes="5"
    >
      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">Today students learned</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {review.map((r) => (
            <li key={r} className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800">{r}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Exit ticket (2 minutes)</h2>
        <Note tone="slate">
          <ol className="list-decimal list-inside space-y-1">
            <li>In one sentence: how is a custom hook different from a component?</li>
            <li>Two components both call <code>useCounter()</code>. You click Increase in one. What happens in the other, and why?</li>
            <li>One thing that is still fuzzy.</li>
          </ol>
        </Note>
        <p className="text-xs text-slate-500">Answer to 2: nothing. Each call gets its own state. To share one count, lift it up.</p>
      </section>

      <ExampleBlock
        variant="youdo"
        title="Rebuild challenge"
        exercise="09-1-you-do-rebuild"
        description="The course page says &quot;before class ends&quot;. It won't fit, because the end of class goes to building and submitting the mini project. It's homework, or for anyone who finishes early. Close your code, the docs, and AI first."
      >
        <Checklist
          title="Rebuild from memory"
          items={[
            'useToggle',
            'useCounter',
            'useLocalStorage',
            'one small component that uses each',
          ]}
        />
      </ExampleBlock>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Homework</h2>
        <ul className="space-y-2">
          {homework.map((h) => (
            <li key={h.title}>
              {h.href ? (
                <a href={h.href} target="_blank" rel="noreferrer" className="block rounded-lg border border-cyan-200 bg-cyan-50/40 px-4 py-2.5 text-sm text-slate-800 hover:border-cyan-400">
                  {h.title}
                </a>
              ) : (
                <p className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800">{h.title}</p>
              )}
            </li>
          ))}
        </ul>
      </section>

      <ConceptCallout title="What's next: Project Day — Hooks, Effects, and Data" eyebrow="Day 9 preview">
        <p>Students will combine events, effects, fetching, and custom hooks into a real app. You built <code>useFetch</code> today. A <code>useMovies(searchTerm)</code> built on it is a good start for the recap's movie search.</p>
      </ConceptCallout>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">react.dev map for today</h2>
        <div className="rounded-xl border border-cyan-200 bg-cyan-50/40 px-5 py-4">
          <ul className="grid gap-1.5 sm:grid-cols-2 text-sm">
            {docsToday.map(([title, href]) => (
              <li key={href}><a href={href} target="_blank" rel="noreferrer" className="text-slate-800 hover:text-cyan-800 hover:underline">{title}</a></li>
            ))}
          </ul>
        </div>
      </section>
    </LessonShell>
  )
}
