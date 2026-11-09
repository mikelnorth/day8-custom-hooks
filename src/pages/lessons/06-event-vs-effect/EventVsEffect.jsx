import LessonShell from '../../../components/ui/LessonShell.jsx'
import ConceptCallout from '../../../components/ui/ConceptCallout.jsx'
import ExampleBlock from '../../../components/ui/ExampleBlock.jsx'
import CodeBlock from '../../../components/ui/CodeBlock.jsx'
import Note from '../../../components/ui/Note.jsx'
import DocsLink from '../../../components/ui/DocsLink.jsx'
import DocsChallenges from '../../../components/ui/DocsChallenges.jsx'
import EventOrEffect from './EventOrEffect.jsx'

export default function EventVsEffect() {
  return (
    <LessonShell
      number="6"
      title="Event vs Effect"
      subtitle="A new key section. Custom hooks make this question more important, because an effect can hide inside a hook."
      minutes="10"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-indigo-200 bg-white px-5 py-4">
          <p className="text-xs uppercase tracking-widest text-indigo-700 font-semibold">Ask students</p>
          <h2 className="text-lg font-semibold text-slate-900 mt-1">When should code run because of an event?</h2>
          <ul className="mt-2 text-sm text-slate-700 list-disc list-inside space-y-0.5">
            <li>button click</li>
            <li>input change</li>
            <li>form submit</li>
            <li>updating localStorage immediately after a user-driven change</li>
          </ul>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-white px-5 py-4">
          <p className="text-xs uppercase tracking-widest text-emerald-700 font-semibold">Ask students</p>
          <h2 className="text-lg font-semibold text-slate-900 mt-1">When should code run because of an effect?</h2>
          <ul className="mt-2 text-sm text-slate-700 list-disc list-inside space-y-0.5">
            <li>subscribing to window resize</li>
            <li>starting a timer</li>
            <li>fetching data</li>
            <li>syncing React to an outside system after render</li>
          </ul>
        </div>
      </div>

      <ConceptCallout title="Ask: why does this code need to run?" eyebrow="Simple rule">
        <ul className="list-disc list-inside space-y-1">
          <li><strong>"because the user did something"</strong> → event/update path</li>
          <li><strong>"because the component appeared or state changed and now must sync externally"</strong> → effect</li>
        </ul>
        <p>And a third answer from Day 6: if you can calculate it from what you already have, it's <strong>neither</strong>. Derive it during render.</p>
      </ConceptCallout>

      <ExampleBlock
        variant="wedo"
        title="Exercise 4: Event or Effect?"
        exercise="06-1-we-do-event-or-effect"
        description="This is an extremely valuable exercise. Hands up for each one before you click. Make students say why, using the simple rule."
        minutes="5"
      >
        <EventOrEffect />
        <Note tone="amber" title="If you have a minute: two more, from page 5 and page 7">
          <div className="mt-2">
            <EventOrEffect showBonus />
          </div>
        </Note>
      </ExampleBlock>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Effects inside hooks</h2>
        <p className="text-sm text-slate-700">One of today's objectives is building hooks with <code>useState</code> <em>and</em> <code>useEffect</code>. Examples C and D would each make a good hook. The effect moves into the hook, and it's still an effect, for the same reason. The component just calls <code>useWindowWidth()</code>. Page 5's full <code>useLocalStorage</code> already has one (other tabs), and next, page 7 builds C as <code>useFetch</code>.</p>
        <div className="grid gap-4 md:grid-cols-2">
          <CodeBlock label="Day 6's resize tracker, as a hook">{`import { useState, useEffect } from "react";

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return width;
}`}</CodeBlock>
          <div className="space-y-3">
            <Note tone="sky" title="Say this">
              <p>"useToggle, useCounter, and useLocalStorage have no effect in them, because everything they do happens when the user does something. useWindowWidth needs one, because the window changes on its own." It returns a single value, another return shape.</p>
            </Note>
            <Note tone="amber" title="Common mistake">
              <p>Using <code>useEffect</code> automatically without asking why the code needs to run. In a hook, it's easy to miss: an effect that only calculates a value (like a character count) is still an extra render, just hidden in another file.</p>
            </Note>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <DocsLink title="Choosing between event handlers and Effects" href="https://react.dev/learn/separating-events-from-effects#choosing-between-event-handlers-and-effects">
          The same question with a chat room: sending a message is an event, staying connected is an effect.
        </DocsLink>
        <DocsLink title="Sharing logic between event handlers" href="https://react.dev/learn/you-might-not-need-an-effect#sharing-logic-between-event-handlers">
          "When you're not sure whether some code should be in an Effect or in an event handler, ask yourself why this code needs to run." Our simple rule, in the docs' words.
        </DocsLink>
      </div>

      <DocsChallenges
        page="Separating Events from Effects"
        href="https://react.dev/learn/separating-events-from-effects"
        challenges={[
          { title: 'Fix a variable that doesn\'t update', when: 'homework', note: 'A dependency array fix. Good Day 6 review before Project Day.' },
          { title: 'Fix a freezing counter', when: 'skip', note: 'Needs useEffectEvent, which is out of scope.' },
          { title: 'Fix a non-adjustable delay', when: 'skip', note: 'Needs useEffectEvent.' },
          { title: 'Fix a delayed notification', when: 'skip', note: 'Needs useEffectEvent.' },
        ]}
      />
    </LessonShell>
  )
}
