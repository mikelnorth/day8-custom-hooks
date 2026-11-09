// YOU DO: write useLocalStorage(key, initialValue = "") here.
//
//   - Load: useState(() => { ... }) reads localStorage.getItem(key) once.
//     If it isn't null, return JSON.parse(savedValue). Otherwise return initialValue.
//   - Save: updateValue(newValue) calls localStorage.setItem(key, JSON.stringify(newValue)),
//     then setValue(newValue).
//   - Return [value, updateValue].
//   - export default useLocalStorage;
