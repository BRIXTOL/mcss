import { Plugin, PluginContext } from 'rollup';
import { createFilter } from '@rollup/pluginutils';
import { walk } from 'estree-walker';
import { Node } from 'estree';
import MagicString from 'magic-string';
import touch from 'touch';
import chalk from 'chalk';
import { config } from './config';
import { log, info, warn } from './log';

/**
 * The estree-walker enter method which handles the
 * selector replacments, swapping `m.css.*` occurances
 * out with their valid equivalents.
 */
export function parseSelectors (code: MagicString, missing: string[]) {

  const ignore = config.ignoredClasses;

  /**
   * This return function is curried and rollup context
   * is binded to its `this` scope. It leverages the
   * poorly typed estree-walker module.
   */
  return function (this: PluginContext, node: Node) {

    if (node.type !== 'CallExpression') return null;
    if (node.callee.type !== 'MemberExpression') return null;

    // @ts-ignore
    if (node.callee.object.object?.name !== 'm') return null;

    // @ts-ignore
    if (node.callee.object.property?.name === 'css') {

      // @ts-ignore
      const tagName: string = node.callee.property.name;
      const isClass: boolean = tagName === 'class';

      let selector = (tagName === 'div' || isClass) ? '' : tagName;

      // @ts-ignore
      for (const { value } of node.arguments) {

        if (ignore && ignore.test(value)) continue;

        if (config.maps?.[value]) {
          selector += isClass
            ? config.maps[value] + ' '
            : '.' + config.maps[value];
        } else {
          const unknown = isClass ? value + ' ' : '.' + value;
          selector += unknown;
          missing.push(unknown);
        }

      }

      // @ts-ignore
      code.overwrite(node.start, node.end, '"' + selector + '"');

    }

  };
}

export function rollup (): Plugin {

  const rebuild = new Map<string, string>();
  const filter = createFilter(config.opts.include, config.opts.exclude);
  const cwd = process.cwd().length + 1;

  return {
    name: 'mcss',
    /**
     * We leverage this hook when obfuscating. The `Set`
     * contains a reference to chucks (inputs) that need
     * to be omitted and rebuilt as they are dependent
     * upon the class mappings.
     */
    generateBundle (_options, bundle) {
      if (config.opts.obfuscate) {
        if (rebuild.size > 0) {
          for (const [ facadeModuleId, fileName ] of rebuild.entries()) {
            delete bundle[fileName];
            touch(facadeModuleId);
            log(`${facadeModuleId.slice(cwd)} will be rebuilt`);
            rebuild.delete(facadeModuleId);
          }
        }
      }
    },

    /**
     * Replaces all occurances of `m.css.*` method selector
     * with their valid hyperscript equivalent. Replacments
     * are handled by walking the AST tree and swapping out
     * occurances each time they are encountered.
     *
     * **Handling of Obfuscation**
     *
     * Obfuscation only occurs when `obfuscate` is `true`.
     *
     * When obfuscating, class maps need to be generated and
     * this is a process that handled using postcss. Obfuscation
     * of selectors can only be applied with class mappings available.
     * If no mappings exists then the generated bundle/s (output)
     * is omitted and a rebuild is required.
     *
     * We invoke a rebuild by touching the source files (input) which
     * tricks rollup into a rebuild, this process is repeated until the
     * mappings are available, which will typically occur in the next
     * build cycle.
     */
    renderChunk (code, { facadeModuleId, fileName }) {

      if (!filter(facadeModuleId)) return null;

      if (config.opts.obfuscate || config.opts.clean) {
        if (!config.postcss) {

          rebuild.set(facadeModuleId, fileName);

          warn('Class selector references are being generated...');
          info('The output bundle will rebuild once mappings are available');

          return null;
        }
      }

      log(`Replacing selectors in ${chalk.cyan(facadeModuleId.slice(cwd))}`);

      const missing: string[] = [];
      const string = new MagicString(code);
      const ast = this.parse(code);
      const enter = parseSelectors(string, missing).bind(this);

      walk(ast, { enter });

      if (config.opts.warnUnknown && missing.length > 0) {

        if (config.opts.obfuscate) {
          warn(`${missing.length} unknown selectors were excluded from obfuscation`);
        } else {
          warn(`${missing.length} unknown class selectors are defined`);
          info('https://github.com/brixtol/mcss#unknown-selectors');
        }

        log(missing);

      }

      return {
        code: string.toString(),
        map: config.opts.sourcemap ? string.generateMap({ hires: true }) : undefined
      };

    }

  };
};
