import LessonShell from '../../../components/ui/LessonShell.jsx'
import ExampleBlock from '../../../components/ui/ExampleBlock.jsx'
import CodeBlock from '../../../components/ui/CodeBlock.jsx'
import DemoSurface from '../../../components/ui/DemoSurface.jsx'
import Checklist from '../../../components/ui/Checklist.jsx'
import Note from '../../../components/ui/Note.jsx'
import DocsLink from '../../../components/ui/DocsLink.jsx'
import useToggle from '../../../demos/hooks/useToggle.js'

const buttonClass = 'rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm hover:bg-slate-100'

function Modal() {
  const [isOpen, toggle] = useToggle(false)

  return (
    <div className="space-y-2">
      <button className={buttonClass} onClick={toggle}>Toggle Modal</button>
      {isOpen && <p className="text-sm text-slate-800">Modal is open</p>}
    </div>
  )
}

function ThemeSwitcher() {
  const [isDark, toggleTheme] = useToggle(false)

  return (
    <div className={`space-y-2 rounded-md p-3 ${isDark ? 'bg-slate-800 text-white' : 'bg-slate-50 text-slate-800'}`}>
      <button className={buttonClass + ' text-slate-800'} onClick={toggleTheme}>Switch to {isDark ? 'light' : 'dark'}</button>
      <p className="text-sm">{isDark ? 'Dark' : 'Light'} mode is on.</p>
    </div>
  )
}

export default function UseToggle() {
  return (
    <LessonShell
      number="3"
      title="First custom hook: useToggle"
      subtitle="Extract the toggle logic from a component, then use it in two components."
      minutes="20"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <CodeBlock label="Without a hook">{`import { useState } from "react";

function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <button onClick={toggle}>Toggle Modal</button>
      {isOpen && <p>Modal is open</p>}
    </div>
  );
}`}</CodeBlock>
        <div className="space-y-4">
          <CodeBlock label="With a custom hook — useToggle.js">{`import { useState } from "react";

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  function toggle() {
    setValue((prevValue) => !prevValue);
  }

  return [value, toggle];
}

export default useToggle;`}</CodeBlock>
          <CodeBlock label="Use it in a component">{`import useToggle from "./useToggle";

function Modal() {
  const [isOpen, toggle] = useToggle(false);

  return (
    <div>
      <button onClick={toggle}>Toggle Modal</button>
      {isOpen && <p>Modal is open</p>}
    </div>
  );
}`}</CodeBlock>
        </div>
      </div>

      <ExampleBlock
        variant="ido"
        title="Extract useToggle"
        exercise="03-1-i-do-use-toggle"
        description="Open in editor opens App.jsx and an empty hooks/useToggle.js. Move the logic into the hook file, live, and import it back."
        minutes="6"
      >
        <Note tone="sky" title="Point out as you type">
          <ul className="list-disc list-inside space-y-1">
            <li>The hook is its own file, <code>hooks/useToggle.js</code>. A <code>.js</code> file, because there's no JSX in it.</li>
            <li>It returns <code>[value, toggle]</code>, the same shape as <code>useState</code>. The component picks the names: <code>[isOpen, toggle]</code>.</li>
            <li><code>setValue((prevValue) =&gt; !prevValue)</code> always flips the latest value. Same updater form as the Day 6 timer.</li>
            <li>The JSX stayed in <code>Modal</code>. The component got shorter, and it reads like what it does.</li>
          </ul>
        </Note>
      </ExampleBlock>

      <DemoSurface title="What students build: one hook, two components. Click both.">
        <div className="grid gap-4 md:grid-cols-2">
          <Modal />
          <ThemeSwitcher />
        </div>
      </DemoSurface>

      <ExampleBlock
        variant="youdo"
        title="Exercise 1: build useToggle"
        exercise="03-2-you-do-exercise-1"
        description="Students build a useToggle hook, one component using it, then a second component using the same hook. Examples: modal, show/hide message, theme switcher."
        minutes="12"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Checklist
            title="Students build"
            items={[
              'a useToggle hook, in hooks/useToggle.js',
              'one component using it',
              'then a second component using the same hook',
              'Check: clicking one component does not change the other',
            ]}
          />
          <div className="space-y-3">
            <Note tone="amber" title="Ask the class after they finish">
              <p>"Both components call <code>useToggle</code>. Why doesn't opening the help message switch the theme?" Each call runs its own <code>useState</code>. Don't go deep yet: page 5 has a whole demo on this.</p>
            </Note>
            <Note tone="emerald" title="Instructor: what to look for">
              <ul className="list-disc list-inside space-y-1">
                <li>JSX inside the hook ("I'll return the button too"). Hooks return logic. The button belongs in the component.</li>
                <li><code>onClick={'{toggle()}'}</code>: the Day 6 key rule. Pass it, don't call it.</li>
                <li>Missing <code>export default</code>, or importing with braces: <code>{'import { useToggle }'}</code> gives <code>undefined</code>.</li>
                <li>Returning <code>{'{ value, toggle }'}</code> but destructuring with <code>[ ]</code>. The shapes must match.</li>
              </ul>
            </Note>
          </div>
        </div>
      </ExampleBlock>

      <DocsLink title="Extracting your own custom Hook from a component" href="https://react.dev/learn/reusing-logic-with-custom-hooks#extracting-your-own-custom-hook-from-a-component">
        react.dev makes the same move with two components that both need to know if you're online, and pulls the logic into useOnlineStatus. Theirs uses an effect. Ours uses only state. The steps are the same: find the repeated logic, move it into a use function, return what the component needs.
      </DocsLink>
    </LessonShell>
  )
}
