import { useEffect, useState } from 'react'
import useFetch from '../../../demos/hooks/useFetch.js'
import { createLog } from '../../../demos/log.js'
import LogPanel from '../../../demos/LogPanel.jsx'

const buttonClass = 'rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm hover:bg-slate-100 disabled:opacity-50'
const activeClass = 'rounded-md border border-indigo-600 bg-indigo-600 px-3 py-1.5 text-sm text-white'
const genres = ['fantasy', 'mystery', 'science', 'poetry']

function BookList({ data }) {
  return (
    <ul className="divide-y divide-slate-100 text-sm">
      {data.map((book) => (
        <li key={book.id} className="flex justify-between gap-3 py-1.5">
          <span>{book.title} <span className="text-slate-500">by {book.author}</span></span>
          <span className="text-slate-500 tabular-nums">{book.year}</span>
        </li>
      ))}
    </ul>
  )
}

// The finished hook, with every switch the We do uses.
export function BookBrowser() {
  const [genre, setGenre] = useState('fantasy')
  const [slow, setSlow] = useState(false)
  const [fail, setFail] = useState(false)
  const [broken, setBroken] = useState(false)

  let url = null
  if (genre) {
    const params = new URLSearchParams({ delay: slow ? '3000' : '600' })
    if (fail) params.set('status', '500')
    if (broken) params.set('broken', '')
    url = `/api/books/${genre}.json?${params}`
  }

  const { data, error, isLoading, refetch } = useFetch(url)

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {genres.map((name) => (
          <button key={name} className={genre === name ? activeClass : buttonClass} onClick={() => setGenre(name)}>{name}</button>
        ))}
        <button className={genre === null ? activeClass : buttonClass} onClick={() => setGenre(null)}>None</button>
      </div>
      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-700">
        <label className="flex items-center gap-1.5"><input type="checkbox" checked={slow} onChange={(e) => setSlow(e.target.checked)} /> Slow (3 s)</label>
        <label className="flex items-center gap-1.5"><input type="checkbox" checked={fail} onChange={(e) => setFail(e.target.checked)} /> Fail (500)</label>
        <label className="flex items-center gap-1.5"><input type="checkbox" checked={broken} onChange={(e) => setBroken(e.target.checked)} /> Bad JSON</label>
        <button className={buttonClass} onClick={refetch} disabled={!url}>Reload</button>
      </div>
      <p className="font-mono text-xs text-slate-500">useFetch({url ? `"${url}"` : 'null'})</p>
      <div className="min-h-24">
        {!url && <p className="text-sm text-slate-600">Pick a genre to load books. No request is sent.</p>}
        {isLoading && <p className="text-sm text-slate-600">Loading...</p>}
        {error && <p className="text-sm text-rose-700">{error}</p>}
        {data && data.length === 0 && <p className="text-sm text-slate-600">No books in this genre yet.</p>}
        {data && data.length > 0 && <BookList data={data} />}
      </div>
    </div>
  )
}

const raceUrls = {
  fantasy: '/api/books/fantasy.json?delay=3000',
  mystery: '/api/books/mystery.json?delay=300',
}

const nameOf = (url) => (url ? url.match(/books\/(\w+)/)[1] : 'nothing')

// A copy of useFetch that logs, with a switch for the AbortController fix.
// The log is a store outside React, so logging never adds a render.
function useLoggedFetch(url, { cancel, log }) {
  const [result, setResult] = useState({ url: null, data: null })

  useEffect(() => {
    if (!url) return undefined
    const controller = new AbortController()
    log.push(`→ request ${nameOf(url)}`)

    fetch(url, cancel ? { signal: controller.signal } : {})
      .then((response) => response.json())
      .then((data) => {
        log.push(`← answer ${nameOf(url)}, now in state`)
        setResult({ url, data })
      })
      .catch((err) => {
        if (err.name !== 'AbortError') log.push(`error ${nameOf(url)}: ${err.message}`)
      })

    return () => {
      if (cancel) {
        controller.abort()
        log.push(`✕ cleanup canceled ${nameOf(url)}`)
      }
    }
  }, [url, cancel, log])

  const isCurrent = result.url === url
  return { data: isCurrent ? result.data : null, isLoading: Boolean(url) && !isCurrent, resultUrl: result.url }
}

function RacePanel({ cancel }) {
  const [log] = useState(createLog)
  const [genre, setGenre] = useState(null)
  const url = genre ? raceUrls[genre] : null
  const { data, isLoading, resultUrl } = useLoggedFetch(url, { cancel, log })

  function race() {
    log.clear()
    setGenre('fantasy')
    setTimeout(() => setGenre('mystery'), 200)
  }

  return (
    <div className={`rounded-lg border p-4 space-y-3 ${cancel ? 'border-emerald-300' : 'border-rose-300'}`}>
      <p className={`font-semibold ${cancel ? 'text-emerald-800' : 'text-rose-800'}`}>
        {cancel ? 'With AbortController cleanup' : 'No cleanup'}
      </p>
      <button className={buttonClass} onClick={race}>Race: Fantasy (3 s), then Mystery (0.3 s)</button>
      <div className="text-sm space-y-1">
        <p>Selected: <strong>{genre ?? 'nothing'}</strong></p>
        <p className="text-slate-700">
          Result in state belongs to: <strong>{nameOf(resultUrl)}</strong>
        </p>
        <div className="min-h-16">
          {isLoading && <p className="text-slate-600">Loading...</p>}
          {data && <BookList data={data} />}
        </div>
      </div>
      <LogPanel log={log} title="Requests" empty="Click Race." />
    </div>
  )
}

export function RaceDemo() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <RacePanel cancel={false} />
      <RacePanel cancel />
    </div>
  )
}
