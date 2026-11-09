// WE DO: what should a hook return? Custom hooks can return arrays, objects, values, or functions.
// Use whatever makes the API easiest to understand.
//
//   1. useToggle returns an array. Add a second toggle to Toolbar for a menu, with your own names:
//        const [isMenuOpen, toggleMenu] = useToggle();
//      Arrays let each caller pick the names. Handy when one component calls the hook twice.
//   2. useCounter returns an object. In Badge, take only what you need:
//        const { count, increment } = useCounter();
//   3. Try it: make useCounter return [count, increment, decrement, reset] instead.
//      Now every caller has to remember the order. Which version is easier to read? Change it back.

import useToggle from "./hooks/useToggle";
import useCounter from "./hooks/useCounter";

function Toolbar() {
  const [isSearchOpen, toggleSearch] = useToggle();
  // TODO: a second toggle for the menu

  return (
    <div className="card">
      <h3>Toolbar</h3>
      <button onClick={toggleSearch}>Search</button>
      <button>Menu</button>
      {isSearchOpen && <p className="muted">Search is open</p>}
    </div>
  );
}

function Badge() {
  const { count, increment, decrement, reset } = useCounter();

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
