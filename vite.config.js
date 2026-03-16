import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'

const htmlPath = path.resolve(process.cwd(), 'code/index.html')
const htmlContent = '<!DOCTYPE html><html lang="ru"><head><meta charset="UTF-8" /><title>RSS агрегатор</title></head><body><div id="root"></div><script type="module" src="/src/main.js"></script></body></html>'
fs.writeFileSync(htmlPath, htmlContent, 'utf8')

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
