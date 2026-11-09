# Productivity Panel

My Day 8 mini project, the "Hook-Powered Utility App". It's a small panel with a help section you can open and close, a counter for completed actions, and a note that is still there after you refresh the page. All three features run on custom hooks I wrote in `src/hooks/`.

## How to run it

```bash
npm install
npm run dev
```

Then open http://localhost:5281.

Other scripts:

- `npm run build` makes a production build in `dist/`
- `npm run lint` runs ESLint

## Required features

| Requirement | Where it is |
| --- | --- |
| One toggle behavior | `TogglePanel` calls `useToggle(false)` to open and close the help panel. The button says "Show help" or "Hide help" depending on `isOpen`, and it has `aria-expanded={isOpen}` so screen readers know if the panel is open. |
| One counter behavior | `CounterCard` calls `useCounter(0)` and uses `increment`, `decrement` and `reset` for the +1, -1 and Reset buttons. |
| One persisted value | `SavedNote` calls `useLocalStorage("productivity-panel:note", "")`. The note saves on every keystroke and loads again after a refresh. |
| Clean components using custom hooks | Every component is under 35 lines. They don't have their own `useState`. The state logic is all in the hooks. |

### Keeping the counter at 0 or above

You can't really "un-complete" an action you never did, so the counter shouldn't go below 0. I **guarded it in the component**: the -1 button has `disabled={count === 0}`. I kept `useCounter` the same as the one from class so it stays general. A different counter (like a score) might need negative numbers.

### Why `useLocalStorage` doesn't use `useEffect`

The note only changes when the user types or presses "Clear note". Both of those are events, so the hook saves to localStorage inside its own setter (`updateValue`), at the same moment it calls `setValue`. There's no reason to wait for a render and then sync. The saved value is read once, with a lazy initializer in `useState(() => ...)`, so localStorage isn't read on every render.

The key is `productivity-panel:note` instead of just `note`. Every app running on `localhost` shares the same localStorage, so the prefix keeps this app from clashing with other class projects.

## Submission requirements

- **Source code:** the whole Vite + React app is in this repo. `.gitignore` leaves out `node_modules` and `dist`.
- **At least 2 custom hooks:** there are 3: `useToggle`, `useCounter` and `useLocalStorage`.
- **Reusable logic:** none of the hooks know anything about this app. `useToggle` could open a menu, `useCounter` could count likes, and `useLocalStorage` takes any key.
- **Clear component structure:** follows the suggested structure from the assignment (below).

## Component and hook tree

```
App
 ├ Header
 ├ TogglePanel   → useToggle
 ├ CounterCard   → useCounter
 └ SavedNote     → useLocalStorage
```

```
src/
 ├ main.jsx
 ├ App.jsx
 ├ index.css
 ├ components/
 │  ├ Header.jsx
 │  ├ TogglePanel.jsx
 │  ├ CounterCard.jsx
 │  └ SavedNote.jsx
 └ hooks/
    ├ useToggle.js
    ├ useCounter.js
    └ useLocalStorage.js
```

## README Reflection

**1. What is a custom hook?**

A custom hook is a JavaScript function whose name starts with `use` and that calls other React hooks inside it. For example, `useToggle` is just a function that calls `useState` and gives back `[value, toggle]`. It lets me pull stateful logic out of a component so I can reuse it.

**2. How is a custom hook different from a component?**

A component returns JSX, which is UI that shows up on the screen. A custom hook returns data and functions, like the `{ count, increment, decrement, reset }` object from `useCounter`, and it never returns JSX. So components reuse UI and hooks reuse logic. In my app, `CounterCard` decides what the buttons look like and `useCounter` decides what the buttons do.

**3. When should you create a custom hook?**

When you have stateful logic that you would end up copying into more than one component, or when that logic makes a component hard to read. You shouldn't make a hook for every tiny thing too early. A good test is whether you can give the hook a clear name and use it somewhere else without changing it. `useLocalStorage` passes that test because it takes a `key`, so it could save a username or a theme just as easily as my note.

**4. Which hook did you build that felt most useful?**

`useLocalStorage`, because it does the most work for the component. Without it, `SavedNote` would need a lazy `useState` initializer, `JSON.parse`, and `JSON.stringify` mixed in with the textarea code. With the hook, the component just writes `const [note, setNote] = useLocalStorage("productivity-panel:note", "")` and works like normal state that also survives a refresh.

**5. How did custom hooks improve your code?**

My components are short and mostly just JSX, so it's easy to see what each one shows on the screen. The logic is in one place for each feature, so if I wanted to change how saving works, I would only edit `useLocalStorage.js`. It also made the event vs effect choice clear: saving happens in the hook's setter because the user typed something, so I didn't need a `useEffect` at all.
