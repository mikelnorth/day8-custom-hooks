// WE DO: the answers, and the code each one turns into.
//
//   A: <button onClick={toggle}>          useToggle's toggle runs in the click handler
//   B: function updateValue(newValue) {
//        localStorage.setItem(key, JSON.stringify(newValue));
//        setValue(newValue);
//      }
//   C: useEffect(() => { ...fetch with searchTerm... }, [searchTerm])
//   D: useEffect(() => {
//        window.addEventListener("resize", handleResize);
//        return () => window.removeEventListener("resize", handleResize);
//      }, [])
//   E: const total = cartItems.reduce((sum, item) => sum + item.price, 0);
//
//   C and D could each live inside a custom hook (useMovies, useWindowWidth). The effect moves
//   into the hook. It's still an effect, for the same reason.

const examples = [
  { id: "A", text: "Toggle a modal", answer: "Event", why: "The user clicked." },
  { id: "B", text: "Save input value to localStorage during the custom setter", answer: "Event", why: "The user changed the value, so save it right then." },
  { id: "C", text: "Fetch movies when search term changes", answer: "Effect", why: "Keep the results in sync with a server for the current search term." },
  { id: "D", text: "Listen for window resize", answer: "Effect", why: "Subscribe to something outside React while the component is on screen, with cleanup." },
  { id: "E", text: "Compute a total from cart items", answer: "Neither", why: "Derive it during render. No state, no effect." },
];

export default function App() {
  return (
    <div>
      <h1>Event or Effect?</h1>
      <ul>
        {examples.map((example) => (
          <li key={example.id}>
            <span>
              {example.id}. {example.text}
              <br />
              <span className="muted">{example.why}</span>
            </span>
            <span className="tag">{example.answer}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
