import LessonShell from '../../../components/ui/LessonShell.jsx'
import ConceptCallout from '../../../components/ui/ConceptCallout.jsx'
import ExampleBlock from '../../../components/ui/ExampleBlock.jsx'
import CodeBlock from '../../../components/ui/CodeBlock.jsx'
import DemoSurface from '../../../components/ui/DemoSurface.jsx'
import Checklist from '../../../components/ui/Checklist.jsx'
import Note from '../../../components/ui/Note.jsx'
import DocsLink from '../../../components/ui/DocsLink.jsx'
import DocsChallenges from '../../../components/ui/DocsChallenges.jsx'
import useCounter from '../../../demos/hooks/useCounter.js'

const buttonClass = 'rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm hover:bg-slate-100'

function CounterCard() {
  const { count, increment, decrement, reset } = useCounter(5)

  return (
    <div className="space-y-2">
      <p className="text-3xl font-bold tabular-nums text-slate-900">{count}</p>
      <div className="flex flex-wrap gap-2">
        <button className={buttonClass} onClick={increment}>Increase</button>
        <button className={buttonClass} onClick={decrement}>Decrease</button>
        <button className={buttonClass} onClick={reset}>Reset</button>
      </div>
    </div>
  )
}

function ScoreTracker() {
  const home = useCounter(0)
  const away = useCounter(0)

  return (
    <div className="space-y-2">
      <p className="text-3xl font-bold tabular-nums text-slate-900">Home {home.count} : {away.count} Away</p>
      <div className="flex flex-wrap gap-2">
        <button className={buttonClass} onClick={home.increment}>Home +1</button>
        <button className={buttonClass} onClick={away.increment}>Away +1</button>
        <button className={buttonClass} onClick={() => { home.reset(); away.reset() }}>New game</button>
      </div>
    </div>
  )
}

export default function UseCounter() {
  return (
    <LessonShell
      number="4"
      title="useCounter"
      subtitle="A hook with four things to hand back. Return an object, and learn when not to make a hook at all."
      minutes="15"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <CodeBlock label="useCounter.js">{`import { useState } from "react";

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  function increment() {
    setCount((prevCount) => prevCount + 1);
  }

  function decrement() {
    setCount((prevCount) => prevCount - 1);
  }

  function reset() {
    setCount(initialValue);
  }

  return {
    count,
    increment,
    decrement,
    reset,
  };
}

export default useCounter;`}</CodeBlock>
        <CodeBlock label="Use it">{`import useCounter from "./useCounter";

function CounterCard() {
  const { count, increment, decrement, reset } = useCounter(5);

  return (
    <div>
      <h2>{count}</h2>
      <button onClick={increment}>Increase</button>
      <button onClick={decrement}>Decrease</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}`}</CodeBlock>
      </div>

      <ExampleBlock
        variant="ido"
        title="Extract useCounter"
        exercise="04-1-i-do-use-counter"
        description="Same move as useToggle, with four things to return. Move the state and the three functions into hooks/useCounter.js."
        minutes="3"
      >
        <Note tone="sky" title="Point out">
          <p><code>reset</code> goes back to <code>initialValue</code>, so the caller decides where reset lands: <code>useCounter(5)</code> resets to 5. The hook takes arguments like any function.</p>
        </Note>
      </ExampleBlock>

      <ExampleBlock
        variant="wedo"
        title="Arrays or objects?"
        exercise="04-2-we-do-return-shapes"
        description="Custom hooks can return arrays, objects, values, or functions. Use whatever makes the API easiest to understand."
        minutes="2"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <CodeBlock label="Array: two things, caller picks names">{`const [isSearchOpen, toggleSearch] = useToggle();
const [isMenuOpen, toggleMenu] = useToggle();`}</CodeBlock>
          <CodeBlock label="Object: three or more, take what you need">{`const { count, increment } = useCounter();`}</CodeBlock>
        </div>
        <p className="text-sm text-slate-700">Try it together: make <code>useCounter</code> return <code>[count, increment, decrement, reset]</code>. Now every caller has to remember the order. Change it back. A hook can also return one value: react.dev's <code>useOnlineStatus()</code> returns just <code>isOnline</code>.</p>
      </ExampleBlock>

      <ExampleBlock
        variant="wedo"
        title="Hook or not? Extracting logic too early"
        exercise="04-3-we-do-hook-or-not"
        description="Both files in the starter's hooks/ folder are named like hooks. Decide together whether either should be."
        minutes="2"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <CodeBlock label="🔴 Too early: one line, used once">{`function useName() {
  const [name, setName] = useState("");
  return [name, setName];
}

// in App, the only caller:
const [name, setName] = useName();`}</CodeBlock>
          <CodeBlock label="🔴 Not a hook: it calls no hooks">{`function useFormatPrice(price) {
  return "$" + price.toFixed(2);
}

// Better: function formatPrice(price)`}</CodeBlock>
        </div>
        <ConceptCallout title="Make a hook when the same stateful logic shows up in two or more places." eyebrow="When to create a custom hook">
          <p>Or when a name like <code>useLocalStorage</code> makes the component easier to read than the code it hides. A hook that wraps one <code>useState</code> for one component is just one more file to open. react.dev: "Some duplication is fine."</p>
        </ConceptCallout>
      </ExampleBlock>

      <DemoSurface title="What students build: three counts from one hook">
        <div className="grid gap-6 md:grid-cols-2">
          <CounterCard />
          <ScoreTracker />
        </div>
      </DemoSurface>

      <ExampleBlock
        variant="youdo"
        title="Exercise 2: build useCounter"
        exercise="04-4-you-do-exercise-2"
        description="Students build a hook, a counter component, and a score tracker or likes counter using the same hook."
        minutes="8"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Checklist
            title="Students build"
            items={[
              'a hook',
              'a counter component',
              'a score tracker or likes counter using the same hook',
            ]}
          />
          <Note tone="emerald" title="Instructor: what to look for">
            <ul className="list-disc list-inside space-y-1">
              <li>Two <code>{'{ count }'}</code> destructures in one component: a name clash. Keep the objects (<code>home.count</code>) or rename (<code>{'{ count: homeScore }'}</code>).</li>
              <li><code>setCount(count + 1)</code> instead of the updater form. It works here, but use the habit from Day 6.</li>
              <li>A <code>count</code> prop passed into the hook "to share it". Hooks don't share state. Page 5.</li>
            </ul>
          </Note>
        </div>
      </ExampleBlock>

      <ExampleBlock
        variant="youdo"
        title="Exercise 2 stretch: incrementBy(amount)"
        exercise="04-5-you-do-exercise-2-stretch"
        description="For students who finish, or homework. Add incrementBy(amount) to useCounter, then +2 and +3 buttons in the score tracker. Every other caller keeps working."
      >
        <CodeBlock label="In useCounter">{`function incrementBy(amount) {
  setCount((prevCount) => prevCount + amount);
}

// in the component: needs an argument, so wrap it
<button onClick={() => home.incrementBy(3)}>+3</button>`}</CodeBlock>
      </ExampleBlock>

      <DocsLink title="When to use custom Hooks" href="https://react.dev/learn/reusing-logic-with-custom-hooks#when-to-use-custom-hooks">
        "You don't need to extract a custom Hook for every little duplicated bit of code. Some duplication is fine." This is the "extracting too early" conversation, in the docs' words.
      </DocsLink>

      <DocsChallenges
        page="Reusing Logic with Custom Hooks"
        href="https://react.dev/learn/reusing-logic-with-custom-hooks"
        challenges={[
          { title: 'Extract a useCounter Hook', when: 'in class', note: 'Only if you are ahead; otherwise it\'s the first homework item. Their useCounter counts up on a timer, so the hook has a useEffect with cleanup inside it. Same move as today, plus Day 6.' },
          { title: 'Make the counter delay configurable', when: 'homework', note: 'Pass delay into the hook and add it to the dependency array. Arguments to a hook work like arguments to a function.' },
          { title: 'Extract useInterval out of useCounter', when: 'stretch', note: 'A hook that calls another custom hook, and takes a function as an argument.' },
          { title: 'Fix a resetting interval', when: 'skip', note: 'Needs useEffectEvent, which is out of scope.' },
          { title: 'Implement a staggering movement', when: 'stretch', note: 'Composes one hook many times. Only state, an effect, and setTimeout, but it\'s a puzzle.' },
        ]}
      />
    </LessonShell>
  )
}
