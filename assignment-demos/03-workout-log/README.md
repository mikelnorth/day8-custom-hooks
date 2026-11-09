# Workout Log

Day 8 Mini Project: Hook-Powered Utility App.

A gym logbook: type a lift, set your sets and reps with + and -, and log it. Logged workouts are saved in your browser, totals update instantly, and a rest timer starts counting down after each set. You can switch between kg and lb, open a help panel, and a badge tells you if you've gone offline (the log still saves either way).

I used this project to practice the **event vs effect** question from class. Five custom hooks: three run because the user did something (events), two because React has to stay in sync with something outside it (effects). Totals like volume are neither: they're calculated during render.

## How to run it

```bash
npm install
npm run dev
```

Then open http://localhost:5283. Other scripts: `npm run build`, `npm run lint`, `npm run preview`.

## How it meets the requirements

| Requirement | Where |
| --- | --- |
| One toggle behavior | `useToggle` runs the help panel (`Header` button, `HelpPanel`), the kg/lb switch, and the "Auto-start rest timer" checkbox. That's one hook used three times. |
| One counter behavior | `useCounter` runs the Sets (1-10) and Reps (1-30) counters in `LogForm`. The + and - buttons disable at the limits. |
| One persisted value | `useLocalStorage("workout-log:entries", [])` saves the array of logged workouts. Refresh and they're still there. |
| Clean components using custom hooks | Components only render and handle events. `OnlineBadge` has no state of its own; `RestTimer` just displays what `useRestTimer` returns. |
| At least 2 custom hooks | Five: `useToggle`, `useCounter`, `useLocalStorage`, `useRestTimer`, `useOnlineStatus`. |
| Reusable logic | `useToggle` is used 3 times and `useCounter` twice, each with different settings. None of the hooks know they're in a workout app. |
| Clear component structure | See the tree below. Each component has one job. |
| Source code in the repo | Everything is in `src/`. `node_modules` and `dist` are in `.gitignore`. |

### Structure

```
App
 ├ Header
 │  └ OnlineBadge        (useOnlineStatus)
 ├ HelpPanel             (open/closed from useToggle in App)
 ├ LogForm               (useCounter x2)
 │  └ Stepper x2         (reusable UI for a counter)
 ├ RestTimer             (shows useRestTimer from App)
 ├ StatsBar              (derived totals)
 └ WorkoutList
    └ WorkoutItem

hooks/
 ├ useToggle.js
 ├ useCounter.js
 ├ useLocalStorage.js
 ├ useRestTimer.js
 └ useOnlineStatus.js

utils/
 └ units.js              (kg/lb helpers, plain functions, not hooks)
```

## Event or effect? My hooks

The question from class: *why does this code need to run?* If it's because the user did something, it's an event. If it's because React has to stay in sync with something outside it, it's an effect.

| Hook | Event or effect | Outside system | Cleanup |
| --- | --- | --- | --- |
| `useToggle` | Event: flips when you click | None | None needed |
| `useCounter` | Event: changes when you press + or - | None | None needed |
| `useLocalStorage` | Event: writes inside the setter when you log or remove a workout | `localStorage` (only touched when the user changes something) | None needed: no subscription or timer |
| `useRestTimer` | Effect: while running, React stays synced with a timer | `setInterval` | `clearInterval` when it pauses, resets, hits 0, or unmounts |
| `useOnlineStatus` | Effect: subscribes to the browser | `window` `online`/`offline` events | `removeEventListener` for both |
| Totals (volume, sets, reps, heaviest) | Neither: derived during render | None | None |

Some details I'm proud of:

- **`useRestTimer` only puts state updates in the right places.** Start, Pause, and Reset are plain event functions that change state. The effect only creates the interval, and the `setSecondsLeft` call lives inside the interval callback, not in the effect body. That keeps the `react-hooks/set-state-in-effect` lint rule happy.
- **The timer stops at 0 without any extra state.** `isTicking` is calculated during render (`isRunning && secondsLeft !== 0`) and it's the only dependency. When the count hits 0, `isTicking` turns false, the cleanup clears the interval, and it stops. Since the updater uses `prev`, `secondsLeft` doesn't have to be a dependency, so the interval isn't rebuilt every second.
- **Logging a set starts the timer (event), and then the effect takes over.** `handleLog` in `App` calls `timer.reset()` and `timer.start()`. That only flips state. The interval starts because the effect noticed `isTicking` changed.
- **`useLocalStorage` won't crash on bad data.** `JSON.parse` is in a try/catch, so if the saved text is broken it falls back to `[]`. App also checks `Array.isArray` during render in case valid JSON is the wrong shape (like `5`). You can try it in DevTools: `localStorage.setItem("workout-log:entries", "{oops")`, then refresh.
- **`useLocalStorage` takes updater functions** like `setState` does: `setEntries((prev) => [entry, ...prev])` to add and `setEntries((prev) => prev.filter(...))` to remove. Both make new arrays, so nothing is mutated.
- **Weights are always saved in kg.** The kg/lb switch only changes how they're shown, so switching units never changes your saved data.

## README Reflection

### 1. What is a custom hook?

A custom hook is a JavaScript function whose name starts with `use` and that calls other React hooks inside it, like `useState` or `useEffect`. It lets you pull logic out of a component and give it a name. For example, `useRestTimer(90)` holds the countdown state, the `setInterval` effect, and the start/stop/reset functions, so any component can get a working rest timer with one line.

### 2. How is a custom hook different from a component?

A component returns UI (JSX), and a custom hook returns logic and data, like values and functions. None of my hooks return JSX: `useCounter` returns `{ count, increment, decrement, reset, isAtMin, isAtMax }`, and the `Stepper` component decides how to draw that. My app has both kinds of reuse: `Stepper` is reusable UI, and `useCounter` is reusable logic.

### 3. When should you create a custom hook?

When the same stateful logic shows up in more than one place, or when one piece of logic is getting big enough to make a component hard to read. I made `useToggle` because I needed the same on/off logic three times (help panel, units, auto-rest). I did *not* make hooks for the exercise and weight text boxes in `LogForm`, because plain `useState` was simpler and only used there, and extracting logic too early was one of the common mistakes from class.

### 4. Which hook did you build that felt most useful?

`useRestTimer`, because it's the one where I actually had to think about event vs effect. Start, Pause, and Reset are events that only change state, but the ticking has to keep React in sync with a browser timer, so that part is an effect with `clearInterval` as the cleanup. Having it in a hook means `App` can start it when a workout is logged and `RestTimer` can just display it.

### 5. How did custom hooks improve your code?

My components got a lot shorter and easier to read. `OnlineBadge` is just a few lines because all the event listener setup and cleanup is in `useOnlineStatus`. The hooks also made me sort my logic by *why* it runs: three of my hooks don't use `useEffect` at all, and the totals in `StatsBar` are just calculated from the saved workouts, with no state and no effect.
