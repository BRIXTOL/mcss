import { parseClasses, obfuscateClasses } from './css';
import { writeMaps, writeTypes } from './mappings';
import { config } from './config';
import PostCSS, { Plugin as PostCSSPlugin, Root, Result as PostCSSResult } from 'postcss';
import CleanCSS from 'clean-css';
import { info, log } from './log';
import c from 'chalk';

/**
 * PostCSS Plugin for MCSS
 */
export function postcss (): PostCSSPlugin {

  if (!config.mcss) throw new Error('mcss: Missing mcss() output plugin');

  const cleancss = config.opts.minify
    ? new CleanCSS(config.opts.cleancss)
    : undefined;

  return {
    postcssPlugin: 'mcss',
    async Once (root: Root, { result }) {

      let css: string = root.toString();
      let min: boolean = false;

      if (!config.opts.obfuscate) {
        const types = parseClasses(css);
        if (types) await writeTypes(types);
      }

      if (config.opts.obfuscate) {

        css = obfuscateClasses(css);

        await writeTypes(Object.keys(config.maps));
        await writeMaps(config.maps);

        if (config.opts.minify) {
          css = await minify(css, result);
          min = true;
        } else {
          result.root = PostCSS.parse(css);
        }
      }

      if (config.opts.minify) {
        if (!min) css = await minify(css, result);
        result.root = PostCSS.parse(css);
      }

      if (!config.postcss) {
        config.postcss = true;
        log(c.greenBright.bold('✓') + ' Generated references');
        info('Rollup is rebuilding...');
      }

    }
  };

  /**
   * Clean CSS minification
   */
  function minify (css: string, response: PostCSSResult): Promise<string> {

    return new Promise((resolve, reject) => {

      cleancss.minify(css.toString(), (error, output) => {
        if (error) return reject(new Error(error.join('\n')));
        for (const warning of output.warnings) response.warn(warning);
        resolve(output.styles);
      });

    });

  }
};
