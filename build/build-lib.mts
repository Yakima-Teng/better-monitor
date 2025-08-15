import path from 'path'
import fs from 'fs'
import { rollup } from 'rollup'
import { pkg } from '#build/constant'
import { getRollupConfig } from '#build/rollup.config'

const version = process.env.VERSION || pkg.version

const definitionFilePath = path.join(__dirname, '../types/better-monitor.d.ts')
const definitionFileContent = fs.readFileSync(definitionFilePath, 'utf8')

const fsPromises = fs.promises

async function build(option: ReturnType<typeof getRollupConfig>) {
  const bundle = await rollup(option.input)
  await bundle.write(option.output)
}

export const buildLib = async () => {
  try {
    // eslint-disable-next-line no-console
    console.log('开始：构建JS SDK')

    const pkgName: string = pkg.name
    // 去掉连字符，并将每个单词的首字母大写
    const name = pkgName.split('-').map((word) => word.substring(0, 1).toUpperCase() + word.substring(1)).join('')

    /**
     * create different format of lib files
     */
    await build(getRollupConfig({
      input: './src/index.ts',
      fileName: `./dist/${pkgName}.js`,
      name,
      format: 'umd',
      env: 'development'
    }))
    await build(getRollupConfig({
      input: './src/index.ts',
      fileName: `./dist/${pkgName}.min.js`,
      name,
      format: 'umd',
      env: 'production'
    }))
    await build(getRollupConfig({
      input: './src/index.ts',
      fileName: `./dist/${pkgName}.common.js`,
      name,
      format: 'cjs',
      env: 'development'
    }))
    await build(getRollupConfig({
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
