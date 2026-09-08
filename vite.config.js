import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Allow easy static hosting on any subdirectory or root
  server: {
    port: 5173,
    open: false
  }
})
