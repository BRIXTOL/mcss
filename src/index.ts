/* eslint-disable no-unused-vars */

import { Plugin as RollupPlugin } from 'rollup';
import { Plugin as PostCSSPlugin } from 'postcss';
import { plugin } from './lib/plugin';
import { postcss } from './lib/postcss';
import { IOptions } from './options';
export { Fugazi } from './types';

const mcss = (options?: IOptions): RollupPlugin => plugin(options);

mcss.postcss = postcss;

export default mcss as {
  (options?: IOptions): RollupPlugin;
  postcss(): PostCSSPlugin
};
