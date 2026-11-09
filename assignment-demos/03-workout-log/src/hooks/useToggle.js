import { useState } from "react"

// EVENT hook. A toggle only changes because the user clicked something,
// so the flip happens right inside the event function. Nothing outside
// React needs to stay in sync, so there is no useEffect here.
//
// Used three times in this app: the help panel, the kg/lb switch, and the
// "auto-start rest timer" option. Same logic, three different jobs.
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)

  function toggle() {
    // Updater function so two quick toggles always flip from the latest value.
    setValue((prevValue) => !prevValue)
  }

  return [value, toggle]
}

export default useToggle
