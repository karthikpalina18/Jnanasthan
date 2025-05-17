import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Jnanasthan-trail/',  // <--- Add trailing slash here!
  plugins: [react()],
})
