// YOU DO: Exercise 1, build useToggle.
//
//   Students build:
//     - a useToggle hook (hooks/useToggle.js)
//     - one component using it
//     - then a second component using the same hook
//
//   1. Write the hook.
//   2. HelpMessage: the button shows and hides the message.
//   3. ThemeSwitcher: the button switches the card between light and dark (className "card dark").
//   Check: click one. Does the other one change? It shouldn't. Each call gets its own state.
//   Stretch: add a third component of your own: a modal, a spoiler, a "read more".

function HelpMessage() {
  // TODO: const [isOpen, toggle] = useToggle(false);

  return (
    <div className="card">
      <h3>Help</h3>
      <button>Show help</button>
      <p className="muted">Press the button again to hide this message.</p>
    </div>
  );
}

function ThemeSwitcher() {
  // TODO: const [isDark, toggleTheme] = useToggle(false);

  return (
    <div className="card">
      <h3>Theme</h3>
      <button>Switch to dark</button>
      <p className="muted">Light mode is on.</p>
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
