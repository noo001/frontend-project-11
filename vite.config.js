import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  root: process.cwd(),
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: path.resolve(process.cwd(), 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(process.cwd(), 'index.html'),
    },
  },
})
