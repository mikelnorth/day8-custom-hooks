# React Day 8 — Custom Hooks Cheat Sheet

**Components reuse UI. Custom hooks reuse logic.** Props pass data. Hooks manage logic and state.

Today: how to move repeated logic out of components and into reusable hooks.

## What is a custom hook?

A JavaScript function that uses React hooks and starts with `use`.

Examples: `useToggle`, `useCounter`, `useLocalStorage`, `useMovies`

Custom hooks:

- reuse logic
- do not render JSX
- can call other hooks
- must start with `use`

**Is a hook just a function?** Yes. What makes it a hook is that it calls other hooks. The `use`
prefix tells React and the linter to check the Rules of Hooks inside it. A function that calls no
hooks (like `formatPrice`) is a normal function with a normal name.

## Component vs custom hook

```jsx
// Component — returns UI
function Button() {
  return <button>Click</button>;
}

// Custom hook — returns logic/data/functions
function useToggle() {
  // state + logic here
}
```

## Rules of Hooks

Call hooks at the **top level** of a component or of another hook. Never inside conditions, loops,
or event handlers.

```jsx
// ❌
if (showDetails) {
  const [shipping] = useState("Ships in 2 days");
}

function handleLike() {
  const [likes, setLikes] = useState(0);
}

// ✅
const [likes, setLikes] = useState(0);

function handleLike() {
  setLikes(likes + 1);
}
```

Break the rule and you'll see `Rendered more hooks than during the previous render.` or
`Invalid hook call`, and the linter says `React Hook "useState" is called conditionally`.

## useToggle

```jsx
// hooks/useToggle.js
import { useState } from "react";

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  function toggle() {
    setValue((prevValue) => !prevValue);
  }

  return [value, toggle];
}

export default useToggle;
```

```jsx
import useToggle from "./hooks/useToggle";

function Modal() {
  const [isOpen, toggle] = useToggle(false);

  return (
    <div>
      <button onClick={toggle}>Toggle Modal</button>
      {isOpen && <p>Modal is open</p>}
    </div>
  );
}
```

## useCounter

```jsx
// hooks/useCounter.js
import { useState } from "react";

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

export default useCounter;
```

```jsx
const { count, increment, decrement, reset } = useCounter(5);
```

**What should a hook return?** Arrays, objects, values, or functions. Use whatever makes the API
easiest to understand. Two things, like `useState`: an array, so you pick the names. Three or more:
an object, so you use names and take only what you need.

## When to make a custom hook

When the same stateful logic shows up in two or more components, or when a name like
`useLocalStorage` makes a component easier to read than the code it hides.

**Not** for one line of state used once. That's extracting logic too early:

```jsx
// ❌ One more file to open, for nothing
function useName() {
  const [name, setName] = useState("");
  return [name, setName];
}
```

## useLocalStorage

We save to localStorage **when we update the state value**, in the setter. That's event-driven:
the user changed the value, so save it right then.

```jsx
// hooks/useLocalStorage.js
import { useState } from "react";

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

export default useLocalStorage;
```

```jsx
const [name, setName] = useLocalStorage("day8-name", "");
```

- **Refresh to test it.** Saving a file keeps state on screen, so only a refresh proves it loaded
  from localStorage.
- **See or clear it:** DevTools > Application > Local Storage > your page's address. Select a key
  and delete it to start over.
- **Use a unique key.** Every project on `localhost:5173` shares one localStorage. Put your
  project's name in the key.
- **Known limits:** `JSON.parse` throws if the saved value isn't JSON (say, typed by hand in
  DevTools), and `updateValue` takes a value, not an updater function like `setState`. The
  full-featured version below fixes both.

If a larger app has many different ways to update the same state, an effect-based
synchronization pattern can still be valid. The takeaway is not "useEffect is bad". It's: **choose
the simplest approach that matches why the code needs to run.**

## A full-featured useLocalStorage

The version above is the one to learn first. A real app hits five more problems:

1. **Bad JSON.** `JSON.parse` throws on a saved value that isn't JSON, and the app crashes on load.
2. **Updater functions.** `setNote((prev) => prev + "!")` saves `JSON.stringify(aFunction)`, which
   is `undefined`. The next refresh crashes.
3. **No way to delete.** Add `remove()`.
4. **Saving can fail.** `setItem` throws when storage is full, or blocked in some private modes.
5. **Other tabs.** A change in another tab doesn't show up here.

```jsx
import { useEffect, useState } from "react";

function readValue(key, initialValue) {
  try {
    const savedValue = localStorage.getItem(key);
    return savedValue !== null ? JSON.parse(savedValue) : initialValue;
  } catch {
    return initialValue;
  }
}

function useLocalStorage(key, initialValue = "") {
  const [value, setValue] = useState(() => readValue(key, initialValue));

  // Event: the user changed the value
  function updateValue(newValue) {
    // Work out the next value here, NOT inside setValue((prev) => ...).
    // StrictMode calls updaters twice, so a save in there would run twice.
    const valueToStore = typeof newValue === "function" ? newValue(value) : newValue;

    try {
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Couldn't save "${key}".`, error);
    }

    setValue(valueToStore);
  }

  // Event: the user asked to forget it
  function remove() {
    try {
      localStorage.removeItem(key);
    } catch {
      // storage blocked
    }
    setValue(initialValue);
  }

  // Effect: another tab is outside React. Subscribe, and clean up.
  useEffect(() => {
    function handleStorage(event) {
      if (event.storageArea !== localStorage) return;
      if (event.key === null || event.key === key) {
        setValue(readValue(key, initialValue));
      }
    }

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [key, initialValue]);

  return [value, updateValue, remove];
}
```

**The writes are events. Listening to other tabs is an effect.** The `storage` event only fires in
*other* tabs, so two hooks in the same tab still don't sync.

## Share logic, not state

Each call to a custom hook gets its **own** state. Two components that both call `useToggle()`
don't share one toggle. Two `useLocalStorage("note")` calls on screen don't stay in sync until
you refresh.

Need two components to show the **same** value? Lift it up: call the hook once in the parent and
pass the value down as props.

```jsx
function App() {
  const [note, setNote] = useLocalStorage("day8-shared-note", "");

  return (
    <>
      <NoteBox note={note} onNoteChange={setNote} />
      <NoteBox note={note} onNoteChange={setNote} />
    </>
  );
}
```

## Event vs effect

Ask: **why does this code need to run?**

- "because the user did something" → event/update path
- "because the component appeared or state changed and now must sync externally" → effect
- you can calculate it from what you have → neither, derive it during render

| Example | Answer |
|---|---|
| A: Toggle a modal | Event/update logic |
| B: Save input value to localStorage during the custom setter | Event/update logic |
| C: Fetch movies when search term changes | Effect |
| D: Listen for window resize | Effect |
| E: Compute a total from cart items | Neither: derive during render |

A hook can contain an effect, too. The effect is still an effect, for the same reason:

```jsx
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
}
```

## useFetch

```jsx
const { data, error, isLoading, refetch } = useFetch(url);
```

```jsx
import { useEffect, useState } from "react";

function useFetch(url) {
  const [reloadCount, setReloadCount] = useState(0);

  // One result, labeled with the request it answers
  const [result, setResult] = useState({ url: null, reloadCount: 0, data: null, error: null });

  useEffect(() => {
    if (!url) return; // null or "": don't fetch

    const controller = new AbortController();

    fetch(url, { signal: controller.signal })
      .then((response) => {
        // fetch only rejects on a network failure. A 404 or 500 lands here.
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json(); // throws a SyntaxError on bad JSON
      })
      .then((data) => {
        setResult({ url, reloadCount, data, error: null });
      })
      .catch((err) => {
        if (err.name === "AbortError") return; // we canceled it on purpose

        const message = err.name === "SyntaxError" ? "The server sent something that isn't valid JSON." : err.message;
        setResult({ url, reloadCount, data: null, error: message });
      });

    // Runs when url or reloadCount changes, and on unmount
    return () => {
      controller.abort();
    };
  }, [url, reloadCount]);

  function refetch() {
    setReloadCount((prevCount) => prevCount + 1);
  }

  // Calculated, not stored
  const isCurrent = result.url === url && result.reloadCount === reloadCount;
  const isLoading = Boolean(url) && !isCurrent;

  return {
    data: isCurrent ? result.data : null,
    error: isCurrent ? result.error : null,
    isLoading,
    refetch,
  };
}

export default useFetch;
```

- **Why no `setIsLoading(true)`?** Setting state right in an effect's body causes an extra render,
  and the linter says `Calling setState synchronously within an effect`. Instead the result
  remembers which url it answers, and `isLoading` is calculated. State is only set when the
  answer arrives.
- **`response.ok`:** `fetch` doesn't reject on a 404 or 500. Check it yourself.
- **Empty results** (`[]`) are a success. Show "No results" in the component.
- **The race:** without a cleanup, a slow old answer can arrive after a fast new one and overwrite
  it. `AbortController` in the cleanup cancels the old request.
- **"(canceled)" in the Network tab on page load?** In development, StrictMode runs setup, cleanup,
  setup. The first request is canceled by your cleanup. That's it working.

## Common mistakes

- putting JSX inside a custom hook
- forgetting the use prefix
- extracting logic too early
- confusing reusable UI with reusable logic
- using useEffect automatically without asking why code needs to run

---

# Day 8 Mini Project — Hook-Powered Utility App

Students build a small app using at least two custom hooks.

## Productivity Panel

Features:

- toggle a help panel
- counter for completed actions
- saved username or note in localStorage

## Required Features

- one toggle behavior
- one counter behavior
- one persisted value
- clean components using custom hooks

## Suggested Structure

```
App
 ├ Header
 ├ TogglePanel
 ├ CounterCard
 └ SavedNote
```

Hooks:

```
hooks/
 ├ useToggle.js
 ├ useCounter.js
 └ useLocalStorage.js
```

## Submission Requirements

Submit your work using a GitHub repository. Your repository must include:

**Source Code**

Your React app must be fully included in the repo.

**Working App**

Must include:

- at least 2 custom hooks
- reusable logic
- clear component structure

**README Reflection**

Answer:

1. What is a custom hook?
2. How is a custom hook different from a component?
3. When should you create a custom hook?
4. Which hook did you build that felt most useful?
5. How did custom hooks improve your code?

## Submitting with GitHub (before you leave)

1. On github.com, create a **New repository** (for example `day8-productivity-panel`). Leave
   "Add a README" unchecked.
2. In your project folder, run `git status`. If it says "not a git repository", run `git init`.
3. Check that `.gitignore` lists `node_modules`. Vite's does.
4. `git add .` then `git commit -m "Day 8 mini project"`
5. `git branch -M main`, then the two commands GitHub shows you:
   `git remote add origin <your repo URL>` and `git push -u origin main`
6. Refresh the repo page. You should see `src/` and `README.md`, and **no** `node_modules` folder.
7. Paste the repo link into the assignment.

Committed `node_modules` by accident?

```bash
git rm -r --cached node_modules
git commit -m "Remove node_modules"
git push
```

## How you'll be graded

- hooks start with use
- logic is truly reusable
- components are cleaner because of extraction
- you can explain why the hook exists
- you can explain event vs effect reasoning

## Rebuild challenge

The course page says "before class ends", but class time goes to the mini project. Do it as
**homework**, or if you finish the project early. Close your code, the docs, and AI. Rebuild from
memory:

- useToggle
- useCounter
- useLocalStorage
- one small component that uses each

## Homework

- Finish the Productivity Panel and its README reflection, if it isn't pushed yet
- Rebuild challenge
- If we skipped it in class: the full-featured useLocalStorage. Open two tabs and watch them sync
- Rebuild useFetch from memory, then try it with a real API: `https://jsonplaceholder.typicode.com/users`
- [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks#challenges): Extract a useCounter Hook
- [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks#challenges): Make the counter delay configurable
- [Separating Events from Effects](https://react.dev/learn/separating-events-from-effects#challenges): Fix a variable that doesn't update
- Read: [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks) and [Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks)

**Next class:** Project Day — Hooks, Effects, and Data. You'll combine events, effects, fetching,
and custom hooks into a real app.
