import path from 'path'
import fs from 'fs'

const { VERSION, COMMENT } = process.env
if (VERSION) {
  const pathReadme = path.join(__dirname, '../README.md')
  const contentReadme = fs.readFileSync(pathReadme, { encoding: 'utf-8' })
  const newContentReadme = contentReadme
    .replace(/(better-monitor@)[^/]+(\/)/m, `$1${VERSION}$2`)
  fs.writeFileSync(pathReadme, newContentReadme, { encoding: 'utf-8' })
}

if (COMMENT) {
  const pathChangeLog = path.join(__dirname, '../CHANGELOG.md')
  const objDate = new Date()
  const year = objDate.getFullYear()
  const month = objDate.getMonth() + 1
  const date = objDate.getDate()
  const updateDateStr = `${year}-${month}-${date}`
  const appendStr = `- ${COMMENT} (${updateDateStr})\n`
  fs.appendFileSync(pathChangeLog, appendStr)
}
