import LessonShell from '../../../components/ui/LessonShell.jsx'
import ConceptCallout from '../../../components/ui/ConceptCallout.jsx'
import ExampleBlock from '../../../components/ui/ExampleBlock.jsx'
import RevealCard from '../../../components/ui/RevealCard.jsx'
import DocsLink from '../../../components/ui/DocsLink.jsx'

const alreadyKnow = [
  ['Components', 'reuse UI'],
  ['Props', 'pass data'],
  ['Hooks', 'manage logic and state'],
  ['Custom hooks', 'help us reuse logic (today)'],
]

export default function Recap() {
  return (
    <LessonShell
      number="1"
      title="Day 7 recap & the big idea"
      subtitle="Yesterday we built logic directly inside components. Today we learn how to extract repeated logic into reusable hooks."
      minutes="5"
    >
      <ExampleBlock
        variant="wedo"
        title="Day 7 recap"
        exercise="01-1-we-do-recap"
        description="Cold call. Run the starter (a movie search with a pretend API, so no internet needed) and have students point at the code as they answer."
        minutes="4"
      >
        <div className="grid gap-3 md:grid-cols-2">
          <RevealCard question="Why is data fetching an effect?">
            <p>The data lives outside React, on a server. We fetch because the component is on screen with this search term, not because of one click. That's syncing with an outside system.</p>
          </RevealCard>
          <RevealCard question="What does the dependency array do?">
            <p>It tells React to run the effect again only when those values change. <code>[searchTerm]</code> fetches again when the search changes, and not on other renders.</p>
          </RevealCard>
          <RevealCard question="What is loading state?">
            <p>State that says "we asked and are still waiting", so the UI can show it. It turns on when a request starts and off when the data or an error comes back.</p>
          </RevealCard>
          <RevealCard question="Why should state stay minimal?">
            <p>Anything you can calculate from state or props (a count, a total, a filtered list) shouldn't be state too. Otherwise you have to keep two values in sync by hand, and they drift.</p>
          </RevealCard>
        </div>
      </ExampleBlock>

      <ConceptCallout title="Move repeated logic out of components and into reusable hooks." eyebrow="Big idea for today">
        <p>Look at the recap app again. If three pages needed that search logic, would you copy it three times? Today we learn the tool that fixes that.</p>
      </ConceptCallout>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Students have already learned</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {alreadyKnow.map(([name, job]) => (
            <div key={name} className={`rounded-xl border px-4 py-3 ${name === 'Custom hooks' ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-white'}`}>
              <p className="font-semibold text-slate-900">{name}</p>
              <p className="text-sm text-slate-700">{job}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-slate-600">
          Say it as a pair: <strong>components reuse UI, custom hooks reuse logic.</strong> We'll come back to this pair on every page.
        </p>
      </section>

      <DocsLink title="Reusing Logic with Custom Hooks" href="https://react.dev/learn/reusing-logic-with-custom-hooks">
        Today's docs page. The opening asks the same question as our recap: what if several components need the same logic? We follow it on pages 2 to 5.
      </DocsLink>
    </LessonShell>
  )
}
