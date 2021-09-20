import { Plugin, PluginContext } from 'rollup';
import { createFilter } from '@rollup/pluginutils';
import { walk } from 'estree-walker';
import { Node } from 'estree';
import MagicString from 'magic-string';
import touch from 'touch';
import chalk from 'chalk';
import { config } from './config';
import { createObfuscationMap } from './css';
import { log, info, warn } from './log';

/**
 * Returns the selector format to be written
 */
const getSelector = (isClass: boolean, value: string) => isClass ? value + ' ' : '.' + value;

/**
 * The estree-walker enter method which handles the
 * selector replacments, swapping `m.css.*` occurances
 * out with their valid equivalents.
 *
 * This return function is curried and rollup context
 * is binded to its `this` scope. It leverages the
 * poorly typed estree-walker module.
 */
const parseSelectors = (code: MagicString) => function (this: PluginContext, node: Node) {

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

      if (config.ignoredClasses && config.ignoredClasses.test(value)) continue;

      if (config.opts.obfuscate) {
        if (config.maps[value]) {
          selector += getSelector(isClass, config.maps[value]);
        } else {
          selector += getSelector(isClass, value);
          config.unknown.add(value);
        }
      } else {
        selector += getSelector(isClass, value);
        if (!config.types.has(value)) config.unknown.add(value);
        else config.unknown.delete(value);
      }
    }

    // @ts-ignore
    code.overwrite(node.start, node.end, '"' + selector + '"');

  }

};

export function rollup (): Plugin {

  const rebuild = new Map<string, string>();
  const filter = createFilter(config.opts.include, config.opts.exclude);
  const cwd = process.cwd().length + 1;

  return {
    name: 'mcss',

    buildStart () {

      if (config.isRebuild) {
        log('This rebuild was executed by mcss');
        config.isRebuild = false;
        return null;
      }

      if (!this.meta.watchMode) {
        if (!config.postcss && config.opts.obfuscate) {
          if (config.opts.clean) {
            this.warn('Both clean and obfuscation are enabled in build mode');
            this.warn('You cannot obfuscate in build mode with clean enabled');
            this.warn('Set clean to false and try again');
            this.error('clean and obuscate enabled in build mode');
          } else {
            this.warn('Executed build without selector mappings!');
            this.warn('Rebuild the the bundle');
          }
        }
      }
    },
    closeWatcher () {
      if (config.postcss) {
        info('cache references were disconnected');
        createObfuscationMap();
      }
    },
    /**
     * We leverage this hook when obfuscating. The `Set`
     * contains a reference to chucks (inputs) that need
     * to be omitted and rebuilt as they are dependent
     * upon the class mappings.
     */
    generateBundle (_options, bundle) {
      if (rebuild.size > 0) {
        config.isRebuild = true;
        for (const [ facadeModuleId, fileName ] of rebuild.entries()) {
          delete bundle[fileName];
          touch(facadeModuleId);
          log(`${facadeModuleId.slice(cwd)} will be rebuilt`);
          rebuild.delete(facadeModuleId);
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

      log(`replaced selectors in ${chalk.cyan(facadeModuleId.slice(cwd))}`);

      const string = new MagicString(code);
      const enter = parseSelectors(string).bind(this);

      walk(this.parse(code), { enter });

      if (config.opts.warnUnknown && config.unknown.size > 0) {

        if (config.opts.obfuscate) {
          warn(`${config.unknown.size} unknown selectors were excluded from obfuscation`);
        } else {
          warn(`${config.unknown.size} unknown class selectors are defined`);
          info('https://github.com/brixtol/mcss#unknown-selectors', { hideName: true });
        }

        log(Array.from(config.unknown.values()));

      }

      return {
        code: string.toString(),
        map: config.opts.sourcemap ? string.generateMap({ hires: true }) : undefined
      };

    }

  };
};
