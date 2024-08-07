/* eslint-disable @typescript-eslint/no-var-requires */
const resolve = require('@rollup/plugin-node-resolve')
const terser = require('@rollup/plugin-terser')
const json = require('@rollup/plugin-json')
const { babel } = require('@rollup/plugin-babel')
const typescript = require('@rollup/plugin-typescript')
const commonjs = require('@rollup/plugin-commonjs')
const bundleSize = require('rollup-plugin-bundle-size')
const license = require('rollup-plugin-license')
const replace = require('@rollup/plugin-replace')
// eslint-disable-next-line import/extensions
const pkg = require('../package.json')
/* eslint-enable @typescript-eslint/no-var-requires */

const version = process.env.VERSION || pkg.version

module.exports = (config) => {
  const {
    input, fileName, name, env, format
  } = config
  const isProd = env === 'production'
  return {
    input: {
      input,
      external: [],
      plugins: [
        replace({
          preventAssignment: true,
          'process.env.NODE_ENV': JSON.stringify(env),
          'process.env.BUILD_DATE': () => JSON.stringify(new Date()),
          'process.env.BUILD_VERSION': JSON.stringify(version)
        }),
        json(),
        typescript(),
        commonjs(),
        resolve({ browser: true }),
        babel({
          babelrc: false,
          babelHelpers: 'bundled',
          // .ts is needed, because till now, file extension is still .ts, it's .js until the end process flow
          extensions: ['.ts', '.js', '.jsx', '.es6', '.es', '.mjs'],
          presets: [
            [
              '@babel/preset-env',
              {
                modules: false,
                loose: false,
                targets: {
                  chrome: '60.0.0',
                  ie: '8'
                }
              }
            ]
          ]
        }),
        isProd && terser(),
        license({
          // eslint-disable-next-line max-len
          banner: [
            `Name: ${pkg.name}`,
            `Version: ${version}`,
            'Created: <%= moment().format(\'YYYY-MM-DD HH:mm:ss\') %>',
            'Homepage: https://www.verybugs.com/'
          ].join('\n')
        }),
        isProd && bundleSize()
      ].filter(Boolean)
    },
    output: {
      file: fileName,
      format,
      name,
      generatedCode: 'es5',
      compact: isProd
    }
  }
}
