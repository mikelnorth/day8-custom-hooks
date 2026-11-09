// YOU DO solution: one hook, two components.
//
//   Each useToggle() call has its own useState inside it, so HelpMessage and ThemeSwitcher
//   each have their own value. Toggling one never changes the other.
//   Each component names the values it gets back: [isOpen, toggle] and [isDark, toggleTheme].

import useToggle from "./hooks/useToggle";

function HelpMessage() {
  const [isOpen, toggle] = useToggle(false);

  return (
    <div className="card">
      <h3>Help</h3>
      <button onClick={toggle}>{isOpen ? "Hide" : "Show"} help</button>
      {isOpen && <p className="muted">Press the button again to hide this message.</p>}
    </div>
  );
}

function ThemeSwitcher() {
  const [isDark, toggleTheme] = useToggle(false);

  return (
    <div className={isDark ? "card dark" : "card"}>
      <h3>Theme</h3>
      <button onClick={toggleTheme}>Switch to {isDark ? "light" : "dark"}</button>
      <p className="muted">{isDark ? "Dark" : "Light"} mode is on.</p>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>Exercise 1: useToggle</h1>
      <div className="grid">
        <HelpMessage />
        <ThemeSwitcher />
      </div>
    </div>
  );
}
