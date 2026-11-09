# Study Tracker

A small study dashboard built with custom hooks for the Day 8 "Hook-Powered Utility App" project. You log Pomodoros (25-minute study sessions) for three subjects, add extra practice minutes, keep a study streak, and save your name for a greeting.

The main point of this app is that **hooks share logic, not state**. `useCounter` is written once but called six times, and every call keeps its own number.

## How to run it

```bash
npm install
npm run dev
```

Then open http://localhost:5282.

Other scripts: `npm run build` (production build) and `npm run lint` (ESLint).

## Component and hook tree

```
App                      useLocalStorage("study-tracker:name")
 │                       useToggle (focus mode)
 │                       useCounter x3 (Math, Reading, Coding Pomodoros)
 ├ Header                greeting + focus mode button (props only)
 ├ HelpPanel             useToggle (help panel)
 ├ SessionSummary        total sessions, focused time, goals reached (props only)
 ├ SubjectCard x3        useCounter (extra practice minutes, uses incrementBy)
 ├ NameForm              name input (props only)
 └ StreakCard            usePersistentCounter("study-tracker:streak-days")
```

```
src/hooks/
 ├ useToggle.js
 ├ useCounter.js            (includes the incrementBy stretch goal)
 ├ useLocalStorage.js
 └ usePersistentCounter.js  (built on top of useLocalStorage)
```

## How it meets the requirements

### Required features

| Requirement | Where it is |
| --- | --- |
| One toggle behavior | `useToggle` is used twice, independently. `HelpPanel` uses it to show and hide the help text, and `App` uses it for focus mode, which hides the sidebar. Opening help does not turn on focus mode, because each call has its own state. |
| One counter behavior | `useCounter` is used six times. `App` calls it once per subject for Pomodoros, and each `SubjectCard` calls it again for practice minutes. The "+5 min" button uses `incrementBy(5)`, the stretch goal. |
| One persisted value | `useLocalStorage` saves the student name (`study-tracker:name`). `usePersistentCounter` saves the study streak (`study-tracker:streak-days`). Both survive a refresh. Keys start with `study-tracker:` so they don't clash with other apps on localhost. |
| Clean components using custom hooks | No component has its own `useState`. All state logic is in `src/hooks`. `Header`, `SessionSummary`, and `NameForm` don't call any hooks at all: they only receive props and render UI. |

### Submission requirements

- **Source code:** the full Vite app is in this repo (`node_modules` and `dist` are ignored in `.gitignore`).
- **At least 2 custom hooks:** there are four: `useToggle`, `useCounter`, `useLocalStorage`, and `usePersistentCounter`.
- **Reusable logic:** each hook is used in more than one place, or is reused by another hook. `usePersistentCounter` calls `useLocalStorage` instead of copying its localStorage code, and it returns the same `{ count, increment, decrement, incrementBy, reset }` shape as `useCounter`.
- **Clear component structure:** one component per file in `src/components`, one hook per file in `src/hooks`.

### Design choices

- **Hooks share logic, not state.** Click "+1 Pomodoro" on Math and only Math changes, even though Reading and Coding use the exact same hook. Each call to a hook gets its own `useState` inside it.
- **Lifting state up (Day 4).** The total sessions number is calculated during render in `App` (`math.count + reading.count + coding.count`) instead of being stored in state, so `App` owns the three Pomodoro counters and passes each one to its `SubjectCard` as a prop.
- **Practice minutes stay in the card.** Nothing else needs them, so each `SubjectCard` calls `useCounter` for its own minutes.
- **No `useEffect` anywhere.** Every change in this app happens because the user clicked or typed. That means saving to localStorage happens right inside the setter in `useLocalStorage` (the event-based approach from class), not in an effect after render.
- **Accessibility.** The help button uses `aria-expanded` and `aria-controls`. The focus mode button uses `aria-pressed` because it turns a mode on and off instead of opening a section. Counter buttons have labels like "Add one Math Pomodoro", and the name input has a real `<label>`.

## README Reflection

### 1. What is a custom hook?

A custom hook is a JavaScript function whose name starts with `use` and that calls other React hooks inside it. It lets me pull state logic out of a component so I can reuse it. For example, `useCounter` holds a `useState` and the `increment`, `decrement`, `incrementBy`, and `reset` functions, and any component can call it to get a working counter.

### 2. How is a custom hook different from a component?

A component returns JSX, which is UI on the screen. A custom hook returns data and functions, like the `[value, toggle]` array from `useToggle` or the object from `useCounter`, and never returns JSX. In my app, `SubjectCard` decides what the counter looks like, and `useCounter` only decides how the number changes.

### 3. When should you create a custom hook?

When you notice the same state logic repeated in more than one place. I needed a counter for three subjects, for practice minutes, and for the streak, so writing that logic once in `useCounter` made sense. I would not make a hook for logic that is only used once and is short, because that just adds another file to jump to.

### 4. Which hook did you build that felt most useful?

`useCounter` felt the most useful, because I call it six times and every call works on its own. Clicking "+1 Pomodoro" on Math doesn't change Reading or Coding, which showed me that hooks share logic but not state. Building `usePersistentCounter` on top of `useLocalStorage` was also cool, because the streak got saved without me writing any localStorage code again.

### 5. How did custom hooks improve your code?

My components are shorter and mostly just about the UI. `StreakCard` is one line of hook code plus buttons, and `HelpPanel` doesn't need its own toggle function. If I find a bug in the counting logic, I only fix it in one file and all six counters get the fix.
