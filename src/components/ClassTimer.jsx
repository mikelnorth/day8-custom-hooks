import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { blockAt, blockAfter, fmt } from '../data/schedule.js'

// Sidebar stopwatch for the instructor. Shows which agenda block you should be in.
export default function ClassTimer() {
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return undefined
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [running])

  const minutes = Math.floor(seconds / 60)
  const current = blockAt(minutes)
  const next = blockAfter(current)
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')
  const finished = minutes >= 180

  return (
    <div className="rounded-md border border-slate-200 bg-white p-3 text-xs text-slate-600">
      <div className="flex items-center justify-between">
        <p className="uppercase tracking-widest text-[10px] text-slate-500 font-semibold">
          Class timer
        </p>
        <span className="font-mono text-base text-slate-900 tabular-nums">
          {mm}:{ss}
        </span>
      </div>

      <div className="mt-2 flex gap-1.5">
        <button
          onClick={() => setRunning((r) => !r)}
          className={`flex-1 rounded px-2 py-1 font-medium text-white ${
            running ? 'bg-amber-600 hover:bg-amber-700' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {running ? 'Pause' : seconds === 0 ? 'Start class' : 'Resume'}
        </button>
        <button
          onClick={() => setSeconds((s) => s + 300)}
          title="Skip ahead 5 minutes"
          className="rounded border border-slate-300 px-2 py-1 hover:bg-slate-100"
        >
          +5
        </button>
        <button
          onClick={() => {
            setRunning(false)
            setSeconds(0)
          }}
          className="rounded border border-slate-300 px-2 py-1 hover:bg-slate-100"
        >
          Reset
        </button>
      </div>

      {seconds > 0 && (
        <div className="mt-3 space-y-1.5 leading-snug">
          {finished ? (
            <p className="font-medium text-emerald-700">Class is over. Nice work.</p>
          ) : current ? (
            <>
              <p>
                <span className="text-slate-400">Now</span>{' '}
                <span className="font-mono">{fmt(current.start)}–{fmt(current.end)}</span>{' '}
                {current.to ? (
                  <Link to={current.to} className="font-medium text-slate-900 hover:underline">
                    {current.title}
                  </Link>
                ) : (
                  <span className="font-medium text-slate-900">{current.title}</span>
                )}
              </p>
              {next && (
                <p className="text-slate-500">
                  <span className="text-slate-400">Next</span>{' '}
                  <span className="font-mono">{fmt(next.start)}</span> {next.title}
                </p>
              )}
            </>
          ) : null}
        </div>
      )}
    </div>
  )
}
