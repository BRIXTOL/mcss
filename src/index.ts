import { postcss, plugin } from './lib/rollup';

const mcss = function mcss () { return plugin.apply(this, arguments); };

mcss.mcss = mcss;
mcss.postcss = postcss;

export * from './types/mithril';

export default mcss;
