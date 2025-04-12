import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// for local testing 7-11 and new 14-20

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: { port: 5174 },
// })


export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // <- Add this
    port: 5174
  },
})
