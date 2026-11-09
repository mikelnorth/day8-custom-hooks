import useOnlineStatus from "../hooks/useOnlineStatus"

// This component owns no state. All the listening lives in the hook,
// so the component just reads a true/false and picks the words.
function OnlineBadge() {
  const isOnline = useOnlineStatus()

  return (
    <p
      className={isOnline ? "badge badge--online" : "badge badge--offline"}
      role="status"
    >
      <span className="badge__dot" aria-hidden="true" />
      {isOnline ? "Online" : "Offline, still saving locally"}
    </p>
  )
}

export default OnlineBadge
