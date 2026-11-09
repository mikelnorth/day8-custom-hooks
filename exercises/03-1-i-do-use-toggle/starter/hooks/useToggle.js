// I DO: move the toggle logic out of App.jsx and into this file.
//
//   1. Name it useToggle. It calls a hook (useState), so its name starts with use.
//   2. Take initialValue, with a default of false.
//   3. Use the updater form: setValue((prevValue) => !prevValue)
//   4. Return [value, toggle], the same shape useState returns.
//   5. export default useToggle, then import it in App.jsx.
