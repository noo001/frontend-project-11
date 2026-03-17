import { defineConfig } from 'vite'

export default defineConfig({
  root: '/project',
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: '/project/dist',
    emptyOutDir: true,
    rollupOptions: {
      input: '/project/src/main.js',
      external: ['react'],
    },
  },
})
