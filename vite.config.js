import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  root: process.cwd(),
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(process.cwd(), 'index.html'),
      },
    },
  },
})
