
import { OutputPlugin } from 'rollup';
import { walk } from 'estree-walker';
import MagicString from 'magic-string';
import { readFileSync } from 'fs-extra';
import { resolve } from 'path';

export interface IRollupPlugin {
  /**
   * Optionallist of files to include
   */
  include?: [],

  // Files to exclude (optional)
  exclude?:[],

  // Generate sourcemaps (optional)
  sourcemap?: true,

  // When true, obfuscation is applied (defaults to false)
  obfuscate?: boolean
}

export function rollup (
  options: IRollupPlugin = {}
): OutputPlugin {

  let maps: { [className: string]: string };

  options = Object.assign({
    include: [],
    exclude: [],
    sourcemap: true,
    obfuscate: false
  }, options);

  if (options.obfuscate) {

    maps = JSON.parse(
      readFileSync(resolve('node_modules/.cache/mcss/.cssmap'))
        .toString()
    );

  }

  return {
    name: 'mcss',

    renderChunk (code) {

      const str = new MagicString(code);
      const { warn } = this;

      walk(this.parse(code), {

        enter (node: any) {

          if (node.type === 'CallExpression' && node.callee.type === 'MemberExpression') {

            const { property, object } = node.callee;

            if (object.object?.name === 'm' && object.property?.name === 'css') {

              let selector: string = property?.name === 'div'
                ? ''
                : property.name;

              for (const { value } of node.arguments) {
                if (options.obfuscate) {
                  if (maps?.[value]) {
                    selector += '.' + maps[value];
                  } else {
                    selector += '.' + value;
                    warn({ message: `class name ${value} has no map, will merge defined` });
                  }
                } else {
                  selector += '.' + value;
                }
              }

              str.overwrite(
                node.start,
                node.end,
                '"' + selector + '"'
              );

              this.remove();

            }
          }

        }

      });

      return {
        code: str.toString(),
        map: options.sourcemap ? str.generateMap({ hires: true }) : undefined
      };
    }

  };
};
