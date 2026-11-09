# 08 — Course reference app

The course page's Day 8 starter code, unchanged: `TogglePanel`, `CounterCard`, and `SavedNote`,
with `useToggle`, `useCounter`, and `useLocalStorage` in `src/hooks/`. Use it to check your
rebuild challenge.

```bash
npm install
npm run dev
```

It saves under the key `note`. Every Vite project you run on `localhost:5173` shares the same
localStorage, so another project using `note` will see the same saved value.
