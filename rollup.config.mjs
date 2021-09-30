import { rollup, plugin, env } from '@brixtol/rollup-config';
import typescript from 'typescript';
import * as tslib from 'tslib';

export default rollup(
  {
    input: 'src/index.ts',
    output: {
      dir: 'package',
      format: 'cjs',
      exports: 'default',
      sourcemap: false
    },
    external: [
      'magic-string',
      'postcss',
      'path',
      'fs-extra',
      'console',
      'escape-string-regexp',
      'object-assign',
      'readable-stream/transform'
    ],
    plugins: env.if('dev')(
      [
        plugin.ts(
          {
            typescript,
            tslib
          }
        ),
        plugin.resolve(),
        plugin.commonjs(
          {
            extensions: [ '.js', '.ts' ]
          }
        )
      ]
    )(
      [
        plugin.terser(
          {
            compress: {
              passes: 2
            }
          }
        )
      ]
    )
  }
);
