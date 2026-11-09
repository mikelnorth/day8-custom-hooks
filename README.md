# Day 8 — Custom Hooks

An interactive teaching app for the **Day 8** lesson (3-hour class). Same format as Day 6:
Vite + React 19 + Tailwind v4, vanilla JavaScript, **I do / We do / You do** blocks, and a class
timer in the sidebar.

## What's in this folder

| Path | What it is |
|---|---|
| `src/` | The teaching app (run it on the projector) |
| `LESSON-PLAN.md` | Minute-by-minute instructor script, and grading |
| `STUDENT-HANDOUT.md` | Cheat sheet and assignment, to share with students |
| `exercises/` | A starter and solution for every I do, We do, and You do, with hooks in their own files. No setup: they run from this app's dev server |
| `live.html`, `src/live/` | The page that runs the exercises |
| `fake-api.js`, `public/api/` | A pretend API for the useFetch page: local JSON, with `?delay=`, `?status=`, and `?broken`, so it works with no internet. Runs in the dev and preview servers |
| `student-projects/` | Standalone Vite copies of the main exercises, the mini project starter, and the course page's reference code |
| `assignment-demos/` | **Instructor only:** three finished mini project reference apps. Don't hand them out before the due date |

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run lint
```

**Don't share this app's link, or `/live.html`, before the mini project's due date.** The mini
project solution runs there.

## Live coding

With `npm run dev` running (the useFetch page needs it, for the pretend API), every I do / We do / You do block has **Open in editor**, **Run starter**,
and **Run solution**. Open in editor opens `App.jsx` and the hook and component files beside it.
Edit and save, and the page updates. `/live.html` lists them all, and its **Clear saved values**
button removes every `day8-` key from localStorage. Details are in `exercises/README.md`, including
why you should **refresh to prove a value was saved**.

## Pages

| Page | Concept | Live demos / activities |
|---|---|---|
| Home | Plan, objectives, schedule, mistakes, scope | |
| 1. Recap | Day 7 questions; components reuse UI, hooks reuse logic | Reveal cards; movie search with a pretend API |
| 2. What is a custom hook? | Definition, the important rule, component vs hook, "is a hook just a function?", Rules of Hooks | Repeated logic I do; Rules of Hooks I do with the real lint and browser errors |
| 3. useToggle | Extracting a hook; Exercise 1 | One hook in two components |
| 4. useCounter | Returning an object; arrays vs objects; hook or not; Exercise 2 | Counter and two-team score tracker; `incrementBy` stretch |
| 5. useLocalStorage | Saving in the setter; DevTools; share logic, not state; Exercise 3; a full-featured hook | Saved name; a view of raw localStorage; two toggles and two notes on one key; bad JSON, updaters, `remove()`, failed saves, and syncing across tabs |
| 6. Event vs Effect | Why does this code need to run?; effects inside hooks; Exercise 4 | Event / Effect / Neither vote, with two bonus questions |
| 7. useFetch | Loading, error, data; `!response.ok`; bad JSON; no url; empty results; `refetch`; the race and `AbortController` | Book Browser with slow/fail/bad-JSON switches; side-by-side race with and without cleanup, with a request log |
| 8. Mini Project | Productivity Panel, submitted to GitHub in class | Finished example; assignment; GitHub checklist; grading checklist; finish-early mistakes exercise |
| 9. Wrap-up | Summary, exit ticket, rebuild challenge (homework), homework, Day 9 preview | |

## The mini project reference apps

Three finished submissions, for calibrating your grading. Don't hand them out before the due date.

| Folder | What it shows |
|---|---|
| `assignment-demos/01-productivity-panel` | Minimum solid submission: the suggested structure exactly |
| `assignment-demos/02-study-tracker` | Componentized, hooks reused several times, a counter that persists by composing hooks |
| `assignment-demos/03-workout-log` | Stretch: more hooks, including one with an effect and cleanup, to show event vs effect |

They're separate projects. This app's lint, Tailwind scan, and file watcher all skip them.

## react.dev alignment

| Docs page | How it's used |
|---|---|
| Reusing Logic with Custom Hooks | Backbone: the useOnlineStatus walkthrough (page 3), "Hook names always start with use" (page 2), "Custom Hooks let you share stateful logic, not state itself" (page 5), "When to use custom Hooks" (page 4); challenges |
| Rules of Hooks | The top-level rule and the places not to call hooks (page 2) |
| Separating Events from Effects | "Choosing between event handlers and Effects" (page 6); challenge |
| You Might Not Need an Effect | "Sharing logic between event handlers": ask why the code needs to run (page 6) |
| Sharing State Between Components | Lifting state up, the answer when two components need the same value |
| You Might Not Need an Effect: Fetching data | The race condition, its cleanup, and the docs' own `useData` hook (page 7) |
| Synchronizing with Effects: Fetching data | Why a fetch effect needs a cleanup (page 7) |

Challenges that need `useEffectEvent` are tagged **skip**.

## Scope

In: custom hooks built from `useState` and `useEffect`, return shapes, the Rules of Hooks,
`localStorage` (including the `storage` event), event vs effect, and `useFetch` with `AbortController`. Review: lifting state up, effects, and fetching. Out:
context, `useReducer`, `useRef`, `useCallback`/`useMemo`, `useEffectEvent`, and routing. Day 9 is
Project Day. React Router is used only by the teaching app.
