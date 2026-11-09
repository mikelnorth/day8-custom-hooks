import { useState } from "react";

// Reusable on/off logic. Every component that calls useToggle
// gets its own separate true/false value.
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  function toggle() {
    setValue((prevValue) => !prevValue);
  }

  return [value, toggle];
}

export default useToggle;
