// WE DO: useFetch(url) returns { data, error, isLoading, refetch }.
// This placeholder lets App.jsx run before the hook is written. Replace it step by step.
//
// Step 1. Loading, error, and data.
//   - Keep ONE piece of state: the result, plus the url it belongs to.
//       const [result, setResult] = useState({ url: null, data: null, error: null });
//   - In useEffect(..., [url]): fetch(url), then response.json(), then
//       setResult({ url, data, error: null });   and in .catch: setResult({ url, data: null, error: err.message });
//   - isLoading is CALCULATED during render: const isLoading = result.url !== url;
//     Why not setIsLoading(true) at the top of the effect? Setting state right in an effect's body
//     causes an extra render, and the linter flags it (react-hooks/set-state-in-effect). Only set
//     state when the answer arrives, in .then or .catch.
//   - Only return data and error if they belong to the current url.
//
// Step 2. Bad answers.
//   - fetch only rejects when the network fails. A 404 or 500 still "succeeds". Check response.ok,
//     and throw new Error(`Request failed with status ${response.status}`) if it's false.
//   - response.json() throws a SyntaxError on text that isn't JSON. Turn it into a clear message.
//
// Step 3. Nothing to fetch, and nothing found.
//   - url is null or "": return early from the effect. isLoading must be false too.
//   - An empty array is a success, not an error. The component decides what "no books" looks like.
//
// Step 4. refetch().
//   - const [reloadCount, setReloadCount] = useState(0);
//   - refetch adds 1. Put reloadCount in the dependency array AND in the result, so isLoading
//     compares both: result.url !== url || result.reloadCount !== reloadCount
//
// Next block: the race, and AbortController.

function useFetch(url) {
  return { data: null, error: null, isLoading: false, refetch() {} };
}

export default useFetch;
