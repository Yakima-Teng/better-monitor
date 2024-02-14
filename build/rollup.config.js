/* eslint-disable @typescript-eslint/no-var-requires */
const resolve = require('@rollup/plugin-node-resolve')
const terser = require('@rollup/plugin-terser')
const json = require('@rollup/plugin-json')
const { babel } = require('@rollup/plugin-babel')
const typescript = require('@rollup/plugin-typescript')
const commonjs = require('@rollup/plugin-commonjs')
const bundleSize = require('rollup-plugin-bundle-size')
const license = require('rollup-plugin-license')
// eslint-disable-next-line import/extensions
const pkg = require('../package.json')
/* eslint-enable @typescript-eslint/no-var-requires */

const { version } = pkg
const isProd = process.env.NODE_ENV === 'production'

module.exports = (config) => {
  const { input, fileName, name } = config
  return {
    input: {
      input,
      external: [],
      plugins: [
        json(),
        typescript(),
        commonjs(),
        resolve({ browser: true }),
        babel({
          babelHelpers: 'bundled',
          presets: ['@babel/preset-env']
        }),
        isProd && terser(),
        license({
          // eslint-disable-next-line max-len
          banner: `Name: ${pkg.name}\nVersion: ${version}\nCreated: <%= moment().format('YYYY-MM-DD HH:mm:ss') %>\nDocument: https://www.verybugs.com/lib/`
        }),
        isProd && bundleSize()
      ].filter(Boolean)
    },
    output: {
      file: fileName,
      format: 'umd',
      name,
      globals: {
        BetterMonitor: 'BetterMonitor'
      },
      compact: isProd
    }
  }
}
