# Day 8 Mini Project — Hook-Powered Utility App

Students build a small app using at least two custom hooks.

This starter has the suggested structure with a static page. Nothing responds yet. Follow the
numbered steps at the top of `src/App.jsx`, and the TODO in each component. Or start your own
Vite project and use this as a guide.

```bash
npm install
npm run dev
```

## Productivity Panel

Features:

- toggle a help panel
- counter for completed actions
- saved username or note in localStorage

## Required Features

- one toggle behavior
- one counter behavior
- one persisted value
- clean components using custom hooks

## Suggested Structure

```
App
 ├ Header
 ├ TogglePanel
 ├ CounterCard
 └ SavedNote
```

Hooks:

```
hooks/
 ├ useToggle.js
 ├ useCounter.js
 └ useLocalStorage.js
```

## Submission Requirements

Submit your work using a GitHub repository. Your repository must include:

**Source Code**

Your React app must be fully included in the repo.

**Working App**

Must include:

- at least 2 custom hooks
- reusable logic
- clear component structure

## README Reflection

Replace each blank with your answer before you submit.

1. What is a custom hook?

2. How is a custom hook different from a component?

3. When should you create a custom hook?

4. Which hook did you build that felt most useful?

5. How did custom hooks improve your code?

## Submitting with GitHub

1. On github.com, create a **New repository** (for example `day8-productivity-panel`). Leave
   "Add a README" unchecked, since you already have one.
2. In this folder, run `git status`. If it says "not a git repository", run `git init`.
3. Check that `.gitignore` lists `node_modules`. It does in this starter.
4. `git add .` then `git commit -m "Day 8 mini project"`
5. `git branch -M main`, then the two commands GitHub shows you:
   `git remote add origin <your repo URL>` and `git push -u origin main`
6. Refresh the repo page. You should see `src/` and this README, and no `node_modules` folder.
7. Paste the repo link into the assignment.

Committed `node_modules` by accident?

```bash
git rm -r --cached node_modules
git commit -m "Remove node_modules"
git push
```
