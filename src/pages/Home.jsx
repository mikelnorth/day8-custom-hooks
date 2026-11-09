import { Link } from 'react-router-dom'
import ConceptCallout from '../components/ui/ConceptCallout.jsx'
import DocsLink from '../components/ui/DocsLink.jsx'
import { schedule, fmt } from '../data/schedule.js'

const objectives = [
  'Define what a custom hook is and explain its purpose.',
  'Differentiate between a React component and a custom hook.',
  'Identify when and why to create a custom hook for reusable logic.',
  'Demonstrate how custom hooks are built using hooks like useState and useEffect.',
  'Create and use a custom hook within one or more components to build a clean, organized app.',
]

const builds = [
  'useToggle, used by two components',
  'useCounter, with a counter and a score tracker',
  'useLocalStorage, so a value survives a refresh, then a full-featured version',
  'useFetch, with loading, errors, refetch, and AbortController',
  'A Hook-Powered Utility App, pushed to GitHub before you leave',
]

const lessonCards = [
  { to: '/recap', title: '1. Recap & the Big Idea', tag: 'Warm up', desc: 'Four Day 7 questions, then: components reuse UI, custom hooks reuse logic.' },
  { to: '/what-is-a-hook', title: '2. What Is a Custom Hook?', tag: 'Concept', desc: 'Definition, the important rule, component vs hook, "is a hook just a function?", and the Rules of Hooks.' },
  { to: '/use-toggle', title: '3. useToggle & Exercise 1', tag: 'Hands on', desc: 'Extract the toggle logic from a Modal, then use one hook in two components.' },
  { to: '/use-counter', title: '4. useCounter & Exercise 2', tag: 'Hands on', desc: 'Return an object, arrays vs objects, when not to make a hook, and a score tracker.' },
  { to: '/use-local-storage', title: '5. useLocalStorage & Exercise 3', tag: 'Hands on', desc: 'Save in the setter, refresh to prove it, DevTools, share logic not state, and a full-featured version that syncs tabs.' },
  { to: '/event-vs-effect', title: '6. Event vs Effect & Exercise 4', tag: 'Judgment', desc: 'Why does this code need to run? Five examples: event, effect, or neither.' },
  { to: '/use-fetch', title: '7. useFetch', tag: 'We do', desc: 'Loading, error, data, !response.ok, bad JSON, no url, empty results, refetch, then the race and AbortController.' },
  { to: '/mini-project', title: '8. Mini Project: Productivity Panel', tag: 'Build + submit', desc: 'A 5-minute plan, then 45 minutes to build it and push it to GitHub.' },
  { to: '/wrap-up', title: '9. Wrap-up', tag: 'Consolidate', desc: 'Summary, exit ticket, rebuild challenge (homework), and the Day 9 preview.' },
]

const kindStyles = {
  talk: 'bg-indigo-100 text-indigo-700',
  wedo: 'bg-amber-100 text-amber-800',
  youdo: 'bg-emerald-100 text-emerald-800',
  break: 'bg-slate-100 text-slate-600',
}
const kindLabel = { talk: 'Teach', wedo: 'We do', youdo: 'You do', break: 'Break' }

const mistakes = [
  'putting JSX inside a custom hook',
  'forgetting the use prefix',
  'extracting logic too early',
  'confusing reusable UI with reusable logic',
  'using useEffect automatically without asking why code needs to run',
]

const goodSigns = [
  'hooks start with use',
  'logic is truly reusable',
  'components are cleaner because of extraction',
  'students can explain why the hook exists',
  'students can explain event vs effect reasoning',
]

export default function Home() {
  return (
    <article className="space-y-10">
      <header className="border-b border-slate-200 pb-6">
        <p className="text-xs uppercase tracking-widest text-indigo-600 font-semibold">Instructor guide · 3 hours</p>
        <h1 className="text-4xl font-bold text-slate-900 mt-1">Day 8 &mdash; Custom Hooks</h1>
        <p className="text-slate-600 mt-3 text-base leading-relaxed max-w-3xl">
          Today students learn how to move repeated logic out of components and into reusable hooks.
        </p>
      </header>

      <ConceptCallout title="Components reuse UI. Custom hooks reuse logic." eyebrow="Big idea for today">
        <p>Props pass data. Hooks manage logic and state. A custom hook is a function that uses React hooks and starts with <code>use</code>. It hands back logic and data, never JSX.</p>
        <p>The one line to repeat all day: <strong>custom hooks share logic, not state.</strong> Every call gets its own state.</p>
      </ConceptCallout>

      <DocsLink title="Reusing Logic with Custom Hooks" href="https://react.dev/learn/reusing-logic-with-custom-hooks">
        Today's backbone. Its useOnlineStatus walkthrough is the same move we make with useToggle, and its "share stateful logic, not state itself" section is page 5's I do. Supported by Rules of Hooks, Separating Events from Effects, and You Might Not Need an Effect.
      </DocsLink>

      <section>
        <h2 className="text-xl font-semibold text-slate-900 mb-3">3-hour schedule</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">Time</th>
                <th className="px-4 py-3 font-semibold">Min</th>
                <th className="px-4 py-3 font-semibold">Block</th>
                <th className="px-4 py-3 font-semibold">Mode</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {schedule.map((b) => (
                <tr key={b.start} className={b.kind === 'break' ? 'bg-slate-50/60' : ''}>
                  <td className="px-4 py-2.5 font-mono text-slate-700 whitespace-nowrap">{fmt(b.start)} – {fmt(b.end)}</td>
                  <td className="px-4 py-2.5 text-slate-500 tabular-nums">{b.end - b.start}</td>
                  <td className="px-4 py-2.5 text-slate-800">
                    {b.to ? <Link to={b.to} className="hover:text-indigo-700 hover:underline">{b.title}</Link> : b.title}
                  </td>
                  <td className="px-4 py-2.5">
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${kindStyles[b.kind]}`}>{kindLabel[b.kind]}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-slate-500">
          The 45 minutes of work time is the block to protect: students build <strong>and submit</strong> in class. Never cut it. If you are behind, move the full-featured useLocalStorage (page 5) to homework first. The full list is in LESSON-PLAN.md.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">Learning objectives</h2>
          <p className="text-sm text-slate-600 mb-2">By the end of today, students should be able to:</p>
          <ul className="space-y-2">
            {objectives.map((o, i) => (
              <li key={o} className="flex gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 leading-relaxed">
                <span className="shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center mt-0.5">{i + 1}</span>
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">Build</h2>
          <ul className="space-y-2">
            {builds.map((b) => (
              <li key={b} className="rounded-lg border border-emerald-200 bg-emerald-50/60 px-4 py-3 text-sm text-emerald-900">{b}</li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-slate-500 leading-relaxed">
            Every activity has a starter and solution in <code className="px-1 bg-slate-100 rounded">exercises/</code>, with hooks in their own files beside <code className="px-1 bg-slate-100 rounded">App.jsx</code>. Standalone copies of the main exercises are in <code className="px-1 bg-slate-100 rounded">student-projects/</code>.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-900 mb-3">Lesson flow</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {lessonCards.map((l) => (
            <Link key={l.to} to={l.to} className="group rounded-xl border border-slate-200 bg-white px-5 py-4 hover:border-indigo-400 hover:shadow transition">
              <p className="text-[11px] uppercase tracking-widest text-indigo-600 font-semibold">{l.tag}</p>
              <p className="text-lg font-semibold text-slate-900 mt-0.5 group-hover:text-indigo-700">{l.title}</p>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">{l.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">Common mistakes to watch for</h2>
          <ul className="space-y-2">
            {mistakes.map((m) => (
              <li key={m} className="rounded-md border border-rose-200 bg-rose-50/60 px-3 py-2 text-sm text-rose-900">{m}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">Strong performance looks like</h2>
          <ul className="space-y-2">
            {goodSigns.map((m) => (
              <li key={m} className="rounded-md border border-emerald-200 bg-emerald-50/60 px-3 py-2 text-sm text-emerald-900">{m}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white px-5 py-4">
        <h2 className="text-lg font-semibold text-slate-900">Scope guardrails for today</h2>
        <ul className="mt-2 text-sm text-slate-700 leading-relaxed list-disc list-inside space-y-1">
          <li><strong>In:</strong> custom hooks built from <code>useState</code> and <code>useEffect</code>, return shapes, the Rules of Hooks, <code>localStorage</code> (including the <code>storage</code> event), event vs effect, and <code>useFetch</code> with <code>AbortController</code>.</li>
          <li><strong>Review only:</strong> lifting state up, as the answer to "how do two components share one value?" Effects and data fetching (Days 6 and 7) appear as examples.</li>
          <li><strong>Day 9:</strong> Project Day. Students can bring <code>useFetch</code> with them.</li>
          <li><strong>Not today:</strong> context, <code>useReducer</code>, <code>useRef</code>, <code>useCallback</code>/<code>useMemo</code>, <code>useEffectEvent</code>, and routing. Docs challenges that need them are tagged skip.</li>
          <li><strong>Before the due date:</strong> don't share this app's link or <code>/live.html</code>. The mini project's solution runs there.</li>
        </ul>
      </section>
    </article>
  )
}
