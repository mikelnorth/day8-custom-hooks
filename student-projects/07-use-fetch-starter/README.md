# 07 — useFetch (Day 8 starter)

Build `useFetch(url)` in `src/hooks/useFetch.js`, one edge case at a time. `src/App.jsx` (a Book
Browser) is done. The steps are in the comments at the top of the hook file.

```bash
npm install
npm run dev
```

```jsx
const { data, error, isLoading, refetch } = useFetch(url);
```

No internet or API key needed. `fake-api.js` makes Vite's dev server answer from
`public/api/books/*.json`, and these query params change the answer on purpose:

- `?delay=3000`: answer after 3 seconds
- `?status=500`: answer with that error status
- `?broken`: answer with text that isn't JSON

When steps 1 to 4 work, add the AbortController cleanup so an old slow answer can't overwrite a
newer one.
