import { useState } from "react";

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  function toggle() {
    setValue((prevValue) => !prevValue);
  }

  const button = <button onClick={toggle}>{value ? "Hide" : "Show"} help</button>;

  return [value, toggle, button];
}

export default useToggle;
