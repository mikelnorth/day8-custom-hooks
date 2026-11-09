// A tiny pretend API for the useFetch lesson, so it works with no internet and no API key.
// It serves the JSON files in public/api/, and these query params change the answer on purpose:
//
//   ?delay=3000   wait 3 seconds before answering (max 10000), to show loading and races
//   ?status=500   answer with that HTTP status instead, to show !response.ok
//   ?broken       answer with text that isn't valid JSON
//
// Example: /api/books/fantasy.json?delay=3000
// It runs inside Vite's dev and preview servers only. It isn't part of React or of your app.
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { join, normalize, sep } from 'node:path'

const apiFolder = fileURLToPath(new URL('./public/api/', import.meta.url))

function send(res, status, body) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 'no-store')
  res.end(body)
}

function fakeApi(req, res, next) {
  const url = new URL(req.url, 'http://localhost')
  if (!url.pathname.startsWith('/api/')) return next()

  const delay = Math.min(Number(url.searchParams.get('delay')) || 0, 10000)
  const status = Number(url.searchParams.get('status')) || 200
  const file = normalize(join(apiFolder, url.pathname.slice('/api/'.length)))

  const timer = setTimeout(async () => {
    if (res.writableEnded || res.destroyed) return
    if (status !== 200) return send(res, status, JSON.stringify({ message: `Simulated ${status} error` }))
    if (url.searchParams.has('broken')) return send(res, 200, '{"books": [ this is not JSON')
    if (!file.startsWith(apiFolder.replace(/[\\/]$/, '') + sep)) return send(res, 404, '{"message":"Not found"}')
    try {
      send(res, 200, await readFile(file, 'utf8'))
    } catch {
      send(res, 404, JSON.stringify({ message: 'Not found' }))
    }
  }, delay)

  // The browser canceled the request (AbortController, or a page reload): stop waiting.
  res.on('close', () => clearTimeout(timer))
}

export default function fakeApiPlugin() {
  return {
    name: 'fake-api',
    configureServer(server) {
      server.middlewares.use(fakeApi)
    },
    configurePreviewServer(server) {
      server.middlewares.use(fakeApi)
    },
  }
}
