import LessonShell from '../../../components/ui/LessonShell.jsx'
import ConceptCallout from '../../../components/ui/ConceptCallout.jsx'
import ExampleBlock from '../../../components/ui/ExampleBlock.jsx'
import CodeBlock from '../../../components/ui/CodeBlock.jsx'
import DemoSurface from '../../../components/ui/DemoSurface.jsx'
import Note from '../../../components/ui/Note.jsx'
import DocsLink from '../../../components/ui/DocsLink.jsx'
import { BookBrowser, RaceDemo } from './FetchDemos.jsx'

export default function UseFetch() {
  return (
    <LessonShell
      number="7"
      title="useFetch"
      subtitle="Day 7's fetching, moved into a hook, with every edge case handled. Built together, one step at a time."
      minutes="25"
    >
      <ConceptCallout title="Fetching is an effect. useFetch moves that effect into a hook." eyebrow="Why a hook">
        <p>Every component that loads data needs the same loading, error, and data logic. Write it once. The component just says what to load and what each state looks like.</p>
      </ConceptCallout>

      <div className="grid gap-4 md:grid-cols-2">
        <CodeBlock label="The API we're building">{`const { data, error, isLoading, refetch } = useFetch(url);`}</CodeBlock>
        <Note tone="slate" title="The pretend API: no internet, no key">
          <p>This app serves <code>public/api/books/*.json</code> (fantasy, mystery, science, and poetry, which is empty). Add to any URL:</p>
          <ul className="list-disc list-inside mt-1 space-y-0.5">
            <li><code>?delay=3000</code>: answer after 3 seconds</li>
            <li><code>?status=500</code>: answer with that error status</li>
            <li><code>?broken</code>: answer with text that isn't JSON</li>
          </ul>
          <p className="mt-1">It's a small helper in <code>fake-api.js</code>, run by the Vite dev server. Try it live: <code>useFetch("https://jsonplaceholder.typicode.com/users")</code> works too, if you have internet.</p>
        </Note>
      </div>

      <ExampleBlock
        variant="wedo"
        title="Build useFetch, one edge case at a time"
        exercise="07-1-we-do-use-fetch"
        description="App.jsx is done, and the hook is a placeholder. Write each step in hooks/useFetch.js, save, and try it with the buttons. Students type along."
        minutes="16"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <CodeBlock label="Step 1: loading, error, data (6 min)">{`const [result, setResult] = useState({
  url: null, data: null, error: null,
});

useEffect(() => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => setResult({ url, data, error: null }))
    .catch((err) => setResult({ url, data: null, error: err.message }));
}, [url]);

// Calculated, not stored:
const isLoading = result.url !== url;`}</CodeBlock>
          <ConceptCallout title="Why not setIsLoading(true) at the top of the effect?" eyebrow="A choice worth explaining">
            <p>Setting state straight in an effect's body renders the component a second time right away, and this project's linter flags it (<code>react-hooks/set-state-in-effect</code>).</p>
            <p>Instead, the result remembers <strong>which url it answers</strong>. If that isn't the url we want now, we're loading. Same rule as Day 6: if you can calculate it, don't store it. State is only set in <code>.then</code> and <code>.catch</code>, when the answer arrives.</p>
          </ConceptCallout>
          <CodeBlock label="Step 2: !response.ok and bad JSON (4 min)">{`.then((response) => {
  // fetch only rejects when the network fails.
  // A 404 or 500 still "succeeds", so check:
  if (!response.ok) {
    throw new Error(\`Request failed with status \${response.status}\`);
  }
  return response.json(); // throws SyntaxError on bad JSON
})
.catch((err) => {
  const message = err.name === "SyntaxError"
    ? "The server sent something that isn't valid JSON."
    : err.message;
  setResult({ url, data: null, error: message });
});`}</CodeBlock>
          <div className="space-y-4">
            <CodeBlock label="Step 3: no url, and empty results (3 min)">{`useEffect(() => {
  if (!url) return; // null or "": don't fetch
  // ...
}, [url]);

const isLoading = Boolean(url) && result.url !== url;

// In the component: [] is a success, not an error
{data && data.length === 0 && <p>No books yet.</p>}`}</CodeBlock>
            <CodeBlock label="Step 4: refetch() (3 min)">{`const [reloadCount, setReloadCount] = useState(0);

function refetch() {
  setReloadCount((prevCount) => prevCount + 1);
}

// in the effect's deps AND in the result:
}, [url, reloadCount]);
setResult({ url, reloadCount, data, error: null });

const isCurrent =
  result.url === url && result.reloadCount === reloadCount;`}</CodeBlock>
          </div>
        </div>
        <Note tone="emerald" title="Check after each step">
          <ol className="list-decimal list-inside space-y-1">
            <li>Fantasy: "Loading...", then three books. Tick Slow to see loading for longer.</li>
            <li>Fail (500): a clear error, not an empty list. Bad JSON: the JSON message, not a crash.</li>
            <li>None: no request at all (check the Network tab). Poetry: "No books in this genre yet."</li>
            <li>Reload: "Loading..." again, then the books. Reload is an event. The fetch it causes is still an effect: the click changes state, and the effect syncs.</li>
          </ol>
        </Note>
      </ExampleBlock>

      <DemoSurface title="The finished hook: try every switch">
        <BookBrowser />
      </DemoSurface>

      <ExampleBlock
        variant="ido"
        title="The race, and AbortController"
        exercise="07-2-i-do-fetch-race"
        description="Show the bug first, then fix it. Click Race in one panel at a time: Fantasy is requested, then Mystery 0.2 seconds later. Fantasy answers last."
        minutes="8"
      >
        <RaceDemo />
        <div className="grid gap-4 md:grid-cols-2">
          <Note tone="rose" title="1. No cleanup (3 min)">
            <p>Mystery answers and shows. Then Fantasy's late answer arrives and <strong>overwrites the result</strong>: the books vanish and it's back to "Loading...", for a request that already finished. The log shows the order. A hook that kept <code>data</code> in its own state would show Fantasy's books under "Mystery".</p>
          </Note>
          <CodeBlock label="2. The fix: cancel in the cleanup (5 min)">{`useEffect(() => {
  if (!url) return;

  const controller = new AbortController();

  fetch(url, { signal: controller.signal })
    .then(/* ... */)
    .catch((err) => {
      if (err.name === "AbortError") return; // we canceled it
      // ...
    });

  return () => {
    controller.abort();
  };
}, [url, reloadCount]);`}</CodeBlock>
        </div>
        <Note tone="sky" title="Say this">
          <ul className="list-disc list-inside space-y-1">
            <li>"If setup starts it, cleanup stops it." The cleanup runs when <code>url</code> changes and when the component unmounts, so an old request can't land on new data.</li>
            <li><code>AbortError</code> is ours, on purpose, so it isn't shown as an error.</li>
            <li><strong>Network tab:</strong> after a race, the Fantasy request says <code>(canceled)</code>. Refresh the 07-2 starter with the Network tab open: in development, StrictMode runs setup, cleanup, setup, so the first request is <code>(canceled)</code> too. That's the cleanup working, not a bug.</li>
            <li>react.dev fixes the same race with an <code>ignore</code> flag in the cleanup. Both work. <code>AbortController</code> also stops the browser downloading an answer nobody wants.</li>
          </ul>
        </Note>
      </ExampleBlock>

      <div className="grid gap-4 md:grid-cols-2">
        <DocsLink title="You Might Not Need an Effect: Fetching data" href="https://react.dev/learn/you-might-not-need-an-effect#fetching-data">
          The race condition, the cleanup that fixes it, and the docs' own useData hook: "moving the data fetching logic into a custom Hook will make it easier to adopt an efficient data fetching strategy later."
        </DocsLink>
        <DocsLink title="Synchronizing with Effects: Fetching data" href="https://react.dev/learn/synchronizing-with-effects#fetching-data">
          The Day 6 page, on why a fetch effect needs a cleanup, and what you see in development.
        </DocsLink>
      </div>
    </LessonShell>
  )
}
