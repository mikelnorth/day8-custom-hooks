import { useEffect, useState } from "react";

// useFetch, steps 1 to 4, with a log so you can see the order answers arrive in.
// Not fixed yet: a slow old answer can overwrite a newer one.
function useFetch(url) {
  const [reloadCount, setReloadCount] = useState(0);

  // One result, labeled with the request it answers.
  const [result, setResult] = useState({ url: null, reloadCount: 0, data: null, error: null });

  useEffect(() => {
    // Step 3: no url, no request.
    if (!url) return;

    fetch(url)
      .then((response) => {
        // Step 2: fetch only rejects on a network failure. A 404 or 500 lands here.
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Answer arrived for", url);
        setResult({ url, reloadCount, data, error: null });
      })
      .catch((err) => {
        // Step 2: response.json() throws a SyntaxError on text that isn't JSON.
        const message = err.name === "SyntaxError" ? "The server sent something that isn't valid JSON." : err.message;
        setResult({ url, reloadCount, data: null, error: message });
      });
  }, [url, reloadCount]);

  // Step 4: a new reloadCount is a new request, so the effect runs again.
  function refetch() {
    setReloadCount((prevCount) => prevCount + 1);
  }

  // Step 1: isLoading is calculated, not stored. We're loading if the result we have
  // doesn't answer the request we want.
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
