const _ = require('lodash')
const path = require('path')
const typescript = require('@rollup/plugin-typescript')
const commonjs = require('@rollup/plugin-commonjs')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const nodePolyfills = require('rollup-plugin-node-polyfills')
const url = require('@rollup/plugin-url')
const json = require('@rollup/plugin-json')
// const image = require('@rollup/plugin-image')
const postcss = require('rollup-plugin-postcss')
// const peerDepsExternal = require('rollup-plugin-peer-deps-external')
const progress = require('rollup-plugin-progress')
const babel = require('@rollup/plugin-babel')
const terser = require('@rollup/plugin-terser')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

const pkg = require('./package.json')

const libraryName = pkg.name
const production = process.env.NODE_ENV == 'production'

const rollPostcssConfig = {
  extract: false,
  modules: true,
  use: [
    [
      'sass',
      {
        data: '@import "./index.scss";',
        includePaths: [path.join(__dirname, 'src')],
      },
    ],
  ],
  plugins: [autoprefixer(), cssnano()],
}
module.exports = {
  input: './src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: !production,
    },
  ],
  watch: {
    include: ['src/**'],
  },
  plugins: [
    babel({
      exclude: /node_modules/,
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env'],
      plugins: ['@babel/plugin-transform-runtime'],
    }),
    nodeResolve(),

    typescript({ module: "ESNext" }),

    url({
      fileName: '[dirname][hash][extname]',
      sourceDir: path.join(__dirname, 'src'),
    }),
    commonjs(),
    json(),
    progress(),
    production && terser(),
  ],
}
