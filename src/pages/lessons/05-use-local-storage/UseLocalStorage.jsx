import LessonShell from '../../../components/ui/LessonShell.jsx'
import ConceptCallout from '../../../components/ui/ConceptCallout.jsx'
import ExampleBlock from '../../../components/ui/ExampleBlock.jsx'
import CodeBlock from '../../../components/ui/CodeBlock.jsx'
import DemoSurface from '../../../components/ui/DemoSurface.jsx'
import Checklist from '../../../components/ui/Checklist.jsx'
import Note from '../../../components/ui/Note.jsx'
import RevealCard from '../../../components/ui/RevealCard.jsx'
import DocsLink from '../../../components/ui/DocsLink.jsx'
import { SavedName, ShareLogicDemo, StoragePeek } from './StorageDemos.jsx'

export default function UseLocalStorage() {
  return (
    <LessonShell
      number="5"
      title="useLocalStorage"
      subtitle="Sometimes we want state to survive a page refresh. Example: saved username, draft note, preferred theme."
      minutes="30"
    >
      <RevealCard question="Ask the class: should localStorage syncing happen because the component rendered, or because the user changed the value?" label="Reveal today's choice">
        <p>For this lesson, we choose: <strong>update localStorage when we update the state value.</strong> This is more event-driven and simpler for beginners. The user typed, so save it right then, in the setter.</p>
      </RevealCard>

      <div className="grid gap-4 md:grid-cols-2">
        <CodeBlock label="Event-based approach — useLocalStorage.js">{`import { useState } from "react";

function useLocalStorage(key, initialValue = "") {
  const [value, setValue] = useState(() => {
    const savedValue = localStorage.getItem(key);

    if (savedValue !== null) {
      return JSON.parse(savedValue);
    }

    return initialValue;
  });

  function updateValue(newValue) {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  }

  return [value, updateValue];
}

export default useLocalStorage;`}</CodeBlock>
        <div className="space-y-4">
          <CodeBlock label="Use it">{`import useLocalStorage from "./useLocalStorage";

function SavedName() {
  const [name, setName] = useLocalStorage("name", "");

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>Name: {name}</p>
    </div>
  );
}`}</CodeBlock>
          <Note tone="slate" title="Three things to point at">
            <ul className="list-disc list-inside space-y-1">
              <li><code>useState(() =&gt; ...)</code>: a function, so localStorage is read once, on the first render.</li>
              <li><code>JSON</code>: localStorage only stores strings. JSON lets the same hook save numbers, booleans, arrays, and objects.</li>
              <li>It returns <code>[value, updateValue]</code>, the same shape as <code>useState</code>, so swapping it in is a one-line change.</li>
            </ul>
          </Note>
        </div>
      </div>

      <ExampleBlock
        variant="ido"
        title="Make a value survive a refresh"
        exercise="05-1-i-do-use-local-storage"
        description="Type a name in the starter and refresh: gone. Build the hook, swap one line, type, and refresh again."
        minutes="4"
      >
        <Note tone="amber" title="Refresh to prove it">
          <p>Saving a file keeps state on this stack, so the name stays on screen after a save even without localStorage. <strong>Only a refresh proves it came back from localStorage.</strong> Refresh on purpose, and say why.</p>
        </Note>
        <Note tone="sky" title="Keys in this lesson">
          <p>The course page uses the key <code>"name"</code>. Every exercise here runs on one address, and saved values stay between exercises, so each one uses its own key starting with <code>day8-</code>: <code>day8-name</code>, <code>day8-ex3-name</code>, <code>day8-mini-note</code>. Students' own projects on <code>localhost:5173</code> share storage too, so tell them to use a key with the project's name in it.</p>
        </Note>
      </ExampleBlock>

      <DemoSurface title="Try it here: type, refresh, then look inside localStorage">
        <div className="grid gap-6 md:grid-cols-2">
          <SavedName />
          <StoragePeek />
        </div>
      </DemoSurface>

      <Note tone="slate" title="Show it in DevTools (1 minute)">
        <ol className="list-decimal list-inside space-y-1">
          <li>DevTools &gt; <strong>Application</strong> (Safari: Storage; Firefox: Storage) &gt; <strong>Local Storage</strong> &gt; this page's address.</li>
          <li>Find the key. The value is <code>"Ada"</code>, with quotes: that's <code>JSON.stringify</code>.</li>
          <li>To start over, select the row and press Delete, or right-click the address and Clear. Then refresh.</li>
          <li>In the live code bar, <strong>Clear saved values</strong> removes every <code>day8-</code> key and reloads.</li>
        </ol>
      </Note>

      <ExampleBlock
        variant="ido"
        title="Share logic, not state"
        exercise="05-2-i-do-share-logic-not-state"
        description="Each call to a custom hook gets its own independent state. Show it with two toggles, then with two notes on the same key."
        minutes="4"
      >
        <DemoSurface title="Open Panel A. Type in Note A. Then refresh.">
          <ShareLogicDemo />
        </DemoSurface>
        <div className="grid gap-4 md:grid-cols-3">
          <Note tone="sky" title="1. Panels">
            <p>Opening A doesn't open B. Each <code>useToggle()</code> call runs its own <code>useState</code>.</p>
          </Note>
          <Note tone="sky" title="2. Notes">
            <p>Typing in A doesn't change B, even with the same key. Each call read localStorage once, on load. After that, each has its own state.</p>
          </Note>
          <Note tone="sky" title="3. Refresh">
            <p>Now both show what you typed last. They only match because both read the same saved value when they loaded.</p>
          </Note>
        </div>
        <ConceptCallout title="Custom hooks share logic, not state." eyebrow="Teaching phrase">
          <p>Need two components to show the <strong>same</strong> value? That's lifting state up (Day 3/4), not a hook. Call the hook once in the parent and pass the value down as props. The solution does exactly that, and the hook doesn't change.</p>
        </ConceptCallout>
      </ExampleBlock>

      <Note tone="amber" title="Important note">
        <p>If a larger app has many different ways to update the same state, an effect-based synchronization pattern can still be valid.</p>
        <p className="mt-1">So the takeaway is not: <em>useEffect is bad</em>. The takeaway is: <strong>choose the simplest approach that matches why the code needs to run.</strong></p>
      </Note>

      <ExampleBlock
        variant="youdo"
        title="Exercise 3: build useLocalStorage"
        exercise="05-3-you-do-exercise-3"
        description="Students build the hook file, and a name saver app or a persisted notes input. The starter has both, on plain useState."
        minutes="11"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Checklist
            title="Requirements"
            items={[
              'value loads from localStorage',
              'updates are saved',
              'refresh keeps data',
            ]}
          />
          <Note tone="emerald" title="Instructor: what to look for">
            <ul className="list-disc list-inside space-y-1">
              <li>"It works!" after a save, without a refresh. Ask them to refresh.</li>
              <li><code>useState(localStorage.getItem(key))</code> with no arrow: reads on every render, and skips <code>JSON.parse</code>.</li>
              <li>Saving with <code>localStorage.setItem(key, newValue)</code> and no <code>JSON.stringify</code>: works for text, breaks for anything else, and the next <code>JSON.parse</code> may throw.</li>
              <li>A crash on load with a JSON error: a bad saved value. Clear the key in DevTools. The full-featured hook below fixes it for good.</li>
            </ul>
          </Note>
        </div>
      </ExampleBlock>

      <ExampleBlock
        variant="wedo"
        title="A full-featured useLocalStorage"
        exercise="05-4-we-do-full-local-storage"
        description="Build on Exercise 3. Each button in the starter breaks the course page's hook in one way. Try it, see it break, add the fix. If you're behind, this is the first thing to move to homework."
        minutes="8"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <CodeBlock label="1. Bad JSON: parse inside try/catch">{`function readValue(key, initialValue) {
  try {
    const savedValue = localStorage.getItem(key);
    return savedValue !== null
      ? JSON.parse(savedValue)
      : initialValue;
  } catch {
    return initialValue; // e.g. typed by hand in DevTools
  }
}

const [value, setValue] = useState(() => readValue(key, initialValue));`}</CodeBlock>
          <CodeBlock label="2–4. Updater functions, failed saves, remove()">{`function updateValue(newValue) {
  // Work out the next value HERE, not inside a setValue updater.
  // StrictMode calls updaters twice, so a write in there runs twice.
  const valueToStore =
    typeof newValue === "function" ? newValue(value) : newValue;

  try {
    localStorage.setItem(key, JSON.stringify(valueToStore));
  } catch (error) {
    // Full, or blocked in some private modes. Keep it on screen.
    console.warn(\`Couldn't save "\${key}".\`, error);
  }

  setValue(valueToStore);
}

function remove() {
  localStorage.removeItem(key);
  setValue(initialValue);
}

return [value, updateValue, remove];`}</CodeBlock>
          <CodeBlock label="5. Other tabs: an effect, with cleanup">{`useEffect(() => {
  function handleStorage(event) {
    if (event.storageArea !== localStorage) return;
    // key is null when the other tab cleared everything
    if (event.key === null || event.key === key) {
      setValue(readValue(key, initialValue));
    }
  }

  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener("storage", handleStorage);
  };
}, [key, initialValue]);`}</CodeBlock>
          <div className="space-y-3">
            <ConceptCallout title="Writes are events. Listening to other tabs is an effect." eyebrow="Bridge to page 6">
              <p>Saving, the updater, and <code>remove()</code> run because the user did something, so they live in the setter. Hearing about another tab runs because the component is on screen and must stay in sync with something outside React, so it's a <code>useEffect</code> with cleanup. One hook, both answers.</p>
            </ConceptCallout>
            <Note tone="slate" title="What each button shows">
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Simulate a hand-edited value</strong> saves <code>hello</code> and reloads. Before the fix: a JSON error on load.</li>
                <li><strong>Add !</strong> looks fine before the fix, but saves the text <code>undefined</code> (<code>JSON.stringify(aFunction)</code>). The next refresh crashes.</li>
                <li><strong>Remove</strong> does nothing until the hook returns <code>remove</code>.</li>
                <li><strong>Two tabs:</strong> open the starter in a second tab and type there. The <code>storage</code> event only fires in the <em>other</em> tabs, never the one that saved, so two hooks in one tab still don't sync. Share logic, not state.</li>
              </ul>
            </Note>
          </div>
        </div>
      </ExampleBlock>

      <DocsLink title="Custom Hooks let you share stateful logic, not state itself" href="https://react.dev/learn/reusing-logic-with-custom-hooks#custom-hooks-let-you-share-stateful-logic-not-state-itself">
        The docs show two form fields using one useFormInput hook, each with its own state. "When you need to share the state itself between multiple components, lift it up and pass it down instead."
      </DocsLink>
    </LessonShell>
  )
}
