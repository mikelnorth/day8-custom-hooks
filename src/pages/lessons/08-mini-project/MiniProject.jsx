import LessonShell from '../../../components/ui/LessonShell.jsx'
import ConceptCallout from '../../../components/ui/ConceptCallout.jsx'
import ExampleBlock from '../../../components/ui/ExampleBlock.jsx'
import CodeBlock from '../../../components/ui/CodeBlock.jsx'
import DemoSurface from '../../../components/ui/DemoSurface.jsx'
import Checklist from '../../../components/ui/Checklist.jsx'
import Note from '../../../components/ui/Note.jsx'
import RevealCard from '../../../components/ui/RevealCard.jsx'
import Tree from '../../../components/ui/Tree.jsx'
import ProductivityPanelDemo from './ProductivityPanelDemo.jsx'

function PlainList({ items }) {
  return (
    <ul className="list-disc list-inside text-sm text-slate-700 space-y-0.5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export default function MiniProject() {
  return (
    <LessonShell
      number="8"
      title="Day 8 Mini Project — Hook-Powered Utility App"
      subtitle="Students build a small app using at least two custom hooks, and submit it before they leave. A 5-minute plan, then 45 minutes to build and push."
      minutes="50"
    >
      <ConceptCallout title="Every component calls its own hook. App only arranges them." eyebrow="The whole day in one app">
        <p>Three behaviors, three hooks, three small components. No effect needed: everything here happens because the user did something.</p>
      </ConceptCallout>

      <DemoSurface title="What you are building: toggle, count, type, then refresh">
        <ProductivityPanelDemo />
      </DemoSurface>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white px-5 py-4 space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">Productivity Panel</h2>
          <p className="text-sm text-slate-700">Features:</p>
          <PlainList items={['toggle a help panel', 'counter for completed actions', 'saved username or note in localStorage']} />
        </div>
        <div className="rounded-xl border border-slate-200 bg-white px-5 py-4 space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">Required Features</h2>
          <PlainList items={['one toggle behavior', 'one counter behavior', 'one persisted value', 'clean components using custom hooks']} />
        </div>
        <div className="rounded-xl border border-slate-200 bg-white px-5 py-4 space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">Suggested Structure</h2>
          <Tree>{`App
 ├ Header
 ├ TogglePanel
 ├ CounterCard
 └ SavedNote`}</Tree>
          <p className="text-sm text-slate-700">Hooks:</p>
          <Tree>{`hooks/
 ├ useToggle.js
 ├ useCounter.js
 └ useLocalStorage.js`}</Tree>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white px-5 py-4 space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">Submission Requirements</h2>
          <p className="text-sm text-slate-700">Submit your work using a GitHub repository. Your repository must include:</p>
          <p className="text-sm font-semibold text-slate-800">Source Code</p>
          <p className="text-sm text-slate-700">Your React app must be fully included in the repo.</p>
          <p className="text-sm font-semibold text-slate-800">Working App</p>
          <p className="text-sm text-slate-700">Must include:</p>
          <PlainList items={['at least 2 custom hooks', 'reusable logic', 'clear component structure']} />
          <p className="text-sm font-semibold text-slate-800">README Reflection</p>
          <p className="text-sm text-slate-700">Answer:</p>
          <ol className="list-decimal list-inside text-sm text-slate-700 space-y-0.5">
            <li>What is a custom hook?</li>
            <li>How is a custom hook different from a component?</li>
            <li>When should you create a custom hook?</li>
            <li>Which hook did you build that felt most useful?</li>
            <li>How did custom hooks improve your code?</li>
          </ol>
        </div>
      </div>

      <ExampleBlock
        variant="wedo"
        title="Mini project intro: plan it in 5 minutes"
        exercise="08-1-we-do-plan"
        description="Use the demo above, then answer out loud before anyone opens an editor."
        minutes="5"
      >
        <div className="grid gap-3 md:grid-cols-3">
          <RevealCard question="Which hook handles each behavior?" label="Reveal">
            <p>Help panel: <code>useToggle</code>. Completed actions: <code>useCounter</code>. Saved note: <code>useLocalStorage</code>. Header needs no hook.</p>
          </RevealCard>
          <RevealCard question="Does any state need to be shared?" label="Reveal">
            <p>No. Each component calls its own hook. If two components needed the same value, call the hook once in App and pass it down.</p>
          </RevealCard>
          <RevealCard question="Is saving the note an event or an effect?" label="Reveal">
            <p>Event. The note changes because the user typed, so the hook saves it in its setter. No <code>useEffect</code>.</p>
          </RevealCard>
        </div>
      </ExampleBlock>

      <ExampleBlock
        variant="youdo"
        title="Work time: build it, then push it"
        exercise="08-2-you-do-productivity-panel"
        description="Protect this time. Students work in their own Vite project, or from the starter (student-projects/09-productivity-panel-starter). Circulate with the checklist below. At 2:50, call time: everyone pushes."
        minutes="45"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <Checklist
              title="Suggested order (about 40 min)"
              items={[
                'Create the project, or copy the starter. npm install, npm run dev',
                'Write useToggle, then TogglePanel',
                'Write useCounter, then CounterCard',
                'Write useLocalStorage, then SavedNote. Use a key with your project name in it',
                'Refresh: only the note survives',
                'README: answer all 5 reflection questions',
              ]}
            />
            <Note tone="emerald" title="Instructor: what to look for">
              <ul className="list-disc list-inside space-y-1">
                <li>JSX in a hook, or a hook file that doesn't start with <code>use</code>.</li>
                <li>Hooks defined inside <code>App.jsx</code> instead of in <code>hooks/</code>. It works, but the structure is part of the grade.</li>
                <li>A <code>useEffect</code> to save the note, or to count characters. Ask "why does this code need to run?"</li>
                <li>"My note isn't saved": they haven't refreshed, or another project on the same port uses the same key.</li>
                <li>Don't project "Run solution" during work time. It's the graded answer.</li>
              </ul>
            </Note>
          </div>
          <div className="space-y-3">
            <Checklist
              title="Submitting with GitHub (last 5 minutes)"
              items={[
                'On github.com: New repository, e.g. day8-productivity-panel. Leave "Add a README" unchecked',
                'In the project folder: git status. "Not a git repository"? Run git init',
                'Check .gitignore lists node_modules (Vite\'s does)',
                'git add .   then   git commit -m "Day 8 mini project"',
                'git branch -M main, then the two lines GitHub shows: git remote add origin ... and git push -u origin main',
                'Refresh the repo page: src/ and README.md are there, node_modules is not',
                'Paste the repo link into the assignment',
              ]}
            />
            <CodeBlock label="node_modules got committed?">{`git rm -r --cached node_modules
git commit -m "Remove node_modules"
git push`}</CodeBlock>
            <Note tone="amber" title="If git gets stuck">
              <p>A first push asks students to sign in. If it fails, don't spend work time on it in front of the class: they can upload with GitHub Desktop, or push tonight. The code is what you grade.</p>
            </Note>
          </div>
        </div>
      </ExampleBlock>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Grading checklist</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Checklist
            title="Submission"
            items={[
              'GitHub repo with the full React app (no node_modules)',
              'At least 2 custom hooks',
              'Reusable logic',
              'Clear component structure',
              'One toggle, one counter, and one persisted value',
              'README answers all 5 reflection questions',
            ]}
          />
          <Checklist
            title="Strong performance looks like"
            items={[
              'hooks start with use',
              'logic is truly reusable',
              'components are cleaner because of extraction',
              'students can explain why the hook exists',
              'students can explain event vs effect reasoning',
            ]}
          />
          <Checklist
            title="Common mistakes to watch for"
            items={[
              'putting JSX inside a custom hook',
              'forgetting the use prefix',
              'extracting logic too early',
              'confusing reusable UI with reusable logic',
              'using useEffect automatically without asking why code needs to run',
            ]}
          />
          <Note tone="slate" title="Instructor only: reference apps">
            <p>Three finished submissions are in <code>assignment-demos/</code>. Don't hand them out before the due date. The solution in <code>/live.html</code> is graded too, so don't share this app's link before then either.</p>
            <ul className="list-disc list-inside mt-1 space-y-0.5">
              <li><code>01-productivity-panel</code>: minimum solid submission, the suggested structure exactly</li>
              <li><code>02-study-tracker</code>: componentized, hooks reused several times, a counter that persists by composing hooks</li>
              <li><code>03-workout-log</code>: stretch, more hooks, including one with an effect and cleanup, to show event vs effect</li>
            </ul>
          </Note>
        </div>
      </section>

      <ExampleBlock
        variant="youdo"
        title="Finish early: find the five mistakes"
        exercise="08-3-you-do-find-the-mistakes"
        description="A working Productivity Panel with all five common mistakes. Find them, fix them, then look for the same ones in your own project. Or start the rebuild challenge on page 9, or add useFetch to your app."
      />
    </LessonShell>
  )
}
