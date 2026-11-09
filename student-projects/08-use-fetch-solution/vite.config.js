import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fakeApi from './fake-api.js'

// fakeApi is a lesson helper: it serves public/api/ with ?delay, ?status and ?broken.
export default defineConfig({
  plugins: [react(), fakeApi()],
})
