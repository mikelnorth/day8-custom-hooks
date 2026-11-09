import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import "./index.css"

// StrictMode note: in development, React runs every effect's setup, then its
// cleanup, then its setup again. For this app that means the online/offline
// listeners get added, removed, and added again, and a running rest timer's
// interval gets created, cleared, and created again. The cleanup functions are
// what keep it at one listener and one interval. Production only sets up once.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
)
