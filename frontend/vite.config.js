import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

// for local testing 7-10 and new 12-18
// export default defineConfig({
//   plugins: [react()],
//   server: { port: 5173 },
// })

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // <- Add this
    port: 5173
  },
})
