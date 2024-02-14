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

    const pkgName = pkg.name
    // 去掉连字符，并将每个单词的首字母大写
    const name = pkgName.split('-').map((word) => word.substring(0, 1).toUpperCase() + word.substring(1)).join('')

    /**
     * create different format of lib files
     */
    await build(configFactory({
      input: './src/index.ts',
      fileName: `./dist/${pkgName}.js`,
      name,
      format: 'umd',
      env: 'development'
    }))
    await build(configFactory({
      input: './src/index.ts',
      fileName: `./dist/${pkgName}.min.js`,
      name,
      format: 'umd',
      env: 'production'
    }))
    await build(configFactory({
      input: './src/index.ts',
      fileName: `./dist/${pkgName}.common.js`,
      name,
      format: 'cjs',
      env: 'development'
    }))
    await build(configFactory({
      input: './src/index.ts',
      fileName: `./dist/${pkgName}.esm.js`,
      name,
      format: 'esm',
      env: 'development'
    }))

    /**
     * create typescript definition file
     */
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
