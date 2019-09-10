import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';

import pkg from './package.json';

export default [
  {
    input: 'src/index.js',
    output: {
      name: pkg.name,
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      resolve(),
      babel({
        exclude: ['node_modules/**']
      }),
      commonjs({
        namedExports: {
          'node_modules/react/index.js': ['Component', 'PureComponent', 'Fragment', 'Children', 'createElement'],
          'node_modules/react-dom/index.js': ['render'],
        }
      }),
      postcss({
        extract: true
      })
    ]
  },
  {
    input: 'src/index.js',
    external: ['react'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [
      babel({
        exclude: ['node_modules/**']
      }),
      postcss({
        extract: true
      })
    ]
  }
];
