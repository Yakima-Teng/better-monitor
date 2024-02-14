/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const fs = require('fs')
const rollup = require('rollup')
// eslint-disable-next-line import/extensions
const pkg = require('../package.json')
const configFactory = require('./rollup.config')
/* eslint-enable @typescript-eslint/no-var-requires */

const { version } = pkg

const definitionFilePath = path.join(__dirname, '../types/better-monitor.d.ts')
const definitionFileContent = fs.readFileSync(definitionFilePath, 'utf8')

const fsPromises = fs.promises

async function build(option) {
  const bundle = await rollup.rollup(option.input)
  await bundle.write(option.output)
}

const buildLib = async () => {
  try {
    // eslint-disable-next-line no-console
    console.log('开始：构建JS SDK')

    /**
     * 生成*.min.js和*.d.ts
     */
    await build(configFactory({
      input: './src/index.ts',
      fileName: `./dist/${pkg.name}.min.js`,
      name: 'BetterMonitor'
    }))

    await fsPromises.writeFile(
      path.join(__dirname, `../dist/${pkg.name}.d.ts`),
      definitionFileContent.replace('{{ version }}', `${pkg.name}, ${version}`)
    )

    // eslint-disable-next-line no-console
    console.log('结束：构建JS SDK')
  } catch (e) {
    console.error(e) // eslint-disable-line no-console
  }
}

module.exports = {
  buildLib
}
