import { useEffect, useState } from "react"

// EFFECT hook (the example from react.dev's "Reusing Logic with Custom Hooks").
// Going offline is not something the user does inside our app. The browser
// tells us through "online" and "offline" events on window, which is outside
// React. So we subscribe in an effect after the component appears, and the
// cleanup unsubscribes when it goes away.
function useOnlineStatus() {
  // Start from the browser's current answer instead of guessing true.
  const [isOnline, setIsOnline] = useState(() => navigator.onLine)

  useEffect(() => {
    // setState only happens inside these listeners, never in the effect body.
    function handleOnline() {
      setIsOnline(true)
    }

    function handleOffline() {
      setIsOnline(false)
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, []) // [] = subscribe once when the component appears. Nothing inside reads props or state.

  return isOnline
}

export default useOnlineStatus
