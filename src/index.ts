import { Plugin as RollupPlugin } from 'rollup';
import { Plugin as PostCSSPlugin } from 'postcss';
import { plugin } from './lib/plugin';
import { postcss } from './lib/postcss';
import { IOptions } from './options';

const mcss = function mcss (options?: IOptions): RollupPlugin { return plugin(options); };

mcss.postcss = postcss;

export * from './lib/typing';

export default mcss as {
  (options?: IOptions): RollupPlugin;
  postcss(): PostCSSPlugin
};
