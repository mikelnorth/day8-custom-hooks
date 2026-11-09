import { useEffect, useState } from "react";

// The full useFetch: loading, error and data; !response.ok; bad JSON; no url; empty results;
// refetch(); and AbortController, so an old request can't overwrite a newer one.
function useFetch(url) {
  const [reloadCount, setReloadCount] = useState(0);

  // One result, labeled with the request it answers.
  const [result, setResult] = useState({ url: null, reloadCount: 0, data: null, error: null });

  useEffect(() => {
    if (!url) return;

    // Setup starts a request. Cleanup cancels it.
    const controller = new AbortController();

    fetch(url, { signal: controller.signal })
      .then((response) => {
        // fetch only rejects on a network failure. A 404 or 500 lands here.
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setResult({ url, reloadCount, data, error: null });
      })
      .catch((err) => {
        // We canceled it on purpose. That's not an error to show.
        if (err.name === "AbortError") return;

        const message = err.name === "SyntaxError" ? "The server sent something that isn't valid JSON." : err.message;
        setResult({ url, reloadCount, data: null, error: message });
      });

    // Runs when url or reloadCount changes, and when the component unmounts.
    return () => {
      controller.abort();
    };
  }, [url, reloadCount]);

  function refetch() {
    setReloadCount((prevCount) => prevCount + 1);
  }

  // isLoading is calculated, not stored: are we still waiting for the request we want?
  const isCurrent = result.url === url && result.reloadCount === reloadCount;
  const isLoading = Boolean(url) && !isCurrent;

  return {
    data: isCurrent ? result.data : null,
    error: isCurrent ? result.error : null,
    isLoading,
    refetch,
  };
}

export default useFetch;
