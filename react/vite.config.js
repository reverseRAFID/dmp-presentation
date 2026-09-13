import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 5180,
    host: true,          // bind 0.0.0.0 so the deck is reachable over the network
    open: false,
    allowedHosts: true,  // accept requests arriving via a public IP or hostname
  },
  preview: {
    port: 4180,
    host: true,
    allowedHosts: true,
  },
})
