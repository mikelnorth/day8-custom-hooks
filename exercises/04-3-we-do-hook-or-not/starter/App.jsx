// WE DO: hook or not? Both files in hooks/ are named like hooks. Should they be?
//
//   1. useName wraps one useState and is used once. Is App easier to read with it, or is it just
//      one more file to open? This is "extracting logic too early".
//   2. useFormatPrice calls no hooks. Is it a hook? What should it be called?
//      (Is a hook just a function? Yes. What makes it a hook is that it calls other hooks.
//      The use prefix tells React and the linter to check the Rules of Hooks inside it.)
//   3. Fix both: put the useState back in App, and rename formatPrice. Delete the hooks/ folder.
//   4. Then: when WOULD you make a hook?

import useName from "./hooks/useName";
import useFormatPrice from "./hooks/useFormatPrice";

export default function App() {
  const [name, setName] = useName();
  const price = 12.5;

  return (
    <div>
      <h1>Hook or not?</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
      <p>Hi, {name || "friend"}. Your total is {useFormatPrice(price)}.</p>
    </div>
  );
}
