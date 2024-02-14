/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const fse = require('fs-extra')
/* eslint-enable @typescript-eslint/no-var-requires */

fse.copySync(
  path.join(__dirname, '../.vitepress/dist'),
  path.join(__dirname, '../dist'),
  { overwrite: true }
)
