import { defineConfig } from 'vite'
import fs from 'fs'

const htmlPath = '/project/code/index.html'
const htmlContent = '<!DOCTYPE html><html lang="ru"><head><meta charset="UTF-8" /><title>RSS агрегатор</title></head><body><div id="root"></div><script type="module" src="/src/main.js"></script></body></html>'

try {
  fs.mkdirSync('/project/code', { recursive: true })
  fs.writeFileSync(htmlPath, htmlContent, 'utf8')
} catch (e) {
  console.error('Failed to create index.html:', e)
}

export default defineConfig({
  root: '/project/code',
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: '/project/code/dist',
    emptyOutDir: true,
    rollupOptions: {
      input: '/project/code/src/main.js',
      external: ['react'],
    },
  },
})
