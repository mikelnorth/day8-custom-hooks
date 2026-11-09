// WE DO solution: neither one needed to be a hook.
//
//   useName was one line of useState, used once. Now it's that line, right where it's used.
//   formatPrice calls no hooks, so it's a plain function with a plain name. You could call it
//   anywhere, even inside a condition or a loop, and that's fine.
//
//   Make a custom hook when:
//     - the same stateful logic shows up in two or more components, or
//     - a name like useLocalStorage makes the component easier to read than the code it hides.
//   react.dev: "You don't need to extract a custom Hook for every little duplicated bit of code.
//   Some duplication is fine."

import { useState } from "react";

function formatPrice(price) {
  return "$" + price.toFixed(2);
}

export default function App() {
  const [name, setName] = useState("");
  const price = 12.5;

  return (
    <div>
      <h1>Hook or not?</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
      <p>Hi, {name || "friend"}. Your total is {formatPrice(price)}.</p>
    </div>
  );
}
