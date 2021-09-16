import { postcss } from './lib/rollup';
declare const mcss: {
    (): any;
    mcss: any;
    postcss: typeof postcss;
};
export * from './types/mithril';
export * from './types/classes';
export default mcss;
