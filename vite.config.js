import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fakeApi from './fake-api.js'

// https://vite.dev/config/
export default defineConfig({
  // fakeApi serves public/api/ with ?delay, ?status and ?broken, for the useFetch lesson.
  plugins: [react(), tailwindcss(), fakeApi()],
  server: {
    watch: {
      // Standalone projects with their own dev servers. Editing them shouldn't touch this app.
      ignored: ['**/assignment-demos/**', '**/student-projects/**'],
    },
  },
  build: {
    rollupOptions: {
      // index.html is the lesson. live.html runs the files in exercises/.
      input: ['index.html', 'live.html'],
    },
  },
})
