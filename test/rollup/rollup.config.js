import mcss from '@brixtol/mcss';
import scss from 'rollup-plugin-scss';
import postcss from 'rollup-plugin-postcss';
import sass from 'node-sass';

const dev = {
  clear: false,
  minify: false,
  obfuscate: false,
  ignore: [ 'jc-center', 'btn-' ]
}


const prod = {
  clear: false,
  minify: true,
  obfuscate: true,
  ignore: [ 'jc-center', 'btn-' ]
}

export default [
  {
    input: 'src/test_1.js',
    output: {
      file: 'dist/test_1.js',
      format: 'es',
      sourcemap: false,
      plugins: []
    },
    plugins: [
      mcss(process.env.prod ? prod : dev),
      postcss(
        {
          use: { sass },
          autoModules: false,
          extract: 'test_3.css',
          plugins: [
            mcss.postcss()
          ]
        }
      )
    ]
  },
  {
    input: 'src/test_2.js',
    output: {
      file: 'dist/test_2.js',
      format: 'es',
      sourcemap: false,
      plugins: []
    },
    plugins: [
      mcss(process.env.prod ? prod : dev),
      postcss(
        {
          use: { sass },
          autoModules: false,
          extract: 'test_2.css',
          plugins: [
            mcss.postcss()
          ]
        }
      )
    ]
  },
  {
    input: 'src/test_3.js',
    output: {
      file: 'dist/test_3.js',
      format: 'es',
      sourcemap: false,
      plugins: []
    },
    plugins: [
      mcss(process.env.prod ? prod : dev),
      scss(
        {
          sass,
          output: 'dist/test_1.css'
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
  }
];
