import { useState } from "react";

// State that survives a page refresh.
// The saved value is read once, when the component first renders.
function useLocalStorage(key, initialValue = "") {
  const [value, setValue] = useState(() => {
    const savedValue = localStorage.getItem(key);

    if (savedValue !== null) {
      return JSON.parse(savedValue);
    }

    return initialValue;
  });

  // Saving happens here, in the setter, because the user changed
  // the value. No effect is needed: the update and the save happen
  // in the same event.
  function updateValue(newValue) {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  }

  return [value, updateValue];
}

export default useLocalStorage;
