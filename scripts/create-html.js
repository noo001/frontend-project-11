import fs from 'fs'
import path from 'path'

const htmlContent = '<!DOCTYPE html><html lang="ru"><head><meta charset="UTF-8" /><title>RSS агрегатор</title></head><body><div id="root"></div><script type="module" src="/src/main.js"></script></body></html>'
const htmlPath = path.resolve(process.cwd(), 'code/index.html')

fs.mkdirSync(path.dirname(htmlPath), { recursive: true })
fs.writeFileSync(htmlPath, htmlContent, 'utf8')
