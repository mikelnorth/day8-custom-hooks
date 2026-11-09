// I DO: useLocalStorage(key, initialValue = "")
//
//   1. useState with a function: read localStorage.getItem(key) once, on the first render.
//      Found something? JSON.parse it. Nothing saved (null)? Use initialValue.
//   2. updateValue(newValue): save with localStorage.setItem(key, JSON.stringify(newValue)),
//      then setValue(newValue). Saving happens in the setter, because the user changed the value.
//   3. Return [value, updateValue], the same shape as useState.
