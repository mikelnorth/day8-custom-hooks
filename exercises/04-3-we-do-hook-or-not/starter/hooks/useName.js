import { useState } from "react";

// Made into a hook "in case we need it later". It's used in one place.
function useName() {
  const [name, setName] = useState("");
  return [name, setName];
}

export default useName;
