import { Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Recap from './pages/lessons/01-recap/Recap.jsx'
import WhatIsAHook from './pages/lessons/02-what-is-a-hook/WhatIsAHook.jsx'
import UseToggle from './pages/lessons/03-use-toggle/UseToggle.jsx'
import UseCounter from './pages/lessons/04-use-counter/UseCounter.jsx'
import UseLocalStorage from './pages/lessons/05-use-local-storage/UseLocalStorage.jsx'
import EventVsEffect from './pages/lessons/06-event-vs-effect/EventVsEffect.jsx'
import UseFetch from './pages/lessons/07-use-fetch/UseFetch.jsx'
import MiniProject from './pages/lessons/08-mini-project/MiniProject.jsx'
import WrapUp from './pages/lessons/09-wrap-up/WrapUp.jsx'
import ClassTimer from './components/ClassTimer.jsx'

const lessons = [
  { to: '/', label: 'Home / Plan', end: true },
  { to: '/recap', label: '1. Recap & the Big Idea' },
  { to: '/what-is-a-hook', label: '2. What Is a Custom Hook?' },
  { to: '/use-toggle', label: '3. useToggle & Exercise 1' },
  { to: '/use-counter', label: '4. useCounter & Exercise 2' },
  { to: '/use-local-storage', label: '5. useLocalStorage & Exercise 3' },
  { to: '/event-vs-effect', label: '6. Event vs Effect & Exercise 4' },
  { to: '/use-fetch', label: '7. useFetch' },
  { to: '/mini-project', label: '8. Mini Project' },
  { to: '/wrap-up', label: '9. Wrap-up' },
]

function Sidebar() {
  return (
    <aside className="w-72 shrink-0 border-r border-slate-200 bg-white/80 backdrop-blur px-5 py-6 overflow-y-auto">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-widest text-slate-500">Day 8</p>
        <h1 className="text-lg font-semibold text-slate-900 leading-tight">Custom Hooks</h1>
      </div>
      <nav className="flex flex-col gap-1">
        {lessons.map((lesson) => (
          <NavLink
            key={lesson.to}
            to={lesson.to}
            end={lesson.end}
            className={({ isActive }) =>
              `block rounded-md px-3 py-2 text-sm transition ${
                isActive ? 'bg-indigo-600 text-white font-medium shadow-sm' : 'text-slate-700 hover:bg-slate-100'
              }`
            }
          >
            {lesson.label}
          </NavLink>
        ))}
      </nav>
      <a
        href="/live.html"
        target="_blank"
        rel="noreferrer"
        className="mt-3 block rounded-md border border-indigo-200 bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-800 hover:bg-indigo-100"
      >
        Live code: all starters & solutions
      </a>
      <div className="mt-6">
        <ClassTimer />
      </div>
      <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600 leading-relaxed">
        Teaching phrases: <span className="font-semibold text-slate-900">"Components reuse UI. Hooks reuse logic."</span>{' '}
        "Share logic, not state." "Hooks at the top level." "Why does this code need to run?" "If setup starts it, cleanup stops it."
      </div>
    </aside>
  )
}

function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-8 py-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recap" element={<Recap />} />
            <Route path="/what-is-a-hook" element={<WhatIsAHook />} />
            <Route path="/use-toggle" element={<UseToggle />} />
            <Route path="/use-counter" element={<UseCounter />} />
            <Route path="/use-local-storage" element={<UseLocalStorage />} />
            <Route path="/event-vs-effect" element={<EventVsEffect />} />
            <Route path="/use-fetch" element={<UseFetch />} />
            <Route path="/mini-project" element={<MiniProject />} />
            <Route path="/wrap-up" element={<WrapUp />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default App
