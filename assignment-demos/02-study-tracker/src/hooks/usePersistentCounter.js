import useLocalStorage from "./useLocalStorage";

// A counter that survives a refresh. It is built from another custom
// hook: useLocalStorage stores the number, and this hook adds the
// counter actions on top. It returns the same shape as useCounter,
// so a component can use either one the same way.
function usePersistentCounter(key, initialValue = 0) {
  const [count, setCount] = useLocalStorage(key, initialValue);

  // useLocalStorage's setter takes a new value (not an updater
  // function), so each action works out the next number first.
  function increment() {
    setCount(count + 1);
  }

  function decrement() {
    setCount(count - 1);
  }

  function incrementBy(amount) {
    setCount(count + amount);
  }

  function reset() {
    setCount(initialValue);
  }

  return {
    count,
    increment,
    decrement,
    incrementBy,
    reset,
  };
}

export default usePersistentCounter;
