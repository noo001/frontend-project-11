import { defineConfig } from 'vite'
import path from 'path'

const isDocker = process.cwd().includes('/project')
const rootDir = isDocker ? '/project/code' : process.cwd()

export default defineConfig({
  root: rootDir,
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: path.join(rootDir, 'src/main.js'),
      external: ['react'],
    },
  },
})
