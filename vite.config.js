import { defineConfig } from 'vite'
import fs from 'fs'

const htmlContent = '<!DOCTYPE html><html lang="ru"><head><meta charset="UTF-8" /><title>RSS агрегатор</title></head><body><div id="root"></div><script type="module" src="/src/main.js"></script></body></html>'
const htmlPath = 'code/index.html'

fs.mkdirSync('code', { recursive: true })
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
