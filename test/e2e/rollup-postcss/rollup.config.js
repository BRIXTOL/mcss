import mcss from '@brixtol/mcss';
import scss from 'rollup-plugin-scss';
import sass from 'node-sass';
import postcss from 'postcss';

export default {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: false,
    plugins: [
      mcss({
        obfuscate: true
      })
    ]
  },
  plugins: [
    scss(
      {
        sass,
        output: 'dist/stylesheet.min.css'
        , watch: [
          'src',
          'src/style.scss'
        ],
        includePaths: [
          'node_modules/'
        ]
        , processor: () => postcss([
          mcss.postcss()
        ])
      }
    )

  ]
};