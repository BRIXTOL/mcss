import { parseClasses, obfuscateClasses } from './css';
import { writeMaps, writeTypes } from './mappings';
import { config } from './config';
import PostCSS, { Plugin as PostCSSPlugin, Root } from 'postcss';
import { info, log } from './log';
import c from 'chalk';

/**
 * PostCSS Plugin for MCSS
 */
export function postcss (): PostCSSPlugin {

  if (!config.mcss) throw new Error('mcss: Missing mcss() output plugin');

  return {
    postcssPlugin: 'mcss',
    async Once (root: Root, { result }) {

      if (config.opts.obfuscate) {

        const css = obfuscateClasses(root.toString());

        await writeTypes(Object.keys(config.maps));
        await writeMaps(config.maps);

        result.root = PostCSS.parse(css);

      } else {
        const types = parseClasses(root.toString());
        if (types) await writeTypes(types);
      }

      if (!config.postcss) {
        config.postcss = true;
        log(c.greenBright.bold('✓') + ' Generated references');
        info('Rollup is rebuilding...');
      }

    }
  };

};
