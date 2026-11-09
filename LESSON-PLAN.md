# Day 8 — Custom Hooks: Lesson Plan (3 hours)

## Learning objectives

By the end of today, students should be able to:

1. Define what a custom hook is and explain its purpose.
2. Differentiate between a React component and a custom hook.
3. Identify when and why to create a custom hook for reusable logic.
4. Demonstrate how custom hooks are built using hooks like useState and useEffect.
5. Create and use a custom hook within one or more components to build a clean, organized app.

**Big idea:** components reuse UI, custom hooks reuse logic, props pass data, hooks manage logic
and state. Today students learn how to move repeated logic out of components and into reusable
hooks. By the end of class they have built `useToggle`, `useCounter`, `useLocalStorage` (basic and
full-featured), and `useFetch`, and have **built and pushed** the Hook-Powered Utility App to GitHub.

## Teaching phrases

- "Components reuse UI. Hooks reuse logic."
- "Share logic, not state." Every call to a hook gets its own state.
- "Hooks at the top level." Never in a condition, a loop, or an event handler.
- "Why does this code need to run?"
- "If setup starts it, cleanup stops it." (Day 6, back for useFetch.)

## Before class

- [ ] Teaching app running (`npm run dev` in this folder); react.dev open in another tab, on
  [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks).
  The useFetch page needs the dev server: its pretend API (`fake-api.js`) runs there.
- [ ] To live code: click **Open in editor** and **Run starter** on any I do / We do / You do block.
  Open in editor opens `App.jsx` and the hook files beside it. See `exercises/README.md`.
- [ ] DevTools open on the projector. Find **Application > Local Storage** and the **Network** tab
  once. The pretend API sends `Cache-Control: no-store`, so nothing gets cached between tries.
- [ ] Practice page 5 once. **Refresh** to prove a saved value came back; saving the file isn't
  enough, because saves keep state. For the two-tab step, have a second tab ready on the `05-4`
  starter URL.
- [ ] Practice page 7's race once, in one panel at a time, with the Network tab open.
- [ ] Click **Clear saved values** in the live code bar before class, so old `day8-` values
  don't show up in the demos.
- [ ] This folder isn't under git yet. Commit it, or copy `exercises/`, so you can reset the
  starters you edit.
- [ ] Remind students the class before: bring a GitHub account and make sure `git` is installed.
  The mini project is submitted in class.
- [ ] `STUDENT-HANDOUT.md` shared.
- [ ] `student-projects/` on a share or zipped. Students need 01, 03, 05, 07, and 09.
- [ ] Read the three reference apps in `assignment-demos/` (see "Grading"). **Instructor only:
  don't hand them out before the due date.** The same goes for this teaching app and
  `/live.html`: the mini project solution runs there, so don't share the link before the due date.

## Schedule

| Time | Min | Block | Mode | App page |
|---|---|---|---|---|
| 0:00 – 0:05 | 5 | Day 7 recap & the big idea | We do | 1 |
| 0:05 – 0:15 | 10 | What a custom hook is, component vs hook, Rules of Hooks | Teach | 2 |
| 0:15 – 0:35 | 20 | useToggle I do & Exercise 1 | You do | 3 |
| 0:35 – 0:50 | 15 | useCounter, return shapes, hook or not & Exercise 2 | You do | 4 |
| 0:50 – 1:00 | 10 | Break | | |
| 1:00 – 1:30 | 30 | useLocalStorage, share logic not state, Exercise 3 & the full-featured hook | You do | 5 |
| 1:30 – 1:40 | 10 | Event vs effect & Exercise 4 | We do | 6 |
| 1:40 – 2:05 | 25 | useFetch: edge cases, the race & AbortController | We do | 7 |
| 2:05 – 2:10 | 5 | Mini project intro | We do | 8 |
| 2:10 – 2:55 | 45 | **Mini project work time + push to GitHub** | You do | 8 |
| 2:55 – 3:00 | 5 | Wrap-up & Day 9 preview | Teach | 9 |

Total: 180 minutes.

**Protect the 45 minutes of work time. Never cut it.** Students build and submit before they
leave. At 2:50, call time and walk everyone through the push.

**If behind, cut in this order:**

1. **The full-featured useLocalStorage (page 5) becomes homework.** Saves 8. Show its five
   problems in one sentence each, and point to the `05-4` starter.
2. Skip the Exercise 2 stretch (`incrementBy`). It's already marked homework if time is short.
3. Do "Arrays or objects?" and "Hook or not?" as 1 minute of talk each, not We dos. Saves 2.
4. useFetch: run the race from the demo on page 7 instead of live coding `07-2`. Saves 3. Keep
   useFetch itself before the mini project.
5. Exercise 1 becomes 15 minutes: one component, then show the second from the solution. Saves 5.

Don't cut "Share logic, not state" (page 5) or Event or Effect (page 6). The first is the point
react.dev stresses most, and the second is the day's main judgment skill. Wrap-up is already 5:
if it gets squeezed, give the homework and stop, and send the exit ticket home.

**If ahead:** run "Extract a useCounter Hook" from react.dev (page 4's challenge card) in class.
It's an interval counter, so the hook has an effect with cleanup inside it.

**Rebuild challenge:** the course page says "before class ends". It won't fit, because the end of
class goes to building and submitting the mini project. It's **homework, or a finish-early
activity** (page 9). Say so plainly.

---

## 0:00 – 0:05 Recap & the big idea (page 1)

**We do (4):** run the recap starter, a movie search with a pretend API (no internet needed;
search "oops" to see the error state). Cold call the four questions, quickly. Why is data fetching
an effect? What does the dependency array do? What is loading state? Why should state stay
minimal? Model answers are on the reveal cards and in the solution's comments.

**Teach (1):** "Yesterday we built logic directly inside components. Today we learn how to extract
repeated logic into reusable hooks." Then the pair: **components reuse UI, custom hooks reuse
logic.** Props pass data, hooks manage logic and state.

## 0:05 – 0:15 What is a custom hook? (page 2)

- **Teach (3):** the definition, a JavaScript function that uses React hooks and starts with `use`.
  Examples: `useToggle`, `useCounter`, `useLocalStorage`, `useMovies`. The important rule: custom
  hooks reuse logic, do not render JSX, can call other hooks, must start with `use`. Component vs
  hook: a component returns UI, a custom hook returns logic/data/functions. "This is fine once. But
  if you repeat this pattern in multiple components, you'll duplicate logic."
- **I do (3):** same logic, two components. Pull the repeated button into a `ToggleButton`
  component. **Say:** "I reused the UI. The state and toggle are still in both. A component returns
  JSX, so it can't hand `isOpen` and `toggle` back. That's what a hook is for."
- **Reveal (1):** "Is a hook just a function?" Yes. What makes it a hook is that it calls other
  hooks. The `use` prefix tells React and the linter to check the Rules of Hooks inside it. A
  function that calls no hooks shouldn't be named `use...`.
- **I do (3): Rules of Hooks.** Call hooks at the top level of a component or another hook, never
  inside conditions, loops, or event handlers. Run the starter: click "Show details" and the page
  shows `Rendered more hooks than during the previous render.` Refresh and click "Like (broken)"
  with the console open: an `Invalid hook call` error. Then show what the linter says, from this
  folder:

  ```bash
  npx eslint --no-ignore exercises/02-2-i-do-rules-of-hooks/starter
  ```

  ```
  React Hook "useState" is called conditionally. React Hooks must be called in the exact same order in every component render
  React Hook "useState" is called in function "handleLike" that is neither a React function component nor a custom React Hook function. ...
  ```

  (`--no-ignore` only because this repo's lint skips starters. In a student's Vite project, the
  editor and `npm run lint` show it.) Fix: move both hooks to the top. Use the value in the
  condition, not the hook.

## 0:15 – 0:35 useToggle & Exercise 1 (page 3)

- **I do (6):** open the starter: the "without a hook" Modal and an empty `hooks/useToggle.js`.
  Move the logic, live. Point out: a `.js` file because there's no JSX; returns `[value, toggle]`
  like `useState`; the updater form; the component got shorter. Note the import path is
  `./hooks/useToggle` because the hook is in a `hooks/` folder (the course page shows
  `./useToggle`).
- **You do (12): Exercise 1.** A `useToggle` hook, one component using it, then a second component
  using the same hook (help message and theme switcher). **Ask at the end:** "Why doesn't opening
  help switch the theme?" Each call has its own state. Don't go deep; page 5 has the demo.
- **Docs (2):** react.dev makes the same move with `useOnlineStatus`. Show the
  [section](https://react.dev/learn/reusing-logic-with-custom-hooks#extracting-your-own-custom-hook-from-a-component).

**Watch for:** JSX in the hook; `onClick={toggle()}`; `import { useToggle }` with braces on a
default export; returning an object but destructuring with `[ ]`. Solution: `02-use-toggle-solution`.

## 0:35 – 0:50 useCounter & Exercise 2 (page 4)

- **I do (3):** extract `useCounter` from a counter card. It returns an object of four things.
  `reset` goes back to `initialValue`, so `useCounter(5)` resets to 5.
- **We do (2): arrays or objects?** Custom hooks can return arrays, objects, values, or functions.
  Use whatever makes the API easiest to understand. Two things, like `useState`: an array, so
  callers rename. Three or more: an object, so callers use names and take only what they need.
- **We do (2): hook or not?** One concrete case of "extracting logic too early": `useName()` wraps
  one `useState` and is used once. And `useFormatPrice` calls no hooks, so it's `formatPrice`.
  **Say:** "Make a hook when the same stateful logic shows up in two or more places, or when a name
  like `useLocalStorage` makes the component easier to read. Some duplication is fine." (That last
  sentence is react.dev's.)
- **You do (8): Exercise 2.** A hook, a counter component, and a score tracker or likes counter
  using the same hook. The starter's score tracker calls `useCounter` twice: two calls, two counts.
  **Stretch** (finish early or homework): `incrementBy(amount)`.

**Watch for:** two `{ count }` destructures in one component (keep the objects: `home.count`);
`setCount(count + 1)` instead of the updater form; trying to "share" a count by passing it into
the hook. Solution: `04-use-counter-solution`.

## 0:50 – 1:00 Break

## 1:00 – 1:30 useLocalStorage, Exercise 3 & the full-featured hook (page 5)

- **Ask (1):** should localStorage syncing happen because the component rendered, or because the
  user changed the value? For this lesson, we choose: update localStorage when we update the state
  value. More event-driven, and simpler for beginners.
- **I do (4):** type a name in the starter and refresh: gone. Build the hook. Point at the
  `useState(() => ...)` function (read once), `JSON` (localStorage stores strings), and the
  `[value, updateValue]` shape. Swap one line. Type, then **refresh**. Say why you refresh: saving
  a file keeps state, so only a refresh proves the value came from localStorage.
- **DevTools (1):** Application > Local Storage > the page. Find `day8-name`: the value is `"Ada"`
  with quotes, that's JSON. Delete the row, refresh. The live bar's **Clear saved values** removes
  every `day8-` key.
- **I do (4): share logic, not state.** Two `TogglePanel`s and two notes, both on the key
  `day8-shared-note`. Open one panel: the other stays shut. Type in one note: the other doesn't
  change. Refresh: now both show the last text, only because both read the same saved value on
  load. **Say: "Custom hooks share logic, not state."** If two components need the same value,
  that's lifting state up (Day 3/4): call the hook once in the parent and pass it down. The
  solution does that, and the hook doesn't change.
- **Read the important note (1):** if a larger app has many different ways to update the same
  state, an effect-based synchronization pattern can still be valid. The takeaway is not "useEffect
  is bad". It's: choose the simplest approach that matches why the code needs to run.
- **You do (11): Exercise 3.** The hook file, and a name saver app or a persisted notes input.
  Requirements: value loads from localStorage, updates are saved, refresh keeps data. Keys:
  `day8-ex3-name`, `day8-ex3-note`. Solution: `06-use-local-storage-solution`.
- **We do (8): a full-featured useLocalStorage** (`05-4`). Teach the course version first, and
  don't make the class feel it was wrong: these are the next problems a real app hits. Each button
  in the starter shows one, then you fix it:
  1. **Bad JSON.** "Simulate a hand-edited value" saves `hello` and reloads. `JSON.parse` throws on
     the first render and the app crashes. Fix: a `readValue` helper with `try/catch`, falling back
     to `initialValue`.
  2. **Updater functions.** "Add !" calls `setNote((prev) => prev + "!")`. It *looks* fine, because
     React's setter accepts functions, but localStorage gets `JSON.stringify(aFunction)`, which is
     `undefined`, saved as the text `undefined`. Refresh: crash. Fix: work out
     `typeof newValue === "function" ? newValue(value) : newValue` in `updateValue`. **Say why
     not inside `setValue((prev) => ...)`:** StrictMode calls updaters twice in development, so a
     `setItem` in there would run twice. Updaters should be pure.
  3. **`remove()`.** "Remove" does nothing until the hook returns a third item:
     `localStorage.removeItem(key)`, then back to `initialValue`.
  4. **Failed saves.** `setItem` throws when storage is full, or blocked in some private modes.
     Wrap it in `try/catch` and keep the value on screen. (Explain it; there's no button.)
  5. **Other tabs.** Open the starter in a second tab, type there, come back: stale. Fix: a
     `useEffect` that listens for the window's `storage` event, with cleanup. The event only fires
     in *other* tabs, so two hooks in one tab still don't sync: share logic, not state.

  **Bridge to page 6, say it out loud:** "The writes are events: the user did something. Listening
  to other tabs is an effect: the component is on screen and has to stay in sync with something
  outside React. One hook, both answers."

**Watch for:** "it works" without a refresh; `useState(localStorage.getItem(key))` with no arrow
and no `JSON.parse`; `setItem` without `JSON.stringify`; a crash on load (a bad saved value: clear
it in DevTools).

## 1:30 – 1:40 Event vs effect & Exercise 4 (page 6)

- **Ask (2):** when should code run because of an event? (button click, input change, form submit,
  updating localStorage immediately after a user-driven change.) When should code run because of an
  effect? (subscribing to window resize, starting a timer, fetching data, syncing React to an outside
  system after render.)
- **Simple rule (1):** ask why this code needs to run. "Because the user did something": event or
  update path. "Because the component appeared or state changed and now must sync externally":
  effect. And from Day 6: if you can calculate it, neither.
- **We do (5): Exercise 4, Event or Effect?** Hands up before each click. A: toggle a modal →
  event/update logic. B: save input value to localStorage during the custom setter → event/update
  logic. C: fetch movies when search term changes → effect. D: listen for window resize → effect.
  E: compute a total from cart items → neither, derive during render. Bonus if there's a minute:
  F, update the note when another tab saves (effect, from page 5), and G, load again on Reload
  (the click is an event; the fetch it causes is the effect).
- **Teach (2): effects inside hooks.** Objective 4 says hooks are built with `useState` and
  `useEffect`. Show Day 6's resize tracker as `useWindowWidth()` (code on the page). The effect
  moves into the hook and is still an effect. "Next, we build C as `useFetch`."

## 1:40 – 2:05 useFetch (page 7)

`const { data, error, isLoading, refetch } = useFetch(url)`. The books come from `public/api/` via
`fake-api.js`: no internet, no key. `?delay=3000`, `?status=500`, and `?broken` slow or break a
request on purpose. The starter's App (a Book Browser) has buttons and checkboxes for all of them,
so only the hook gets written.

- **Teach (1):** fetching is an effect; `useFetch` moves that effect into a hook, so every component
  that loads data shares the loading/error/data logic.
- **We do, step 1 (6): loading, error, data.** One piece of state, the result *labeled with the url
  it answers*: `{ url, data, error }`. Fetch in the effect; set state only in `.then` and `.catch`.
  `isLoading` is calculated during render: `result.url !== url`. **Explain the choice:** the obvious
  `setIsLoading(true)` at the top of the effect renders twice right away, and this project's linter
  flags it (`react-hooks/set-state-in-effect`). Same rule as Day 6: if you can calculate it, don't
  store it.
- **Step 2 (4): bad answers.** `fetch` only rejects when the network fails. A 404 or 500 still
  resolves, so check `response.ok` and throw. `response.json()` throws a `SyntaxError` on text that
  isn't JSON: turn it into a clear message. Try "Fail (500)" and "Bad JSON".
- **Step 3 (3): nothing to fetch, nothing found.** `if (!url) return` in the effect, and
  `isLoading` is `Boolean(url) && ...`. Click None: no request in the Network tab. Poetry returns
  `[]`: a success, not an error. The component decides what "No books" looks like.
- **Step 4 (3): `refetch()`.** A `reloadCount` in state; `refetch` adds 1; it goes in the
  dependency array and in the result, so `isLoading` compares both. "Reload is an event. The fetch
  it causes is still an effect."
- **I do (3): the race** (`07-2`, or the side-by-side demo on page 7). Fantasy answers in 3 s,
  Mystery in 0.3 s. Click Race (Fantasy, then Mystery 0.2 s later), in **one panel at a time**.
  With no cleanup, Mystery's books appear, then Fantasy's late answer overwrites the result and it
  says "Loading..." again. The console (or the demo's request log) shows the order.
- **I do (5): the fix.** An `AbortController` per request, `signal` passed to `fetch`,
  `controller.abort()` in the cleanup, and `if (err.name === "AbortError") return` in `.catch`.
  Race again: Mystery stays, and the Network tab shows Fantasy `(canceled)`. Uncheck "Show results"
  mid-request: canceled on unmount too. Refresh the starter with the Network tab open: StrictMode's
  setup, cleanup, setup shows the first request `(canceled)`. **Say: "That's the cleanup working.
  If setup starts it, cleanup stops it."** react.dev fixes the same race with an `ignore` flag;
  both work, and `AbortController` also stops the download.

**Watch for:** `setIsLoading(true)` in the effect body (the lint error); no `response.ok` check, so
a 500 shows as "no books"; `AbortError` shown as an error; `reloadCount` left out of the deps or of
the result, so Reload never shows "Loading...". Solution: `08-use-fetch-solution`.

## 2:05 – 2:10 Mini project intro (page 8)

**We do (5):** use the demo on the page: toggle, count, type, refresh. Read the features, required
features, suggested structure, and submission requirements. Plan out loud: which hook handles each
behavior (Header needs none); no shared state, each component calls its own hook; saving the note
is an event, in the setter, no `useEffect`. Students may use the full-featured `useLocalStorage` or
add `useFetch`, but the basic hooks meet the requirements.

## 2:10 – 2:55 Mini project work time + submit (page 8)

**You do (40):** students build in their own Vite project or from `09-productivity-panel-starter`.
Circulate with the grading checklist. Ask each student: "Why does this hook exist?" and "Is saving
an event or an effect?" Don't project the solution.

**Submit (last 5, starting at 2:50):** call time and walk through it together. The steps are on
page 8, in the handout, and in the starter's README:

1. New repository on github.com, "Add a README" unchecked.
2. `git status`; if "not a git repository", `git init`.
3. `.gitignore` lists `node_modules`.
4. `git add .` and `git commit -m "Day 8 mini project"`.
5. `git branch -M main`, `git remote add origin <url>`, `git push -u origin main`.
6. Refresh the repo page: `src/` and `README.md` are there, `node_modules` is not.
7. Paste the link into the assignment.

If a student's push fails on sign-in, don't fix it in front of the class: GitHub Desktop, or push
tonight. Students who haven't finished the README can push now and push again later.

**Watch for:** JSX in a hook; a hook file without the `use` prefix; hooks written inside `App.jsx`
instead of `hooks/`; a `useEffect` to save the note or count characters; two projects on
`localhost:5173` using the same storage key.

**Finish early:** `08-3` (find the five mistakes), then the rebuild challenge, or add `useFetch`.

## 2:55 – 3:00 Wrap-up (page 9)

Summary (1), exit ticket (2), homework and Day 9 preview (2).

1. In one sentence: how is a custom hook different from a component?
2. Two components both call `useCounter()`. You click Increase in one. What happens in the other?
   (Nothing. Each call gets its own state.)
3. One thing still fuzzy.

**Homework** is on page 9, including the rebuild challenge and, if it was cut, the full-featured
`useLocalStorage`. **Next:** Day 9, Project Day: Hooks, Effects, and Data. Students combine
events, effects, fetching, and custom hooks into a real app, and can bring `useFetch` with them.

---

## Grading the mini project

**Assignment.** Students build a small app using at least two custom hooks: the Productivity
Panel, with one toggle behavior, one counter behavior, one persisted value, and clean components
using custom hooks. Submitted as a GitHub repository with the full source code, a working app (at
least 2 custom hooks, reusable logic, clear component structure), and the README reflection.

**Instructor reference apps.** In `assignment-demos/`, for calibrating your grading. **Don't hand
them out before the due date.** Don't share this teaching app or `/live.html` before then either,
since `08-2/solution` is the mini project answer.

| Folder | What it shows |
|---|---|
| `assignment-demos/01-productivity-panel` | Minimum solid submission: the suggested structure exactly |
| `assignment-demos/02-study-tracker` | Componentized, hooks reused several times, a counter that persists by composing hooks |
| `assignment-demos/03-workout-log` | Stretch: more hooks, including one with an effect and cleanup, to show event vs effect |

**Checklist**

Submission:

- [ ] GitHub repo with the full React app, and no `node_modules`
- [ ] At least 2 custom hooks
- [ ] Reusable logic
- [ ] Clear component structure
- [ ] One toggle, one counter, and one persisted value (refresh keeps it)
- [ ] README answers all 5 reflection questions

Strong performance looks like:

- [ ] hooks start with use
- [ ] logic is truly reusable
- [ ] components are cleaner because of extraction
- [ ] students can explain why the hook exists
- [ ] students can explain event vs effect reasoning

Common mistakes to watch for:

- [ ] putting JSX inside a custom hook
- [ ] forgetting the use prefix
- [ ] extracting logic too early
- [ ] confusing reusable UI with reusable logic
- [ ] using useEffect automatically without asking why code needs to run

**Model answers for the README reflection**

1. *What is a custom hook?* A JavaScript function whose name starts with `use` and that calls other
   hooks, like `useState`. It packages stateful logic so components can reuse it. It returns data and
   functions, not JSX.
2. *How is a custom hook different from a component?* A component returns UI (JSX) and is used as
   `<TogglePanel />`. A custom hook returns logic, data, or functions and is called inside a
   component: `const [isOpen, toggle] = useToggle()`. Components reuse UI; hooks reuse logic. Each
   call to a hook gets its own state, so hooks share logic, not state.
3. *When should you create a custom hook?* When the same stateful logic shows up in more than one
   component, or when a well-named hook makes a component easier to read than the code it hides.
   Not for one line of state used once.
4. *Which hook did you build that felt most useful?* Any, with a reason. A strong answer names what
   it saved: for example, `useLocalStorage` turned "load, parse, save, stringify" into a one-line
   swap for `useState`.
5. *How did custom hooks improve your code?* Components got shorter and only describe their UI.
   Logic lives in one place, so a fix or a feature (like `incrementBy`) is made once and every caller
   gets it. Hooks can be tested and reused in the next project.

## Notes on the course page's content

| In the course page | What today does | Why |
|---|---|---|
| Exercise 1 and the useCounter section appear twice | Each is presented once | Copy/paste duplicate (already removed from the source) |
| Doesn't say what happens when two components call the same hook | I do on page 5: two toggles, two notes on one key. Teaching phrase: "share logic, not state" | react.dev stresses it; it's the first thing students get wrong. Shared state is lifting state up (Day 3/4) |
| No Rules of Hooks | Brief I do on page 2, with the lint errors and the browser error | Students hit "Rendered more hooks" or "Invalid hook call" the first time they put a hook in an `if` or a handler |
| "Custom hooks do not render JSX" | Kept, plus "is a hook just a function?" Yes; calling hooks is what makes it a hook, and `use` turns on the checks | Students ask. A function that calls no hooks shouldn't be named `use...` |
| "Extracting logic too early" (Common Mistakes) | A concrete We do on page 4: `useName` wraps one `useState` used once | The mistake is abstract without an example |
| `useLocalStorage`'s `JSON.parse` | Taught as written; fixed with `try/catch` in the full-featured We do | `JSON.parse` throws on a non-JSON stored value and crashes the app |
| `updateValue(newValue)` | Taught as written; updater support added in the full-featured We do, outside any `setState` updater | It doesn't accept a function like `setState`. Passing one saves `undefined`. StrictMode runs updaters twice |
| (not in the course page) | Full-featured useLocalStorage adds `remove()`, a guarded `setItem`, and a `storage` listener | The writes are events, the other-tab listener is an effect: a bridge to page 6 |
| (not in the course page) | A useFetch page: every edge case, `refetch`, the race, and `AbortController` | Instructor request. Uses local JSON so it works offline |
| Day 7 recap, What is a hook, useCounter, Event vs Effect, Wrap-up | Shortened (10→5, 15→10, 20→15, 15→10, 10→5) | Makes room for useFetch with 45 minutes of work time kept |
| `useLocalStorage("name")`, `("note")` | Exercises use `day8-` keys, a different one per exercise | Every exercise runs on one address, and saved values stay between them |
| How to see or clear a saved value | DevTools > Application > Local Storage, and a "Clear saved values" button | Students need a way to start over |
| Rebuild challenge "before class ends" | Homework or finish-early | The end of class goes to building and submitting the mini project |
| Submit "using a GitHub repository" | A short "Submitting with GitHub" checklist inside work time | So everyone can submit before they leave |
| Exercise 4 has five examples A–E | Kept, with a three-way vote: event, effect, or neither | E's answer is "neither" |

Consider updating Canvas to match.

## Common mistakes and error decoder

| You see | Cause | Fix |
|---|---|---|
| `Rendered more hooks than during the previous render.` | A hook inside an `if`, or after an early `return` | Move the hook to the top. Put the condition in the JSX |
| `Invalid hook call` in the console after a click | A hook called inside an event handler | Call the hook at the top; call its setter in the handler |
| `React Hook "useState" is called in function "counter" that is neither...` | A function that calls hooks isn't named `use...` | Rename it `useCounter` |
| `useToggle is not a function` / `undefined` | `import { useToggle }` on a default export, or no `export default` | `import useToggle from "./hooks/useToggle"` |
| `... is not iterable` | Hook returns an object, caller destructures with `[ ]` | Match the shapes: `{ }` for objects, `[ ]` for arrays |
| Clicking one component changes nothing in the other | Expected. Each hook call has its own state | Need the same value? Lift it up: one call in the parent |
| Value not there after refresh | Setter doesn't call `localStorage.setItem`, or key differs | Save in `updateValue`; same key for load and save |
| "It saved!" but it didn't | Checked after a file save, not a refresh | Refresh the page |
| `Unexpected token ... is not valid JSON` on load | A non-JSON value in localStorage | Delete the key in DevTools; the full-featured hook uses `try/catch` |
| `"undefined" is not valid JSON` after a refresh | An updater function was passed to `updateValue` | Pass a value, or add updater support (full-featured hook) |
| Two projects show each other's notes | Same key on the same `localhost:5173` | Put the project name in the key |
| `Calling setState synchronously within an effect` lint error | `setIsLoading(true)` at the top of a fetch effect | Store the result with its url; calculate `isLoading` during render |
| A 500 shows as "no results" | No `response.ok` check | `if (!response.ok) throw new Error(...)` |
| `Unexpected token` error from `response.json()` | The answer isn't JSON | Catch the `SyntaxError` and show a clear message |
| Results flash, then go back to "Loading..." or show the wrong list | Race: an old slow answer overwrote a newer one | `AbortController` in the effect's cleanup |
| `AbortError` shown on screen | Canceled requests treated as errors | `if (err.name === "AbortError") return` |
| Network tab: a request is `(canceled)` on page load | StrictMode's setup, cleanup, setup in development | Expected. The cleanup is working |
| Reload button never shows "Loading..." | `reloadCount` missing from the deps or from the result | Put it in both |
| useFetch page: every request fails | Not running the dev server, so there's no pretend API | `npm run dev` |
| Hook file named `useToggle.jsx` | JSX crept into the hook | Move the JSX to the component, rename to `.js` |
