// I DO solution: every hook at the top level, every render, in the same order.
//
//   The condition moved into the JSX. The hook didn't move into the condition.
//   The handler calls setLikes, the setter that useState gave us. It doesn't call useState.
//   "shipping" never changes, so it was never state. It's a plain constant now.
//
//   The lint errors you saw in the starter:
//     React Hook "useState" is called conditionally. React Hooks must be called in the exact
//     same order in every component render
//     React Hook "useState" is called in function "handleLike" that is neither a React function
//     component nor a custom React Hook function. ...

import { useState } from "react";

const shipping = "Ships in 2 days";

function ProductCard() {
  const [showDetails, setShowDetails] = useState(false);
  const [likes, setLikes] = useState(0);

  function handleLike() {
    setLikes(likes + 1);
  }

  return (
    <div className="card">
      <h3>Desk Lamp</h3>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "Hide" : "Show"} details
      </button>
      <button onClick={handleLike}>Like ({likes})</button>
      {showDetails && <p className="muted">{shipping}</p>}
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
