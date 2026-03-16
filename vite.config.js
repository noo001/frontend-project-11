import { defineConfig } from 'vite'

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
      input: 'src/main.js',
      external: ['react'],
    },
  },
})
