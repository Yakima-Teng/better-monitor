import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

const config = defineConfig({
  input: 'src/index.mts',
  output: [
    {
      file: 'dist/better-monitor.js',
      format: 'es',
      plugins: [
        getBabelOutputPlugin({
          presets: [['@babel/preset-env', { modules: 'umd' }]]
        })
      ]
    },
    {
      file: 'dist/better-monitor.common.js',
      format: 'cjs'
    },
    {
      file: 'dist/better-monitor.esm.js',
      format: 'es'
    }
  ],
  plugins: [
    typescript(),
    json(),
    commonjs(),
    nodeResolve()
  ]
})

export default config
