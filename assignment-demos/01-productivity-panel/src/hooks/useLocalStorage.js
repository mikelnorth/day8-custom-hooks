import { useState } from "react";

function useLocalStorage(key, initialValue = "") {
  // Read localStorage only once, on the first render.
  const [value, setValue] = useState(() => {
    const savedValue = localStorage.getItem(key);

    if (savedValue !== null) {
      return JSON.parse(savedValue);
    }

    return initialValue;
  });

  // Save at the same moment the user changes the value (event, not effect).
  function updateValue(newValue) {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  }

  return [value, updateValue];
}

export default useLocalStorage;
