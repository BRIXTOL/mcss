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
          extract: 'test_1.css',
          plugins: [
            mcss.postcss()
          ]
        }
      )
    ]
  },

];
