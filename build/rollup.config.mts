import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import json from '@rollup/plugin-json'
import { babel } from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import bundleSize from 'rollup-plugin-bundle-size'
import license from 'rollup-plugin-license'
import replace from '@rollup/plugin-replace'
import type {
  GeneratedCodeOptions, GeneratedCodePreset, InputPluginOption, ModuleFormat
} from 'rollup'
import { pkg } from '#build/constant'

const version = process.env.VERSION || pkg.version

interface IParamsGetRollupConfig {
  input: string;
  fileName: string;
  name: string;
  format: ModuleFormat
  env: string
}
interface IReturnGetRollupConfig {
  input: {
    input: string;
    external: string[]
    plugins: InputPluginOption
  }
  output: {
    file: string;
    name: string;
    generatedCode: GeneratedCodePreset | GeneratedCodeOptions;
    compact: boolean
    format: ModuleFormat
  }
}
export const getRollupConfig = (config: IParamsGetRollupConfig): IReturnGetRollupConfig => {
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
