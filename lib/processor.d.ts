import { SCSSProcessor } from '../types/types';
/**
 * Processor passed to the `rollup-plugin-scss` plugin
 * option `processor`
 */
export declare const processor: (options: SCSSProcessor) => (scss: string) => Promise<string>;
