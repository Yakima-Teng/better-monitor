import path from 'path'
import fs from 'fs'

const pathPackageJson = path.resolve(path.join(__dirname, '../package.json'))

export const pkg = JSON.parse(fs.readFileSync(pathPackageJson, { encoding: 'utf8' }))
