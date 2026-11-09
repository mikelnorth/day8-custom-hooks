import { useEffect, useState } from "react";

// Reads a saved value. Anything missing or not valid JSON falls back to initialValue.
function readValue(key, initialValue) {
  try {
    const savedValue = localStorage.getItem(key);
    return savedValue !== null ? JSON.parse(savedValue) : initialValue;
  } catch {
    // Not valid JSON, for example text typed by hand in DevTools. Start fresh, don't crash.
    return initialValue;
  }
}

function useLocalStorage(key, initialValue = "") {
  const [value, setValue] = useState(() => readValue(key, initialValue));

  // Event: the user changed the value, so save it right then.
  function updateValue(newValue) {
    // Accept a function too, like setState: setNote((prevNote) => prevNote + "!")
    // We work out the next value here, from this render's value, so the localStorage write is NOT
    // inside a setValue updater. StrictMode calls updaters twice in development.
    const valueToStore = typeof newValue === "function" ? newValue(value) : newValue;

    try {
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // Storage is full, or blocked (some private modes). Keep the value on screen anyway.
      console.warn(`Couldn't save "${key}" to localStorage.`, error);
    }

    setValue(valueToStore);
  }

  // Event: the user asked to forget the value.
  function remove() {
    try {
      localStorage.removeItem(key);
    } catch {
      // Storage blocked. Nothing to remove.
    }
    setValue(initialValue);
  }

  // Effect: another tab is an outside system. Subscribe while on screen, unsubscribe on cleanup.
  // The storage event only fires in OTHER tabs, never in the tab that made the change.
  useEffect(() => {
    function handleStorage(event) {
      if (event.storageArea !== localStorage) return;

      // key is null when the other tab called localStorage.clear()
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

export default useLocalStorage;
