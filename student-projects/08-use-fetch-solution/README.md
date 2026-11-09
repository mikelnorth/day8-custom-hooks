# 08 — useFetch (Day 8 solution)

The finished `useFetch` in `src/hooks/useFetch.js`: loading, error and data; `!response.ok`; bad
JSON; no url; empty results; `refetch()`; and an `AbortController` cleanup that cancels the old
request when the url changes or the component unmounts.

```bash
npm install
npm run dev
```

`fake-api.js` serves `public/api/books/*.json` and understands `?delay=`, `?status=`, and
`?broken`. In development, StrictMode runs the effect twice on mount, so the Network tab shows the
first request as (canceled). That's the cleanup working.
