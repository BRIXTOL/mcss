import { Plugin, PluginContext } from 'rollup';
import { createFilter } from '@rollup/pluginutils';
import { walk } from 'estree-walker';
import MagicString from 'magic-string';
import touch from 'touch';
import chalk from 'chalk';
import { config, tags } from './config';
import { createObfuscationMap } from './css';
import { log, info, warn } from './log';

/**
 * Returns the selector format to be written
 */
const getSelector = (
  isClass: boolean,
  isLast: boolean,
  value: string
) => isClass ? value + isLast ? '' : ' ' : '.' + value;

/**
 * The estree-walker enter method which handles the
 * selector replacments, swapping `m.css.*` occurances
 * out with their valid equivalents.
 *
 * This return function is curried and rollup context
 * is binded to its `this` scope. It leverages the
 * poorly typed estree-walker module.
 */
const parseSelectors = (code: MagicString) => function (
  this: PluginContext,
  node:any,
  parent: any
) {

  if (node.type !== 'CallExpression') return null;

  const callee = node?.callee;

  if (callee.type === 'Identifier' && config.opts.obfuscate) {

    let selector: string = '"';

    const className = node?.arguments[0];

    if (!className.value) return null;

    const classes: string[] = className.value.split('.');

    // Handle HTML tag names, eg: m('li.foo')
    if (tags.has(classes[0])) selector += classes.shift();

    for (const value of classes) {

      if (config.ignoredClasses && config.ignoredClasses.test(value)) continue;

      // Handle id selectors, eg: m('#id.class')
      if (value.charCodeAt(0) === 35) {
        selector += value;
      } else if (config.maps?.[value]) {
        selector += '.' + config.maps[value];
      } else {
        selector += '.' + value;
        config.unknown.add(value);
      }
    }

    selector += '"';

    code.overwrite(className.start, className.end, selector);

    return null;

  }

  if (callee.type !== 'MemberExpression') return null;

  const tag = callee.type === 'Identifier'
    ? callee.name
    : callee.object?.name;

  if (!/\b(m|mithril)\b/.test(tag)) return null;

  /* -------------------------------------------- */
  /* STANDARD SELECTORS WHEN OBFUSCATING          */
  /* -------------------------------------------- */

  if (!tags.has(callee.property?.name)) return null;

  /* -------------------------------------------- */
  /* MCSS SELECTORS                               */
  /* -------------------------------------------- */

  const tagName = callee.property.name;

  let isClass: boolean;
  let selector: string;
  let appender: string;

  if (tagName === 'css' || tagName === 'class') {

    isClass = tagName === 'class';
    selector = '"';
    appender = '"';

  } else {

    selector = tag + '("';

    // Handle Curries, eg: m.div('class')(...)
    if (/^\)\s*\(/.test(code.slice(node.end - 1, parent.end))) {

      appender = '", ';

    } else {

      selector += tagName;
      appender = '"';

      const isSelector = node?.arguments[0];

      // Handle selectors with no class values, eg: m.div({ attrs })
      if (!isSelector.value) {
        selector += appender + ', ';
        code.overwrite(node.start, node.callee.property.end + 1, selector);
        return null;
      }

      // Handle non-curried selectors
      // When we intercept an mcss tag which is expressing a
      // selector class name with dot of hash selector, eg: m.div('.class')
      if (isSelector.value && (
        isSelector.value.charCodeAt(0) === 46 || // .
        isSelector.value.charCodeAt(0) === 35 // #
      )) {

        const classes: string[] = isSelector.value.split('.');

        for (const value of classes) {

          if (value.length === 0) continue;

          if (config.ignoredClasses && config.ignoredClasses.test(value)) {
            selector += '.' + value;
            continue;
          }

          // Handle id selectors, eg: m('#id.class')
          if (value.charCodeAt(0) === 35) {
            selector += value;
          } else if (config.maps?.[value]) {
            selector += '.' + config.maps[value];
          } else {
            selector += '.' + value;
            config.unknown.add(value);
          }
        }

      } else {

        // If the selector value contains a whitspace then
        // it is assumed to render as a text value, eg: m.div('has space')
        if (/\s/.test(isSelector.value)) {
          selector += '", "' + isSelector.value;
        } else {

          // If we get here the selector might be known class name,
          // we will check if we know about it, if we dont it will be rendered
          // as a text value entry.
          if (config.ignoredClasses && config.ignoredClasses.test(isSelector.value)) {
            selector += '.' + isSelector.value;
          } else if (config.maps?.[isSelector.value]) {
            selector += '.' + config.maps[isSelector.value];
          } else {
            selector += '.' + isSelector.value;
            config.unknown.add(isSelector.value);
          }
        }

      }

      selector += appender;
      code.remove(isSelector.start, isSelector.end);
      code.overwrite(node.start, node.callee.property.end + 1, selector);

      return null;
    }

    code.remove(node.end, node.end + 1);

  }

  selector += (tagName === 'div' || isClass) ? '' : tagName;

  for (let idx = 0; idx < node.arguments.length; idx++) {

    const { value } = node.arguments[idx];
    const isLast = node.arguments.length - 1 === idx;

    if (config.ignoredClasses && config.ignoredClasses.test(value)) continue;

    // Handle id selectors, eg: m('#id')
    if (value.charCodeAt(0) === 35) {
      selector += value;
      continue;
    }

    if (config.opts.obfuscate) {
      if (config.maps[value]) {
        selector += getSelector(isClass, isLast, config.maps[value]);
      } else {
        selector += getSelector(isClass, isLast, value);
        config.unknown.add(value);
      }
    } else {
      selector += getSelector(isClass, isLast, value);
      if (!config.types.has(value)) config.unknown.add(value);
      else config.unknown.delete(value);
    }
  }

  selector += appender;

  // console.log(selector);

  // @ts-ignore
  code.overwrite(node.start, node.end, selector);

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
          if (config.opts.clear) {
            this.warn('Both clear and obfuscation are enabled in build mode');
            this.warn('You cannot obfuscate in build mode with clear enabled');
            this.warn('Set clean to false and try again');
            this.error('clear and obuscate enabled in build mode');
          } else {
            this.warn('Executed build without selector mappings!');
            this.warn('Please rebuild the bundle');
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

      if (config.opts.obfuscate || config.opts.clear) {
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
