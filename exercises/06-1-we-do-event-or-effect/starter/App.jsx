// WE DO: Exercise 4, Event or Effect? Vote on each one, then type your answer below.
//
//   Ask: why does this code need to run?
//     "because the user did something"  → event / update path
//     "because the component appeared or state changed and now must sync externally" → effect
//   And a third answer: neither. If you can calculate it from what you have, do it during render.

const examples = [
  { id: "A", text: "Toggle a modal", answer: "TODO: event, effect, or neither?" },
  { id: "B", text: "Save input value to localStorage during the custom setter", answer: "TODO: event, effect, or neither?" },
  { id: "C", text: "Fetch movies when search term changes", answer: "TODO: event, effect, or neither?" },
  { id: "D", text: "Listen for window resize", answer: "TODO: event, effect, or neither?" },
  { id: "E", text: "Compute a total from cart items", answer: "TODO: event, effect, or neither?" },
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
            </span>
            <span className="tag">{example.answer}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
