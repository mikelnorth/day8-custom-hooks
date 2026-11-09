# Day 8 exercises

Every I do, We do, and You do in the lesson has a folder here. There's nothing to set up: they all
run from the teaching app's dev server.

```bash
npm run dev     # from the repo root, once
```

## How to live code one

1. On a lesson page, find the block and click **Open in editor** and **Run starter**. Open in editor
   opens `App.jsx` and every hook and component file beside it.
2. Edit `exercises/<name>/starter/App.jsx` and the files in `hooks/`. Add new files beside them, such
   as `components/TogglePanel.jsx`.
3. Save. The page updates on its own, keeping state where it can.
4. Use the **Solution** tab to show the finished version.

Or skip the lesson pages: `/live.html` lists all 21, and every exercise has Prev and Next links.

## Layout

```
exercises/
  styles.css                      Shared styles, so no exercise needs its own
  03-1-i-do-use-toggle/           <lesson page>-<order>-<i do | we do | you do>-<topic>
    starter/App.jsx               Instructions are in the comment at the top
    starter/hooks/useToggle.js    Hooks live in their own files, like a real project
    solution/App.jsx
    solution/hooks/useToggle.js
```

The comment at the top of each file has the steps or the answers. When a starter's hook file only
has comments, that's the file you write.

## localStorage and live coding

Page 5 and the mini project save values. Know these before class:

- **Saving a file keeps state.** A typed name stays on screen after a save, even with no
  localStorage at all. **Refresh to prove a value was saved.** That's the point of Exercise 3.
- **Saved values stay between exercises,** because every exercise runs on the same address. So each
  exercise uses its own key starting with `day8-`: `day8-name`, `day8-shared-note`, `day8-ex3-name`,
  `day8-ex3-note`, `day8-full-note`, `day8-mini-note`, `day8-mistakes-note`, `day8-rebuild-note`.
- **To clear them:** the **Clear saved values** button in the live code bar removes every `day8-` key
  and reloads. Or DevTools > Application > Local Storage, select the key, and delete it.
- `05-4` starter has a button that saves a value that isn't JSON and reloads. The page then shows a
  JSON error until you fix the hook or clear the key. That's intended. Its "two tabs" step needs a
  second browser tab on the same exercise URL.
- `live.html` runs in StrictMode, like a Vite app. Saving doesn't re-run a `[]` effect: refresh after
  changing an effect.

## useFetch and the pretend API

- `07-1` and `07-2` fetch from `/api/books/*.json`. `fake-api.js` (a Vite plugin in the lesson folder's
  root) answers those, with `?delay=3000`, `?status=500`, and `?broken` to slow or break a request
  on purpose. No internet needed. It only runs under `npm run dev` or `npm run preview`.
- Saving the hook keeps the component's state, and the effect only re-runs when its dependencies
  change. After changing the effect, click a genre (or refresh) to see the new code run.
- The Network tab is the proof. After the AbortController fix, the old request shows `(canceled)`,
  and on a refresh StrictMode cancels the first request too.

## Resetting

Your edits change the starter files. This folder isn't a git repo yet. Once it's committed, this
puts them back:

```bash
git restore exercises
```

## Notes

- If "Open in editor" opens the wrong editor, start the server with `LAUNCH_EDITOR=code npm run dev`.
- Many starters contain deliberate bugs, so `npm run lint` skips `starter/` folders. Solutions are
  linted. To show the Rules of Hooks errors: `npx eslint --no-ignore exercises/02-2-i-do-rules-of-hooks/starter`.
- `03-2`, `04-4`, `04-5`, `05-3`, `07-1`, `08-2`, and `09-1` match the standalone versions in
  `student-projects/` (`08-use-fetch-solution` is `07-1`'s app with `07-2`'s finished hook; `10-course-reference-app` is `09-1` with the course's key, `note`). If you change one, change the other.
- `08-2/solution` is the graded answer. Don't project it during work time, and don't share
  `/live.html` before the due date.
