import { Plugin } from 'rollup';
import { createFilter } from '@rollup/pluginutils';
import { walk } from 'estree-walker';
import MagicString from 'magic-string';
import { join } from 'path';
import { ensureFileSync, ensureDirSync } from 'fs-extra';
import { IRollupOptions, IObfuscateOptions } from './options';
import PostCSS, { Plugin as PostCSSPlugin, Root } from 'postcss';
import { generateMaps } from './mappings';
import { config, cache } from './config';
import chalk from 'chalk';
import { log } from './log';

export function plugin (provided: Partial<IRollupOptions>) {

  config.available.mcss = true;

  for (const p in provided) {
    if (!(p in config.options)) throw new Error('No such option ' + p);
    config.options[p] = provided[p];
  }

  ensureFileSync(config.options.cache);

  if (config.options.typesDir.length > 0) {
    ensureDirSync(config.options.typesDir);
  }

  config.options.typesDir = join(config.options.typesDir, 'mcss.d.ts');

  return rollup(config);

};

export function postcss (options?: IObfuscateOptions): PostCSSPlugin {

  if (!config.available.mcss) throw new Error('mcss: Missing mcss() output plugin');
  if (!config.available.postcss) config.available.postcss = true;

  Object.assign(config.options, options);

  const generate = generateMaps(config.options);

  return {
    postcssPlugin: 'postcss-mcss',
    async Once (root: Root, { result }) {
      const css = root.toString();
      const min = await generate(css);
      result.root = PostCSS.parse(min);
      log(chalk`{magentaBright mcss {bold generated}}`);
    }
  };

};

function rollup (opts: Partial<typeof config>): Plugin {

  const filter = createFilter(opts.options.include, opts.options.exclude);

  return {
    name: 'mcss',
    buildStart () {
      if (!opts.available.postcss) {
        this.addWatchFile(opts.options.cache);
        log(chalk`{magentaBright mcss {bold Generating class maps... }}`);
        log(chalk`{magentaBright mcss {dim Rebuild will execute after generation}}`);
      }
    },
    transform (code, id) {

      if (!filter(id)) return;

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
                if (opts.options.obfuscate) {
                  if (cache.mappings?.[value]) {
                    selector += '.' + cache.mappings[value];
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
        map: opts.options.sourcemap ? str.generateMap({ hires: true }) : undefined
      };
    }

  };
};
