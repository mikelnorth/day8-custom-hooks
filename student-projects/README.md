# Day 8 student projects

Plain Vite + React (JavaScript), same shape as `npm create vite@latest`. These are standalone
copies of the main exercises. For live coding with no setup, use `../exercises/` instead. Each
project here runs on its own:

```bash
cd 01-use-toggle-starter
npm install
npm run dev
```

Hooks live in `src/hooks/`, one hook per file, beside the components that use them.

The two useFetch projects include `fake-api.js`, a small Vite helper that serves
`public/api/books/*.json` and understands `?delay=`, `?status=`, and `?broken`, so they work with no
internet. It's a lesson helper, not part of React.

Every Vite project on `localhost:5173` shares one localStorage. That's why the exercise keys start
with `day8-` and differ per exercise. Tell students to put their project's name in their own keys.

| Folder | Lesson | What it is |
|---|---|---|
| `01-use-toggle-starter` | 3 | Exercise 1 starter |
| `02-use-toggle-solution` | 3 | Exercise 1 solution |
| `03-use-counter-starter` | 4 | Exercise 2 starter |
| `04-use-counter-solution` | 4 | Exercise 2 solution, including the `incrementBy` stretch |
| `05-use-local-storage-starter` | 5 | Exercise 3 starter |
| `06-use-local-storage-solution` | 5 | Exercise 3 solution |
| `07-use-fetch-starter` | 7 | useFetch starter: the Book Browser, with the hook to write step by step |
| `08-use-fetch-solution` | 7 | useFetch solution: every edge case, `refetch`, and the AbortController cleanup |
| `09-productivity-panel-starter` | 8 | Mini project starter: static page in the suggested structure, the assignment, the README reflection, and the GitHub steps |
| `10-course-reference-app` | 9 | The course page's starter code, unchanged. Use it to check the rebuild challenge |

Exercise 4 (Event or Effect?) is a class discussion, so it has no project here. The mini project
has no solution here on purpose, since it's graded.
