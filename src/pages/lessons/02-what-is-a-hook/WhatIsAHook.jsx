import LessonShell from '../../../components/ui/LessonShell.jsx'
import ConceptCallout from '../../../components/ui/ConceptCallout.jsx'
import ExampleBlock from '../../../components/ui/ExampleBlock.jsx'
import CodeBlock from '../../../components/ui/CodeBlock.jsx'
import Note from '../../../components/ui/Note.jsx'
import RevealCard from '../../../components/ui/RevealCard.jsx'
import DocsLink from '../../../components/ui/DocsLink.jsx'

const rules = [
  ['reuse logic', 'State and the functions that change it. Not markup.'],
  ['do not render JSX', 'They return data and functions. The component decides what it looks like.'],
  ['can call other hooks', 'useState, useEffect, or your own hooks.'],
  ['must start with use', 'useToggle, not toggle. React and the linter rely on it.'],
]

export default function WhatIsAHook() {
  return (
    <LessonShell
      number="2"
      title="What is a custom hook?"
      subtitle="A JavaScript function that uses React hooks and starts with use."
      minutes="10"
    >
      <ConceptCallout title="A custom hook is a JavaScript function that uses React hooks and starts with use." eyebrow="Definition">
        <p>Examples: <code>useToggle</code>, <code>useCounter</code>, <code>useLocalStorage</code>, <code>useMovies</code>.</p>
      </ConceptCallout>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Important rule. Custom hooks:</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {rules.map(([rule, why]) => (
            <div key={rule} className="rounded-xl border border-slate-200 bg-white px-4 py-3">
              <p className="font-semibold text-slate-900">{rule}</p>
              <p className="text-sm text-slate-600">{why}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Component vs custom hook</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <CodeBlock label="Component — returns UI">{`function Button() {
  return <button>Click</button>;
}`}</CodeBlock>
          <CodeBlock label="Custom hook — returns logic/data/functions">{`function useToggle() {
  // state + logic here
}`}</CodeBlock>
        </div>
        <p className="text-sm text-slate-700">
          Writing state and logic straight into a component is fine once. But if you repeat this pattern in multiple components, you'll duplicate logic. Custom hooks solve this by letting you extract behavior.
        </p>
      </section>

      <ExampleBlock
        variant="ido"
        title="Same logic, two components"
        exercise="02-1-i-do-repeated-logic"
        description="Modal and HelpMessage each write the same isOpen state and toggle function. Pull the repeated button into a component, then point out that the logic is still repeated."
        minutes="3"
      >
        <Note tone="sky" title="Say this">
          <p>"I just reused UI with a component. But the <code>useState</code> and <code>toggle</code> lines are still in both. A component returns JSX, so it can't hand <code>isOpen</code> and <code>toggle</code> back. That's the job of a custom hook." This is the "confusing reusable UI with reusable logic" mistake, caught early.</p>
        </Note>
      </ExampleBlock>

      <RevealCard question={'Students always ask: "So is a hook just a function?"'} label="Reveal the answer">
        <p><strong>Yes.</strong> A custom hook is a plain JavaScript function. What makes it a hook is that it <strong>calls other hooks</strong>.</p>
        <p>The <code>use</code> prefix tells React and the linter "this function calls hooks, so check the Rules of Hooks inside it." That's why the name matters.</p>
        <p>The flip side: a function that calls no hooks shouldn't be named <code>use...</code>. <code>formatPrice(price)</code> is a normal function, and you can call it anywhere. We'll see one on page 4.</p>
      </RevealCard>

      <ExampleBlock
        variant="ido"
        title="The Rules of Hooks"
        exercise="02-2-i-do-rules-of-hooks"
        description="Call hooks at the top level of a component or of another hook. Never inside conditions, loops, or event handlers. The starter breaks it twice: run it, then show the lint errors."
        minutes="3"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <CodeBlock label="🔴 Breaks the rule">{`function ProductCard() {
  const [showDetails, setShowDetails] = useState(false);

  if (showDetails) {
    const [shipping] = useState("Ships in 2 days");
  }

  function handleLike() {
    const [likes, setLikes] = useState(0);
  }
  // ...
}`}</CodeBlock>
          <CodeBlock label="✅ Top level, every render, same order">{`function ProductCard() {
  const [showDetails, setShowDetails] = useState(false);
  const [likes, setLikes] = useState(0);

  function handleLike() {
    setLikes(likes + 1);
  }

  // Use the value in the condition instead:
  // {showDetails && <p>{shipping}</p>}
}`}</CodeBlock>
        </div>
        <CodeBlock label="What the linter says (npx eslint --no-ignore exercises/02-2-i-do-rules-of-hooks/starter)">{`React Hook "useState" is called conditionally. React Hooks must be
called in the exact same order in every component render

React Hook "useState" is called in function "handleLike" that is neither
a React function component nor a custom React Hook function. ...`}</CodeBlock>
        <Note tone="amber" title="What happens in the browser">
          <ul className="list-disc list-inside space-y-1">
            <li>Click "Show details": the page shows <code>Rendered more hooks than during the previous render.</code> React matches hooks by their order, and this render called one more.</li>
            <li>Refresh, then click "Like (broken)" with the console open: an error instead of a like. Handlers run after rendering, and hooks only work during it.</li>
            <li>The same rules apply inside your own hooks. That's what the <code>use</code> prefix switches on.</li>
          </ul>
        </Note>
      </ExampleBlock>

      <div className="grid gap-4 md:grid-cols-2">
        <DocsLink title="Hook names always start with use" href="https://react.dev/learn/reusing-logic-with-custom-hooks#hook-names-always-start-with-use">
          "Hook names must start with use followed by a capital letter." Its deep dive answers "is a hook just a function?": functions that don't call hooks don't need to be hooks.
        </DocsLink>
        <DocsLink title="Rules of Hooks" href="https://react.dev/reference/rules/rules-of-hooks">
          The full list of places not to call hooks, with a 🔴/✅ example for each. Short. Read it after class.
        </DocsLink>
      </div>
    </LessonShell>
  )
}
