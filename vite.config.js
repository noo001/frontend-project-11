import { defineConfig } from 'vite'

export default defineConfig({
  root: process.cwd(),
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      react: 'react',
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: `${process.cwd()}/src/main.js`,
      external: ['react'],
    },
    sourcemap: false,
  },
})
