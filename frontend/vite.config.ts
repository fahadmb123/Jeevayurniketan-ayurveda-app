import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Force restart
export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
