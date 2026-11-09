// WE DO solution.
//
//   Array: two things, like useState. Callers rename freely: [isSearchOpen, toggleSearch].
//   Object: three or more things. Callers use names, and can take only what they need.
//   One value: a hook can also return just a value. react.dev's useOnlineStatus() returns only
//   isOnline. One function works too.
//
//   Rule of thumb: two things, use an array. Three or more, use an object. Readable wins.

import useToggle from "./hooks/useToggle";
import useCounter from "./hooks/useCounter";

function Toolbar() {
  const [isSearchOpen, toggleSearch] = useToggle();
  const [isMenuOpen, toggleMenu] = useToggle();

  return (
    <div className="card">
      <h3>Toolbar</h3>
      <button onClick={toggleSearch}>Search</button>
      <button onClick={toggleMenu}>Menu</button>
      {isSearchOpen && <p className="muted">Search is open</p>}
      {isMenuOpen && <p className="muted">Menu is open</p>}
    </div>
  );
}

function Badge() {
  const { count, increment } = useCounter();

  return (
    <div className="card">
      <h3>Badges earned: {count}</h3>
      <button onClick={increment}>Earn a badge</button>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>Return shapes</h1>
      <div className="grid">
        <Toolbar />
        <Badge />
      </div>
    </div>
  );
}
