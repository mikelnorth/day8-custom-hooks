// A small store outside React. Demos write to it from inside effects, and only the panel that
// shows it re-renders. That way, logging never adds a render to the demo being measured.
export function createLog() {
  let lines = []
  const listeners = new Set()

  function notify() {
    listeners.forEach((listener) => listener())
  }

  return {
    push(line) {
      lines = [...lines, line]
      notify()
    },
    clear() {
      lines = []
      notify()
    },
    subscribe(listener) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    getSnapshot() {
      return lines
    },
  }
}
