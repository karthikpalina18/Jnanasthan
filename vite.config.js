import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Jnanasthan-trail/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
