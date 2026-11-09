import { useState } from "react"

// EVENT hook (event-based approach from class). localStorage IS outside
// React, but we only ever write to it because the user changed the value
// (logged or removed a workout). So the write happens in the setter, at the
// moment of the change, instead of in an effect that runs after every render.

// Reading saved data can fail two ways: the stored text is not valid JSON
// (someone edited it by hand, or an old version saved something weird), or
// the browser blocks storage entirely. Either way we fall back to
// initialValue instead of crashing the whole app.
function readStoredValue(key, initialValue) {
  try {
    const savedValue = localStorage.getItem(key)

    if (savedValue !== null) {
      return JSON.parse(savedValue)
    }
  } catch {
    // Corrupt or unavailable storage: use the starting value below.
  }

  return initialValue
}

function useLocalStorage(key, initialValue = "") {
  // The function form means we only read localStorage on the first render,
  // not on every re-render.
  const [value, setValue] = useState(() => readStoredValue(key, initialValue))

  // Works like a setState: pass a new value, OR pass an updater function
  // that gets the current value, e.g. setEntries((prev) => [...prev, entry]).
  // Note: the updater reads `value` from this render, so it is meant for one
  // update per event. That is all this app ever does in a single click.
  function updateValue(newValue) {
    const nextValue = typeof newValue === "function" ? newValue(value) : newValue

    try {
      localStorage.setItem(key, JSON.stringify(nextValue))
    } catch {
      // Storage full or blocked: the app still works for this visit,
      // it just will not survive a refresh.
    }

    setValue(nextValue)
  }

  return [value, updateValue]
}

export default useLocalStorage
