// I DO: the Rules of Hooks. This file breaks the main rule twice, on purpose.
//
//   Rule: call hooks at the top level of a component or of another hook.
//   Never inside a condition, a loop, or an event handler. This goes for your own hooks too.
//
//   1. Click "Show details". The page shows: "Rendered more hooks than during the previous render."
//      useState is inside an if, so this render calls a different number of hooks than the last.
//   2. Refresh. Click "Like (broken)" with the console open. You get an error, not a like.
//      Event handlers run after rendering, and hooks only work while a component renders.
//   3. The linter catches both before you run anything. From the lesson folder:
//        npx eslint --no-ignore exercises/02-2-i-do-rules-of-hooks/starter
//      (--no-ignore is needed only because this repo's lint skips starters.)
//   4. Fix: move both hooks to the top of ProductCard. Use the values in the condition instead.

import { useState } from "react";

function ProductCard() {
  const [showDetails, setShowDetails] = useState(false);

  let details = "";
  if (showDetails) {
    // 🔴 A hook inside a condition
    const [shipping] = useState("Ships in 2 days");
    details = shipping;
  }

  function handleLike() {
    // 🔴 A hook inside an event handler
    const [likes, setLikes] = useState(0);
    setLikes(likes + 1);
  }

  return (
    <div className="card">
      <h3>Desk Lamp</h3>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "Hide" : "Show"} details
      </button>
      <button onClick={handleLike}>Like (broken)</button>
      {showDetails && <p className="muted">{details}</p>}
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>Rules of Hooks</h1>
      <ProductCard />
    </div>
  );
}
