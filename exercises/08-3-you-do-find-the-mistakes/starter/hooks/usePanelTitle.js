import { useState } from "react";

function usePanelTitle() {
  const [title, setTitle] = useState("Productivity Panel");
  return [title, setTitle];
}

export default usePanelTitle;
