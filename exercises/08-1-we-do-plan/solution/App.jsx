// WE DO solution: the plan. It matches the assignment's suggested structure.

const plan = {
  behaviors: `Toggle a help panel.
Count completed actions.
Save a username or note, so it survives a refresh.`,
  hooks: `useToggle(false)       returns [isOpen, toggle]
useCounter(0)          returns { count, increment, decrement, reset }
useLocalStorage(key)   returns [value, setValue]`,
  components: `App
 ├ Header         no hook, just UI
 ├ TogglePanel    useToggle
 ├ CounterCard    useCounter
 └ SavedNote      useLocalStorage`,
  shared: `No. Each component calls its own hook and owns its own state.
If two components needed the same value, we'd call the hook once in App
and pass it down as props (lifting state up).`,
  eventOrEffect: `Event. The note changes because the user typed, so useLocalStorage
saves it in its setter, right then. No useEffect needed.`,
};

export default function App() {
  return (
    <div>
      <h1>Productivity Panel plan</h1>
      <h3>1. Behaviors</h3>
      <pre>{plan.behaviors}</pre>
      <h3>2. Hooks</h3>
      <pre>{plan.hooks}</pre>
      <h3>3. Components</h3>
      <pre>{plan.components}</pre>
      <h3>4. Shared state?</h3>
      <pre>{plan.shared}</pre>
      <h3>5. Event or effect?</h3>
      <pre>{plan.eventOrEffect}</pre>
    </div>
  );
}
